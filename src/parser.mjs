import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { mergeDefaults } from './defaults.mjs';
import { decodeHtmlEntities } from './html-entities.mjs';
import {
  isVoidElement,
  isTerminatingElement,
  isVivificatingElement,
  isStylingElement,
  isClearingElement,
  isExpectedContent,
  getImplicitElements,
} from './html-tag-attrs.mjs';

class Parser {
  constructor(options, props) {
    this.options = mergeDefaults(options);
    this.blockLexer = null;
    this.blockLexerClass = BlockLexer;
    this.inlineLexer = null;
    this.inlineLexerClass = InlineLexer;
    this.text = '';
    this.tokens = [];

    Object.assign(this, props);
  }

  initialize(text) {
    this.text = text;
    this.tokens = [];
    this.blockLexer = new this.blockLexerClass(this.options);
    this.inlineLexer = new this.inlineLexerClass(this.options, {
      links: this.blockLexer.links
    });
  }

  finalize() {
    if (this.options.normalizeTags) {
      this.convertHtmlTags(this.tokens);
    }
  }

  parse(text) {
    this.initialize(text);
    this.processBlocks();
    this.processInline();
    this.finalize();
    return this.tokens;
  }

  processBlocks() {
    this.tokens = this.blockLexer.tokenize(this.text);
  }

  processInline(tokens) {
    this.tokenizeInline(this.tokens);
  }

  tokenizeInline(tokens) {
    for (let token of tokens) {
      const { children, markdown, type } = token;
      if (children) {
        this.tokenizeInline(children);
      } else if (markdown) {
        token.children = this.inlineLexer.tokenize(markdown, type);
      }
    }
  }

  convertHtmlTags(tokens) {
    // flatten the list first, as a start tag and its corresponding end tag
    // could end up in separate html blocks
    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i];
      if (token.type === 'html_block') {
        const list = token.children;
        tokens.splice(i, 1);
        while (list.length > 0) {
          const child = list.pop();
          tokens.splice(i, 0, child);
        }
      }
    }
    // parse the tags
    let containsHtmlTags = false;
    for (let i = 0; i < tokens.length; i++) {
      const child = tokens[i];
      if (child.type === 'html_tag') {
        // parse the tag now
        const { tagType, tagName, attributes } = this.parseHtmlTag(child.html);
        if (tagType === 'start') {
          tokens[i] = {
            type: 'html_element',
            tagName,
            attributes,
            children: null
          };
        } else if (tagType === 'end') {
          tokens[i] = {
            type: 'html_end_tag',
            tagName,
          };
        }
        containsHtmlTags = true;
      }
    }

    // process children
    for (let token of tokens) {
      if (token.children) {
        this.convertHtmlTags(token.children);
      }
    }

    if (!containsHtmlTags) {
      return;
    }

    // push element onto stack when its start tag is encountered; pop it off
    // when its end tag is seen (when tags are properly paired up)
    const stack = [];
    let index = 0;
    for (;;) {
      const token = tokens[index];
      let newDepth = -1;
      if (token) {
        if (token.type == 'html_element') {
          // see if the tag closes an element that permits omission of end-tag
          for (let i = stack.length - 1; i >= 0; i--) {
            if (isTerminatingElement(token.tagName, stack[i].tagName)) {
              newDepth = i;
              break;
            } else if(isExpectedContent(token.tagName, stack[i].tagName)) {
              // don't go further up the stack when the element is expected
              // (e.g. <li> in <ul>)
              break;
            }
          }
          if (newDepth === -1) {
            // don't push onto stack when element is void (e.g. <img>)
            if (!isVoidElement(token.tagName)) {
              stack.push(token);
            }
            index++;
          }
        } else if (token.type === 'html_end_tag') {
          // see if the end tag closes an element in the stack
          for (let i = stack.length - 1; i >= 0; i--) {
            if (token.tagName === stack[i].tagName) {
              newDepth = i;
              break;
            }
          }
          if (newDepth !== -1 || !isVivificatingElement(token.tagName)) {
            // toss the end tag
            tokens.splice(index, 1);
          } else {
            // insert empty element to match browser behavior
            tokens[index] = {
              type: 'html_element',
              tagName: token.tagName,
              attributes: {},
              children: []
            };
          }
        } else {
          // skip over tokens that aren't start or end tags
          index++;
        }
      } else {
        if (stack.length > 0) {
          // we're out of tokens--pop everything off the stack
          newDepth = 0;
        } else {
          break;
        }
      }
      if (newDepth !== -1) {
        // pop elements off the stack and insert children into them,
        // keeping an eye out for text styling tags
        const styleTags = [];
        while (stack.length > newDepth) {
          const openTag = stack.pop();
          if (stack.length !== newDepth) {
            // not the element explicitly targeted for closing
            // might need to restore it later
            if (isStylingElement(openTag.tagName)) {
              styleTags.push({ ...openTag });
            }
          }
          const openTagIndex = tokens.indexOf(openTag);
          const startIndex = openTagIndex + 1;
          const children = tokens.splice(startIndex, index - startIndex);
          this.createImplicitHtmlTags(openTag.tagName, children);
          openTag.children = children;
          index = openTagIndex + 1;
        }

        if (styleTags.length > 0) {
          // insert the styling tags where text content start again
          let insertionIndex = -1;
          for (let i = index; i < tokens.length; i++) {
            const ahead = tokens[i];
            if (ahead.type === 'html_element') {
              // that is, unless we encounter a clearing table
              // <table> is the only one, I think
              if (isClearingElement(ahead.tagName)) {
                break;
              }
            } else if (ahead.type === 'table') {
              break;
            } else if (ahead.type !== 'html_end_tag') {
              insertionIndex = i;
              break;
            }
          }
          if (insertionIndex !== -1) {
            for (let styleTag of styleTags) {
              this.tokens.splice(insertionIndex, 0, styleTag);
            }
          }
        }
      }
    }
  }

  createImplicitHtmlTags(tagName, children) {
    const implicitTagNames = getImplicitElements(tagName);
    if (!implicitTagNames) {
      return;
    }
    let index = 0;
    let implicitTag = null;
    while (index < children.length) {
      const child = children[index];
      if (child.type === 'html_element') {
        // see if the child would terminate the implicitly created container
        if (implicitTag && isTerminatingElement(child.tagName, implicitTag.tagName)) {
          implicitTag = null;
        }
        const implicitTagName = implicitTagNames[child.tagName];
        if (implicitTagName && (!implicitTag || implicitTag.tagName !== implicitTagName)) {
          implicitTag = {
            type: 'html_element',
            tagName: implicitTagName,
            html: `<${implicitTagName}>`,
            children: [],
          };
          children.splice(index, 0, implicitTag);
          index++;
        }
      }
      if (implicitTag) {
        // remove the child and place it in the implicit element instead
        // (e.g. <tr> goes into <tbody>)
        children.splice(index, 1);
        implicitTag.children.push(child);
      } else {
        index++;
      }
    }
  }

  parseHtmlTag(html) {
    html = html.trim();
    const startTag = /^<([a-zA-Z][\w.:-]*)([^>]*)>/;
    const endTag = /^<\/([a-zA-Z][\w.:-]*)[^>]*>/;
    let scap = startTag.exec(html);
    if (scap) {
      const attribute = /^\s*([a-zA-Z:_][\w.:-]*)(?:\s*=\s*"([^"]*)"|\s*=\s*'([^']*)'|\s*=\s*([^\s"'=<>`]+))?/g;
      const tagType = 'start';
      const tagName = scap[1].toLowerCase();
      const attributes = {};
      let m;
      while (m = attribute.exec(scap[2])) {
        const name = m[1]
        const value = m[2] || m[3] || m[4] || '';
        attributes[name] = this.decodeEntities(value);
      }
      return { tagType, tagName, attributes };
    }
    let ecap = endTag.exec(html);
    if (ecap) {
      const tagType = 'end';
      const tagName = ecap[1].toLowerCase();
      return { tagType, tagName };
    }
    return {};
  }

  decodeEntities(html) {
    return decodeHtmlEntities(html);
  }
}

export {
  Parser,
  Parser as default,
};
