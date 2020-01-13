import imports from 'marked/src/helpers';

const {
  escape,
  unescape,
  edit,
  cleanUrl,
  resolveUrl,
  noopTest,
  merge,
  splitCells,
  rtrim,
  findClosingBracket,
  checkSanitizeDeprecation
} = imports;

function findCodeSections(tokens) {
  const blocks = [];
  for (let token of tokens) {
    if (token.type === 'code') {
      blocks.push(token);
    }
  }
  return blocks;
}

function findTextStrings(tokens) {
  const strings = [];
  if (!(tokens instanceof Array)) {
    tokens = [ tokens ];
  }
  for (let token of tokens) {
    const { text, html, children } = token;
    if (text) {
      strings.push(text);
    } else if (children) {
      for (let s of findTextStrings(children)) {
        strings.push(s);
      }
    }
  }
  return strings;
}

function findMarkedStrings(tokens) {
  const strings = [];
  if (!(tokens instanceof Array)) {
    tokens = [ tokens ];
  }
  for (let token of tokens) {
    const { text, html, children } = token;
    if (text) {
      // the Marked slugger expects text with HTML entities
      strings.push(html ? escape(html) : text);
    } else if (children) {
      for (let s of findMarkedStrings(children)) {
        strings.push(s);
      }
    } else if (html) {
      // the Marked slugger expects to see HTML tags too
      strings.push(html);
    }
  }
  return strings;
}

function mergeStrings(list) {
  const result = [];
  let wasString = false;
  for (let item of list) {
    if (typeof(item) === 'string') {
      if (wasString) {
        result[result.length - 1] += item;
      } else {
        result.push(item);
        wasString = true;
      }
    } else {
      result.push(item);
      wasString = false;
    }
  }
  return result;
}

function nextTick() {
  return new Promise((resolve) => { setImmediate(resolve) })
}

export {
  escape,
  unescape,
  edit,
  cleanUrl,
  resolveUrl,
  noopTest,
  merge,
  splitCells,
  rtrim,
  findClosingBracket,
  checkSanitizeDeprecation,

  findCodeSections,
  findTextStrings,
  findMarkedStrings,
  mergeStrings,
  nextTick,
};
