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

const voidCheck = any([
  'area',
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'image',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]);

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
const aTermination = any([ 'a' ]);

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
  a: aTermination,
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
  td: 'tbody',
  th: 'tbody',
  col: 'colgroup',
};

const tbodyImplicitElements = {
  td: 'tr',
  th: 'tr',
};
const theadImplicitElements = tbodyImplicitElements;
const tfootImplicitElements = tbodyImplicitElements;

const implicitElements = {
  table: tableImplicitElements,
  thead: theadImplicitElements,
  tbody: tbodyImplicitElements,
  tfoot: tfootImplicitElements,
};

const vivificationCheck = any([ 'p', 'br' ]);

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

const blockCheck = any([
  'address',
  'article',
  'aside',
  'blockquote',
  'canvas',
  'dd',
  'div',
  'dl',
  'dt',
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
  'hr',
  'li',
  'main',
  'nav',
  'noscript',
  'ol',
  'p',
  'pre',
  'section',
  'table',
  'tfoot',
  'ul',
  'video',
]);

const styleClearanceCheck = any([
  'table',
  'tbody',
  'tfoot',
  'thead',
  'td',
  'tr',
]);

const contentEvictionCheck = any([
  'table',
  'tbody',
  'tfoot',
  'thead',
  'tr',
  'colgroup',
]);

const linefeedEliminationCheck = any([ 'pre' ]);

export {
  voidCheck,
  terminationChecks,
  expectedContentChecks,
  vivificationCheck,
  textStyleCheck,
  blockCheck,
  styleClearanceCheck,
  contentEvictionCheck,
  linefeedEliminationCheck,

  implicitElements,
};
