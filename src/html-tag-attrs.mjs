function any(list) {
  return (name) => {
    return (list.indexOf(name) !== -1);
  };
}

function not(list) {
  return (name) => {
    return (list.indexOf(name) === -1);
  };
}

const voidTags = [
  'area',
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
];

const pTermination = any([
  'address',
  'article',
  'aside',
  'blockquote',
  'details',
  'div',
  'dl',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hgroup',
  'hr',
  'main',
  'menu',
  'nav',
  'ol',
  'p',
  'pre',
  'section',
  'table',
  'ul',
]);
const hTermination = any([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
]);
const liTermination = any([ 'li' ]);
const trTermination = any([ 'tr' ]);
const tdTermination = any([ 'td', 'th' ]);
const thTermination = tdTermination;
const tbodyTermination = any([ 'tbody', 'thead', 'tfoot' ]);
const theadTermination = tbodyTermination;
const tfootTermination = tbodyTermination;
const dtTermination = any([ 'dd', 'dt' ]);
const ddTermination = dtTermination;
const captionTermination = any([
  'td',
  'tr',
  'tbody',
  'thead',
  'tfoot',
  'colgroup',
  'col',
]);
const colgroupTermination = not([ 'col' ]);

const terminationChecks = {
  p: pTermination,
  h1: hTermination,
  h2: hTermination,
  h3: hTermination,
  h4: hTermination,
  h5: hTermination,
  h6: hTermination,
  li: liTermination,
  tr: trTermination,
  td: tdTermination,
  th: thTermination,
  tbody: tbodyTermination,
  thead: theadTermination,
  tfoot: tfootTermination,
  dt: dtTermination,
  dd: ddTermination,
  caption: captionTermination,
  colgroup: colgroupTermination,
};

const ulContent = any([ 'li' ]);
const olContent = ulContent;
const tableContent = any([
  'td',
  'tr',
  'tbody',
  'thead',
  'tfoot',
  'caption',
  'colgroup',
  'col',
]);
const trContent = any([ 'td', 'th' ]);
const tbodyContent = any([ 'tr' ]);
const theadContent = tbodyContent;
const tfootContent = tbodyContent;

const expectedContentChecks = {
  ul: ulContent,
  ol: olContent,
  table: tableContent,
  tr: trContent,
  tbody: tbodyContent,
  thead: theadContent,
  tfoot: tfootContent,
};

const tableImplicitElements = {
  tr: 'tbody',
  col: 'colgroup',
};

const implicitElements = {
  table: tableImplicitElements
};

const vivificationCheck = any([ 'p' ]);

const textStyleCheck = any([
  'a',
  'b',
  'code',
  'em',
  'i',
  'small',
  'strong',
  'u',
]);

const styleClearanceCheck = any([
  'table',
  'tbody',
  'tfoot',
  'thead',
  'td',
  'tr',
]);

function isVoidElement(tagName) {
  return voidTags.indexOf(tagName) !== -1;
}

function isTerminatingElement(tagName, openTagName) {
  const f = terminationChecks[openTagName];
  if (f) {
    return f(tagName);
  }
  return false;
}

function isExpectedContent(tagName, parentTagName) {
  const f = expectedContentChecks[parentTagName];
  if (f) {
    return f(tagName);
  }
  return false;
}

function isVivificatingElement(tagName) {
  return vivificationCheck(tagName);
}

function isStylingElement(tagName) {
  return textStyleCheck(tagName);
}

function isClearingElement(tagName) {
  return styleClearanceCheck(tagName);
}

function getImplicitElements(parentTagName) {
  return implicitElements[parentTagName];
}

export {
  isVoidElement,
  isTerminatingElement,
  isVivificatingElement,
  isStylingElement,
  isExpectedContent,
  isClearingElement,
  getImplicitElements,
};
