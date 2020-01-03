import { BlockLexer } from './block-lexer.mjs';
import { InlineLexer } from './inline-lexer.mjs';
import { defaults } from './defaults.mjs';
import { merge } from './helpers.mjs';
import { decodeHtmlEntities } from './html-entities.mjs';
import { isVoidElement, isTerminatingElement, isExpectedContent, getImplicitElements } from './html-tag-attrs.mjs';

class Parser {
  constructor(options, props) {
    this.options = defaults;

    if (options) {
      this.options = merge({}, defaults, options);
    }
    if (props) {
      merge(this, props);
    }
  }

  initialize(text) {
    this.text = text;
    this.tokens = [];
    this.blockLexer = new BlockLexer(this.options);
    this.inlineLexer = new InlineLexer(this.options, {
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
      if (token.children) {
        this.tokenizeInline(token.children);
      } else if (token.markdown) {
        token.children = this.inlineLexer.tokenize(token.markdown);
      }
    }
  }

  convertHtmlTags(tokens) {
    // flatten the list first, as a start tag and its corresponding end tag
    // could end up in separate html blocks
    let containsHtmlTags = false;
    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i];
      if (token.type === 'html_block') {
        const list = token.children;
        tokens.splice(i, 1);
        while (list.length > 0) {
          let child = list.pop();
          if (child.type === 'html_tag') {
            // parse the tag now
            const { tagType, tagName, attributes } = this.parseHtmlTag(child.html);
            if (tagType === 'start') {
              child = {
                type: 'html_element',
                tagName,
                attributes,
                children: null
              };
            } else if (tagType === 'end') {
              child = {
                type: 'html_end_tag',
                tagName,
              };
            }
          }
          tokens.splice(i, 0, child);
        }
        containsHtmlTags = true;
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
          // toss the end tag
          tokens.splice(index, 1);
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
        // pop elements off the stack and insert children into them
        while (stack.length > newDepth) {
          const openTag = stack.pop();
          const openTagIndex = tokens.indexOf(openTag);
          const startIndex = openTagIndex + 1;
          const children = tokens.splice(startIndex, index - startIndex);
          this.createImplicitHtmlTags(openTag.tagName, children);
          openTag.children = children;
          index = openTagIndex + 1;
        }
      }
    }

    for (let token of tokens) {
      if (token.children) {
        this.convertHtmlTags(token.children);
      }
    }
  }

  createImplicitHtmlTags(tagName, children) {
    const implicitTagNames = getImplicitElements(tagName);
    if (!implicitTagNames) {
      return;
    }
    let index = 0;
    const created = {};
    while (index < children.length) {
      const child = children[index];
      if (child.type === 'html_element') {
        const implicitTagName = implicitTagNames[child.tagName];
        if (implicitTagName) {
          // remove the child and place it in the implicit element instead
          // (e.g. <tr> goes into <tbody>)
          children.splice(index, 1);
          let container = created[implicitTagName];
          if (!container) {
            container = {
              type: 'html_element',
              tagName: implicitTagName,
              html: `<${implicitTagName}>`,
              children: [],
            };
            children.splice(index, 0, container);
            created[implicitTagName] = container;
            index++;
          }
          container.children.push(child);
        } else {
          index++;

          // remove the implicitly created container if there's an explicit one
          if (created[child.tagName]) {
            created[child.tagName] = undefined;
          }
        }
      } else {
        index++;
      }
    }
  }

  parseHtmlTag(html) {
    const startTag = /^<([a-zA-Z][\w.:-]*)([^>]*)>/;
    const endTag = /^<\/([a-zA-Z][\w.:-]*)[^>]*>/;
    let scap = startTag.exec(html);
    if (scap) {
      const attribute = /^\s*([a-zA-Z:_][\w.:-]*)(?:\s*=\s*"([^"]*)"|\s*=\s*'([^']*)'|\s*=\s*([^\s"'=<>`]+))?/g;
      const tagType = 'start';
      const tagName = scap[1];
      const attributes = {};
      let m;
      while (m = attribute.exec(scap[2])) {
        const name = m[1]
        const value = m[2] || m[3] || m[4];
        if (value !== undefined) {
          attributes[name] = this.decodeEntities(value);
        } else {
          attributes[name] = true;
        }
      }
      return { tagType, tagName, attributes };
    }
    let ecap = endTag.exec(html);
    if (ecap) {
      const tagType = 'end';
      const tagName = ecap[1];
      return { tagType, tagName };
    }
    return {};
  }

  decodeEntities(html) {
    return decodeHtmlEntities(html);
  }
}

function parseJSON(text, options) {
  const parser = new Parser(options);
  const renderer = new JsonRenderer(options);
  const tokens = parser.parse(text);
  const json = renderer.render(tokens);
  return json;
}

export {
  parseJSON,
  parseJSON as parseJson,
  Parser,
  Parser as default,
};
