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

const block = {
  block: true,
};
const childless = {
  void: true,
};
const style = {
  styles: true,
};
const unknown = {
  unknown: true,
};

const a = {
  endsOn: any([ 'a' ]),
  styles: true,
};
const address = block;
const area = childless;
const article = block;
const aside = block;
const blockquote = block;
const canvas = block;
const b = style;
const base = childless;
const br = {
  vivificates: true,
  void: true,
};
const caption = {
  endsOn: any([
    'td',
    'tr',
    'tbody',
    'thead',
    'tfoot',
    'colgroup',
    'col',
  ]),
};
const code = style;
const col = childless;
const colgroup = {
  endsOn: not([ 'col' ]),
  evicts: true,
};
const command = childless;
const dd = {
  block: true,
  endsOn: any([ 'dd', 'dt' ]),
};
const div = block;
const dl = block;
const dt = dd;
const em = style;
const embed = childless;
const fieldset = block;
const figcaption = block;
const figure = block;
const footer = block;
const form = block;
const header = block;
const h1 = {
  block: true,
  endsOn: any([ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ])
};
const h2 = h1;
const h3 = h1;
const h4 = h1;
const h5 = h1;
const h6 = h1;
const hr = {
  block: true,
  void: true,
};
const i = style;
const img = childless;
const input = childless;
const keygen = childless;
const li = {
  block: true,
  endsOn: any([ 'li' ]),
};
const link = childless;
const main = block;
const meta = childless;
const nav = block;
const noscript = block;
const ol = {
  block: true,
  expects: any([ 'li' ]),
};
const p = {
  block: true,
  endsOn: any([
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
  ]),
  vivificates: true,
};
const param = childless;
const pre = {
  block: true,
  trims: true,
};
const section = block;
const source = childless;
const small = style;
const strong = style;
const table = {
  block: true,
  clears: true,
  evicts: true,
  expects: any([
    'td',
    'tr',
    'tbody',
    'thead',
    'tfoot',
    'caption',
    'colgroup',
    'col',
  ]),
  implicit: {
    tr: 'tbody',
    td: 'tbody',
    th: 'tbody',
    col: 'colgroup',
  },
};
const tbody = {
  clears: true,
  endsOn: any([ 'tbody', 'thead', 'tfoot' ]),
  evicts: true,
  expects: any([ 'tr' ]),
  implicit: {
    td: 'tr',
    th: 'tr',
  },
};
const td = {
  clears: true,
  endsOn: any([ 'td', 'th' ]),
};
const tfoot = tbody;
const th = td;
const thead = tbody;
const tr = {
  clears: true,
  endsOn: any([ 'tr' ]),
  evicts: true,
  expects: any([ 'td', 'th' ]),
};
const track = childless;
const u = style;
const ul = ol;
const wbr = childless;

const tagProperties = {
  a,
  address,
  area,
  article,
  aside,
  blockquote,
  canvas,
  b,
  base,
  br,
  caption,
  code,
  col,
  colgroup,
  command,
  dd,
  div,
  dl,
  dt,
  em,
  embed,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  header,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  i,
  img,
  input,
  keygen,
  li,
  link,
  main,
  meta,
  nav,
  noscript,
  ol,
  p,
  param,
  pre,
  section,
  source,
  small,
  strong,
  table,
  tbody,
  td,
  tfoot,
  th,
  thead,
  tr,
  track,
  u,
  ul,
  wbr,
};

function getTagProperties(tagName) {
  return tagProperties[tagName] || unknown;
}

const tagAliases = {
  image: 'img',
};

function findTagAlias(tagName) {
  return tagAliases[tagName];
}

export {
  getTagProperties,
  findTagAlias,
};
