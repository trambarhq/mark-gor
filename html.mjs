function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/**
 * Helpers
 */
var escapeTest = /[&<>"']/;
var escapeReplace = /[&<>"']/g;
var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
var escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

var getEscapeReplacement = function getEscapeReplacement(ch) {
  return escapeReplacements[ch];
};

function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }

  return html;
}

var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(unescapeTest, function (_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';

    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
    }

    return '';
  });
}

var caret = /(^|[^\[])\^/g;

function edit(regex, opt) {
  regex = regex.source || regex;
  opt = opt || '';
  var obj = {
    replace: function replace(name, val) {
      val = val.source || val;
      val = val.replace(caret, '$1');
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: function getRegex() {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}

var nonWordAndColonTest = /[^\w:]/g;
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    var prot;

    try {
      prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, '').toLowerCase();
    } catch (e) {
      return null;
    }

    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }

  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }

  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }

  return href;
}

var baseUrls = {};
var justDomain = /^[^:]+:\/*[^/]*$/;
var protocol = /^([^:]+:)[\s\S]*$/;
var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (justDomain.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = rtrim(base, '/', true);
    }
  }

  base = baseUrls[' ' + base];
  var relativeBase = base.indexOf(':') === -1;

  if (href.substring(0, 2) === '//') {
    if (relativeBase) {
      return href;
    }

    return base.replace(protocol, '$1') + href;
  } else if (href.charAt(0) === '/') {
    if (relativeBase) {
      return href;
    }

    return base.replace(domain, '$1') + href;
  } else {
    return base + href;
  }
}

var noopTest = {
  exec: function noopTest() {}
};

function merge(obj) {
  var i = 1,
      target,
      key;

  for (; i < arguments.length; i++) {
    target = arguments[i];

    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

function splitCells(tableRow, count) {
  // ensure that every cell-delimiting pipe has a space
  // before it to distinguish it from an escaped pipe
  var row = tableRow.replace(/\|/g, function (match, offset, str) {
    var escaped = false,
        curr = offset;

    while (--curr >= 0 && str[curr] === '\\') {
      escaped = !escaped;
    }

    if (escaped) {
      // odd number of slashes means | is escaped
      // so we leave it alone
      return '|';
    } else {
      // add space before unescaped |
      return ' |';
    }
  }),
      cells = row.split(/ \|/);
  var i = 0;

  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count) {
      cells.push('');
    }
  }

  for (; i < cells.length; i++) {
    // leading or trailing whitespace is ignored per the gfm spec
    cells[i] = cells[i].trim().replace(/\\\|/g, '|');
  }

  return cells;
} // Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
// /c*$/ is vulnerable to REDOS.
// invert: Remove suffix of non-c chars instead. Default falsey.


function rtrim(str, c, invert) {
  var l = str.length;

  if (l === 0) {
    return '';
  } // Length of suffix matching the invert condition.


  var suffLen = 0; // Step left until we fail to match the invert condition.

  while (suffLen < l) {
    var currChar = str.charAt(l - suffLen - 1);

    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }

  return str.substr(0, l - suffLen);
}

function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }

  var l = str.length;
  var level = 0,
      i = 0;

  for (; i < l; i++) {
    if (str[i] === '\\') {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;

      if (level < 0) {
        return i;
      }
    }
  }

  return -1;
}

function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
  }
}

var helpers = {
  escape: escape,
  unescape: unescape,
  edit: edit,
  cleanUrl: cleanUrl,
  resolveUrl: resolveUrl,
  noopTest: noopTest,
  merge: merge,
  splitCells: splitCells,
  rtrim: rtrim,
  findClosingBracket: findClosingBracket,
  checkSanitizeDeprecation: checkSanitizeDeprecation
};

var noopTest$1 = helpers.noopTest,
    edit$1 = helpers.edit,
    merge$1 = helpers.merge;
/**
 * Block-Level Grammar
 */


var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: /^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: '^ {0,3}(?:' // optional indentation
  + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
  + '|comment[^\\n]*(\\n+|$)' // (2)
  + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
  + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
  + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
  + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
  + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
  + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
  + ')',
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  nptable: noopTest$1,
  table: noopTest$1,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
  text: /^[^\n]+/
};
block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit$1(block.def).replace('label', block._label).replace('title', block._title).getRegex();
block.bullet = /(?:[*+-]|\d{1,9}\.)/;
block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
block.item = edit$1(block.item, 'gm').replace(/bull/g, block.bullet).getRegex();
block.list = edit$1(block.list).replace(/bull/g, block.bullet).replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))').replace('def', '\\n+(?=' + block.def.source + ')').getRegex();
block._tag = 'address|article|aside|base|basefont|blockquote|body|caption' + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption' + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe' + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option' + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr' + '|track|ul';
block._comment = /<!--(?!-?>)[\s\S]*?-->/;
block.html = edit$1(block.html, 'i').replace('comment', block._comment).replace('tag', block._tag).replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block.paragraph = edit$1(block._paragraph).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} +').replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
.replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)').replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
.getRegex();
block.blockquote = edit$1(block.blockquote).replace('paragraph', block.paragraph).getRegex();
/**
 * Normal Block Grammar
 */

block.normal = merge$1({}, block);
/**
 * GFM Block Grammar
 */

block.gfm = merge$1({}, block.normal, {
  nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
  table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
});
/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */

block.pedantic = merge$1({}, block.normal, {
  html: edit$1('^ *(?:comment *(?:\\n|\\s*$)' + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
  + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))').replace('comment', block._comment).replace(/tag/g, '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub' + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)' + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b').getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
  fences: noopTest$1,
  // fences not supported
  paragraph: edit$1(block.normal._paragraph).replace('hr', block.hr).replace('heading', ' *#{1,6} *[^\n]').replace('lheading', block.lheading).replace('blockquote', ' {0,3}>').replace('|fences', '').replace('|list', '').replace('|html', '').getRegex()
});
/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest$1,
  tag: '^comment' + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
  + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
  + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
  + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
  + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
  // CDATA section
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
  nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
  strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
  em: /^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest$1,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
}; // list of punctuation marks from common mark spec
// without ` and ] to workaround Rule 17 (inline code blocks/links)

inline._punctuation = '!"#$%&\'()*+,\\-./:;<=>?@\\[^_{|}~';
inline.em = edit$1(inline.em).replace(/punctuation/g, inline._punctuation).getRegex();
inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit$1(inline.autolink).replace('scheme', inline._scheme).replace('email', inline._email).getRegex();
inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline.tag = edit$1(inline.tag).replace('comment', block._comment).replace('attribute', inline._attribute).getRegex();
inline._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline.link = edit$1(inline.link).replace('label', inline._label).replace('href', inline._href).replace('title', inline._title).getRegex();
inline.reflink = edit$1(inline.reflink).replace('label', inline._label).getRegex();
/**
 * Normal Inline Grammar
 */

inline.normal = merge$1({}, inline);
/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge$1({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
  link: edit$1(/^!?\[(label)\]\((.*?)\)/).replace('label', inline._label).getRegex(),
  reflink: edit$1(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace('label', inline._label).getRegex()
});
/**
 * GFM Inline Grammar
 */

inline.gfm = merge$1({}, inline.normal, {
  escape: edit$1(inline.escape).replace('])', '~|])').getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~+(?=\S)([\s\S]*?\S)~+/,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
});
inline.gfm.url = edit$1(inline.gfm.url, 'i').replace('email', inline.gfm._extended_email).getRegex();
/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge$1({}, inline.gfm, {
  br: edit$1(inline.br).replace('{2,}', '*').getRegex(),
  text: edit$1(inline.gfm.text).replace('\\b_', '\\b_| {2,}\\n').replace(/\{2,\}/g, '*').getRegex()
});
var rules = {
  block: block,
  inline: inline
};

var block$1 = rules.block,
    inline$1 = rules.inline;

var escape$1 = helpers.escape,
    unescape$1 = helpers.unescape,
    cleanUrl$1 = helpers.cleanUrl,
    splitCells$1 = helpers.splitCells,
    findClosingBracket$1 = helpers.findClosingBracket;

function findCodeSections(tokens) {
  var blocks = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = tokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var token = _step.value;

      if (token.type === 'code') {
        blocks.push(token);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return blocks;
}

function findTextStrings(tokens) {
  var strings = [];

  if (!(tokens instanceof Array)) {
    tokens = [tokens];
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = tokens[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var token = _step2.value;
      var text = token.text,
          html = token.html,
          children = token.children;

      if (text) {
        strings.push(text);
      } else if (children) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = findTextStrings(children)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var s = _step3.value;
            strings.push(s);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return strings;
}

function findMarkedStrings(tokens) {
  var strings = [];

  if (!(tokens instanceof Array)) {
    tokens = [tokens];
  }

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = tokens[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var token = _step4.value;
      var text = token.text,
          html = token.html,
          children = token.children;

      if (text) {
        // the Marked slugger expects text with HTML entities
        strings.push(html ? escape$1(html) : text);
      } else if (children) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = findMarkedStrings(children)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var s = _step5.value;
            strings.push(s);
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      } else if (html) {
        // the Marked slugger expects to see HTML tags too
        strings.push(html);
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return strings;
}

function mergeStrings(list) {
  var result = [];
  var wasString = false;
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = list[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var item = _step6.value;

      if (typeof item === 'string') {
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
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
        _iterator6["return"]();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return result;
}

var noSetImmediate = false;

function nextTick() {
  return new Promise(function (resolve) {
    if (!noSetImmediate) {
      try {
        setImmediate(resolve);
        return;
      } catch (err) {
        noSetImmediate = true;
      }
    }

    resolve();
  });
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var defaults = createCommonjsModule(function (module) {
function getDefaults() {
  return {
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    xhtml: false
  };
}

function changeDefaults(newDefaults) {
  module.exports.defaults = newDefaults;
}

module.exports = {
  defaults: getDefaults(),
  getDefaults: getDefaults,
  changeDefaults: changeDefaults
};
});
var defaults_1 = defaults.defaults;
var defaults_2 = defaults.getDefaults;
var defaults_3 = defaults.changeDefaults;

var defaults$1 = getDefaults();

function getDefaults() {
  return _objectSpread2({
    htmlOnly: false,
    headerFormat: 'github',
    decodeEntities: true,
    fixBrokenTags: true,
    normalizeTags: true,
    omitLinefeed: true,
    omitDeclarations: true,
    omitEmbeddedCode: true,
    omitNonvisualWhitespace: true,
    omitTags: ['script', 'style', 'link', 'meta']
  }, defaults.getDefaults());
}

function mergeDefaults(options) {
  return Object.assign({}, defaults$1, options);
}

function changeDefaults(options) {
  Object.assign(defaults$1, options);
}

var _htmlEntityTable;

var htmlEntityTable = (_htmlEntityTable = {
  Aacute: 'Á',
  Aacut: 'Á',
  aacute: 'á',
  aacut: 'á',
  Abreve: 'Ă',
  abreve: 'ă',
  ac: '∾',
  acd: '∿',
  acE: '∾̳',
  Acirc: 'Â',
  Acir: 'Â',
  acirc: 'â',
  acir: 'â',
  acute: '´',
  acut: '´',
  Acy: 'А',
  acy: 'а',
  AElig: 'Æ',
  AEli: 'Æ',
  aelig: 'æ',
  aeli: 'æ',
  af: '⁡',
  Afr: '𝔄',
  afr: '𝔞',
  Agrave: 'À',
  Agrav: 'À',
  agrave: 'à',
  agrav: 'à',
  alefsym: 'ℵ',
  aleph: 'ℵ',
  Alpha: 'Α',
  alpha: 'α',
  Amacr: 'Ā',
  amacr: 'ā',
  amalg: '⨿',
  amp: '&',
  am: '&',
  AMP: '&',
  AM: '&',
  andand: '⩕',
  And: '⩓',
  and: '∧',
  andd: '⩜',
  andslope: '⩘',
  andv: '⩚',
  ang: '∠',
  ange: '⦤',
  angle: '∠',
  angmsdaa: '⦨',
  angmsdab: '⦩',
  angmsdac: '⦪',
  angmsdad: '⦫',
  angmsdae: '⦬',
  angmsdaf: '⦭',
  angmsdag: '⦮',
  angmsdah: '⦯',
  angmsd: '∡',
  angrt: '∟',
  angrtvb: '⊾',
  angrtvbd: '⦝',
  angsph: '∢',
  angst: 'Å',
  angzarr: '⍼',
  Aogon: 'Ą',
  aogon: 'ą',
  Aopf: '𝔸',
  aopf: '𝕒',
  apacir: '⩯',
  ap: '≈',
  apE: '⩰',
  ape: '≊',
  apid: '≋',
  apos: '\'',
  ApplyFunction: '⁡',
  approx: '≈',
  approxeq: '≊',
  Aring: 'Å',
  Arin: 'Å',
  aring: 'å',
  arin: 'å',
  Ascr: '𝒜',
  ascr: '𝒶',
  Assign: '≔',
  ast: '*',
  asymp: '≈',
  asympeq: '≍',
  Atilde: 'Ã',
  Atild: 'Ã',
  atilde: 'ã',
  atild: 'ã',
  Auml: 'Ä',
  Aum: 'Ä',
  auml: 'ä',
  aum: 'ä',
  awconint: '∳',
  awint: '⨑',
  backcong: '≌',
  backepsilon: '϶',
  backprime: '‵',
  backsim: '∽',
  backsimeq: '⋍',
  Backslash: '∖',
  Barv: '⫧',
  barvee: '⊽',
  barwed: '⌅',
  Barwed: '⌆',
  barwedge: '⌅',
  bbrk: '⎵',
  bbrktbrk: '⎶',
  bcong: '≌',
  Bcy: 'Б',
  bcy: 'б',
  bdquo: '„',
  becaus: '∵',
  because: '∵',
  Because: '∵',
  bemptyv: '⦰',
  bepsi: '϶',
  bernou: 'ℬ',
  Bernoullis: 'ℬ',
  Beta: 'Β',
  beta: 'β',
  beth: 'ℶ',
  between: '≬',
  Bfr: '𝔅',
  bfr: '𝔟',
  bigcap: '⋂',
  bigcirc: '◯',
  bigcup: '⋃',
  bigodot: '⨀',
  bigoplus: '⨁',
  bigotimes: '⨂',
  bigsqcup: '⨆',
  bigstar: '★',
  bigtriangledown: '▽',
  bigtriangleup: '△',
  biguplus: '⨄',
  bigvee: '⋁',
  bigwedge: '⋀',
  bkarow: '⤍',
  blacklozenge: '⧫',
  blacksquare: '▪',
  blacktriangle: '▴',
  blacktriangledown: '▾',
  blacktriangleleft: '◂',
  blacktriangleright: '▸',
  blank: '␣',
  blk12: '▒',
  blk14: '░',
  blk34: '▓',
  block: '█',
  bne: '=⃥',
  bnequiv: '≡⃥',
  bNot: '⫭',
  bnot: '⌐',
  Bopf: '𝔹',
  bopf: '𝕓',
  bot: '⊥',
  bottom: '⊥',
  bowtie: '⋈',
  boxbox: '⧉',
  boxdl: '┐',
  boxdL: '╕',
  boxDl: '╖',
  boxDL: '╗',
  boxdr: '┌',
  boxdR: '╒',
  boxDr: '╓',
  boxDR: '╔',
  boxh: '─',
  boxH: '═',
  boxhd: '┬',
  boxHd: '╤',
  boxhD: '╥',
  boxHD: '╦',
  boxhu: '┴',
  boxHu: '╧',
  boxhU: '╨',
  boxHU: '╩',
  boxminus: '⊟',
  boxplus: '⊞',
  boxtimes: '⊠',
  boxul: '┘',
  boxuL: '╛',
  boxUl: '╜',
  boxUL: '╝',
  boxur: '└',
  boxuR: '╘',
  boxUr: '╙',
  boxUR: '╚',
  boxv: '│',
  boxV: '║',
  boxvh: '┼',
  boxvH: '╪',
  boxVh: '╫',
  boxVH: '╬',
  boxvl: '┤',
  boxvL: '╡',
  boxVl: '╢',
  boxVL: '╣',
  boxvr: '├',
  boxvR: '╞',
  boxVr: '╟',
  boxVR: '╠',
  bprime: '‵',
  breve: '˘',
  Breve: '˘',
  brvbar: '¦',
  brvba: '¦',
  bscr: '𝒷',
  Bscr: 'ℬ',
  bsemi: '⁏',
  bsim: '∽',
  bsime: '⋍',
  bsolb: '⧅',
  bsol: '\\',
  bsolhsub: '⟈',
  bull: '•',
  bullet: '•',
  bump: '≎',
  bumpE: '⪮',
  bumpe: '≏',
  Bumpeq: '≎',
  bumpeq: '≏',
  Cacute: 'Ć',
  cacute: 'ć',
  capand: '⩄',
  capbrcup: '⩉',
  capcap: '⩋',
  cap: '∩',
  Cap: '⋒',
  capcup: '⩇',
  capdot: '⩀',
  CapitalDifferentialD: 'ⅅ',
  caps: '∩︀',
  caret: '⁁',
  caron: 'ˇ',
  Cayleys: 'ℭ',
  ccaps: '⩍',
  Ccaron: 'Č',
  ccaron: 'č',
  Ccedil: 'Ç',
  Ccedi: 'Ç',
  ccedil: 'ç',
  ccedi: 'ç',
  Ccirc: 'Ĉ',
  ccirc: 'ĉ',
  Cconint: '∰',
  ccups: '⩌',
  ccupssm: '⩐',
  Cdot: 'Ċ',
  cdot: 'ċ',
  cedil: '¸',
  cedi: '¸',
  Cedilla: '¸',
  cemptyv: '⦲',
  cent: '¢',
  cen: '¢',
  centerdot: '·',
  CenterDot: '·',
  cfr: '𝔠',
  Cfr: 'ℭ',
  CHcy: 'Ч',
  chcy: 'ч',
  check: '✓',
  checkmark: '✓',
  Chi: 'Χ',
  chi: 'χ',
  circ: 'ˆ',
  circeq: '≗',
  circlearrowleft: '↺',
  circlearrowright: '↻',
  circledast: '⊛',
  circledcirc: '⊚',
  circleddash: '⊝',
  CircleDot: '⊙',
  circledR: '®',
  circledS: 'Ⓢ',
  CircleMinus: '⊖',
  CirclePlus: '⊕',
  CircleTimes: '⊗',
  cir: '○',
  cirE: '⧃',
  cire: '≗',
  cirfnint: '⨐',
  cirmid: '⫯',
  cirscir: '⧂',
  ClockwiseContourIntegral: '∲',
  CloseCurlyDoubleQuote: '”',
  CloseCurlyQuote: '’',
  clubs: '♣',
  clubsuit: '♣',
  colon: ':',
  Colon: '∷',
  Colone: '⩴',
  colone: '≔',
  coloneq: '≔',
  comma: ',',
  commat: '@',
  comp: '∁',
  compfn: '∘',
  complement: '∁',
  complexes: 'ℂ',
  cong: '≅',
  congdot: '⩭',
  Congruent: '≡',
  conint: '∮',
  Conint: '∯',
  ContourIntegral: '∮',
  copf: '𝕔',
  Copf: 'ℂ',
  coprod: '∐',
  Coproduct: '∐',
  copy: '©',
  cop: '©',
  COPY: '©',
  COP: '©',
  copysr: '℗',
  CounterClockwiseContourIntegral: '∳',
  crarr: '↵',
  cross: '✗',
  Cross: '⨯',
  Cscr: '𝒞',
  cscr: '𝒸',
  csub: '⫏',
  csube: '⫑',
  csup: '⫐',
  csupe: '⫒',
  ctdot: '⋯',
  cudarrl: '⤸',
  cudarrr: '⤵',
  cuepr: '⋞',
  cuesc: '⋟',
  cularr: '↶',
  cularrp: '⤽',
  cupbrcap: '⩈',
  cupcap: '⩆',
  CupCap: '≍',
  cup: '∪',
  Cup: '⋓',
  cupcup: '⩊',
  cupdot: '⊍',
  cupor: '⩅',
  cups: '∪︀',
  curarr: '↷',
  curarrm: '⤼',
  curlyeqprec: '⋞',
  curlyeqsucc: '⋟',
  curlyvee: '⋎',
  curlywedge: '⋏',
  curren: '¤',
  curre: '¤',
  curvearrowleft: '↶',
  curvearrowright: '↷',
  cuvee: '⋎',
  cuwed: '⋏',
  cwconint: '∲',
  cwint: '∱',
  cylcty: '⌭',
  dagger: '†',
  Dagger: '‡',
  daleth: 'ℸ',
  darr: '↓',
  Darr: '↡',
  dArr: '⇓',
  dash: '‐',
  Dashv: '⫤',
  dashv: '⊣',
  dbkarow: '⤏',
  dblac: '˝',
  Dcaron: 'Ď',
  dcaron: 'ď',
  Dcy: 'Д',
  dcy: 'д',
  ddagger: '‡',
  ddarr: '⇊',
  DD: 'ⅅ',
  dd: 'ⅆ',
  DDotrahd: '⤑',
  ddotseq: '⩷',
  deg: '°',
  de: '°',
  Del: '∇',
  Delta: 'Δ',
  delta: 'δ',
  demptyv: '⦱',
  dfisht: '⥿',
  Dfr: '𝔇',
  dfr: '𝔡',
  dHar: '⥥',
  dharl: '⇃',
  dharr: '⇂',
  DiacriticalAcute: '´',
  DiacriticalDot: '˙',
  DiacriticalDoubleAcute: '˝',
  DiacriticalGrave: '`',
  DiacriticalTilde: '˜',
  diam: '⋄',
  diamond: '⋄',
  Diamond: '⋄',
  diamondsuit: '♦',
  diams: '♦',
  die: '¨',
  DifferentialD: 'ⅆ',
  digamma: 'ϝ',
  disin: '⋲',
  div: '÷',
  divide: '÷',
  divid: '÷',
  divideontimes: '⋇',
  divonx: '⋇',
  DJcy: 'Ђ',
  djcy: 'ђ',
  dlcorn: '⌞',
  dlcrop: '⌍',
  dollar: '$',
  Dopf: '𝔻',
  dopf: '𝕕',
  Dot: '¨',
  dot: '˙',
  DotDot: '⃜',
  doteq: '≐',
  doteqdot: '≑',
  DotEqual: '≐',
  dotminus: '∸',
  dotplus: '∔',
  dotsquare: '⊡',
  doublebarwedge: '⌆',
  DoubleContourIntegral: '∯',
  DoubleDot: '¨',
  DoubleDownArrow: '⇓',
  DoubleLeftArrow: '⇐',
  DoubleLeftRightArrow: '⇔',
  DoubleLeftTee: '⫤',
  DoubleLongLeftArrow: '⟸',
  DoubleLongLeftRightArrow: '⟺',
  DoubleLongRightArrow: '⟹',
  DoubleRightArrow: '⇒',
  DoubleRightTee: '⊨',
  DoubleUpArrow: '⇑',
  DoubleUpDownArrow: '⇕',
  DoubleVerticalBar: '∥',
  DownArrowBar: '⤓',
  downarrow: '↓',
  DownArrow: '↓',
  Downarrow: '⇓',
  DownArrowUpArrow: '⇵',
  DownBreve: '̑',
  downdownarrows: '⇊',
  downharpoonleft: '⇃',
  downharpoonright: '⇂',
  DownLeftRightVector: '⥐',
  DownLeftTeeVector: '⥞',
  DownLeftVectorBar: '⥖',
  DownLeftVector: '↽',
  DownRightTeeVector: '⥟',
  DownRightVectorBar: '⥗',
  DownRightVector: '⇁',
  DownTeeArrow: '↧',
  DownTee: '⊤',
  drbkarow: '⤐',
  drcorn: '⌟',
  drcrop: '⌌',
  Dscr: '𝒟',
  dscr: '𝒹',
  DScy: 'Ѕ',
  dscy: 'ѕ',
  dsol: '⧶',
  Dstrok: 'Đ',
  dstrok: 'đ',
  dtdot: '⋱',
  dtri: '▿',
  dtrif: '▾',
  duarr: '⇵',
  duhar: '⥯',
  dwangle: '⦦',
  DZcy: 'Џ',
  dzcy: 'џ',
  dzigrarr: '⟿',
  Eacute: 'É',
  Eacut: 'É',
  eacute: 'é',
  eacut: 'é',
  easter: '⩮',
  Ecaron: 'Ě',
  ecaron: 'ě',
  Ecirc: 'Ê',
  Ecir: 'Ê',
  ecirc: 'ê',
  ecir: 'ê'
}, _defineProperty(_htmlEntityTable, "ecir", '≖'), _defineProperty(_htmlEntityTable, "ecolon", '≕'), _defineProperty(_htmlEntityTable, "Ecy", 'Э'), _defineProperty(_htmlEntityTable, "ecy", 'э'), _defineProperty(_htmlEntityTable, "eDDot", '⩷'), _defineProperty(_htmlEntityTable, "Edot", 'Ė'), _defineProperty(_htmlEntityTable, "edot", 'ė'), _defineProperty(_htmlEntityTable, "eDot", '≑'), _defineProperty(_htmlEntityTable, "ee", 'ⅇ'), _defineProperty(_htmlEntityTable, "efDot", '≒'), _defineProperty(_htmlEntityTable, "Efr", '𝔈'), _defineProperty(_htmlEntityTable, "efr", '𝔢'), _defineProperty(_htmlEntityTable, "eg", '⪚'), _defineProperty(_htmlEntityTable, "Egrave", 'È'), _defineProperty(_htmlEntityTable, "Egrav", 'È'), _defineProperty(_htmlEntityTable, "egrave", 'è'), _defineProperty(_htmlEntityTable, "egrav", 'è'), _defineProperty(_htmlEntityTable, "egs", '⪖'), _defineProperty(_htmlEntityTable, "egsdot", '⪘'), _defineProperty(_htmlEntityTable, "el", '⪙'), _defineProperty(_htmlEntityTable, "Element", '∈'), _defineProperty(_htmlEntityTable, "elinters", '⏧'), _defineProperty(_htmlEntityTable, "ell", 'ℓ'), _defineProperty(_htmlEntityTable, "els", '⪕'), _defineProperty(_htmlEntityTable, "elsdot", '⪗'), _defineProperty(_htmlEntityTable, "Emacr", 'Ē'), _defineProperty(_htmlEntityTable, "emacr", 'ē'), _defineProperty(_htmlEntityTable, "empty", '∅'), _defineProperty(_htmlEntityTable, "emptyset", '∅'), _defineProperty(_htmlEntityTable, "EmptySmallSquare", '◻'), _defineProperty(_htmlEntityTable, "emptyv", '∅'), _defineProperty(_htmlEntityTable, "EmptyVerySmallSquare", '▫'), _defineProperty(_htmlEntityTable, "emsp13", ' '), _defineProperty(_htmlEntityTable, "emsp14", ' '), _defineProperty(_htmlEntityTable, "emsp", ' '), _defineProperty(_htmlEntityTable, "ENG", 'Ŋ'), _defineProperty(_htmlEntityTable, "eng", 'ŋ'), _defineProperty(_htmlEntityTable, "ensp", ' '), _defineProperty(_htmlEntityTable, "Eogon", 'Ę'), _defineProperty(_htmlEntityTable, "eogon", 'ę'), _defineProperty(_htmlEntityTable, "Eopf", '𝔼'), _defineProperty(_htmlEntityTable, "eopf", '𝕖'), _defineProperty(_htmlEntityTable, "epar", '⋕'), _defineProperty(_htmlEntityTable, "eparsl", '⧣'), _defineProperty(_htmlEntityTable, "eplus", '⩱'), _defineProperty(_htmlEntityTable, "epsi", 'ε'), _defineProperty(_htmlEntityTable, "Epsilon", 'Ε'), _defineProperty(_htmlEntityTable, "epsilon", 'ε'), _defineProperty(_htmlEntityTable, "epsiv", 'ϵ'), _defineProperty(_htmlEntityTable, "eqcirc", '≖'), _defineProperty(_htmlEntityTable, "eqcolon", '≕'), _defineProperty(_htmlEntityTable, "eqsim", '≂'), _defineProperty(_htmlEntityTable, "eqslantgtr", '⪖'), _defineProperty(_htmlEntityTable, "eqslantless", '⪕'), _defineProperty(_htmlEntityTable, "Equal", '⩵'), _defineProperty(_htmlEntityTable, "equals", '='), _defineProperty(_htmlEntityTable, "EqualTilde", '≂'), _defineProperty(_htmlEntityTable, "equest", '≟'), _defineProperty(_htmlEntityTable, "Equilibrium", '⇌'), _defineProperty(_htmlEntityTable, "equiv", '≡'), _defineProperty(_htmlEntityTable, "equivDD", '⩸'), _defineProperty(_htmlEntityTable, "eqvparsl", '⧥'), _defineProperty(_htmlEntityTable, "erarr", '⥱'), _defineProperty(_htmlEntityTable, "erDot", '≓'), _defineProperty(_htmlEntityTable, "escr", 'ℯ'), _defineProperty(_htmlEntityTable, "Escr", 'ℰ'), _defineProperty(_htmlEntityTable, "esdot", '≐'), _defineProperty(_htmlEntityTable, "Esim", '⩳'), _defineProperty(_htmlEntityTable, "esim", '≂'), _defineProperty(_htmlEntityTable, "Eta", 'Η'), _defineProperty(_htmlEntityTable, "eta", 'η'), _defineProperty(_htmlEntityTable, "ETH", 'Ð'), _defineProperty(_htmlEntityTable, "ET", 'Ð'), _defineProperty(_htmlEntityTable, "eth", 'ð'), _defineProperty(_htmlEntityTable, "et", 'ð'), _defineProperty(_htmlEntityTable, "Euml", 'Ë'), _defineProperty(_htmlEntityTable, "Eum", 'Ë'), _defineProperty(_htmlEntityTable, "euml", 'ë'), _defineProperty(_htmlEntityTable, "eum", 'ë'), _defineProperty(_htmlEntityTable, "euro", '€'), _defineProperty(_htmlEntityTable, "excl", '!'), _defineProperty(_htmlEntityTable, "exist", '∃'), _defineProperty(_htmlEntityTable, "Exists", '∃'), _defineProperty(_htmlEntityTable, "expectation", 'ℰ'), _defineProperty(_htmlEntityTable, "exponentiale", 'ⅇ'), _defineProperty(_htmlEntityTable, "ExponentialE", 'ⅇ'), _defineProperty(_htmlEntityTable, "fallingdotseq", '≒'), _defineProperty(_htmlEntityTable, "Fcy", 'Ф'), _defineProperty(_htmlEntityTable, "fcy", 'ф'), _defineProperty(_htmlEntityTable, "female", '♀'), _defineProperty(_htmlEntityTable, "ffilig", 'ﬃ'), _defineProperty(_htmlEntityTable, "fflig", 'ﬀ'), _defineProperty(_htmlEntityTable, "ffllig", 'ﬄ'), _defineProperty(_htmlEntityTable, "Ffr", '𝔉'), _defineProperty(_htmlEntityTable, "ffr", '𝔣'), _defineProperty(_htmlEntityTable, "filig", 'ﬁ'), _defineProperty(_htmlEntityTable, "FilledSmallSquare", '◼'), _defineProperty(_htmlEntityTable, "FilledVerySmallSquare", '▪'), _defineProperty(_htmlEntityTable, "fjlig", 'fj'), _defineProperty(_htmlEntityTable, "flat", '♭'), _defineProperty(_htmlEntityTable, "fllig", 'ﬂ'), _defineProperty(_htmlEntityTable, "fltns", '▱'), _defineProperty(_htmlEntityTable, "fnof", 'ƒ'), _defineProperty(_htmlEntityTable, "Fopf", '𝔽'), _defineProperty(_htmlEntityTable, "fopf", '𝕗'), _defineProperty(_htmlEntityTable, "forall", '∀'), _defineProperty(_htmlEntityTable, "ForAll", '∀'), _defineProperty(_htmlEntityTable, "fork", '⋔'), _defineProperty(_htmlEntityTable, "forkv", '⫙'), _defineProperty(_htmlEntityTable, "Fouriertrf", 'ℱ'), _defineProperty(_htmlEntityTable, "fpartint", '⨍'), _defineProperty(_htmlEntityTable, "frac12", '½'), _defineProperty(_htmlEntityTable, "frac1", '½'), _defineProperty(_htmlEntityTable, "frac13", '⅓'), _defineProperty(_htmlEntityTable, "frac14", '¼'), _defineProperty(_htmlEntityTable, "frac1", '¼'), _defineProperty(_htmlEntityTable, "frac15", '⅕'), _defineProperty(_htmlEntityTable, "frac16", '⅙'), _defineProperty(_htmlEntityTable, "frac18", '⅛'), _defineProperty(_htmlEntityTable, "frac23", '⅔'), _defineProperty(_htmlEntityTable, "frac25", '⅖'), _defineProperty(_htmlEntityTable, "frac34", '¾'), _defineProperty(_htmlEntityTable, "frac3", '¾'), _defineProperty(_htmlEntityTable, "frac35", '⅗'), _defineProperty(_htmlEntityTable, "frac38", '⅜'), _defineProperty(_htmlEntityTable, "frac45", '⅘'), _defineProperty(_htmlEntityTable, "frac56", '⅚'), _defineProperty(_htmlEntityTable, "frac58", '⅝'), _defineProperty(_htmlEntityTable, "frac78", '⅞'), _defineProperty(_htmlEntityTable, "frasl", '⁄'), _defineProperty(_htmlEntityTable, "frown", '⌢'), _defineProperty(_htmlEntityTable, "fscr", '𝒻'), _defineProperty(_htmlEntityTable, "Fscr", 'ℱ'), _defineProperty(_htmlEntityTable, "gacute", 'ǵ'), _defineProperty(_htmlEntityTable, "Gamma", 'Γ'), _defineProperty(_htmlEntityTable, "gamma", 'γ'), _defineProperty(_htmlEntityTable, "Gammad", 'Ϝ'), _defineProperty(_htmlEntityTable, "gammad", 'ϝ'), _defineProperty(_htmlEntityTable, "gap", '⪆'), _defineProperty(_htmlEntityTable, "Gbreve", 'Ğ'), _defineProperty(_htmlEntityTable, "gbreve", 'ğ'), _defineProperty(_htmlEntityTable, "Gcedil", 'Ģ'), _defineProperty(_htmlEntityTable, "Gcirc", 'Ĝ'), _defineProperty(_htmlEntityTable, "gcirc", 'ĝ'), _defineProperty(_htmlEntityTable, "Gcy", 'Г'), _defineProperty(_htmlEntityTable, "gcy", 'г'), _defineProperty(_htmlEntityTable, "Gdot", 'Ġ'), _defineProperty(_htmlEntityTable, "gdot", 'ġ'), _defineProperty(_htmlEntityTable, "ge", '≥'), _defineProperty(_htmlEntityTable, "gE", '≧'), _defineProperty(_htmlEntityTable, "gEl", '⪌'), _defineProperty(_htmlEntityTable, "gel", '⋛'), _defineProperty(_htmlEntityTable, "geq", '≥'), _defineProperty(_htmlEntityTable, "geqq", '≧'), _defineProperty(_htmlEntityTable, "geqslant", '⩾'), _defineProperty(_htmlEntityTable, "gescc", '⪩'), _defineProperty(_htmlEntityTable, "ges", '⩾'), _defineProperty(_htmlEntityTable, "gesdot", '⪀'), _defineProperty(_htmlEntityTable, "gesdoto", '⪂'), _defineProperty(_htmlEntityTable, "gesdotol", '⪄'), _defineProperty(_htmlEntityTable, "gesl", '⋛︀'), _defineProperty(_htmlEntityTable, "gesles", '⪔'), _defineProperty(_htmlEntityTable, "Gfr", '𝔊'), _defineProperty(_htmlEntityTable, "gfr", '𝔤'), _defineProperty(_htmlEntityTable, "gg", '≫'), _defineProperty(_htmlEntityTable, "Gg", '⋙'), _defineProperty(_htmlEntityTable, "ggg", '⋙'), _defineProperty(_htmlEntityTable, "gimel", 'ℷ'), _defineProperty(_htmlEntityTable, "GJcy", 'Ѓ'), _defineProperty(_htmlEntityTable, "gjcy", 'ѓ'), _defineProperty(_htmlEntityTable, "gla", '⪥'), _defineProperty(_htmlEntityTable, "gl", '≷'), _defineProperty(_htmlEntityTable, "glE", '⪒'), _defineProperty(_htmlEntityTable, "glj", '⪤'), _defineProperty(_htmlEntityTable, "gnap", '⪊'), _defineProperty(_htmlEntityTable, "gnapprox", '⪊'), _defineProperty(_htmlEntityTable, "gne", '⪈'), _defineProperty(_htmlEntityTable, "gnE", '≩'), _defineProperty(_htmlEntityTable, "gneq", '⪈'), _defineProperty(_htmlEntityTable, "gneqq", '≩'), _defineProperty(_htmlEntityTable, "gnsim", '⋧'), _defineProperty(_htmlEntityTable, "Gopf", '𝔾'), _defineProperty(_htmlEntityTable, "gopf", '𝕘'), _defineProperty(_htmlEntityTable, "grave", '`'), _defineProperty(_htmlEntityTable, "GreaterEqual", '≥'), _defineProperty(_htmlEntityTable, "GreaterEqualLess", '⋛'), _defineProperty(_htmlEntityTable, "GreaterFullEqual", '≧'), _defineProperty(_htmlEntityTable, "GreaterGreater", '⪢'), _defineProperty(_htmlEntityTable, "GreaterLess", '≷'), _defineProperty(_htmlEntityTable, "GreaterSlantEqual", '⩾'), _defineProperty(_htmlEntityTable, "GreaterTilde", '≳'), _defineProperty(_htmlEntityTable, "Gscr", '𝒢'), _defineProperty(_htmlEntityTable, "gscr", 'ℊ'), _defineProperty(_htmlEntityTable, "gsim", '≳'), _defineProperty(_htmlEntityTable, "gsime", '⪎'), _defineProperty(_htmlEntityTable, "gsiml", '⪐'), _defineProperty(_htmlEntityTable, "gtcc", '⪧'), _defineProperty(_htmlEntityTable, "gtcir", '⩺'), _defineProperty(_htmlEntityTable, "gt", '>'), _defineProperty(_htmlEntityTable, "g", '>'), _defineProperty(_htmlEntityTable, "GT", '>'), _defineProperty(_htmlEntityTable, "G", '>'), _defineProperty(_htmlEntityTable, "Gt", '≫'), _defineProperty(_htmlEntityTable, "gtdot", '⋗'), _defineProperty(_htmlEntityTable, "gtlPar", '⦕'), _defineProperty(_htmlEntityTable, "gtquest", '⩼'), _defineProperty(_htmlEntityTable, "gtrapprox", '⪆'), _defineProperty(_htmlEntityTable, "gtrarr", '⥸'), _defineProperty(_htmlEntityTable, "gtrdot", '⋗'), _defineProperty(_htmlEntityTable, "gtreqless", '⋛'), _defineProperty(_htmlEntityTable, "gtreqqless", '⪌'), _defineProperty(_htmlEntityTable, "gtrless", '≷'), _defineProperty(_htmlEntityTable, "gtrsim", '≳'), _defineProperty(_htmlEntityTable, "gvertneqq", '≩︀'), _defineProperty(_htmlEntityTable, "gvnE", '≩︀'), _defineProperty(_htmlEntityTable, "Hacek", 'ˇ'), _defineProperty(_htmlEntityTable, "hairsp", ' '), _defineProperty(_htmlEntityTable, "half", '½'), _defineProperty(_htmlEntityTable, "hamilt", 'ℋ'), _defineProperty(_htmlEntityTable, "HARDcy", 'Ъ'), _defineProperty(_htmlEntityTable, "hardcy", 'ъ'), _defineProperty(_htmlEntityTable, "harrcir", '⥈'), _defineProperty(_htmlEntityTable, "harr", '↔'), _defineProperty(_htmlEntityTable, "hArr", '⇔'), _defineProperty(_htmlEntityTable, "harrw", '↭'), _defineProperty(_htmlEntityTable, "Hat", '^'), _defineProperty(_htmlEntityTable, "hbar", 'ℏ'), _defineProperty(_htmlEntityTable, "Hcirc", 'Ĥ'), _defineProperty(_htmlEntityTable, "hcirc", 'ĥ'), _defineProperty(_htmlEntityTable, "hearts", '♥'), _defineProperty(_htmlEntityTable, "heartsuit", '♥'), _defineProperty(_htmlEntityTable, "hellip", '…'), _defineProperty(_htmlEntityTable, "hercon", '⊹'), _defineProperty(_htmlEntityTable, "hfr", '𝔥'), _defineProperty(_htmlEntityTable, "Hfr", 'ℌ'), _defineProperty(_htmlEntityTable, "HilbertSpace", 'ℋ'), _defineProperty(_htmlEntityTable, "hksearow", '⤥'), _defineProperty(_htmlEntityTable, "hkswarow", '⤦'), _defineProperty(_htmlEntityTable, "hoarr", '⇿'), _defineProperty(_htmlEntityTable, "homtht", '∻'), _defineProperty(_htmlEntityTable, "hookleftarrow", '↩'), _defineProperty(_htmlEntityTable, "hookrightarrow", '↪'), _defineProperty(_htmlEntityTable, "hopf", '𝕙'), _defineProperty(_htmlEntityTable, "Hopf", 'ℍ'), _defineProperty(_htmlEntityTable, "horbar", '―'), _defineProperty(_htmlEntityTable, "HorizontalLine", '─'), _defineProperty(_htmlEntityTable, "hscr", '𝒽'), _defineProperty(_htmlEntityTable, "Hscr", 'ℋ'), _defineProperty(_htmlEntityTable, "hslash", 'ℏ'), _defineProperty(_htmlEntityTable, "Hstrok", 'Ħ'), _defineProperty(_htmlEntityTable, "hstrok", 'ħ'), _defineProperty(_htmlEntityTable, "HumpDownHump", '≎'), _defineProperty(_htmlEntityTable, "HumpEqual", '≏'), _defineProperty(_htmlEntityTable, "hybull", '⁃'), _defineProperty(_htmlEntityTable, "hyphen", '‐'), _defineProperty(_htmlEntityTable, "Iacute", 'Í'), _defineProperty(_htmlEntityTable, "Iacut", 'Í'), _defineProperty(_htmlEntityTable, "iacute", 'í'), _defineProperty(_htmlEntityTable, "iacut", 'í'), _defineProperty(_htmlEntityTable, "ic", '⁣'), _defineProperty(_htmlEntityTable, "Icirc", 'Î'), _defineProperty(_htmlEntityTable, "Icir", 'Î'), _defineProperty(_htmlEntityTable, "icirc", 'î'), _defineProperty(_htmlEntityTable, "icir", 'î'), _defineProperty(_htmlEntityTable, "Icy", 'И'), _defineProperty(_htmlEntityTable, "icy", 'и'), _defineProperty(_htmlEntityTable, "Idot", 'İ'), _defineProperty(_htmlEntityTable, "IEcy", 'Е'), _defineProperty(_htmlEntityTable, "iecy", 'е'), _defineProperty(_htmlEntityTable, "iexcl", '¡'), _defineProperty(_htmlEntityTable, "iexc", '¡'), _defineProperty(_htmlEntityTable, "iff", '⇔'), _defineProperty(_htmlEntityTable, "ifr", '𝔦'), _defineProperty(_htmlEntityTable, "Ifr", 'ℑ'), _defineProperty(_htmlEntityTable, "Igrave", 'Ì'), _defineProperty(_htmlEntityTable, "Igrav", 'Ì'), _defineProperty(_htmlEntityTable, "igrave", 'ì'), _defineProperty(_htmlEntityTable, "igrav", 'ì'), _defineProperty(_htmlEntityTable, "ii", 'ⅈ'), _defineProperty(_htmlEntityTable, "iiiint", '⨌'), _defineProperty(_htmlEntityTable, "iiint", '∭'), _defineProperty(_htmlEntityTable, "iinfin", '⧜'), _defineProperty(_htmlEntityTable, "iiota", '℩'), _defineProperty(_htmlEntityTable, "IJlig", 'Ĳ'), _defineProperty(_htmlEntityTable, "ijlig", 'ĳ'), _defineProperty(_htmlEntityTable, "Imacr", 'Ī'), _defineProperty(_htmlEntityTable, "imacr", 'ī'), _defineProperty(_htmlEntityTable, "image", 'ℑ'), _defineProperty(_htmlEntityTable, "ImaginaryI", 'ⅈ'), _defineProperty(_htmlEntityTable, "imagline", 'ℐ'), _defineProperty(_htmlEntityTable, "imagpart", 'ℑ'), _defineProperty(_htmlEntityTable, "imath", 'ı'), _defineProperty(_htmlEntityTable, "Im", 'ℑ'), _defineProperty(_htmlEntityTable, "imof", '⊷'), _defineProperty(_htmlEntityTable, "imped", 'Ƶ'), _defineProperty(_htmlEntityTable, "Implies", '⇒'), _defineProperty(_htmlEntityTable, "incare", '℅'), _defineProperty(_htmlEntityTable, "in", '∈'), _defineProperty(_htmlEntityTable, "infin", '∞'), _defineProperty(_htmlEntityTable, "infintie", '⧝'), _defineProperty(_htmlEntityTable, "inodot", 'ı'), _defineProperty(_htmlEntityTable, "intcal", '⊺'), _defineProperty(_htmlEntityTable, "int", '∫'), _defineProperty(_htmlEntityTable, "Int", '∬'), _defineProperty(_htmlEntityTable, "integers", 'ℤ'), _defineProperty(_htmlEntityTable, "Integral", '∫'), _defineProperty(_htmlEntityTable, "intercal", '⊺'), _defineProperty(_htmlEntityTable, "Intersection", '⋂'), _defineProperty(_htmlEntityTable, "intlarhk", '⨗'), _defineProperty(_htmlEntityTable, "intprod", '⨼'), _defineProperty(_htmlEntityTable, "InvisibleComma", '⁣'), _defineProperty(_htmlEntityTable, "InvisibleTimes", '⁢'), _defineProperty(_htmlEntityTable, "IOcy", 'Ё'), _defineProperty(_htmlEntityTable, "iocy", 'ё'), _defineProperty(_htmlEntityTable, "Iogon", 'Į'), _defineProperty(_htmlEntityTable, "iogon", 'į'), _defineProperty(_htmlEntityTable, "Iopf", '𝕀'), _defineProperty(_htmlEntityTable, "iopf", '𝕚'), _defineProperty(_htmlEntityTable, "Iota", 'Ι'), _defineProperty(_htmlEntityTable, "iota", 'ι'), _defineProperty(_htmlEntityTable, "iprod", '⨼'), _defineProperty(_htmlEntityTable, "iquest", '¿'), _defineProperty(_htmlEntityTable, "iques", '¿'), _defineProperty(_htmlEntityTable, "iscr", '𝒾'), _defineProperty(_htmlEntityTable, "Iscr", 'ℐ'), _defineProperty(_htmlEntityTable, "isin", '∈'), _defineProperty(_htmlEntityTable, "isindot", '⋵'), _defineProperty(_htmlEntityTable, "isinE", '⋹'), _defineProperty(_htmlEntityTable, "isins", '⋴'), _defineProperty(_htmlEntityTable, "isinsv", '⋳'), _defineProperty(_htmlEntityTable, "isinv", '∈'), _defineProperty(_htmlEntityTable, "it", '⁢'), _defineProperty(_htmlEntityTable, "Itilde", 'Ĩ'), _defineProperty(_htmlEntityTable, "itilde", 'ĩ'), _defineProperty(_htmlEntityTable, "Iukcy", 'І'), _defineProperty(_htmlEntityTable, "iukcy", 'і'), _defineProperty(_htmlEntityTable, "Iuml", 'Ï'), _defineProperty(_htmlEntityTable, "Ium", 'Ï'), _defineProperty(_htmlEntityTable, "iuml", 'ï'), _defineProperty(_htmlEntityTable, "ium", 'ï'), _defineProperty(_htmlEntityTable, "Jcirc", 'Ĵ'), _defineProperty(_htmlEntityTable, "jcirc", 'ĵ'), _defineProperty(_htmlEntityTable, "Jcy", 'Й'), _defineProperty(_htmlEntityTable, "jcy", 'й'), _defineProperty(_htmlEntityTable, "Jfr", '𝔍'), _defineProperty(_htmlEntityTable, "jfr", '𝔧'), _defineProperty(_htmlEntityTable, "jmath", 'ȷ'), _defineProperty(_htmlEntityTable, "Jopf", '𝕁'), _defineProperty(_htmlEntityTable, "jopf", '𝕛'), _defineProperty(_htmlEntityTable, "Jscr", '𝒥'), _defineProperty(_htmlEntityTable, "jscr", '𝒿'), _defineProperty(_htmlEntityTable, "Jsercy", 'Ј'), _defineProperty(_htmlEntityTable, "jsercy", 'ј'), _defineProperty(_htmlEntityTable, "Jukcy", 'Є'), _defineProperty(_htmlEntityTable, "jukcy", 'є'), _defineProperty(_htmlEntityTable, "Kappa", 'Κ'), _defineProperty(_htmlEntityTable, "kappa", 'κ'), _defineProperty(_htmlEntityTable, "kappav", 'ϰ'), _defineProperty(_htmlEntityTable, "Kcedil", 'Ķ'), _defineProperty(_htmlEntityTable, "kcedil", 'ķ'), _defineProperty(_htmlEntityTable, "Kcy", 'К'), _defineProperty(_htmlEntityTable, "kcy", 'к'), _defineProperty(_htmlEntityTable, "Kfr", '𝔎'), _defineProperty(_htmlEntityTable, "kfr", '𝔨'), _defineProperty(_htmlEntityTable, "kgreen", 'ĸ'), _defineProperty(_htmlEntityTable, "KHcy", 'Х'), _defineProperty(_htmlEntityTable, "khcy", 'х'), _defineProperty(_htmlEntityTable, "KJcy", 'Ќ'), _defineProperty(_htmlEntityTable, "kjcy", 'ќ'), _defineProperty(_htmlEntityTable, "Kopf", '𝕂'), _defineProperty(_htmlEntityTable, "kopf", '𝕜'), _defineProperty(_htmlEntityTable, "Kscr", '𝒦'), _defineProperty(_htmlEntityTable, "kscr", '𝓀'), _defineProperty(_htmlEntityTable, "lAarr", '⇚'), _defineProperty(_htmlEntityTable, "Lacute", 'Ĺ'), _defineProperty(_htmlEntityTable, "lacute", 'ĺ'), _defineProperty(_htmlEntityTable, "laemptyv", '⦴'), _defineProperty(_htmlEntityTable, "lagran", 'ℒ'), _defineProperty(_htmlEntityTable, "Lambda", 'Λ'), _defineProperty(_htmlEntityTable, "lambda", 'λ'), _defineProperty(_htmlEntityTable, "lang", '⟨'), _defineProperty(_htmlEntityTable, "Lang", '⟪'), _defineProperty(_htmlEntityTable, "langd", '⦑'), _defineProperty(_htmlEntityTable, "langle", '⟨'), _defineProperty(_htmlEntityTable, "lap", '⪅'), _defineProperty(_htmlEntityTable, "Laplacetrf", 'ℒ'), _defineProperty(_htmlEntityTable, "laquo", '«'), _defineProperty(_htmlEntityTable, "laqu", '«'), _defineProperty(_htmlEntityTable, "larrb", '⇤'), _defineProperty(_htmlEntityTable, "larrbfs", '⤟'), _defineProperty(_htmlEntityTable, "larr", '←'), _defineProperty(_htmlEntityTable, "Larr", '↞'), _defineProperty(_htmlEntityTable, "lArr", '⇐'), _defineProperty(_htmlEntityTable, "larrfs", '⤝'), _defineProperty(_htmlEntityTable, "larrhk", '↩'), _defineProperty(_htmlEntityTable, "larrlp", '↫'), _defineProperty(_htmlEntityTable, "larrpl", '⤹'), _defineProperty(_htmlEntityTable, "larrsim", '⥳'), _defineProperty(_htmlEntityTable, "larrtl", '↢'), _defineProperty(_htmlEntityTable, "latail", '⤙'), _defineProperty(_htmlEntityTable, "lAtail", '⤛'), _defineProperty(_htmlEntityTable, "lat", '⪫'), _defineProperty(_htmlEntityTable, "late", '⪭'), _defineProperty(_htmlEntityTable, "lates", '⪭︀'), _defineProperty(_htmlEntityTable, "lbarr", '⤌'), _defineProperty(_htmlEntityTable, "lBarr", '⤎'), _defineProperty(_htmlEntityTable, "lbbrk", '❲'), _defineProperty(_htmlEntityTable, "lbrace", '{'), _defineProperty(_htmlEntityTable, "lbrack", '['), _defineProperty(_htmlEntityTable, "lbrke", '⦋'), _defineProperty(_htmlEntityTable, "lbrksld", '⦏'), _defineProperty(_htmlEntityTable, "lbrkslu", '⦍'), _defineProperty(_htmlEntityTable, "Lcaron", 'Ľ'), _defineProperty(_htmlEntityTable, "lcaron", 'ľ'), _defineProperty(_htmlEntityTable, "Lcedil", 'Ļ'), _defineProperty(_htmlEntityTable, "lcedil", 'ļ'), _defineProperty(_htmlEntityTable, "lceil", '⌈'), _defineProperty(_htmlEntityTable, "lcub", '{'), _defineProperty(_htmlEntityTable, "Lcy", 'Л'), _defineProperty(_htmlEntityTable, "lcy", 'л'), _defineProperty(_htmlEntityTable, "ldca", '⤶'), _defineProperty(_htmlEntityTable, "ldquo", '“'), _defineProperty(_htmlEntityTable, "ldquor", '„'), _defineProperty(_htmlEntityTable, "ldrdhar", '⥧'), _defineProperty(_htmlEntityTable, "ldrushar", '⥋'), _defineProperty(_htmlEntityTable, "ldsh", '↲'), _defineProperty(_htmlEntityTable, "le", '≤'), _defineProperty(_htmlEntityTable, "lE", '≦'), _defineProperty(_htmlEntityTable, "LeftAngleBracket", '⟨'), _defineProperty(_htmlEntityTable, "LeftArrowBar", '⇤'), _defineProperty(_htmlEntityTable, "leftarrow", '←'), _defineProperty(_htmlEntityTable, "LeftArrow", '←'), _defineProperty(_htmlEntityTable, "Leftarrow", '⇐'), _defineProperty(_htmlEntityTable, "LeftArrowRightArrow", '⇆'), _defineProperty(_htmlEntityTable, "leftarrowtail", '↢'), _defineProperty(_htmlEntityTable, "LeftCeiling", '⌈'), _defineProperty(_htmlEntityTable, "LeftDoubleBracket", '⟦'), _defineProperty(_htmlEntityTable, "LeftDownTeeVector", '⥡'), _defineProperty(_htmlEntityTable, "LeftDownVectorBar", '⥙'), _defineProperty(_htmlEntityTable, "LeftDownVector", '⇃'), _defineProperty(_htmlEntityTable, "LeftFloor", '⌊'), _defineProperty(_htmlEntityTable, "leftharpoondown", '↽'), _defineProperty(_htmlEntityTable, "leftharpoonup", '↼'), _defineProperty(_htmlEntityTable, "leftleftarrows", '⇇'), _defineProperty(_htmlEntityTable, "leftrightarrow", '↔'), _defineProperty(_htmlEntityTable, "LeftRightArrow", '↔'), _defineProperty(_htmlEntityTable, "Leftrightarrow", '⇔'), _defineProperty(_htmlEntityTable, "leftrightarrows", '⇆'), _defineProperty(_htmlEntityTable, "leftrightharpoons", '⇋'), _defineProperty(_htmlEntityTable, "leftrightsquigarrow", '↭'), _defineProperty(_htmlEntityTable, "LeftRightVector", '⥎'), _defineProperty(_htmlEntityTable, "LeftTeeArrow", '↤'), _defineProperty(_htmlEntityTable, "LeftTee", '⊣'), _defineProperty(_htmlEntityTable, "LeftTeeVector", '⥚'), _defineProperty(_htmlEntityTable, "leftthreetimes", '⋋'), _defineProperty(_htmlEntityTable, "LeftTriangleBar", '⧏'), _defineProperty(_htmlEntityTable, "LeftTriangle", '⊲'), _defineProperty(_htmlEntityTable, "LeftTriangleEqual", '⊴'), _defineProperty(_htmlEntityTable, "LeftUpDownVector", '⥑'), _defineProperty(_htmlEntityTable, "LeftUpTeeVector", '⥠'), _defineProperty(_htmlEntityTable, "LeftUpVectorBar", '⥘'), _defineProperty(_htmlEntityTable, "LeftUpVector", '↿'), _defineProperty(_htmlEntityTable, "LeftVectorBar", '⥒'), _defineProperty(_htmlEntityTable, "LeftVector", '↼'), _defineProperty(_htmlEntityTable, "lEg", '⪋'), _defineProperty(_htmlEntityTable, "leg", '⋚'), _defineProperty(_htmlEntityTable, "leq", '≤'), _defineProperty(_htmlEntityTable, "leqq", '≦'), _defineProperty(_htmlEntityTable, "leqslant", '⩽'), _defineProperty(_htmlEntityTable, "lescc", '⪨'), _defineProperty(_htmlEntityTable, "les", '⩽'), _defineProperty(_htmlEntityTable, "lesdot", '⩿'), _defineProperty(_htmlEntityTable, "lesdoto", '⪁'), _defineProperty(_htmlEntityTable, "lesdotor", '⪃'), _defineProperty(_htmlEntityTable, "lesg", '⋚︀'), _defineProperty(_htmlEntityTable, "lesges", '⪓'), _defineProperty(_htmlEntityTable, "lessapprox", '⪅'), _defineProperty(_htmlEntityTable, "lessdot", '⋖'), _defineProperty(_htmlEntityTable, "lesseqgtr", '⋚'), _defineProperty(_htmlEntityTable, "lesseqqgtr", '⪋'), _defineProperty(_htmlEntityTable, "LessEqualGreater", '⋚'), _defineProperty(_htmlEntityTable, "LessFullEqual", '≦'), _defineProperty(_htmlEntityTable, "LessGreater", '≶'), _defineProperty(_htmlEntityTable, "lessgtr", '≶'), _defineProperty(_htmlEntityTable, "LessLess", '⪡'), _defineProperty(_htmlEntityTable, "lesssim", '≲'), _defineProperty(_htmlEntityTable, "LessSlantEqual", '⩽'), _defineProperty(_htmlEntityTable, "LessTilde", '≲'), _defineProperty(_htmlEntityTable, "lfisht", '⥼'), _defineProperty(_htmlEntityTable, "lfloor", '⌊'), _defineProperty(_htmlEntityTable, "Lfr", '𝔏'), _defineProperty(_htmlEntityTable, "lfr", '𝔩'), _defineProperty(_htmlEntityTable, "lg", '≶'), _defineProperty(_htmlEntityTable, "lgE", '⪑'), _defineProperty(_htmlEntityTable, "lHar", '⥢'), _defineProperty(_htmlEntityTable, "lhard", '↽'), _defineProperty(_htmlEntityTable, "lharu", '↼'), _defineProperty(_htmlEntityTable, "lharul", '⥪'), _defineProperty(_htmlEntityTable, "lhblk", '▄'), _defineProperty(_htmlEntityTable, "LJcy", 'Љ'), _defineProperty(_htmlEntityTable, "ljcy", 'љ'), _defineProperty(_htmlEntityTable, "llarr", '⇇'), _defineProperty(_htmlEntityTable, "ll", '≪'), _defineProperty(_htmlEntityTable, "Ll", '⋘'), _defineProperty(_htmlEntityTable, "llcorner", '⌞'), _defineProperty(_htmlEntityTable, "Lleftarrow", '⇚'), _defineProperty(_htmlEntityTable, "llhard", '⥫'), _defineProperty(_htmlEntityTable, "lltri", '◺'), _defineProperty(_htmlEntityTable, "Lmidot", 'Ŀ'), _defineProperty(_htmlEntityTable, "lmidot", 'ŀ'), _defineProperty(_htmlEntityTable, "lmoustache", '⎰'), _defineProperty(_htmlEntityTable, "lmoust", '⎰'), _defineProperty(_htmlEntityTable, "lnap", '⪉'), _defineProperty(_htmlEntityTable, "lnapprox", '⪉'), _defineProperty(_htmlEntityTable, "lne", '⪇'), _defineProperty(_htmlEntityTable, "lnE", '≨'), _defineProperty(_htmlEntityTable, "lneq", '⪇'), _defineProperty(_htmlEntityTable, "lneqq", '≨'), _defineProperty(_htmlEntityTable, "lnsim", '⋦'), _defineProperty(_htmlEntityTable, "loang", '⟬'), _defineProperty(_htmlEntityTable, "loarr", '⇽'), _defineProperty(_htmlEntityTable, "lobrk", '⟦'), _defineProperty(_htmlEntityTable, "longleftarrow", '⟵'), _defineProperty(_htmlEntityTable, "LongLeftArrow", '⟵'), _defineProperty(_htmlEntityTable, "Longleftarrow", '⟸'), _defineProperty(_htmlEntityTable, "longleftrightarrow", '⟷'), _defineProperty(_htmlEntityTable, "LongLeftRightArrow", '⟷'), _defineProperty(_htmlEntityTable, "Longleftrightarrow", '⟺'), _defineProperty(_htmlEntityTable, "longmapsto", '⟼'), _defineProperty(_htmlEntityTable, "longrightarrow", '⟶'), _defineProperty(_htmlEntityTable, "LongRightArrow", '⟶'), _defineProperty(_htmlEntityTable, "Longrightarrow", '⟹'), _defineProperty(_htmlEntityTable, "looparrowleft", '↫'), _defineProperty(_htmlEntityTable, "looparrowright", '↬'), _defineProperty(_htmlEntityTable, "lopar", '⦅'), _defineProperty(_htmlEntityTable, "Lopf", '𝕃'), _defineProperty(_htmlEntityTable, "lopf", '𝕝'), _defineProperty(_htmlEntityTable, "loplus", '⨭'), _defineProperty(_htmlEntityTable, "lotimes", '⨴'), _defineProperty(_htmlEntityTable, "lowast", '∗'), _defineProperty(_htmlEntityTable, "lowbar", '_'), _defineProperty(_htmlEntityTable, "LowerLeftArrow", '↙'), _defineProperty(_htmlEntityTable, "LowerRightArrow", '↘'), _defineProperty(_htmlEntityTable, "loz", '◊'), _defineProperty(_htmlEntityTable, "lozenge", '◊'), _defineProperty(_htmlEntityTable, "lozf", '⧫'), _defineProperty(_htmlEntityTable, "lpar", '('), _defineProperty(_htmlEntityTable, "lparlt", '⦓'), _defineProperty(_htmlEntityTable, "lrarr", '⇆'), _defineProperty(_htmlEntityTable, "lrcorner", '⌟'), _defineProperty(_htmlEntityTable, "lrhar", '⇋'), _defineProperty(_htmlEntityTable, "lrhard", '⥭'), _defineProperty(_htmlEntityTable, "lrm", '‎'), _defineProperty(_htmlEntityTable, "lrtri", '⊿'), _defineProperty(_htmlEntityTable, "lsaquo", '‹'), _defineProperty(_htmlEntityTable, "lscr", '𝓁'), _defineProperty(_htmlEntityTable, "Lscr", 'ℒ'), _defineProperty(_htmlEntityTable, "lsh", '↰'), _defineProperty(_htmlEntityTable, "Lsh", '↰'), _defineProperty(_htmlEntityTable, "lsim", '≲'), _defineProperty(_htmlEntityTable, "lsime", '⪍'), _defineProperty(_htmlEntityTable, "lsimg", '⪏'), _defineProperty(_htmlEntityTable, "lsqb", '['), _defineProperty(_htmlEntityTable, "lsquo", '‘'), _defineProperty(_htmlEntityTable, "lsquor", '‚'), _defineProperty(_htmlEntityTable, "Lstrok", 'Ł'), _defineProperty(_htmlEntityTable, "lstrok", 'ł'), _defineProperty(_htmlEntityTable, "ltcc", '⪦'), _defineProperty(_htmlEntityTable, "ltcir", '⩹'), _defineProperty(_htmlEntityTable, "lt", '<'), _defineProperty(_htmlEntityTable, "l", '<'), _defineProperty(_htmlEntityTable, "LT", '<'), _defineProperty(_htmlEntityTable, "L", '<'), _defineProperty(_htmlEntityTable, "Lt", '≪'), _defineProperty(_htmlEntityTable, "ltdot", '⋖'), _defineProperty(_htmlEntityTable, "lthree", '⋋'), _defineProperty(_htmlEntityTable, "ltimes", '⋉'), _defineProperty(_htmlEntityTable, "ltlarr", '⥶'), _defineProperty(_htmlEntityTable, "ltquest", '⩻'), _defineProperty(_htmlEntityTable, "ltri", '◃'), _defineProperty(_htmlEntityTable, "ltrie", '⊴'), _defineProperty(_htmlEntityTable, "ltrif", '◂'), _defineProperty(_htmlEntityTable, "ltrPar", '⦖'), _defineProperty(_htmlEntityTable, "lurdshar", '⥊'), _defineProperty(_htmlEntityTable, "luruhar", '⥦'), _defineProperty(_htmlEntityTable, "lvertneqq", '≨︀'), _defineProperty(_htmlEntityTable, "lvnE", '≨︀'), _defineProperty(_htmlEntityTable, "macr", '¯'), _defineProperty(_htmlEntityTable, "mac", '¯'), _defineProperty(_htmlEntityTable, "male", '♂'), _defineProperty(_htmlEntityTable, "malt", '✠'), _defineProperty(_htmlEntityTable, "maltese", '✠'), _defineProperty(_htmlEntityTable, "Map", '⤅'), _defineProperty(_htmlEntityTable, "map", '↦'), _defineProperty(_htmlEntityTable, "mapsto", '↦'), _defineProperty(_htmlEntityTable, "mapstodown", '↧'), _defineProperty(_htmlEntityTable, "mapstoleft", '↤'), _defineProperty(_htmlEntityTable, "mapstoup", '↥'), _defineProperty(_htmlEntityTable, "marker", '▮'), _defineProperty(_htmlEntityTable, "mcomma", '⨩'), _defineProperty(_htmlEntityTable, "Mcy", 'М'), _defineProperty(_htmlEntityTable, "mcy", 'м'), _defineProperty(_htmlEntityTable, "mdash", '—'), _defineProperty(_htmlEntityTable, "mDDot", '∺'), _defineProperty(_htmlEntityTable, "measuredangle", '∡'), _defineProperty(_htmlEntityTable, "MediumSpace", ' '), _defineProperty(_htmlEntityTable, "Mellintrf", 'ℳ'), _defineProperty(_htmlEntityTable, "Mfr", '𝔐'), _defineProperty(_htmlEntityTable, "mfr", '𝔪'), _defineProperty(_htmlEntityTable, "mho", '℧'), _defineProperty(_htmlEntityTable, "micro", 'µ'), _defineProperty(_htmlEntityTable, "micr", 'µ'), _defineProperty(_htmlEntityTable, "midast", '*'), _defineProperty(_htmlEntityTable, "midcir", '⫰'), _defineProperty(_htmlEntityTable, "mid", '∣'), _defineProperty(_htmlEntityTable, "middot", '·'), _defineProperty(_htmlEntityTable, "middo", '·'), _defineProperty(_htmlEntityTable, "minusb", '⊟'), _defineProperty(_htmlEntityTable, "minus", '−'), _defineProperty(_htmlEntityTable, "minusd", '∸'), _defineProperty(_htmlEntityTable, "minusdu", '⨪'), _defineProperty(_htmlEntityTable, "MinusPlus", '∓'), _defineProperty(_htmlEntityTable, "mlcp", '⫛'), _defineProperty(_htmlEntityTable, "mldr", '…'), _defineProperty(_htmlEntityTable, "mnplus", '∓'), _defineProperty(_htmlEntityTable, "models", '⊧'), _defineProperty(_htmlEntityTable, "Mopf", '𝕄'), _defineProperty(_htmlEntityTable, "mopf", '𝕞'), _defineProperty(_htmlEntityTable, "mp", '∓'), _defineProperty(_htmlEntityTable, "mscr", '𝓂'), _defineProperty(_htmlEntityTable, "Mscr", 'ℳ'), _defineProperty(_htmlEntityTable, "mstpos", '∾'), _defineProperty(_htmlEntityTable, "Mu", 'Μ'), _defineProperty(_htmlEntityTable, "mu", 'μ'), _defineProperty(_htmlEntityTable, "multimap", '⊸'), _defineProperty(_htmlEntityTable, "mumap", '⊸'), _defineProperty(_htmlEntityTable, "nabla", '∇'), _defineProperty(_htmlEntityTable, "Nacute", 'Ń'), _defineProperty(_htmlEntityTable, "nacute", 'ń'), _defineProperty(_htmlEntityTable, "nang", '∠⃒'), _defineProperty(_htmlEntityTable, "nap", '≉'), _defineProperty(_htmlEntityTable, "napE", '⩰̸'), _defineProperty(_htmlEntityTable, "napid", '≋̸'), _defineProperty(_htmlEntityTable, "napos", 'ŉ'), _defineProperty(_htmlEntityTable, "napprox", '≉'), _defineProperty(_htmlEntityTable, "natural", '♮'), _defineProperty(_htmlEntityTable, "naturals", 'ℕ'), _defineProperty(_htmlEntityTable, "natur", '♮'), _defineProperty(_htmlEntityTable, "nbsp", ' '), _defineProperty(_htmlEntityTable, "nbs", ' '), _defineProperty(_htmlEntityTable, "nbump", '≎̸'), _defineProperty(_htmlEntityTable, "nbumpe", '≏̸'), _defineProperty(_htmlEntityTable, "ncap", '⩃'), _defineProperty(_htmlEntityTable, "Ncaron", 'Ň'), _defineProperty(_htmlEntityTable, "ncaron", 'ň'), _defineProperty(_htmlEntityTable, "Ncedil", 'Ņ'), _defineProperty(_htmlEntityTable, "ncedil", 'ņ'), _defineProperty(_htmlEntityTable, "ncong", '≇'), _defineProperty(_htmlEntityTable, "ncongdot", '⩭̸'), _defineProperty(_htmlEntityTable, "ncup", '⩂'), _defineProperty(_htmlEntityTable, "Ncy", 'Н'), _defineProperty(_htmlEntityTable, "ncy", 'н'), _defineProperty(_htmlEntityTable, "ndash", '–'), _defineProperty(_htmlEntityTable, "nearhk", '⤤'), _defineProperty(_htmlEntityTable, "nearr", '↗'), _defineProperty(_htmlEntityTable, "neArr", '⇗'), _defineProperty(_htmlEntityTable, "nearrow", '↗'), _defineProperty(_htmlEntityTable, "ne", '≠'), _defineProperty(_htmlEntityTable, "nedot", '≐̸'), _defineProperty(_htmlEntityTable, "NegativeMediumSpace", '​'), _defineProperty(_htmlEntityTable, "NegativeThickSpace", '​'), _defineProperty(_htmlEntityTable, "NegativeThinSpace", '​'), _defineProperty(_htmlEntityTable, "NegativeVeryThinSpace", '​'), _defineProperty(_htmlEntityTable, "nequiv", '≢'), _defineProperty(_htmlEntityTable, "nesear", '⤨'), _defineProperty(_htmlEntityTable, "nesim", '≂̸'), _defineProperty(_htmlEntityTable, "NestedGreaterGreater", '≫'), _defineProperty(_htmlEntityTable, "NestedLessLess", '≪'), _defineProperty(_htmlEntityTable, "NewLine", '\n'), _defineProperty(_htmlEntityTable, "nexist", '∄'), _defineProperty(_htmlEntityTable, "nexists", '∄'), _defineProperty(_htmlEntityTable, "Nfr", '𝔑'), _defineProperty(_htmlEntityTable, "nfr", '𝔫'), _defineProperty(_htmlEntityTable, "ngE", '≧̸'), _defineProperty(_htmlEntityTable, "nge", '≱'), _defineProperty(_htmlEntityTable, "ngeq", '≱'), _defineProperty(_htmlEntityTable, "ngeqq", '≧̸'), _defineProperty(_htmlEntityTable, "ngeqslant", '⩾̸'), _defineProperty(_htmlEntityTable, "nges", '⩾̸'), _defineProperty(_htmlEntityTable, "nGg", '⋙̸'), _defineProperty(_htmlEntityTable, "ngsim", '≵'), _defineProperty(_htmlEntityTable, "nGt", '≫⃒'), _defineProperty(_htmlEntityTable, "ngt", '≯'), _defineProperty(_htmlEntityTable, "ngtr", '≯'), _defineProperty(_htmlEntityTable, "nGtv", '≫̸'), _defineProperty(_htmlEntityTable, "nharr", '↮'), _defineProperty(_htmlEntityTable, "nhArr", '⇎'), _defineProperty(_htmlEntityTable, "nhpar", '⫲'), _defineProperty(_htmlEntityTable, "ni", '∋'), _defineProperty(_htmlEntityTable, "nis", '⋼'), _defineProperty(_htmlEntityTable, "nisd", '⋺'), _defineProperty(_htmlEntityTable, "niv", '∋'), _defineProperty(_htmlEntityTable, "NJcy", 'Њ'), _defineProperty(_htmlEntityTable, "njcy", 'њ'), _defineProperty(_htmlEntityTable, "nlarr", '↚'), _defineProperty(_htmlEntityTable, "nlArr", '⇍'), _defineProperty(_htmlEntityTable, "nldr", '‥'), _defineProperty(_htmlEntityTable, "nlE", '≦̸'), _defineProperty(_htmlEntityTable, "nle", '≰'), _defineProperty(_htmlEntityTable, "nleftarrow", '↚'), _defineProperty(_htmlEntityTable, "nLeftarrow", '⇍'), _defineProperty(_htmlEntityTable, "nleftrightarrow", '↮'), _defineProperty(_htmlEntityTable, "nLeftrightarrow", '⇎'), _defineProperty(_htmlEntityTable, "nleq", '≰'), _defineProperty(_htmlEntityTable, "nleqq", '≦̸'), _defineProperty(_htmlEntityTable, "nleqslant", '⩽̸'), _defineProperty(_htmlEntityTable, "nles", '⩽̸'), _defineProperty(_htmlEntityTable, "nless", '≮'), _defineProperty(_htmlEntityTable, "nLl", '⋘̸'), _defineProperty(_htmlEntityTable, "nlsim", '≴'), _defineProperty(_htmlEntityTable, "nLt", '≪⃒'), _defineProperty(_htmlEntityTable, "nlt", '≮'), _defineProperty(_htmlEntityTable, "nltri", '⋪'), _defineProperty(_htmlEntityTable, "nltrie", '⋬'), _defineProperty(_htmlEntityTable, "nLtv", '≪̸'), _defineProperty(_htmlEntityTable, "nmid", '∤'), _defineProperty(_htmlEntityTable, "NoBreak", '⁠'), _defineProperty(_htmlEntityTable, "NonBreakingSpace", ' '), _defineProperty(_htmlEntityTable, "nopf", '𝕟'), _defineProperty(_htmlEntityTable, "Nopf", 'ℕ'), _defineProperty(_htmlEntityTable, "Not", '⫬'), _defineProperty(_htmlEntityTable, "not", '¬'), _defineProperty(_htmlEntityTable, "no", '¬'), _defineProperty(_htmlEntityTable, "NotCongruent", '≢'), _defineProperty(_htmlEntityTable, "NotCupCap", '≭'), _defineProperty(_htmlEntityTable, "NotDoubleVerticalBar", '∦'), _defineProperty(_htmlEntityTable, "NotElement", '∉'), _defineProperty(_htmlEntityTable, "NotEqual", '≠'), _defineProperty(_htmlEntityTable, "NotEqualTilde", '≂̸'), _defineProperty(_htmlEntityTable, "NotExists", '∄'), _defineProperty(_htmlEntityTable, "NotGreater", '≯'), _defineProperty(_htmlEntityTable, "NotGreaterEqual", '≱'), _defineProperty(_htmlEntityTable, "NotGreaterFullEqual", '≧̸'), _defineProperty(_htmlEntityTable, "NotGreaterGreater", '≫̸'), _defineProperty(_htmlEntityTable, "NotGreaterLess", '≹'), _defineProperty(_htmlEntityTable, "NotGreaterSlantEqual", '⩾̸'), _defineProperty(_htmlEntityTable, "NotGreaterTilde", '≵'), _defineProperty(_htmlEntityTable, "NotHumpDownHump", '≎̸'), _defineProperty(_htmlEntityTable, "NotHumpEqual", '≏̸'), _defineProperty(_htmlEntityTable, "notin", '∉'), _defineProperty(_htmlEntityTable, "notindot", '⋵̸'), _defineProperty(_htmlEntityTable, "notinE", '⋹̸'), _defineProperty(_htmlEntityTable, "notinva", '∉'), _defineProperty(_htmlEntityTable, "notinvb", '⋷'), _defineProperty(_htmlEntityTable, "notinvc", '⋶'), _defineProperty(_htmlEntityTable, "NotLeftTriangleBar", '⧏̸'), _defineProperty(_htmlEntityTable, "NotLeftTriangle", '⋪'), _defineProperty(_htmlEntityTable, "NotLeftTriangleEqual", '⋬'), _defineProperty(_htmlEntityTable, "NotLess", '≮'), _defineProperty(_htmlEntityTable, "NotLessEqual", '≰'), _defineProperty(_htmlEntityTable, "NotLessGreater", '≸'), _defineProperty(_htmlEntityTable, "NotLessLess", '≪̸'), _defineProperty(_htmlEntityTable, "NotLessSlantEqual", '⩽̸'), _defineProperty(_htmlEntityTable, "NotLessTilde", '≴'), _defineProperty(_htmlEntityTable, "NotNestedGreaterGreater", '⪢̸'), _defineProperty(_htmlEntityTable, "NotNestedLessLess", '⪡̸'), _defineProperty(_htmlEntityTable, "notni", '∌'), _defineProperty(_htmlEntityTable, "notniva", '∌'), _defineProperty(_htmlEntityTable, "notnivb", '⋾'), _defineProperty(_htmlEntityTable, "notnivc", '⋽'), _defineProperty(_htmlEntityTable, "NotPrecedes", '⊀'), _defineProperty(_htmlEntityTable, "NotPrecedesEqual", '⪯̸'), _defineProperty(_htmlEntityTable, "NotPrecedesSlantEqual", '⋠'), _defineProperty(_htmlEntityTable, "NotReverseElement", '∌'), _defineProperty(_htmlEntityTable, "NotRightTriangleBar", '⧐̸'), _defineProperty(_htmlEntityTable, "NotRightTriangle", '⋫'), _defineProperty(_htmlEntityTable, "NotRightTriangleEqual", '⋭'), _defineProperty(_htmlEntityTable, "NotSquareSubset", '⊏̸'), _defineProperty(_htmlEntityTable, "NotSquareSubsetEqual", '⋢'), _defineProperty(_htmlEntityTable, "NotSquareSuperset", '⊐̸'), _defineProperty(_htmlEntityTable, "NotSquareSupersetEqual", '⋣'), _defineProperty(_htmlEntityTable, "NotSubset", '⊂⃒'), _defineProperty(_htmlEntityTable, "NotSubsetEqual", '⊈'), _defineProperty(_htmlEntityTable, "NotSucceeds", '⊁'), _defineProperty(_htmlEntityTable, "NotSucceedsEqual", '⪰̸'), _defineProperty(_htmlEntityTable, "NotSucceedsSlantEqual", '⋡'), _defineProperty(_htmlEntityTable, "NotSucceedsTilde", '≿̸'), _defineProperty(_htmlEntityTable, "NotSuperset", '⊃⃒'), _defineProperty(_htmlEntityTable, "NotSupersetEqual", '⊉'), _defineProperty(_htmlEntityTable, "NotTilde", '≁'), _defineProperty(_htmlEntityTable, "NotTildeEqual", '≄'), _defineProperty(_htmlEntityTable, "NotTildeFullEqual", '≇'), _defineProperty(_htmlEntityTable, "NotTildeTilde", '≉'), _defineProperty(_htmlEntityTable, "NotVerticalBar", '∤'), _defineProperty(_htmlEntityTable, "nparallel", '∦'), _defineProperty(_htmlEntityTable, "npar", '∦'), _defineProperty(_htmlEntityTable, "nparsl", '⫽⃥'), _defineProperty(_htmlEntityTable, "npart", '∂̸'), _defineProperty(_htmlEntityTable, "npolint", '⨔'), _defineProperty(_htmlEntityTable, "npr", '⊀'), _defineProperty(_htmlEntityTable, "nprcue", '⋠'), _defineProperty(_htmlEntityTable, "nprec", '⊀'), _defineProperty(_htmlEntityTable, "npreceq", '⪯̸'), _defineProperty(_htmlEntityTable, "npre", '⪯̸'), _defineProperty(_htmlEntityTable, "nrarrc", '⤳̸'), _defineProperty(_htmlEntityTable, "nrarr", '↛'), _defineProperty(_htmlEntityTable, "nrArr", '⇏'), _defineProperty(_htmlEntityTable, "nrarrw", '↝̸'), _defineProperty(_htmlEntityTable, "nrightarrow", '↛'), _defineProperty(_htmlEntityTable, "nRightarrow", '⇏'), _defineProperty(_htmlEntityTable, "nrtri", '⋫'), _defineProperty(_htmlEntityTable, "nrtrie", '⋭'), _defineProperty(_htmlEntityTable, "nsc", '⊁'), _defineProperty(_htmlEntityTable, "nsccue", '⋡'), _defineProperty(_htmlEntityTable, "nsce", '⪰̸'), _defineProperty(_htmlEntityTable, "Nscr", '𝒩'), _defineProperty(_htmlEntityTable, "nscr", '𝓃'), _defineProperty(_htmlEntityTable, "nshortmid", '∤'), _defineProperty(_htmlEntityTable, "nshortparallel", '∦'), _defineProperty(_htmlEntityTable, "nsim", '≁'), _defineProperty(_htmlEntityTable, "nsime", '≄'), _defineProperty(_htmlEntityTable, "nsimeq", '≄'), _defineProperty(_htmlEntityTable, "nsmid", '∤'), _defineProperty(_htmlEntityTable, "nspar", '∦'), _defineProperty(_htmlEntityTable, "nsqsube", '⋢'), _defineProperty(_htmlEntityTable, "nsqsupe", '⋣'), _defineProperty(_htmlEntityTable, "nsub", '⊄'), _defineProperty(_htmlEntityTable, "nsubE", '⫅̸'), _defineProperty(_htmlEntityTable, "nsube", '⊈'), _defineProperty(_htmlEntityTable, "nsubset", '⊂⃒'), _defineProperty(_htmlEntityTable, "nsubseteq", '⊈'), _defineProperty(_htmlEntityTable, "nsubseteqq", '⫅̸'), _defineProperty(_htmlEntityTable, "nsucc", '⊁'), _defineProperty(_htmlEntityTable, "nsucceq", '⪰̸'), _defineProperty(_htmlEntityTable, "nsup", '⊅'), _defineProperty(_htmlEntityTable, "nsupE", '⫆̸'), _defineProperty(_htmlEntityTable, "nsupe", '⊉'), _defineProperty(_htmlEntityTable, "nsupset", '⊃⃒'), _defineProperty(_htmlEntityTable, "nsupseteq", '⊉'), _defineProperty(_htmlEntityTable, "nsupseteqq", '⫆̸'), _defineProperty(_htmlEntityTable, "ntgl", '≹'), _defineProperty(_htmlEntityTable, "Ntilde", 'Ñ'), _defineProperty(_htmlEntityTable, "Ntild", 'Ñ'), _defineProperty(_htmlEntityTable, "ntilde", 'ñ'), _defineProperty(_htmlEntityTable, "ntild", 'ñ'), _defineProperty(_htmlEntityTable, "ntlg", '≸'), _defineProperty(_htmlEntityTable, "ntriangleleft", '⋪'), _defineProperty(_htmlEntityTable, "ntrianglelefteq", '⋬'), _defineProperty(_htmlEntityTable, "ntriangleright", '⋫'), _defineProperty(_htmlEntityTable, "ntrianglerighteq", '⋭'), _defineProperty(_htmlEntityTable, "Nu", 'Ν'), _defineProperty(_htmlEntityTable, "nu", 'ν'), _defineProperty(_htmlEntityTable, "num", '#'), _defineProperty(_htmlEntityTable, "numero", '№'), _defineProperty(_htmlEntityTable, "numsp", ' '), _defineProperty(_htmlEntityTable, "nvap", '≍⃒'), _defineProperty(_htmlEntityTable, "nvdash", '⊬'), _defineProperty(_htmlEntityTable, "nvDash", '⊭'), _defineProperty(_htmlEntityTable, "nVdash", '⊮'), _defineProperty(_htmlEntityTable, "nVDash", '⊯'), _defineProperty(_htmlEntityTable, "nvge", '≥⃒'), _defineProperty(_htmlEntityTable, "nvgt", '>⃒'), _defineProperty(_htmlEntityTable, "nvHarr", '⤄'), _defineProperty(_htmlEntityTable, "nvinfin", '⧞'), _defineProperty(_htmlEntityTable, "nvlArr", '⤂'), _defineProperty(_htmlEntityTable, "nvle", '≤⃒'), _defineProperty(_htmlEntityTable, "nvlt", '<⃒'), _defineProperty(_htmlEntityTable, "nvltrie", '⊴⃒'), _defineProperty(_htmlEntityTable, "nvrArr", '⤃'), _defineProperty(_htmlEntityTable, "nvrtrie", '⊵⃒'), _defineProperty(_htmlEntityTable, "nvsim", '∼⃒'), _defineProperty(_htmlEntityTable, "nwarhk", '⤣'), _defineProperty(_htmlEntityTable, "nwarr", '↖'), _defineProperty(_htmlEntityTable, "nwArr", '⇖'), _defineProperty(_htmlEntityTable, "nwarrow", '↖'), _defineProperty(_htmlEntityTable, "nwnear", '⤧'), _defineProperty(_htmlEntityTable, "Oacute", 'Ó'), _defineProperty(_htmlEntityTable, "Oacut", 'Ó'), _defineProperty(_htmlEntityTable, "oacute", 'ó'), _defineProperty(_htmlEntityTable, "oacut", 'ó'), _defineProperty(_htmlEntityTable, "oast", '⊛'), _defineProperty(_htmlEntityTable, "Ocirc", 'Ô'), _defineProperty(_htmlEntityTable, "Ocir", 'Ô'), _defineProperty(_htmlEntityTable, "ocirc", 'ô'), _defineProperty(_htmlEntityTable, "ocir", 'ô'), _defineProperty(_htmlEntityTable, "ocir", '⊚'), _defineProperty(_htmlEntityTable, "Ocy", 'О'), _defineProperty(_htmlEntityTable, "ocy", 'о'), _defineProperty(_htmlEntityTable, "odash", '⊝'), _defineProperty(_htmlEntityTable, "Odblac", 'Ő'), _defineProperty(_htmlEntityTable, "odblac", 'ő'), _defineProperty(_htmlEntityTable, "odiv", '⨸'), _defineProperty(_htmlEntityTable, "odot", '⊙'), _defineProperty(_htmlEntityTable, "odsold", '⦼'), _defineProperty(_htmlEntityTable, "OElig", 'Œ'), _defineProperty(_htmlEntityTable, "oelig", 'œ'), _defineProperty(_htmlEntityTable, "ofcir", '⦿'), _defineProperty(_htmlEntityTable, "Ofr", '𝔒'), _defineProperty(_htmlEntityTable, "ofr", '𝔬'), _defineProperty(_htmlEntityTable, "ogon", '˛'), _defineProperty(_htmlEntityTable, "Ograve", 'Ò'), _defineProperty(_htmlEntityTable, "Ograv", 'Ò'), _defineProperty(_htmlEntityTable, "ograve", 'ò'), _defineProperty(_htmlEntityTable, "ograv", 'ò'), _defineProperty(_htmlEntityTable, "ogt", '⧁'), _defineProperty(_htmlEntityTable, "ohbar", '⦵'), _defineProperty(_htmlEntityTable, "ohm", 'Ω'), _defineProperty(_htmlEntityTable, "oint", '∮'), _defineProperty(_htmlEntityTable, "olarr", '↺'), _defineProperty(_htmlEntityTable, "olcir", '⦾'), _defineProperty(_htmlEntityTable, "olcross", '⦻'), _defineProperty(_htmlEntityTable, "oline", '‾'), _defineProperty(_htmlEntityTable, "olt", '⧀'), _defineProperty(_htmlEntityTable, "Omacr", 'Ō'), _defineProperty(_htmlEntityTable, "omacr", 'ō'), _defineProperty(_htmlEntityTable, "Omega", 'Ω'), _defineProperty(_htmlEntityTable, "omega", 'ω'), _defineProperty(_htmlEntityTable, "Omicron", 'Ο'), _defineProperty(_htmlEntityTable, "omicron", 'ο'), _defineProperty(_htmlEntityTable, "omid", '⦶'), _defineProperty(_htmlEntityTable, "ominus", '⊖'), _defineProperty(_htmlEntityTable, "Oopf", '𝕆'), _defineProperty(_htmlEntityTable, "oopf", '𝕠'), _defineProperty(_htmlEntityTable, "opar", '⦷'), _defineProperty(_htmlEntityTable, "OpenCurlyDoubleQuote", '“'), _defineProperty(_htmlEntityTable, "OpenCurlyQuote", '‘'), _defineProperty(_htmlEntityTable, "operp", '⦹'), _defineProperty(_htmlEntityTable, "oplus", '⊕'), _defineProperty(_htmlEntityTable, "orarr", '↻'), _defineProperty(_htmlEntityTable, "Or", '⩔'), _defineProperty(_htmlEntityTable, "or", '∨'), _defineProperty(_htmlEntityTable, "ord", '⩝'), _defineProperty(_htmlEntityTable, "order", 'ℴ'), _defineProperty(_htmlEntityTable, "orderof", 'ℴ'), _defineProperty(_htmlEntityTable, "ordf", 'ª'), _defineProperty(_htmlEntityTable, "ord", 'ª'), _defineProperty(_htmlEntityTable, "ordm", 'º'), _defineProperty(_htmlEntityTable, "ord", 'º'), _defineProperty(_htmlEntityTable, "origof", '⊶'), _defineProperty(_htmlEntityTable, "oror", '⩖'), _defineProperty(_htmlEntityTable, "orslope", '⩗'), _defineProperty(_htmlEntityTable, "orv", '⩛'), _defineProperty(_htmlEntityTable, "oS", 'Ⓢ'), _defineProperty(_htmlEntityTable, "Oscr", '𝒪'), _defineProperty(_htmlEntityTable, "oscr", 'ℴ'), _defineProperty(_htmlEntityTable, "Oslash", 'Ø'), _defineProperty(_htmlEntityTable, "Oslas", 'Ø'), _defineProperty(_htmlEntityTable, "oslash", 'ø'), _defineProperty(_htmlEntityTable, "oslas", 'ø'), _defineProperty(_htmlEntityTable, "osol", '⊘'), _defineProperty(_htmlEntityTable, "Otilde", 'Õ'), _defineProperty(_htmlEntityTable, "Otild", 'Õ'), _defineProperty(_htmlEntityTable, "otilde", 'õ'), _defineProperty(_htmlEntityTable, "otild", 'õ'), _defineProperty(_htmlEntityTable, "otimesas", '⨶'), _defineProperty(_htmlEntityTable, "Otimes", '⨷'), _defineProperty(_htmlEntityTable, "otimes", '⊗'), _defineProperty(_htmlEntityTable, "Ouml", 'Ö'), _defineProperty(_htmlEntityTable, "Oum", 'Ö'), _defineProperty(_htmlEntityTable, "ouml", 'ö'), _defineProperty(_htmlEntityTable, "oum", 'ö'), _defineProperty(_htmlEntityTable, "ovbar", '⌽'), _defineProperty(_htmlEntityTable, "OverBar", '‾'), _defineProperty(_htmlEntityTable, "OverBrace", '⏞'), _defineProperty(_htmlEntityTable, "OverBracket", '⎴'), _defineProperty(_htmlEntityTable, "OverParenthesis", '⏜'), _defineProperty(_htmlEntityTable, "para", '¶'), _defineProperty(_htmlEntityTable, "par", '¶'), _defineProperty(_htmlEntityTable, "parallel", '∥'), _defineProperty(_htmlEntityTable, "par", '∥'), _defineProperty(_htmlEntityTable, "parsim", '⫳'), _defineProperty(_htmlEntityTable, "parsl", '⫽'), _defineProperty(_htmlEntityTable, "part", '∂'), _defineProperty(_htmlEntityTable, "PartialD", '∂'), _defineProperty(_htmlEntityTable, "Pcy", 'П'), _defineProperty(_htmlEntityTable, "pcy", 'п'), _defineProperty(_htmlEntityTable, "percnt", '%'), _defineProperty(_htmlEntityTable, "period", '.'), _defineProperty(_htmlEntityTable, "permil", '‰'), _defineProperty(_htmlEntityTable, "perp", '⊥'), _defineProperty(_htmlEntityTable, "pertenk", '‱'), _defineProperty(_htmlEntityTable, "Pfr", '𝔓'), _defineProperty(_htmlEntityTable, "pfr", '𝔭'), _defineProperty(_htmlEntityTable, "Phi", 'Φ'), _defineProperty(_htmlEntityTable, "phi", 'φ'), _defineProperty(_htmlEntityTable, "phiv", 'ϕ'), _defineProperty(_htmlEntityTable, "phmmat", 'ℳ'), _defineProperty(_htmlEntityTable, "phone", '☎'), _defineProperty(_htmlEntityTable, "Pi", 'Π'), _defineProperty(_htmlEntityTable, "pi", 'π'), _defineProperty(_htmlEntityTable, "pitchfork", '⋔'), _defineProperty(_htmlEntityTable, "piv", 'ϖ'), _defineProperty(_htmlEntityTable, "planck", 'ℏ'), _defineProperty(_htmlEntityTable, "planckh", 'ℎ'), _defineProperty(_htmlEntityTable, "plankv", 'ℏ'), _defineProperty(_htmlEntityTable, "plusacir", '⨣'), _defineProperty(_htmlEntityTable, "plusb", '⊞'), _defineProperty(_htmlEntityTable, "pluscir", '⨢'), _defineProperty(_htmlEntityTable, "plus", '+'), _defineProperty(_htmlEntityTable, "plusdo", '∔'), _defineProperty(_htmlEntityTable, "plusdu", '⨥'), _defineProperty(_htmlEntityTable, "pluse", '⩲'), _defineProperty(_htmlEntityTable, "PlusMinus", '±'), _defineProperty(_htmlEntityTable, "plusmn", '±'), _defineProperty(_htmlEntityTable, "plusm", '±'), _defineProperty(_htmlEntityTable, "plussim", '⨦'), _defineProperty(_htmlEntityTable, "plustwo", '⨧'), _defineProperty(_htmlEntityTable, "pm", '±'), _defineProperty(_htmlEntityTable, "Poincareplane", 'ℌ'), _defineProperty(_htmlEntityTable, "pointint", '⨕'), _defineProperty(_htmlEntityTable, "popf", '𝕡'), _defineProperty(_htmlEntityTable, "Popf", 'ℙ'), _defineProperty(_htmlEntityTable, "pound", '£'), _defineProperty(_htmlEntityTable, "poun", '£'), _defineProperty(_htmlEntityTable, "prap", '⪷'), _defineProperty(_htmlEntityTable, "Pr", '⪻'), _defineProperty(_htmlEntityTable, "pr", '≺'), _defineProperty(_htmlEntityTable, "prcue", '≼'), _defineProperty(_htmlEntityTable, "precapprox", '⪷'), _defineProperty(_htmlEntityTable, "prec", '≺'), _defineProperty(_htmlEntityTable, "preccurlyeq", '≼'), _defineProperty(_htmlEntityTable, "Precedes", '≺'), _defineProperty(_htmlEntityTable, "PrecedesEqual", '⪯'), _defineProperty(_htmlEntityTable, "PrecedesSlantEqual", '≼'), _defineProperty(_htmlEntityTable, "PrecedesTilde", '≾'), _defineProperty(_htmlEntityTable, "preceq", '⪯'), _defineProperty(_htmlEntityTable, "precnapprox", '⪹'), _defineProperty(_htmlEntityTable, "precneqq", '⪵'), _defineProperty(_htmlEntityTable, "precnsim", '⋨'), _defineProperty(_htmlEntityTable, "pre", '⪯'), _defineProperty(_htmlEntityTable, "prE", '⪳'), _defineProperty(_htmlEntityTable, "precsim", '≾'), _defineProperty(_htmlEntityTable, "prime", '′'), _defineProperty(_htmlEntityTable, "Prime", '″'), _defineProperty(_htmlEntityTable, "primes", 'ℙ'), _defineProperty(_htmlEntityTable, "prnap", '⪹'), _defineProperty(_htmlEntityTable, "prnE", '⪵'), _defineProperty(_htmlEntityTable, "prnsim", '⋨'), _defineProperty(_htmlEntityTable, "prod", '∏'), _defineProperty(_htmlEntityTable, "Product", '∏'), _defineProperty(_htmlEntityTable, "profalar", '⌮'), _defineProperty(_htmlEntityTable, "profline", '⌒'), _defineProperty(_htmlEntityTable, "profsurf", '⌓'), _defineProperty(_htmlEntityTable, "prop", '∝'), _defineProperty(_htmlEntityTable, "Proportional", '∝'), _defineProperty(_htmlEntityTable, "Proportion", '∷'), _defineProperty(_htmlEntityTable, "propto", '∝'), _defineProperty(_htmlEntityTable, "prsim", '≾'), _defineProperty(_htmlEntityTable, "prurel", '⊰'), _defineProperty(_htmlEntityTable, "Pscr", '𝒫'), _defineProperty(_htmlEntityTable, "pscr", '𝓅'), _defineProperty(_htmlEntityTable, "Psi", 'Ψ'), _defineProperty(_htmlEntityTable, "psi", 'ψ'), _defineProperty(_htmlEntityTable, "puncsp", ' '), _defineProperty(_htmlEntityTable, "Qfr", '𝔔'), _defineProperty(_htmlEntityTable, "qfr", '𝔮'), _defineProperty(_htmlEntityTable, "qint", '⨌'), _defineProperty(_htmlEntityTable, "qopf", '𝕢'), _defineProperty(_htmlEntityTable, "Qopf", 'ℚ'), _defineProperty(_htmlEntityTable, "qprime", '⁗'), _defineProperty(_htmlEntityTable, "Qscr", '𝒬'), _defineProperty(_htmlEntityTable, "qscr", '𝓆'), _defineProperty(_htmlEntityTable, "quaternions", 'ℍ'), _defineProperty(_htmlEntityTable, "quatint", '⨖'), _defineProperty(_htmlEntityTable, "quest", '?'), _defineProperty(_htmlEntityTable, "questeq", '≟'), _defineProperty(_htmlEntityTable, "quot", '"'), _defineProperty(_htmlEntityTable, "quo", '"'), _defineProperty(_htmlEntityTable, "QUOT", '"'), _defineProperty(_htmlEntityTable, "QUO", '"'), _defineProperty(_htmlEntityTable, "rAarr", '⇛'), _defineProperty(_htmlEntityTable, "race", '∽̱'), _defineProperty(_htmlEntityTable, "Racute", 'Ŕ'), _defineProperty(_htmlEntityTable, "racute", 'ŕ'), _defineProperty(_htmlEntityTable, "radic", '√'), _defineProperty(_htmlEntityTable, "raemptyv", '⦳'), _defineProperty(_htmlEntityTable, "rang", '⟩'), _defineProperty(_htmlEntityTable, "Rang", '⟫'), _defineProperty(_htmlEntityTable, "rangd", '⦒'), _defineProperty(_htmlEntityTable, "range", '⦥'), _defineProperty(_htmlEntityTable, "rangle", '⟩'), _defineProperty(_htmlEntityTable, "raquo", '»'), _defineProperty(_htmlEntityTable, "raqu", '»'), _defineProperty(_htmlEntityTable, "rarrap", '⥵'), _defineProperty(_htmlEntityTable, "rarrb", '⇥'), _defineProperty(_htmlEntityTable, "rarrbfs", '⤠'), _defineProperty(_htmlEntityTable, "rarrc", '⤳'), _defineProperty(_htmlEntityTable, "rarr", '→'), _defineProperty(_htmlEntityTable, "Rarr", '↠'), _defineProperty(_htmlEntityTable, "rArr", '⇒'), _defineProperty(_htmlEntityTable, "rarrfs", '⤞'), _defineProperty(_htmlEntityTable, "rarrhk", '↪'), _defineProperty(_htmlEntityTable, "rarrlp", '↬'), _defineProperty(_htmlEntityTable, "rarrpl", '⥅'), _defineProperty(_htmlEntityTable, "rarrsim", '⥴'), _defineProperty(_htmlEntityTable, "Rarrtl", '⤖'), _defineProperty(_htmlEntityTable, "rarrtl", '↣'), _defineProperty(_htmlEntityTable, "rarrw", '↝'), _defineProperty(_htmlEntityTable, "ratail", '⤚'), _defineProperty(_htmlEntityTable, "rAtail", '⤜'), _defineProperty(_htmlEntityTable, "ratio", '∶'), _defineProperty(_htmlEntityTable, "rationals", 'ℚ'), _defineProperty(_htmlEntityTable, "rbarr", '⤍'), _defineProperty(_htmlEntityTable, "rBarr", '⤏'), _defineProperty(_htmlEntityTable, "RBarr", '⤐'), _defineProperty(_htmlEntityTable, "rbbrk", '❳'), _defineProperty(_htmlEntityTable, "rbrace", '}'), _defineProperty(_htmlEntityTable, "rbrack", ']'), _defineProperty(_htmlEntityTable, "rbrke", '⦌'), _defineProperty(_htmlEntityTable, "rbrksld", '⦎'), _defineProperty(_htmlEntityTable, "rbrkslu", '⦐'), _defineProperty(_htmlEntityTable, "Rcaron", 'Ř'), _defineProperty(_htmlEntityTable, "rcaron", 'ř'), _defineProperty(_htmlEntityTable, "Rcedil", 'Ŗ'), _defineProperty(_htmlEntityTable, "rcedil", 'ŗ'), _defineProperty(_htmlEntityTable, "rceil", '⌉'), _defineProperty(_htmlEntityTable, "rcub", '}'), _defineProperty(_htmlEntityTable, "Rcy", 'Р'), _defineProperty(_htmlEntityTable, "rcy", 'р'), _defineProperty(_htmlEntityTable, "rdca", '⤷'), _defineProperty(_htmlEntityTable, "rdldhar", '⥩'), _defineProperty(_htmlEntityTable, "rdquo", '”'), _defineProperty(_htmlEntityTable, "rdquor", '”'), _defineProperty(_htmlEntityTable, "rdsh", '↳'), _defineProperty(_htmlEntityTable, "real", 'ℜ'), _defineProperty(_htmlEntityTable, "realine", 'ℛ'), _defineProperty(_htmlEntityTable, "realpart", 'ℜ'), _defineProperty(_htmlEntityTable, "reals", 'ℝ'), _defineProperty(_htmlEntityTable, "Re", 'ℜ'), _defineProperty(_htmlEntityTable, "rect", '▭'), _defineProperty(_htmlEntityTable, "reg", '®'), _defineProperty(_htmlEntityTable, "re", '®'), _defineProperty(_htmlEntityTable, "REG", '®'), _defineProperty(_htmlEntityTable, "RE", '®'), _defineProperty(_htmlEntityTable, "ReverseElement", '∋'), _defineProperty(_htmlEntityTable, "ReverseEquilibrium", '⇋'), _defineProperty(_htmlEntityTable, "ReverseUpEquilibrium", '⥯'), _defineProperty(_htmlEntityTable, "rfisht", '⥽'), _defineProperty(_htmlEntityTable, "rfloor", '⌋'), _defineProperty(_htmlEntityTable, "rfr", '𝔯'), _defineProperty(_htmlEntityTable, "Rfr", 'ℜ'), _defineProperty(_htmlEntityTable, "rHar", '⥤'), _defineProperty(_htmlEntityTable, "rhard", '⇁'), _defineProperty(_htmlEntityTable, "rharu", '⇀'), _defineProperty(_htmlEntityTable, "rharul", '⥬'), _defineProperty(_htmlEntityTable, "Rho", 'Ρ'), _defineProperty(_htmlEntityTable, "rho", 'ρ'), _defineProperty(_htmlEntityTable, "rhov", 'ϱ'), _defineProperty(_htmlEntityTable, "RightAngleBracket", '⟩'), _defineProperty(_htmlEntityTable, "RightArrowBar", '⇥'), _defineProperty(_htmlEntityTable, "rightarrow", '→'), _defineProperty(_htmlEntityTable, "RightArrow", '→'), _defineProperty(_htmlEntityTable, "Rightarrow", '⇒'), _defineProperty(_htmlEntityTable, "RightArrowLeftArrow", '⇄'), _defineProperty(_htmlEntityTable, "rightarrowtail", '↣'), _defineProperty(_htmlEntityTable, "RightCeiling", '⌉'), _defineProperty(_htmlEntityTable, "RightDoubleBracket", '⟧'), _defineProperty(_htmlEntityTable, "RightDownTeeVector", '⥝'), _defineProperty(_htmlEntityTable, "RightDownVectorBar", '⥕'), _defineProperty(_htmlEntityTable, "RightDownVector", '⇂'), _defineProperty(_htmlEntityTable, "RightFloor", '⌋'), _defineProperty(_htmlEntityTable, "rightharpoondown", '⇁'), _defineProperty(_htmlEntityTable, "rightharpoonup", '⇀'), _defineProperty(_htmlEntityTable, "rightleftarrows", '⇄'), _defineProperty(_htmlEntityTable, "rightleftharpoons", '⇌'), _defineProperty(_htmlEntityTable, "rightrightarrows", '⇉'), _defineProperty(_htmlEntityTable, "rightsquigarrow", '↝'), _defineProperty(_htmlEntityTable, "RightTeeArrow", '↦'), _defineProperty(_htmlEntityTable, "RightTee", '⊢'), _defineProperty(_htmlEntityTable, "RightTeeVector", '⥛'), _defineProperty(_htmlEntityTable, "rightthreetimes", '⋌'), _defineProperty(_htmlEntityTable, "RightTriangleBar", '⧐'), _defineProperty(_htmlEntityTable, "RightTriangle", '⊳'), _defineProperty(_htmlEntityTable, "RightTriangleEqual", '⊵'), _defineProperty(_htmlEntityTable, "RightUpDownVector", '⥏'), _defineProperty(_htmlEntityTable, "RightUpTeeVector", '⥜'), _defineProperty(_htmlEntityTable, "RightUpVectorBar", '⥔'), _defineProperty(_htmlEntityTable, "RightUpVector", '↾'), _defineProperty(_htmlEntityTable, "RightVectorBar", '⥓'), _defineProperty(_htmlEntityTable, "RightVector", '⇀'), _defineProperty(_htmlEntityTable, "ring", '˚'), _defineProperty(_htmlEntityTable, "risingdotseq", '≓'), _defineProperty(_htmlEntityTable, "rlarr", '⇄'), _defineProperty(_htmlEntityTable, "rlhar", '⇌'), _defineProperty(_htmlEntityTable, "rlm", '‏'), _defineProperty(_htmlEntityTable, "rmoustache", '⎱'), _defineProperty(_htmlEntityTable, "rmoust", '⎱'), _defineProperty(_htmlEntityTable, "rnmid", '⫮'), _defineProperty(_htmlEntityTable, "roang", '⟭'), _defineProperty(_htmlEntityTable, "roarr", '⇾'), _defineProperty(_htmlEntityTable, "robrk", '⟧'), _defineProperty(_htmlEntityTable, "ropar", '⦆'), _defineProperty(_htmlEntityTable, "ropf", '𝕣'), _defineProperty(_htmlEntityTable, "Ropf", 'ℝ'), _defineProperty(_htmlEntityTable, "roplus", '⨮'), _defineProperty(_htmlEntityTable, "rotimes", '⨵'), _defineProperty(_htmlEntityTable, "RoundImplies", '⥰'), _defineProperty(_htmlEntityTable, "rpar", ')'), _defineProperty(_htmlEntityTable, "rpargt", '⦔'), _defineProperty(_htmlEntityTable, "rppolint", '⨒'), _defineProperty(_htmlEntityTable, "rrarr", '⇉'), _defineProperty(_htmlEntityTable, "Rrightarrow", '⇛'), _defineProperty(_htmlEntityTable, "rsaquo", '›'), _defineProperty(_htmlEntityTable, "rscr", '𝓇'), _defineProperty(_htmlEntityTable, "Rscr", 'ℛ'), _defineProperty(_htmlEntityTable, "rsh", '↱'), _defineProperty(_htmlEntityTable, "Rsh", '↱'), _defineProperty(_htmlEntityTable, "rsqb", ']'), _defineProperty(_htmlEntityTable, "rsquo", '’'), _defineProperty(_htmlEntityTable, "rsquor", '’'), _defineProperty(_htmlEntityTable, "rthree", '⋌'), _defineProperty(_htmlEntityTable, "rtimes", '⋊'), _defineProperty(_htmlEntityTable, "rtri", '▹'), _defineProperty(_htmlEntityTable, "rtrie", '⊵'), _defineProperty(_htmlEntityTable, "rtrif", '▸'), _defineProperty(_htmlEntityTable, "rtriltri", '⧎'), _defineProperty(_htmlEntityTable, "RuleDelayed", '⧴'), _defineProperty(_htmlEntityTable, "ruluhar", '⥨'), _defineProperty(_htmlEntityTable, "rx", '℞'), _defineProperty(_htmlEntityTable, "Sacute", 'Ś'), _defineProperty(_htmlEntityTable, "sacute", 'ś'), _defineProperty(_htmlEntityTable, "sbquo", '‚'), _defineProperty(_htmlEntityTable, "scap", '⪸'), _defineProperty(_htmlEntityTable, "Scaron", 'Š'), _defineProperty(_htmlEntityTable, "scaron", 'š'), _defineProperty(_htmlEntityTable, "Sc", '⪼'), _defineProperty(_htmlEntityTable, "sc", '≻'), _defineProperty(_htmlEntityTable, "sccue", '≽'), _defineProperty(_htmlEntityTable, "sce", '⪰'), _defineProperty(_htmlEntityTable, "scE", '⪴'), _defineProperty(_htmlEntityTable, "Scedil", 'Ş'), _defineProperty(_htmlEntityTable, "scedil", 'ş'), _defineProperty(_htmlEntityTable, "Scirc", 'Ŝ'), _defineProperty(_htmlEntityTable, "scirc", 'ŝ'), _defineProperty(_htmlEntityTable, "scnap", '⪺'), _defineProperty(_htmlEntityTable, "scnE", '⪶'), _defineProperty(_htmlEntityTable, "scnsim", '⋩'), _defineProperty(_htmlEntityTable, "scpolint", '⨓'), _defineProperty(_htmlEntityTable, "scsim", '≿'), _defineProperty(_htmlEntityTable, "Scy", 'С'), _defineProperty(_htmlEntityTable, "scy", 'с'), _defineProperty(_htmlEntityTable, "sdotb", '⊡'), _defineProperty(_htmlEntityTable, "sdot", '⋅'), _defineProperty(_htmlEntityTable, "sdote", '⩦'), _defineProperty(_htmlEntityTable, "searhk", '⤥'), _defineProperty(_htmlEntityTable, "searr", '↘'), _defineProperty(_htmlEntityTable, "seArr", '⇘'), _defineProperty(_htmlEntityTable, "searrow", '↘'), _defineProperty(_htmlEntityTable, "sect", '§'), _defineProperty(_htmlEntityTable, "sec", '§'), _defineProperty(_htmlEntityTable, "semi", ';'), _defineProperty(_htmlEntityTable, "seswar", '⤩'), _defineProperty(_htmlEntityTable, "setminus", '∖'), _defineProperty(_htmlEntityTable, "setmn", '∖'), _defineProperty(_htmlEntityTable, "sext", '✶'), _defineProperty(_htmlEntityTable, "Sfr", '𝔖'), _defineProperty(_htmlEntityTable, "sfr", '𝔰'), _defineProperty(_htmlEntityTable, "sfrown", '⌢'), _defineProperty(_htmlEntityTable, "sharp", '♯'), _defineProperty(_htmlEntityTable, "SHCHcy", 'Щ'), _defineProperty(_htmlEntityTable, "shchcy", 'щ'), _defineProperty(_htmlEntityTable, "SHcy", 'Ш'), _defineProperty(_htmlEntityTable, "shcy", 'ш'), _defineProperty(_htmlEntityTable, "ShortDownArrow", '↓'), _defineProperty(_htmlEntityTable, "ShortLeftArrow", '←'), _defineProperty(_htmlEntityTable, "shortmid", '∣'), _defineProperty(_htmlEntityTable, "shortparallel", '∥'), _defineProperty(_htmlEntityTable, "ShortRightArrow", '→'), _defineProperty(_htmlEntityTable, "ShortUpArrow", '↑'), _defineProperty(_htmlEntityTable, "shy", '­'), _defineProperty(_htmlEntityTable, "sh", '­'), _defineProperty(_htmlEntityTable, "Sigma", 'Σ'), _defineProperty(_htmlEntityTable, "sigma", 'σ'), _defineProperty(_htmlEntityTable, "sigmaf", 'ς'), _defineProperty(_htmlEntityTable, "sigmav", 'ς'), _defineProperty(_htmlEntityTable, "sim", '∼'), _defineProperty(_htmlEntityTable, "simdot", '⩪'), _defineProperty(_htmlEntityTable, "sime", '≃'), _defineProperty(_htmlEntityTable, "simeq", '≃'), _defineProperty(_htmlEntityTable, "simg", '⪞'), _defineProperty(_htmlEntityTable, "simgE", '⪠'), _defineProperty(_htmlEntityTable, "siml", '⪝'), _defineProperty(_htmlEntityTable, "simlE", '⪟'), _defineProperty(_htmlEntityTable, "simne", '≆'), _defineProperty(_htmlEntityTable, "simplus", '⨤'), _defineProperty(_htmlEntityTable, "simrarr", '⥲'), _defineProperty(_htmlEntityTable, "slarr", '←'), _defineProperty(_htmlEntityTable, "SmallCircle", '∘'), _defineProperty(_htmlEntityTable, "smallsetminus", '∖'), _defineProperty(_htmlEntityTable, "smashp", '⨳'), _defineProperty(_htmlEntityTable, "smeparsl", '⧤'), _defineProperty(_htmlEntityTable, "smid", '∣'), _defineProperty(_htmlEntityTable, "smile", '⌣'), _defineProperty(_htmlEntityTable, "smt", '⪪'), _defineProperty(_htmlEntityTable, "smte", '⪬'), _defineProperty(_htmlEntityTable, "smtes", '⪬︀'), _defineProperty(_htmlEntityTable, "SOFTcy", 'Ь'), _defineProperty(_htmlEntityTable, "softcy", 'ь'), _defineProperty(_htmlEntityTable, "solbar", '⌿'), _defineProperty(_htmlEntityTable, "solb", '⧄'), _defineProperty(_htmlEntityTable, "sol", '/'), _defineProperty(_htmlEntityTable, "Sopf", '𝕊'), _defineProperty(_htmlEntityTable, "sopf", '𝕤'), _defineProperty(_htmlEntityTable, "spades", '♠'), _defineProperty(_htmlEntityTable, "spadesuit", '♠'), _defineProperty(_htmlEntityTable, "spar", '∥'), _defineProperty(_htmlEntityTable, "sqcap", '⊓'), _defineProperty(_htmlEntityTable, "sqcaps", '⊓︀'), _defineProperty(_htmlEntityTable, "sqcup", '⊔'), _defineProperty(_htmlEntityTable, "sqcups", '⊔︀'), _defineProperty(_htmlEntityTable, "Sqrt", '√'), _defineProperty(_htmlEntityTable, "sqsub", '⊏'), _defineProperty(_htmlEntityTable, "sqsube", '⊑'), _defineProperty(_htmlEntityTable, "sqsubset", '⊏'), _defineProperty(_htmlEntityTable, "sqsubseteq", '⊑'), _defineProperty(_htmlEntityTable, "sqsup", '⊐'), _defineProperty(_htmlEntityTable, "sqsupe", '⊒'), _defineProperty(_htmlEntityTable, "sqsupset", '⊐'), _defineProperty(_htmlEntityTable, "sqsupseteq", '⊒'), _defineProperty(_htmlEntityTable, "square", '□'), _defineProperty(_htmlEntityTable, "Square", '□'), _defineProperty(_htmlEntityTable, "SquareIntersection", '⊓'), _defineProperty(_htmlEntityTable, "SquareSubset", '⊏'), _defineProperty(_htmlEntityTable, "SquareSubsetEqual", '⊑'), _defineProperty(_htmlEntityTable, "SquareSuperset", '⊐'), _defineProperty(_htmlEntityTable, "SquareSupersetEqual", '⊒'), _defineProperty(_htmlEntityTable, "SquareUnion", '⊔'), _defineProperty(_htmlEntityTable, "squarf", '▪'), _defineProperty(_htmlEntityTable, "squ", '□'), _defineProperty(_htmlEntityTable, "squf", '▪'), _defineProperty(_htmlEntityTable, "srarr", '→'), _defineProperty(_htmlEntityTable, "Sscr", '𝒮'), _defineProperty(_htmlEntityTable, "sscr", '𝓈'), _defineProperty(_htmlEntityTable, "ssetmn", '∖'), _defineProperty(_htmlEntityTable, "ssmile", '⌣'), _defineProperty(_htmlEntityTable, "sstarf", '⋆'), _defineProperty(_htmlEntityTable, "Star", '⋆'), _defineProperty(_htmlEntityTable, "star", '☆'), _defineProperty(_htmlEntityTable, "starf", '★'), _defineProperty(_htmlEntityTable, "straightepsilon", 'ϵ'), _defineProperty(_htmlEntityTable, "straightphi", 'ϕ'), _defineProperty(_htmlEntityTable, "strns", '¯'), _defineProperty(_htmlEntityTable, "sub", '⊂'), _defineProperty(_htmlEntityTable, "Sub", '⋐'), _defineProperty(_htmlEntityTable, "subdot", '⪽'), _defineProperty(_htmlEntityTable, "subE", '⫅'), _defineProperty(_htmlEntityTable, "sube", '⊆'), _defineProperty(_htmlEntityTable, "subedot", '⫃'), _defineProperty(_htmlEntityTable, "submult", '⫁'), _defineProperty(_htmlEntityTable, "subnE", '⫋'), _defineProperty(_htmlEntityTable, "subne", '⊊'), _defineProperty(_htmlEntityTable, "subplus", '⪿'), _defineProperty(_htmlEntityTable, "subrarr", '⥹'), _defineProperty(_htmlEntityTable, "subset", '⊂'), _defineProperty(_htmlEntityTable, "Subset", '⋐'), _defineProperty(_htmlEntityTable, "subseteq", '⊆'), _defineProperty(_htmlEntityTable, "subseteqq", '⫅'), _defineProperty(_htmlEntityTable, "SubsetEqual", '⊆'), _defineProperty(_htmlEntityTable, "subsetneq", '⊊'), _defineProperty(_htmlEntityTable, "subsetneqq", '⫋'), _defineProperty(_htmlEntityTable, "subsim", '⫇'), _defineProperty(_htmlEntityTable, "subsub", '⫕'), _defineProperty(_htmlEntityTable, "subsup", '⫓'), _defineProperty(_htmlEntityTable, "succapprox", '⪸'), _defineProperty(_htmlEntityTable, "succ", '≻'), _defineProperty(_htmlEntityTable, "succcurlyeq", '≽'), _defineProperty(_htmlEntityTable, "Succeeds", '≻'), _defineProperty(_htmlEntityTable, "SucceedsEqual", '⪰'), _defineProperty(_htmlEntityTable, "SucceedsSlantEqual", '≽'), _defineProperty(_htmlEntityTable, "SucceedsTilde", '≿'), _defineProperty(_htmlEntityTable, "succeq", '⪰'), _defineProperty(_htmlEntityTable, "succnapprox", '⪺'), _defineProperty(_htmlEntityTable, "succneqq", '⪶'), _defineProperty(_htmlEntityTable, "succnsim", '⋩'), _defineProperty(_htmlEntityTable, "succsim", '≿'), _defineProperty(_htmlEntityTable, "SuchThat", '∋'), _defineProperty(_htmlEntityTable, "sum", '∑'), _defineProperty(_htmlEntityTable, "Sum", '∑'), _defineProperty(_htmlEntityTable, "sung", '♪'), _defineProperty(_htmlEntityTable, "sup1", '¹'), _defineProperty(_htmlEntityTable, "sup", '¹'), _defineProperty(_htmlEntityTable, "sup2", '²'), _defineProperty(_htmlEntityTable, "sup", '²'), _defineProperty(_htmlEntityTable, "sup3", '³'), _defineProperty(_htmlEntityTable, "sup", '³'), _defineProperty(_htmlEntityTable, "sup", '⊃'), _defineProperty(_htmlEntityTable, "Sup", '⋑'), _defineProperty(_htmlEntityTable, "supdot", '⪾'), _defineProperty(_htmlEntityTable, "supdsub", '⫘'), _defineProperty(_htmlEntityTable, "supE", '⫆'), _defineProperty(_htmlEntityTable, "supe", '⊇'), _defineProperty(_htmlEntityTable, "supedot", '⫄'), _defineProperty(_htmlEntityTable, "Superset", '⊃'), _defineProperty(_htmlEntityTable, "SupersetEqual", '⊇'), _defineProperty(_htmlEntityTable, "suphsol", '⟉'), _defineProperty(_htmlEntityTable, "suphsub", '⫗'), _defineProperty(_htmlEntityTable, "suplarr", '⥻'), _defineProperty(_htmlEntityTable, "supmult", '⫂'), _defineProperty(_htmlEntityTable, "supnE", '⫌'), _defineProperty(_htmlEntityTable, "supne", '⊋'), _defineProperty(_htmlEntityTable, "supplus", '⫀'), _defineProperty(_htmlEntityTable, "supset", '⊃'), _defineProperty(_htmlEntityTable, "Supset", '⋑'), _defineProperty(_htmlEntityTable, "supseteq", '⊇'), _defineProperty(_htmlEntityTable, "supseteqq", '⫆'), _defineProperty(_htmlEntityTable, "supsetneq", '⊋'), _defineProperty(_htmlEntityTable, "supsetneqq", '⫌'), _defineProperty(_htmlEntityTable, "supsim", '⫈'), _defineProperty(_htmlEntityTable, "supsub", '⫔'), _defineProperty(_htmlEntityTable, "supsup", '⫖'), _defineProperty(_htmlEntityTable, "swarhk", '⤦'), _defineProperty(_htmlEntityTable, "swarr", '↙'), _defineProperty(_htmlEntityTable, "swArr", '⇙'), _defineProperty(_htmlEntityTable, "swarrow", '↙'), _defineProperty(_htmlEntityTable, "swnwar", '⤪'), _defineProperty(_htmlEntityTable, "szlig", 'ß'), _defineProperty(_htmlEntityTable, "szli", 'ß'), _defineProperty(_htmlEntityTable, "Tab", '	'), _defineProperty(_htmlEntityTable, "target", '⌖'), _defineProperty(_htmlEntityTable, "Tau", 'Τ'), _defineProperty(_htmlEntityTable, "tau", 'τ'), _defineProperty(_htmlEntityTable, "tbrk", '⎴'), _defineProperty(_htmlEntityTable, "Tcaron", 'Ť'), _defineProperty(_htmlEntityTable, "tcaron", 'ť'), _defineProperty(_htmlEntityTable, "Tcedil", 'Ţ'), _defineProperty(_htmlEntityTable, "tcedil", 'ţ'), _defineProperty(_htmlEntityTable, "Tcy", 'Т'), _defineProperty(_htmlEntityTable, "tcy", 'т'), _defineProperty(_htmlEntityTable, "tdot", '⃛'), _defineProperty(_htmlEntityTable, "telrec", '⌕'), _defineProperty(_htmlEntityTable, "Tfr", '𝔗'), _defineProperty(_htmlEntityTable, "tfr", '𝔱'), _defineProperty(_htmlEntityTable, "there4", '∴'), _defineProperty(_htmlEntityTable, "therefore", '∴'), _defineProperty(_htmlEntityTable, "Therefore", '∴'), _defineProperty(_htmlEntityTable, "Theta", 'Θ'), _defineProperty(_htmlEntityTable, "theta", 'θ'), _defineProperty(_htmlEntityTable, "thetasym", 'ϑ'), _defineProperty(_htmlEntityTable, "thetav", 'ϑ'), _defineProperty(_htmlEntityTable, "thickapprox", '≈'), _defineProperty(_htmlEntityTable, "thicksim", '∼'), _defineProperty(_htmlEntityTable, "ThickSpace", '  '), _defineProperty(_htmlEntityTable, "ThinSpace", ' '), _defineProperty(_htmlEntityTable, "thinsp", ' '), _defineProperty(_htmlEntityTable, "thkap", '≈'), _defineProperty(_htmlEntityTable, "thksim", '∼'), _defineProperty(_htmlEntityTable, "THORN", 'Þ'), _defineProperty(_htmlEntityTable, "THOR", 'Þ'), _defineProperty(_htmlEntityTable, "thorn", 'þ'), _defineProperty(_htmlEntityTable, "thor", 'þ'), _defineProperty(_htmlEntityTable, "tilde", '˜'), _defineProperty(_htmlEntityTable, "Tilde", '∼'), _defineProperty(_htmlEntityTable, "TildeEqual", '≃'), _defineProperty(_htmlEntityTable, "TildeFullEqual", '≅'), _defineProperty(_htmlEntityTable, "TildeTilde", '≈'), _defineProperty(_htmlEntityTable, "timesbar", '⨱'), _defineProperty(_htmlEntityTable, "timesb", '⊠'), _defineProperty(_htmlEntityTable, "times", '×'), _defineProperty(_htmlEntityTable, "time", '×'), _defineProperty(_htmlEntityTable, "timesd", '⨰'), _defineProperty(_htmlEntityTable, "tint", '∭'), _defineProperty(_htmlEntityTable, "toea", '⤨'), _defineProperty(_htmlEntityTable, "topbot", '⌶'), _defineProperty(_htmlEntityTable, "topcir", '⫱'), _defineProperty(_htmlEntityTable, "top", '⊤'), _defineProperty(_htmlEntityTable, "Topf", '𝕋'), _defineProperty(_htmlEntityTable, "topf", '𝕥'), _defineProperty(_htmlEntityTable, "topfork", '⫚'), _defineProperty(_htmlEntityTable, "tosa", '⤩'), _defineProperty(_htmlEntityTable, "tprime", '‴'), _defineProperty(_htmlEntityTable, "trade", '™'), _defineProperty(_htmlEntityTable, "TRADE", '™'), _defineProperty(_htmlEntityTable, "triangle", '▵'), _defineProperty(_htmlEntityTable, "triangledown", '▿'), _defineProperty(_htmlEntityTable, "triangleleft", '◃'), _defineProperty(_htmlEntityTable, "trianglelefteq", '⊴'), _defineProperty(_htmlEntityTable, "triangleq", '≜'), _defineProperty(_htmlEntityTable, "triangleright", '▹'), _defineProperty(_htmlEntityTable, "trianglerighteq", '⊵'), _defineProperty(_htmlEntityTable, "tridot", '◬'), _defineProperty(_htmlEntityTable, "trie", '≜'), _defineProperty(_htmlEntityTable, "triminus", '⨺'), _defineProperty(_htmlEntityTable, "TripleDot", '⃛'), _defineProperty(_htmlEntityTable, "triplus", '⨹'), _defineProperty(_htmlEntityTable, "trisb", '⧍'), _defineProperty(_htmlEntityTable, "tritime", '⨻'), _defineProperty(_htmlEntityTable, "trpezium", '⏢'), _defineProperty(_htmlEntityTable, "Tscr", '𝒯'), _defineProperty(_htmlEntityTable, "tscr", '𝓉'), _defineProperty(_htmlEntityTable, "TScy", 'Ц'), _defineProperty(_htmlEntityTable, "tscy", 'ц'), _defineProperty(_htmlEntityTable, "TSHcy", 'Ћ'), _defineProperty(_htmlEntityTable, "tshcy", 'ћ'), _defineProperty(_htmlEntityTable, "Tstrok", 'Ŧ'), _defineProperty(_htmlEntityTable, "tstrok", 'ŧ'), _defineProperty(_htmlEntityTable, "twixt", '≬'), _defineProperty(_htmlEntityTable, "twoheadleftarrow", '↞'), _defineProperty(_htmlEntityTable, "twoheadrightarrow", '↠'), _defineProperty(_htmlEntityTable, "Uacute", 'Ú'), _defineProperty(_htmlEntityTable, "Uacut", 'Ú'), _defineProperty(_htmlEntityTable, "uacute", 'ú'), _defineProperty(_htmlEntityTable, "uacut", 'ú'), _defineProperty(_htmlEntityTable, "uarr", '↑'), _defineProperty(_htmlEntityTable, "Uarr", '↟'), _defineProperty(_htmlEntityTable, "uArr", '⇑'), _defineProperty(_htmlEntityTable, "Uarrocir", '⥉'), _defineProperty(_htmlEntityTable, "Ubrcy", 'Ў'), _defineProperty(_htmlEntityTable, "ubrcy", 'ў'), _defineProperty(_htmlEntityTable, "Ubreve", 'Ŭ'), _defineProperty(_htmlEntityTable, "ubreve", 'ŭ'), _defineProperty(_htmlEntityTable, "Ucirc", 'Û'), _defineProperty(_htmlEntityTable, "Ucir", 'Û'), _defineProperty(_htmlEntityTable, "ucirc", 'û'), _defineProperty(_htmlEntityTable, "ucir", 'û'), _defineProperty(_htmlEntityTable, "Ucy", 'У'), _defineProperty(_htmlEntityTable, "ucy", 'у'), _defineProperty(_htmlEntityTable, "udarr", '⇅'), _defineProperty(_htmlEntityTable, "Udblac", 'Ű'), _defineProperty(_htmlEntityTable, "udblac", 'ű'), _defineProperty(_htmlEntityTable, "udhar", '⥮'), _defineProperty(_htmlEntityTable, "ufisht", '⥾'), _defineProperty(_htmlEntityTable, "Ufr", '𝔘'), _defineProperty(_htmlEntityTable, "ufr", '𝔲'), _defineProperty(_htmlEntityTable, "Ugrave", 'Ù'), _defineProperty(_htmlEntityTable, "Ugrav", 'Ù'), _defineProperty(_htmlEntityTable, "ugrave", 'ù'), _defineProperty(_htmlEntityTable, "ugrav", 'ù'), _defineProperty(_htmlEntityTable, "uHar", '⥣'), _defineProperty(_htmlEntityTable, "uharl", '↿'), _defineProperty(_htmlEntityTable, "uharr", '↾'), _defineProperty(_htmlEntityTable, "uhblk", '▀'), _defineProperty(_htmlEntityTable, "ulcorn", '⌜'), _defineProperty(_htmlEntityTable, "ulcorner", '⌜'), _defineProperty(_htmlEntityTable, "ulcrop", '⌏'), _defineProperty(_htmlEntityTable, "ultri", '◸'), _defineProperty(_htmlEntityTable, "Umacr", 'Ū'), _defineProperty(_htmlEntityTable, "umacr", 'ū'), _defineProperty(_htmlEntityTable, "uml", '¨'), _defineProperty(_htmlEntityTable, "um", '¨'), _defineProperty(_htmlEntityTable, "UnderBar", '_'), _defineProperty(_htmlEntityTable, "UnderBrace", '⏟'), _defineProperty(_htmlEntityTable, "UnderBracket", '⎵'), _defineProperty(_htmlEntityTable, "UnderParenthesis", '⏝'), _defineProperty(_htmlEntityTable, "Union", '⋃'), _defineProperty(_htmlEntityTable, "UnionPlus", '⊎'), _defineProperty(_htmlEntityTable, "Uogon", 'Ų'), _defineProperty(_htmlEntityTable, "uogon", 'ų'), _defineProperty(_htmlEntityTable, "Uopf", '𝕌'), _defineProperty(_htmlEntityTable, "uopf", '𝕦'), _defineProperty(_htmlEntityTable, "UpArrowBar", '⤒'), _defineProperty(_htmlEntityTable, "uparrow", '↑'), _defineProperty(_htmlEntityTable, "UpArrow", '↑'), _defineProperty(_htmlEntityTable, "Uparrow", '⇑'), _defineProperty(_htmlEntityTable, "UpArrowDownArrow", '⇅'), _defineProperty(_htmlEntityTable, "updownarrow", '↕'), _defineProperty(_htmlEntityTable, "UpDownArrow", '↕'), _defineProperty(_htmlEntityTable, "Updownarrow", '⇕'), _defineProperty(_htmlEntityTable, "UpEquilibrium", '⥮'), _defineProperty(_htmlEntityTable, "upharpoonleft", '↿'), _defineProperty(_htmlEntityTable, "upharpoonright", '↾'), _defineProperty(_htmlEntityTable, "uplus", '⊎'), _defineProperty(_htmlEntityTable, "UpperLeftArrow", '↖'), _defineProperty(_htmlEntityTable, "UpperRightArrow", '↗'), _defineProperty(_htmlEntityTable, "upsi", 'υ'), _defineProperty(_htmlEntityTable, "Upsi", 'ϒ'), _defineProperty(_htmlEntityTable, "upsih", 'ϒ'), _defineProperty(_htmlEntityTable, "Upsilon", 'Υ'), _defineProperty(_htmlEntityTable, "upsilon", 'υ'), _defineProperty(_htmlEntityTable, "UpTeeArrow", '↥'), _defineProperty(_htmlEntityTable, "UpTee", '⊥'), _defineProperty(_htmlEntityTable, "upuparrows", '⇈'), _defineProperty(_htmlEntityTable, "urcorn", '⌝'), _defineProperty(_htmlEntityTable, "urcorner", '⌝'), _defineProperty(_htmlEntityTable, "urcrop", '⌎'), _defineProperty(_htmlEntityTable, "Uring", 'Ů'), _defineProperty(_htmlEntityTable, "uring", 'ů'), _defineProperty(_htmlEntityTable, "urtri", '◹'), _defineProperty(_htmlEntityTable, "Uscr", '𝒰'), _defineProperty(_htmlEntityTable, "uscr", '𝓊'), _defineProperty(_htmlEntityTable, "utdot", '⋰'), _defineProperty(_htmlEntityTable, "Utilde", 'Ũ'), _defineProperty(_htmlEntityTable, "utilde", 'ũ'), _defineProperty(_htmlEntityTable, "utri", '▵'), _defineProperty(_htmlEntityTable, "utrif", '▴'), _defineProperty(_htmlEntityTable, "uuarr", '⇈'), _defineProperty(_htmlEntityTable, "Uuml", 'Ü'), _defineProperty(_htmlEntityTable, "Uum", 'Ü'), _defineProperty(_htmlEntityTable, "uuml", 'ü'), _defineProperty(_htmlEntityTable, "uum", 'ü'), _defineProperty(_htmlEntityTable, "uwangle", '⦧'), _defineProperty(_htmlEntityTable, "vangrt", '⦜'), _defineProperty(_htmlEntityTable, "varepsilon", 'ϵ'), _defineProperty(_htmlEntityTable, "varkappa", 'ϰ'), _defineProperty(_htmlEntityTable, "varnothing", '∅'), _defineProperty(_htmlEntityTable, "varphi", 'ϕ'), _defineProperty(_htmlEntityTable, "varpi", 'ϖ'), _defineProperty(_htmlEntityTable, "varpropto", '∝'), _defineProperty(_htmlEntityTable, "varr", '↕'), _defineProperty(_htmlEntityTable, "vArr", '⇕'), _defineProperty(_htmlEntityTable, "varrho", 'ϱ'), _defineProperty(_htmlEntityTable, "varsigma", 'ς'), _defineProperty(_htmlEntityTable, "varsubsetneq", '⊊︀'), _defineProperty(_htmlEntityTable, "varsubsetneqq", '⫋︀'), _defineProperty(_htmlEntityTable, "varsupsetneq", '⊋︀'), _defineProperty(_htmlEntityTable, "varsupsetneqq", '⫌︀'), _defineProperty(_htmlEntityTable, "vartheta", 'ϑ'), _defineProperty(_htmlEntityTable, "vartriangleleft", '⊲'), _defineProperty(_htmlEntityTable, "vartriangleright", '⊳'), _defineProperty(_htmlEntityTable, "vBar", '⫨'), _defineProperty(_htmlEntityTable, "Vbar", '⫫'), _defineProperty(_htmlEntityTable, "vBarv", '⫩'), _defineProperty(_htmlEntityTable, "Vcy", 'В'), _defineProperty(_htmlEntityTable, "vcy", 'в'), _defineProperty(_htmlEntityTable, "vdash", '⊢'), _defineProperty(_htmlEntityTable, "vDash", '⊨'), _defineProperty(_htmlEntityTable, "Vdash", '⊩'), _defineProperty(_htmlEntityTable, "VDash", '⊫'), _defineProperty(_htmlEntityTable, "Vdashl", '⫦'), _defineProperty(_htmlEntityTable, "veebar", '⊻'), _defineProperty(_htmlEntityTable, "vee", '∨'), _defineProperty(_htmlEntityTable, "Vee", '⋁'), _defineProperty(_htmlEntityTable, "veeeq", '≚'), _defineProperty(_htmlEntityTable, "vellip", '⋮'), _defineProperty(_htmlEntityTable, "verbar", '|'), _defineProperty(_htmlEntityTable, "Verbar", '‖'), _defineProperty(_htmlEntityTable, "vert", '|'), _defineProperty(_htmlEntityTable, "Vert", '‖'), _defineProperty(_htmlEntityTable, "VerticalBar", '∣'), _defineProperty(_htmlEntityTable, "VerticalLine", '|'), _defineProperty(_htmlEntityTable, "VerticalSeparator", '❘'), _defineProperty(_htmlEntityTable, "VerticalTilde", '≀'), _defineProperty(_htmlEntityTable, "VeryThinSpace", ' '), _defineProperty(_htmlEntityTable, "Vfr", '𝔙'), _defineProperty(_htmlEntityTable, "vfr", '𝔳'), _defineProperty(_htmlEntityTable, "vltri", '⊲'), _defineProperty(_htmlEntityTable, "vnsub", '⊂⃒'), _defineProperty(_htmlEntityTable, "vnsup", '⊃⃒'), _defineProperty(_htmlEntityTable, "Vopf", '𝕍'), _defineProperty(_htmlEntityTable, "vopf", '𝕧'), _defineProperty(_htmlEntityTable, "vprop", '∝'), _defineProperty(_htmlEntityTable, "vrtri", '⊳'), _defineProperty(_htmlEntityTable, "Vscr", '𝒱'), _defineProperty(_htmlEntityTable, "vscr", '𝓋'), _defineProperty(_htmlEntityTable, "vsubnE", '⫋︀'), _defineProperty(_htmlEntityTable, "vsubne", '⊊︀'), _defineProperty(_htmlEntityTable, "vsupnE", '⫌︀'), _defineProperty(_htmlEntityTable, "vsupne", '⊋︀'), _defineProperty(_htmlEntityTable, "Vvdash", '⊪'), _defineProperty(_htmlEntityTable, "vzigzag", '⦚'), _defineProperty(_htmlEntityTable, "Wcirc", 'Ŵ'), _defineProperty(_htmlEntityTable, "wcirc", 'ŵ'), _defineProperty(_htmlEntityTable, "wedbar", '⩟'), _defineProperty(_htmlEntityTable, "wedge", '∧'), _defineProperty(_htmlEntityTable, "Wedge", '⋀'), _defineProperty(_htmlEntityTable, "wedgeq", '≙'), _defineProperty(_htmlEntityTable, "weierp", '℘'), _defineProperty(_htmlEntityTable, "Wfr", '𝔚'), _defineProperty(_htmlEntityTable, "wfr", '𝔴'), _defineProperty(_htmlEntityTable, "Wopf", '𝕎'), _defineProperty(_htmlEntityTable, "wopf", '𝕨'), _defineProperty(_htmlEntityTable, "wp", '℘'), _defineProperty(_htmlEntityTable, "wr", '≀'), _defineProperty(_htmlEntityTable, "wreath", '≀'), _defineProperty(_htmlEntityTable, "Wscr", '𝒲'), _defineProperty(_htmlEntityTable, "wscr", '𝓌'), _defineProperty(_htmlEntityTable, "xcap", '⋂'), _defineProperty(_htmlEntityTable, "xcirc", '◯'), _defineProperty(_htmlEntityTable, "xcup", '⋃'), _defineProperty(_htmlEntityTable, "xdtri", '▽'), _defineProperty(_htmlEntityTable, "Xfr", '𝔛'), _defineProperty(_htmlEntityTable, "xfr", '𝔵'), _defineProperty(_htmlEntityTable, "xharr", '⟷'), _defineProperty(_htmlEntityTable, "xhArr", '⟺'), _defineProperty(_htmlEntityTable, "Xi", 'Ξ'), _defineProperty(_htmlEntityTable, "xi", 'ξ'), _defineProperty(_htmlEntityTable, "xlarr", '⟵'), _defineProperty(_htmlEntityTable, "xlArr", '⟸'), _defineProperty(_htmlEntityTable, "xmap", '⟼'), _defineProperty(_htmlEntityTable, "xnis", '⋻'), _defineProperty(_htmlEntityTable, "xodot", '⨀'), _defineProperty(_htmlEntityTable, "Xopf", '𝕏'), _defineProperty(_htmlEntityTable, "xopf", '𝕩'), _defineProperty(_htmlEntityTable, "xoplus", '⨁'), _defineProperty(_htmlEntityTable, "xotime", '⨂'), _defineProperty(_htmlEntityTable, "xrarr", '⟶'), _defineProperty(_htmlEntityTable, "xrArr", '⟹'), _defineProperty(_htmlEntityTable, "Xscr", '𝒳'), _defineProperty(_htmlEntityTable, "xscr", '𝓍'), _defineProperty(_htmlEntityTable, "xsqcup", '⨆'), _defineProperty(_htmlEntityTable, "xuplus", '⨄'), _defineProperty(_htmlEntityTable, "xutri", '△'), _defineProperty(_htmlEntityTable, "xvee", '⋁'), _defineProperty(_htmlEntityTable, "xwedge", '⋀'), _defineProperty(_htmlEntityTable, "Yacute", 'Ý'), _defineProperty(_htmlEntityTable, "Yacut", 'Ý'), _defineProperty(_htmlEntityTable, "yacute", 'ý'), _defineProperty(_htmlEntityTable, "yacut", 'ý'), _defineProperty(_htmlEntityTable, "YAcy", 'Я'), _defineProperty(_htmlEntityTable, "yacy", 'я'), _defineProperty(_htmlEntityTable, "Ycirc", 'Ŷ'), _defineProperty(_htmlEntityTable, "ycirc", 'ŷ'), _defineProperty(_htmlEntityTable, "Ycy", 'Ы'), _defineProperty(_htmlEntityTable, "ycy", 'ы'), _defineProperty(_htmlEntityTable, "yen", '¥'), _defineProperty(_htmlEntityTable, "ye", '¥'), _defineProperty(_htmlEntityTable, "Yfr", '𝔜'), _defineProperty(_htmlEntityTable, "yfr", '𝔶'), _defineProperty(_htmlEntityTable, "YIcy", 'Ї'), _defineProperty(_htmlEntityTable, "yicy", 'ї'), _defineProperty(_htmlEntityTable, "Yopf", '𝕐'), _defineProperty(_htmlEntityTable, "yopf", '𝕪'), _defineProperty(_htmlEntityTable, "Yscr", '𝒴'), _defineProperty(_htmlEntityTable, "yscr", '𝓎'), _defineProperty(_htmlEntityTable, "YUcy", 'Ю'), _defineProperty(_htmlEntityTable, "yucy", 'ю'), _defineProperty(_htmlEntityTable, "yuml", 'ÿ'), _defineProperty(_htmlEntityTable, "yum", 'ÿ'), _defineProperty(_htmlEntityTable, "Yuml", 'Ÿ'), _defineProperty(_htmlEntityTable, "Zacute", 'Ź'), _defineProperty(_htmlEntityTable, "zacute", 'ź'), _defineProperty(_htmlEntityTable, "Zcaron", 'Ž'), _defineProperty(_htmlEntityTable, "zcaron", 'ž'), _defineProperty(_htmlEntityTable, "Zcy", 'З'), _defineProperty(_htmlEntityTable, "zcy", 'з'), _defineProperty(_htmlEntityTable, "Zdot", 'Ż'), _defineProperty(_htmlEntityTable, "zdot", 'ż'), _defineProperty(_htmlEntityTable, "zeetrf", 'ℨ'), _defineProperty(_htmlEntityTable, "ZeroWidthSpace", '​'), _defineProperty(_htmlEntityTable, "Zeta", 'Ζ'), _defineProperty(_htmlEntityTable, "zeta", 'ζ'), _defineProperty(_htmlEntityTable, "zfr", '𝔷'), _defineProperty(_htmlEntityTable, "Zfr", 'ℨ'), _defineProperty(_htmlEntityTable, "ZHcy", 'Ж'), _defineProperty(_htmlEntityTable, "zhcy", 'ж'), _defineProperty(_htmlEntityTable, "zigrarr", '⇝'), _defineProperty(_htmlEntityTable, "zopf", '𝕫'), _defineProperty(_htmlEntityTable, "Zopf", 'ℤ'), _defineProperty(_htmlEntityTable, "Zscr", '𝒵'), _defineProperty(_htmlEntityTable, "zscr", '𝓏'), _defineProperty(_htmlEntityTable, "zwj", '‍'), _defineProperty(_htmlEntityTable, "zwnj", '‌'), _htmlEntityTable);

function decodeHtmlEntities(html) {
  if (!html) {
    return html;
  }

  if (html.indexOf('&') === -1) {
    return html;
  }

  var text = html.replace(/&(#?[\w\d]+);/g, function (s, entity) {
    var c1 = entity.charAt(0);

    if (c1 === "#") {
      var c2 = entity.charAt(1);
      var code;

      if (c2 === 'x' || c2 === 'X') {
        code = parseInt(entity.substr(2), 16);
      } else {
        code = parseInt(entity.substr(1));
      }

      if (code > 0 && code <= 0xffff) {
        return String.fromCharCode(code);
      } else if (code >= 0x10000 && code <= 0x10ffff) {
        var x = code - 0x10000;
        var h = (x >> 10 & 0x03ff) + 0xd800;
        var l = (x & 0x03ff) + 0xdc00;
        return String.fromCharCode(h) + String.fromCharCode(l);
      } else {
        return isNaN(code) ? s : "\uFFFD";
      }
    } else {
      return htmlEntityTable[entity] || s;
    }
  });
  return text;
}

var BlockLexer =
/*#__PURE__*/
function () {
  function BlockLexer(options, props) {
    _classCallCheck(this, BlockLexer);

    this.states = [];
    this.topLevel = true;
    this.blockquote = false;
    this.links = {};
    this.input = this.remaining = '';
    this.options = mergeDefaults(options);
    this.rules = block$1.normal;
    this.tokens = [];

    if (this.options.pedantic) {
      this.rules = block$1.pedantic;
    } else if (this.options.gfm) {
      this.rules = block$1.gfm;
    }

    this.captureFunctions = [this.captureNewline, this.captureCode, this.captureFences, this.captureHeading, this.capturePipelessTable, this.captureHorizontalRule, this.captureBlockquote, this.captureList, this.captureHtml, this.captureDefinition, this.captureTable, this.captureUnderlineHeading, this.captureParagraph, this.captureText];
    Object.assign(this, props);
  }

  _createClass(BlockLexer, [{
    key: "tokenize",
    value: function tokenize(text) {
      this.initialize(text);
      this.process();
      return this.tokens;
    }
  }, {
    key: "initialize",
    value: function initialize(text) {
      text = text.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ').replace(/^ +$/gm, '');
      this.setState(text);
    }
  }, {
    key: "process",
    value: function process() {
      while (this.remaining) {
        this.append(this.captureToken());
      }
    }
  }, {
    key: "setState",
    value: function setState(text, props) {
      this.input = this.remaining = text.replace(/^ +$/gm, '');
      this.tokens = [];
      Object.assign(this, props);
    }
  }, {
    key: "pushState",
    value: function pushState() {
      this.states.push({
        input: this.input,
        remaining: this.remaining,
        tokens: this.tokens,
        topLevel: this.topLevel,
        blockquote: this.blockquote
      });
    }
  }, {
    key: "popState",
    value: function popState() {
      var state = this.states.pop();
      this.input = state.input;
      this.remaining = state.remaining;
      this.tokens = state.tokens;
      this.topLevel = state.topLevel;
      this.blockquote = state.blockquote;
    }
  }, {
    key: "append",
    value: function append(token) {
      if (!token) {
        return;
      }

      if (token.type === 'text_block') {
        var prevToken = this.tokens[this.tokens.length - 1]; // merge adjacent text tokens

        if (prevToken && prevToken.type === 'text_block') {
          if (prevToken.paragraph === token.paragraph) {
            prevToken.markdown += '\n' + token.markdown;
            return;
          }
        }
      }

      this.tokens.push(token);
    }
  }, {
    key: "capture",
    value: function capture(rule) {
      var regExp = this.rules[rule];
      var cap = regExp ? regExp.exec(this.remaining) : undefined;

      if (cap) {
        var len = cap[0].length;
        this.remaining = this.remaining.substr(len);
        return cap;
      }
    }
  }, {
    key: "backpedal",
    value: function backpedal(text) {
      this.remaining = text + this.remaining;
    }
  }, {
    key: "captureToken",
    value: function captureToken() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.captureFunctions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var f = _step.value;
          var token = f.call(this);

          if (token !== undefined) {
            return token;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (this.remaining) {
        throw new Error('Infinite loop on byte: ' + this.remaining.charCodeAt(0));
      }
    }
  }, {
    key: "captureNewline",
    value: function captureNewline() {
      var cap = this.capture('newline');

      if (cap) {
        if (cap[0].length > 1) {
          var type = 'space';
          return {
            type: type
          };
        }
      }
    }
  }, {
    key: "captureCode",
    value: function captureCode() {
      var cap = this.capture('code');

      if (cap) {
        var lastToken = this.tokens[this.tokens.length - 1]; // An indented code block cannot interrupt a paragraph.

        if (lastToken && lastToken.type === 'paragraph') {
          lastToken.markdown += '\n' + cap[0].trimRight();
          return null;
        }

        var type = 'code';

        var _text = cap[0].replace(/^ {4}/gm, '');

        if (!this.options.pedantic) {
          _text = _text.replace(/\n+$/, '');
        }

        return {
          type: type,
          text: _text
        };
      }
    }
  }, {
    key: "captureFences",
    value: function captureFences() {
      var cap = this.capture('fences');

      if (cap) {
        var info = cap[2] ? cap[2].trim() : '';
        var type = 'code';
        var lang = info.match(/\S*/)[0] || undefined;

        var _text2 = cap[3] || '';

        var highlighted = null;
        return {
          type: type,
          lang: lang,
          info: info,
          text: _text2,
          highlighted: highlighted
        };
      }
    }
  }, {
    key: "captureHeading",
    value: function captureHeading() {
      var cap = this.capture('heading');

      if (cap) {
        var type = 'heading';
        var variant = '#';
        var depth = cap[1].length;
        var markdown = cap[2];
        var children = null;
        return {
          type: type,
          variant: variant,
          depth: depth,
          markdown: markdown,
          children: children
        };
      }
    }
  }, {
    key: "capturePipelessTable",
    value: function capturePipelessTable() {
      return this.captureTable('nptable');
    }
  }, {
    key: "captureTable",
    value: function captureTable(rule) {
      var cap = this.capture(rule || 'table');

      if (cap) {
        var type = 'table';
        var header = this.lexTableHeader(rule, cap[1], cap[2]);
        var rows = this.lexTableRows(rule, cap[3], header);
        var children = [header].concat(_toConsumableArray(rows));
        return {
          type: type,
          children: children
        };
      }
    }
  }, {
    key: "lexTableAlignments",
    value: function lexTableAlignments(rule, text) {
      var items = text.replace(/^ *|\| *$/g, '').split(/ *\| */);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;
          var align = void 0;

          if (/^ *-+: *$/.test(item)) {
            align = 'right';
          } else if (/^ *:-+: *$/.test(item)) {
            align = 'center';
          } else if (/^ *:-+ *$/.test(item)) {
            align = 'left';
          } else {
            align = null;
          }

          aligments.push(align);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return alignments;
    }
  }, {
    key: "lexTableHeader",
    value: function lexTableHeader(rule, text, textAlign) {
      var type = 'table_header';
      var items = splitCells$1(text.replace(/^ *| *\| *$/g, ''));
      var itemsAlign = textAlign.replace(/^ *|\| *$/g, '').split(/ *\| */);
      var children = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = items.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              index = _step3$value[0],
              item = _step3$value[1];

          children.push(this.lexTableHeaderCell(rule, item, itemsAlign[index]));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return {
        type: type,
        children: children
      };
    }
  }, {
    key: "lexTableHeaderCell",
    value: function lexTableHeaderCell(rule, text, textAlign) {
      var type = 'table_header_cell';
      var align;

      if (/^ *-+: *$/.test(textAlign)) {
        align = 'right';
      } else if (/^ *:-+: *$/.test(textAlign)) {
        align = 'center';
      } else if (/^ *:-+ *$/.test(textAlign)) {
        align = 'left';
      } else {
        align = null;
      }

      var markdown = text;
      var children = null;
      return {
        type: type,
        align: align,
        markdown: markdown,
        children: children
      };
    }
  }, {
    key: "lexTableRows",
    value: function lexTableRows(rule, text, header) {
      var rows = [];

      if (text) {
        var items = text.replace(/\n$/, '').split('\n');
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var item = _step4.value;
            rows.push(this.lexTableRow(rule, item, header));
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }

      return rows;
    }
  }, {
    key: "lexTableRow",
    value: function lexTableRow(rule, text, header) {
      if (rule !== 'nptable') {
        text = text.replace(/^ *\| *| *\| *$/g, '');
      }

      var type = 'table_row';
      var children = [];
      var col = header.children.length;
      var items = splitCells$1(text, col);
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = items.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _step5$value = _slicedToArray(_step5.value, 2),
              index = _step5$value[0],
              item = _step5$value[1];

          var align = index < col ? header.children[index].align : null;
          children.push(this.lexTableRowCell(rule, item, align));
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return {
        type: type,
        children: children
      };
    }
  }, {
    key: "lexTableRowCell",
    value: function lexTableRowCell(rule, text, align) {
      var type = 'table_row_cell';
      var markdown = text;
      var children = null;
      return {
        type: type,
        align: align,
        markdown: markdown,
        children: children
      };
    }
  }, {
    key: "captureUnderlineHeading",
    value: function captureUnderlineHeading() {
      var cap = this.capture('lheading');

      if (cap) {
        var type = 'heading';
        var variant = cap[2].charAt(0);
        var depth = variant === '=' ? 1 : 2;
        var markdown = cap[1];
        var children = null;
        return {
          type: type,
          variant: variant,
          depth: depth,
          markdown: markdown,
          children: children
        };
      }
    }
  }, {
    key: "captureHorizontalRule",
    value: function captureHorizontalRule() {
      var cap = this.capture('hr');

      if (cap) {
        var type = 'hr';
        var variant = cap[1].charAt(0);
        return {
          type: type,
          variant: variant
        };
      }
    }
  }, {
    key: "captureBlockquote",
    value: function captureBlockquote() {
      var cap = this.capture('blockquote');

      if (cap) {
        var type = 'blockquote';

        var _text3 = cap[0].replace(/^ *> ?/gm, ''); // Keep the current "topLevel" state. This is exactly
        // how markdown.pl works.


        this.pushState();
        this.setState(_text3, {
          blockquote: true
        });
        this.process();
        var children = this.tokens;
        this.popState(); // put the text in a <p>

        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var child = _step6.value;

            if (child.type === 'text_block') {
              child.type = 'paragraph';
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        return {
          type: type,
          children: children
        };
      }
    }
  }, {
    key: "captureList",
    value: function captureList() {
      var cap = this.capture('list');

      if (cap) {
        var type = 'list';
        var bull = cap[2];
        var ordered = bull.length > 1;
        var variant = ordered ? undefined : bull;
        var first = ordered ? parseInt(bull) : undefined; // Get each top-level item.

        var items = cap[0].match(this.rules.item);
        var children = [];
        var loose = false;

        for (var i = 0, l = items.length; i < l; i++) {
          var item = items[i]; // Remove the list item's bullet
          // so it is seen as the next token.

          var space = item.length;
          item = item.replace(/^ *([*+-]|\d+\.) */, ''); // Outdent whatever the
          // list item contains. Hacky.

          if (~item.indexOf('\n ')) {
            space -= item.length;
            item = !this.options.pedantic ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '') : item.replace(/^ {1,4}/gm, '');
          } // Determine whether the next list item belongs here.
          // Backpedal if it does not belong in this list.


          if (i !== l - 1) {
            var b = block$1.bullet.exec(items[i + 1])[0];

            if (bull.length > 1 ? b.length === 1 : b.length > 1 || this.options.smartLists && b !== bull) {
              this.backpedal(items.slice(i + 1).join('\n'));
              i = l - 1;
            }
          } // Determine whether item is loose or not.
          // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
          // for discount behavior.


          if (!loose) {
            loose = /\n\n(?!\s*$)/.test(item);
          }

          if (i !== l - 1) {
            if (!loose) {
              loose = item.charAt(item.length - 1) === '\n';
            }
          } // Recurse.


          children.push(this.lexListItem(item));
        }

        if (loose) {
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var child = _step7.value;
              child.loose = loose;
              var _iteratorNormalCompletion8 = true;
              var _didIteratorError8 = false;
              var _iteratorError8 = undefined;

              try {
                for (var _iterator8 = child.children[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                  var itemChild = _step8.value;

                  if (itemChild.type === 'text_block') {
                    itemChild.type = 'paragraph';
                  }
                }
              } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                    _iterator8["return"]();
                  }
                } finally {
                  if (_didIteratorError8) {
                    throw _iteratorError8;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                _iterator7["return"]();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }

        return {
          type: type,
          variant: variant,
          ordered: ordered,
          first: first,
          children: children
        };
      }
    }
  }, {
    key: "lexListItem",
    value: function lexListItem(text) {
      var type = 'list_item';
      var checked;
      var checkbox = this.lexCheckbox(text);

      if (checkbox) {
        checked = checkbox.checked;
        text = text.substr(checkbox.offset);
      }

      var loose = false;
      this.pushState();
      this.setState(text, {
        topLevel: false,
        blockquote: false
      });
      this.process();
      var children = this.tokens;
      this.popState();
      return {
        type: type,
        checked: checked,
        loose: loose,
        children: children
      };
    }
  }, {
    key: "lexCheckbox",
    value: function lexCheckbox(text) {
      var ccap = /^\[([ xX])\] +/.exec(text);

      if (ccap) {
        return {
          checked: ccap[1] !== ' ',
          offset: ccap[0].length
        };
      }
    }
  }, {
    key: "captureHtml",
    value: function captureHtml() {
      var cap = this.capture('html');

      if (cap) {
        var multitag = cap[0].indexOf('<') !== cap[0].lastIndexOf('<');

        if (multitag && /^\s*<!\-\-/.test(cap[0])) {
          multitag = false;
        }

        if (multitag) {
          // process markdown content inside tags
          var type = 'html_block';
          var markdown = cap[0];
          var children = null;
          return {
            type: type,
            markdown: markdown,
            children: children
          };
        } else {
          // comment or instruction tag
          var _type = 'html_tag';
          var html = cap[0];
          return {
            type: _type,
            html: html
          };
        }
      }
    }
  }, {
    key: "captureDefinition",
    value: function captureDefinition() {
      if (!this.topLevel) {
        return;
      }

      var cap = this.capture('def');

      if (cap) {
        var type = 'def';
        var name = cap[1].toLowerCase().replace(/\s+/g, ' ');
        var hrefHtml = cap[2];
        var titleHtml;

        if (cap[3]) {
          titleHtml = cap[3].substring(1, cap[3].length - 1);
        }
        var title = this.decodeEntities(titleHtml);
        var href = this.decodeEntities(hrefHtml);
        this.setRefLink(name, {
          href: href,
          hrefHtml: hrefHtml,
          title: title,
          titleHtml: titleHtml
        });
        return {
          type: type,
          name: name,
          href: href,
          hrefHtml: hrefHtml,
          title: title,
          titleHtml: titleHtml
        };
      }
    }
  }, {
    key: "captureParagraph",
    value: function captureParagraph() {
      if (!this.topLevel) {
        return;
      }

      var cap = this.capture('paragraph');

      if (cap) {
        var type = 'paragraph';
        var markdown = cap[1];

        if (markdown.charAt(markdown.length - 1) === '\n') {
          markdown = text.slice(0, -1);
        }

        var children = null;
        return {
          type: type,
          markdown: markdown,
          children: children
        };
      }
    }
  }, {
    key: "captureText",
    value: function captureText() {
      var cap = this.capture('text');

      if (cap) {
        var type = 'text_block'; // Top-level should never reach here.

        if (this.topLevel) {
          console.warn('Unreachable code reached');
        }

        var markdown = cap[0];
        var children = null;
        return {
          type: type,
          markdown: markdown,
          children: children
        };
      }
    }
  }, {
    key: "decodeEntities",
    value: function decodeEntities(html) {
      return decodeHtmlEntities(html);
    }
  }, {
    key: "setRefLink",
    value: function setRefLink(name, link) {
      if (!this.links.hasOwnProperty(name)) {
        this.links[name] = link;
      }
    }
  }]);

  return BlockLexer;
}();

var InlineLexer =
/*#__PURE__*/
function () {
  function InlineLexer(options, props) {
    _classCallCheck(this, InlineLexer);

    this.states = [];
    this.inLink = false;
    this.inMarkdownLink = false;
    this.inMarkdownfreeTag = false;
    this.inMarkdownfreeBlock = false;
    this.capturingRaw = false;
    this.preservingText = false;
    this.links = {};
    this.remaining = '';
    this.options = mergeDefaults(options);
    this.rules = inline$1.normal;
    this.tokens = [];

    if (this.options.pedantic) {
      this.rules = inline$1.pedantic;
    } else if (this.options.gfm) {
      if (this.options.breaks) {
        this.rules = inline$1.breaks;
      } else {
        this.rules = inline$1.gfm;
      }
    }

    this.captureFunctions = [this.captureEscape, this.captureTag, this.captureLink, this.captureRefLink, this.captureNoLink, this.captureStrong, this.captureEmphasized, this.captureCode, this.captureLineBreak, this.captureDeleted, this.captureAutolink, this.captureUrl, this.captureBrokenTag, this.captureText];
    this.htmlCaptureFunctions = [this.captureTag, this.captureBrokenTag, this.captureText];
    Object.assign(this, props);
  }

  _createClass(InlineLexer, [{
    key: "tokenize",
    value: function tokenize(text, containerType) {
      this.initialize(text, containerType);
      this.process();
      return this.tokens;
    }
  }, {
    key: "initialize",
    value: function initialize(text, containerType) {
      this.setState(text, {
        inLink: false,
        inMarkdownfreeBlock: containerType === 'html_block',
        inMarkdownfreeTag: false,
        preservingText: false
      });
    }
  }, {
    key: "process",
    value: function process() {
      while (this.remaining) {
        var token = this.captureToken();
        this.append(token);
      }
    }
  }, {
    key: "setState",
    value: function setState(text, props) {
      this.input = this.remaining = text;
      this.tokens = [];
      Object.assign(this, props);
    }
  }, {
    key: "pushState",
    value: function pushState() {
      this.states.push({
        input: this.input,
        remaining: this.remaining,
        tokens: this.tokens,
        inMarkdownLink: this.inMarkdownLink
      });
    }
  }, {
    key: "popState",
    value: function popState() {
      var state = this.states.pop();
      this.input = state.input;
      this.remaining = state.remaining;
      this.tokens = state.tokens;
      this.inMarkdownLink = state.inMarkdownLink;
    }
  }, {
    key: "append",
    value: function append(token) {
      if (!token) {
        return;
      }

      if (token.type === 'text') {
        // merge adjacent text tokens
        var prevToken = this.tokens[this.tokens.length - 1];

        if (prevToken && prevToken.type === 'text') {
          prevToken.text += token.text;
          prevToken.html += token.html;
          return;
        }
      }

      if (token.markdown) {
        // process children
        var inMarkdownLink = token.type === 'link';
        this.pushState();
        this.setState(token.markdown, {
          inMarkdownLink: inMarkdownLink
        });
        this.process();
        token.children = this.tokens;
        this.popState();
      }

      this.tokens.push(token);
    }
  }, {
    key: "capture",
    value: function capture(name) {
      var regExp = this.rules[name];
      var cap = regExp.exec(this.remaining);

      if (cap) {
        var len = cap[0].length;
        this.remaining = this.remaining.substr(len);
        return cap;
      }
    }
  }, {
    key: "backpedal",
    value: function backpedal(text) {
      this.remaining = text + this.remaining;
    }
  }, {
    key: "findRefLink",
    value: function findRefLink(name) {
      if (this.links.hasOwnProperty(name)) {
        var link = this.links[name];

        if (link.href) {
          return link;
        }
      }
    }
  }, {
    key: "captureToken",
    value: function captureToken() {
      // only scan for tag and text when we're in a HTML or raw block
      var functions = this.inMarkdownfreeBlock || this.inMarkdownfreeTag ? this.htmlCaptureFunctions : this.captureFunctions;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = functions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var f = _step.value;
          var token = f.call(this);

          if (token !== undefined) {
            return token;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (this.remaining) {
        throw new Error('Infinite loop on byte: ' + this.remaining.charCodeAt(0));
      }
    }
  }, {
    key: "captureEscape",
    value: function captureEscape() {
      var cap = this.capture('escape');

      if (cap) {
        var type = 'text';
        var text = cap[1];
        var html = escape$1(text);
        return {
          type: type,
          text: text,
          html: html
        };
      }
    }
  }, {
    key: "captureAutolink",
    value: function captureAutolink() {
      var cap = this.capture('autolink');

      if (cap) {
        var type = 'autolink';
        var text = cap[1];
        var url = text;
        var href = cap[2] === '@' ? "mailto:".concat(url) : url;
        return {
          type: type,
          href: href,
          text: text
        };
      }
    }
  }, {
    key: "captureUrl",
    value: function captureUrl() {
      if (this.inLink || this.inMarkdownLink) {
        return;
      }

      var cap = this.capture('url');

      if (cap) {
        var type = 'url';

        if (cap[2] === '@') {
          var text = cap[0];
          var href = "mailto:".concat(text);
          return {
            type: type,
            href: href,
            text: text
          };
        } else {
          // do extended autolink path validation
          var capZero = cap[0],
              prevCapZero;

          do {
            prevCapZero = capZero;
            capZero = this.rules._backpedal.exec(capZero)[0];
          } while (prevCapZero !== capZero);

          if (cap[0].length !== capZero.length) {
            this.backpedal(cap[0].substr(capZero.length));
          }

          var _text = capZero;
          var _url = _text;

          var _href = cap[1] === 'www.' ? "http://".concat(_url) : _url;

          return {
            type: type,
            href: _href,
            text: _text
          };
        }
      }
    }
  }, {
    key: "captureTag",
    value: function captureTag() {
      var cap = this.capture('tag');

      if (cap) {
        var type = 'html_tag';
        var html = cap[0];

        if (!this.inLink && /^<a /i.test(cap[0])) {
          this.inLink = true;
        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
          this.inLink = false;
        }

        var tcap = /^<(\/?)(pre|code|kbd|script|style)(\s|>)/i.exec(cap[0]);

        if (tcap) {
          var tagName = tcap[2].toLowerCase();
          var start = !tcap[1];

          if (tagName === 'script' || tagName === 'style') {
            this.inMarkdownfreeTag = this.capturingRaw = start;
          } else if (tagName === 'pre' || tagName === 'code') {
            this.inMarkdownfreeTag = this.preservingText = start;
          } else {
            this.preservingText = start;
          }
        }

        return {
          type: type,
          html: html
        };
      }
    }
  }, {
    key: "captureLink",
    value: function captureLink() {
      var cap = this.capture('link');

      if (cap) {
        var type = cap[0].charAt(0) === '!' ? 'image' : 'link';
        var hrefHtml = cap[2];
        var titleHtml = cap[3];
        var lastParenIndex = findClosingBracket$1(hrefHtml, '()');

        if (lastParenIndex > -1) {
          var start = type === 'image' ? 5 : 4;
          var linkLen = start + cap[1].length + lastParenIndex;
          hrefHtml = hrefHtml.substring(0, lastParenIndex);
          titleHtml = undefined;
          var capZero = cap[0].substring(0, linkLen).trim();
          this.backpedal(cap[0].substr(capZero.length));
        }

        if (this.options.pedantic) {
          var link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(hrefHtml);

          if (link) {
            hrefHtml = link[1];
            titleHtml = link[3];
          }
        } else if (titleHtml) {
          titleHtml = titleHtml.slice(1, -1);
        }

        if (!titleHtml) {
          titleHtml = undefined;
        }

        hrefHtml = hrefHtml.trim().replace(/^<([\s\S]*)>$/, '$1');
        hrefHtml = this.unescapeSlashes(hrefHtml);
        titleHtml = this.unescapeSlashes(titleHtml);
        var title = this.decodeEntities(titleHtml);
        var href = this.decodeEntities(hrefHtml);

        if (type === 'image') {
          var text = cap[1];
          return {
            type: type,
            href: href,
            hrefHtml: hrefHtml,
            title: title,
            titleHtml: titleHtml,
            text: text
          };
        } else {
          var markdown = cap[1];
          var children = null;
          return {
            type: type,
            href: href,
            hrefHtml: hrefHtml,
            title: title,
            titleHtml: titleHtml,
            markdown: markdown,
            children: children
          };
        }
      }
    }
  }, {
    key: "captureNoLink",
    value: function captureNoLink() {
      return this.captureRefLink('nolink');
    }
  }, {
    key: "captureRefLink",
    value: function captureRefLink(rule) {
      var cap = this.capture(rule || 'reflink');

      if (cap) {
        var type = cap[0].charAt(0) === '!' ? 'image' : 'link';
        var ref = (cap[2] || cap[1]).replace(/\s+/g, ' ').toLowerCase();
        var link = this.findRefLink(ref);

        if (link) {
          var href = link.href,
              hrefHtml = link.hrefHtml,
              title = link.title,
              titleHtml = link.titleHtml;

          if (type === 'image') {
            var text = cap[1];
            return {
              type: type,
              ref: ref,
              href: href,
              hrefHtml: hrefHtml,
              title: title,
              titleHtml: titleHtml,
              text: text
            };
          } else {
            var markdown = cap[1];
            var children = null;
            return {
              type: type,
              ref: ref,
              href: href,
              hrefHtml: hrefHtml,
              title: title,
              titleHtml: titleHtml,
              markdown: markdown,
              children: children
            };
          }
        } else {
          this.backpedal(cap[0].substr(1));
          var _type = 'text';
          var html = cap[0].substr(0, 1);
          var _text2 = html;
          return {
            type: _type,
            text: _text2,
            html: html
          };
        }
      }
    }
  }, {
    key: "captureStrong",
    value: function captureStrong() {
      var cap = this.capture('strong');

      if (cap) {
        var type = 'strong';
        var variant = cap[0].charAt(0);
        var markdown = cap[4] || cap[3] || cap[2] || cap[1];
        var children = null;
        return {
          type: type,
          variant: variant,
          markdown: markdown,
          children: children
        };
      }
    }
  }, {
    key: "captureEmphasized",
    value: function captureEmphasized() {
      var cap = this.capture('em');

      if (cap) {
        var type = 'em';
        var variant = cap[0].charAt(0);
        var markdown = cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1];
        var children = null;
        return {
          type: type,
          variant: variant,
          markdown: markdown,
          children: children
        };
      }
    }
  }, {
    key: "captureCode",
    value: function captureCode() {
      var cap = this.capture('code');

      if (cap) {
        var type = 'codespan';
        var text = cap[2].trim();
        return {
          type: type,
          text: text
        };
      }
    }
  }, {
    key: "captureLineBreak",
    value: function captureLineBreak() {
      var cap = this.capture('br');

      if (cap) {
        if (this.inMarkdownfreeBlock) {
          // don't add <BR> tag when we're in a HTML block
          var type = 'text';
          var text = cap[0];
          var html = text;
          return {
            type: type,
            text: text,
            html: html
          };
        } else {
          var _type2 = 'br';
          return {
            type: _type2
          };
        }
      }
    }
  }, {
    key: "captureDeleted",
    value: function captureDeleted() {
      var cap = this.capture('del');

      if (cap) {
        var type = 'del';
        var markdown = cap[1];
        var children = null;
        return {
          type: type,
          markdown: markdown,
          children: children
        };
      }
    }
  }, {
    key: "captureText",
    value: function captureText() {
      var cap = this.capture('text');

      if (cap) {
        if (!this.capturingRaw) {
          var type = 'text';
          var html = this.transformText(cap[0]);
          var text = this.decodeEntities(html);
          return {
            type: type,
            text: text,
            html: html
          };
        } else {
          var _type3 = 'raw';
          var _html = cap[0];
          return {
            type: _type3,
            html: _html
          };
        }
      }
    }
  }, {
    key: "unescapeSlashes",
    value: function unescapeSlashes(text) {
      if (text) {
        return text.replace(this.rules._escapes, '$1');
      }

      return text;
    }
  }, {
    key: "decodeEntities",
    value: function decodeEntities(html) {
      return decodeHtmlEntities(html);
    }
  }, {
    key: "transformText",
    value: function transformText(text) {
      var smartypants = this.options.smartypants;

      if (smartypants && !this.preservingText) {
        return text // em-dashes
        .replace(/---/g, "\u2014") // en-dashes
        .replace(/--/g, "\u2013") // opening singles
        .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018") // closing singles & apostrophes
        .replace(/'/g, "\u2019") // opening doubles
        .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C") // closing doubles
        .replace(/"/g, "\u201D") // ellipses
        .replace(/\.{3}/g, "\u2026");
      }

      return text;
    }
  }, {
    key: "captureBrokenTag",
    value: function captureBrokenTag() {
      if (!this.options.fixBrokenTags) {
        return;
      }

      var cap = /^<(img|a)\s+([^<>]*?)(\/?)>/i.exec(this.remaining);

      if (cap) {
        var tagName = cap[1];
        var attributes = [];
        var s = cap[2];

        var extract = function extract(pattern, qm) {
          s = s.replace(pattern, function (match, name, value) {
            if (qm) {
              attributes.push("".concat(name, "=").concat(qm).concat(value).concat(qm));
            } else {
              attributes.push(name);
            }

            return '';
          });
        }; // extract correctly delimited attributes


        extract(/([^\s=]+)\s*=\s*"([^"]*)"/g, '"');
        extract(/([^\s=]+)\s*=\s*'([^']*)'/g, "'"); // extract attributes with missing close quotation mark

        extract(/([^\s=]+)\s*=\s*"([^"]*)$/, '"');
        extract(/([^\s=]+)\s*=\s*'([^']*)$/, "'"); // extract attributes with missing open quotation mark

        extract(/([^\s=]+)\s*=\s*([^"]+)"/g, '"');
        extract(/([^\s=]+)\s*=\s*([^']+)'/g, "'"); // extract unquoted attributes

        extract(/([^\s=]+)\s*=\s*(\S+)/g, '"'); // extract boolean attributes

        extract(/(\w+)\s*(?!\=)/g);
        var tagFixed = "<".concat(tagName, " ").concat(attributes.join(' '), ">");
        var rollback = this.remaining;
        this.remaining = tagFixed + this.remaining.substr(cap[0].length);
        var token = this.captureTag();

        if (token) {
          return token;
        } else {
          this.remaining = rollback;
        }
      }
    }
  }]);

  return InlineLexer;
}();

var Parser =
/*#__PURE__*/
function () {
  function Parser(options, props) {
    _classCallCheck(this, Parser);

    this.options = mergeDefaults(options);
    this.blockLexer = null;
    this.blockLexerClass = BlockLexer;
    this.inlineLexer = null;
    this.inlineLexerClass = InlineLexer;
    this.text = '';
    this.tokens = [];
    Object.assign(this, props);
  }

  _createClass(Parser, [{
    key: "initialize",
    value: function initialize(text) {
      this.text = text;
      this.tokens = [];
      this.blockLexer = new this.blockLexerClass(this.options);
      this.inlineLexer = new this.inlineLexerClass(this.options, {
        links: this.blockLexer.links
      });
    }
  }, {
    key: "parse",
    value: function parse(text) {
      this.initialize(text);
      this.processBlocks();
      this.processInline();
      return this.tokens;
    }
  }, {
    key: "processBlocks",
    value: function processBlocks() {
      if (this.options.htmlOnly) {
        var type = 'html_block';
        var markdown = this.text;
        var children = null;
        this.tokens = [{
          type: type,
          markdown: markdown,
          children: children
        }];
      } else {
        this.tokens = this.blockLexer.tokenize(this.text);
      }
    }
  }, {
    key: "processInline",
    value: function processInline(tokens) {
      this.tokenizeInline(this.tokens);
    }
  }, {
    key: "tokenizeInline",
    value: function tokenizeInline(tokens) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = tokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var token = _step.value;
          var children = token.children,
              markdown = token.markdown,
              type = token.type;

          if (children) {
            this.tokenizeInline(children);
          } else if (markdown) {
            token.children = this.inlineLexer.tokenize(markdown, type);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return Parser;
}();

var AsyncInlineLexer =
/*#__PURE__*/
function (_InlineLexer) {
  _inherits(AsyncInlineLexer, _InlineLexer);

  function AsyncInlineLexer() {
    _classCallCheck(this, AsyncInlineLexer);

    return _possibleConstructorReturn(this, _getPrototypeOf(AsyncInlineLexer).apply(this, arguments));
  }

  _createClass(AsyncInlineLexer, [{
    key: "tokenize",
    value: function () {
      var _tokenize = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(text, containerType) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.initialize(text, containerType);
                _context.next = 3;
                return this.process();

              case 3:
                return _context.abrupt("return", this.tokens);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function tokenize(_x, _x2) {
        return _tokenize.apply(this, arguments);
      }

      return tokenize;
    }()
  }, {
    key: "process",
    value: function () {
      var _process = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.remaining) {
                  _context2.next = 7;
                  break;
                }

                token = this.captureToken();
                this.append(token);
                _context2.next = 5;
                return nextTick();

              case 5:
                _context2.next = 0;
                break;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function process() {
        return _process.apply(this, arguments);
      }

      return process;
    }()
  }]);

  return AsyncInlineLexer;
}(InlineLexer);

var AsyncBlockLexer =
/*#__PURE__*/
function (_BlockLexer) {
  _inherits(AsyncBlockLexer, _BlockLexer);

  function AsyncBlockLexer() {
    _classCallCheck(this, AsyncBlockLexer);

    return _possibleConstructorReturn(this, _getPrototypeOf(AsyncBlockLexer).apply(this, arguments));
  }

  _createClass(AsyncBlockLexer, [{
    key: "tokenize",
    value: function () {
      var _tokenize = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(text) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.initialize(text);
                _context.next = 3;
                return this.process();

              case 3:
                return _context.abrupt("return", this.tokens);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function tokenize(_x) {
        return _tokenize.apply(this, arguments);
      }

      return tokenize;
    }()
  }, {
    key: "process",
    value: function () {
      var _process = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.remaining) {
                  _context2.next = 7;
                  break;
                }

                token = this.captureToken();
                this.append(token);
                _context2.next = 5;
                return nextTick();

              case 5:
                _context2.next = 0;
                break;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function process() {
        return _process.apply(this, arguments);
      }

      return process;
    }()
  }]);

  return AsyncBlockLexer;
}(BlockLexer);

var AsyncParser =
/*#__PURE__*/
function (_Parser) {
  _inherits(AsyncParser, _Parser);

  function AsyncParser(options, props) {
    _classCallCheck(this, AsyncParser);

    return _possibleConstructorReturn(this, _getPrototypeOf(AsyncParser).call(this, options, _objectSpread2({
      blockLexerClass: AsyncBlockLexer,
      inlineLexerClass: AsyncInlineLexer
    }, props)));
  }

  _createClass(AsyncParser, [{
    key: "parse",
    value: function () {
      var _parse = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(text) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.initialize(text);
                _context.next = 3;
                return this.processBlocks();

              case 3:
                _context.next = 5;
                return this.processInline();

              case 5:
                return _context.abrupt("return", this.tokens);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function parse(_x) {
        return _parse.apply(this, arguments);
      }

      return parse;
    }()
  }, {
    key: "processBlocks",
    value: function () {
      var _processBlocks = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.blockLexer.tokenize(this.text);

              case 2:
                this.tokens = _context2.sent;

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function processBlocks() {
        return _processBlocks.apply(this, arguments);
      }

      return processBlocks;
    }()
  }, {
    key: "processInline",
    value: function () {
      var _processInline = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(tokens) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.tokenizeInline(this.tokens);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function processInline(_x2) {
        return _processInline.apply(this, arguments);
      }

      return processInline;
    }()
  }, {
    key: "tokenizeInline",
    value: function () {
      var _tokenizeInline = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(tokens) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, token, children, markdown, type;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context4.prev = 3;
                _iterator = tokens[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context4.next = 20;
                  break;
                }

                token = _step.value;
                children = token.children, markdown = token.markdown, type = token.type;

                if (!children) {
                  _context4.next = 13;
                  break;
                }

                _context4.next = 11;
                return this.tokenizeInline(children);

              case 11:
                _context4.next = 17;
                break;

              case 13:
                if (!markdown) {
                  _context4.next = 17;
                  break;
                }

                _context4.next = 16;
                return this.inlineLexer.tokenize(markdown, type);

              case 16:
                token.children = _context4.sent;

              case 17:
                _iteratorNormalCompletion = true;
                _context4.next = 5;
                break;

              case 20:
                _context4.next = 26;
                break;

              case 22:
                _context4.prev = 22;
                _context4.t0 = _context4["catch"](3);
                _didIteratorError = true;
                _iteratorError = _context4.t0;

              case 26:
                _context4.prev = 26;
                _context4.prev = 27;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 29:
                _context4.prev = 29;

                if (!_didIteratorError) {
                  _context4.next = 32;
                  break;
                }

                throw _iteratorError;

              case 32:
                return _context4.finish(29);

              case 33:
                return _context4.finish(26);

              case 34:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 22, 26, 34], [27,, 29, 33]]);
      }));

      function tokenizeInline(_x3) {
        return _tokenizeInline.apply(this, arguments);
      }

      return tokenizeInline;
    }()
  }]);

  return AsyncParser;
}(Parser);

var BaseSlugger =
/*#__PURE__*/
function () {
  function BaseSlugger(illegal) {
    _classCallCheck(this, BaseSlugger);

    this.seen = {};
    this.illegal = illegal;
  }

  _createClass(BaseSlugger, [{
    key: "slug",
    value: function slug(value) {
      var slug = value.toLowerCase().trim().replace(this.illegal, '').replace(/\s/g, '-');

      if (this.seen.hasOwnProperty(slug)) {
        var originalSlug = slug;

        do {
          this.seen[originalSlug]++;
          slug = originalSlug + '-' + this.seen[originalSlug];
        } while (this.seen.hasOwnProperty(slug));
      }

      this.seen[slug] = 0;
      return slug;
    }
  }]);

  return BaseSlugger;
}();

var notLetterOrMark = /[\u0021-\u002c\u002e-\u002f\u003a-\u0040\u005b-\u005e\u0060\u007b-\u009f\u00a1-\u00a9\u00ab-\u00b4\u00b6-\u00b9\u00bb-\u00bf\u00d7\u00f7\u02c2-\u02c5\u02d2-\u02df\u02e5-\u02eb\u02ed\u02ef-\u02ff\u0375\u0378-\u0379\u037e\u0380-\u0385\u0387\u038b\u038d\u03a2\u03f6\u0482\u0530\u0557-\u0558\u055a-\u055f\u0589-\u0590\u05be\u05c0\u05c3\u05c6\u05c8-\u05cf\u05eb-\u05ee\u05f3-\u060f\u061b-\u061f\u0660-\u066d\u06d4\u06dd-\u06de\u06e9\u06f0-\u06f9\u06fd-\u06fe\u0700-\u070f\u074b-\u074c\u07b2-\u07c9\u07f6-\u07f9\u07fb-\u07fc\u07fe-\u07ff\u082e-\u083f\u085c-\u085f\u086b-\u089f\u08b5\u08be-\u08d2\u08e2\u0964-\u0970\u0984\u098d-\u098e\u0991-\u0992\u09a9\u09b1\u09b3-\u09b5\u09ba-\u09bb\u09c5-\u09c6\u09c9-\u09ca\u09cf-\u09d6\u09d8-\u09db\u09de\u09e4-\u09ef\u09f2-\u09fb\u09fd\u09ff-\u0a00\u0a04\u0a0b-\u0a0e\u0a11-\u0a12\u0a29\u0a31\u0a34\u0a37\u0a3a-\u0a3b\u0a3d\u0a43-\u0a46\u0a49-\u0a4a\u0a4e-\u0a50\u0a52-\u0a58\u0a5d\u0a5f-\u0a6f\u0a76-\u0a80\u0a84\u0a8e\u0a92\u0aa9\u0ab1\u0ab4\u0aba-\u0abb\u0ac6\u0aca\u0ace-\u0acf\u0ad1-\u0adf\u0ae4-\u0af8\u0b00\u0b04\u0b0d-\u0b0e\u0b11-\u0b12\u0b29\u0b31\u0b34\u0b3a-\u0b3b\u0b45-\u0b46\u0b49-\u0b4a\u0b4e-\u0b55\u0b58-\u0b5b\u0b5e\u0b64-\u0b70\u0b72-\u0b81\u0b84\u0b8b-\u0b8d\u0b91\u0b96-\u0b98\u0b9b\u0b9d\u0ba0-\u0ba2\u0ba5-\u0ba7\u0bab-\u0bad\u0bba-\u0bbd\u0bc3-\u0bc5\u0bc9\u0bce-\u0bcf\u0bd1-\u0bd6\u0bd8-\u0bff\u0c0d\u0c11\u0c29\u0c3a-\u0c3c\u0c45\u0c49\u0c4e-\u0c54\u0c57\u0c5b-\u0c5f\u0c64-\u0c7f\u0c84\u0c8d\u0c91\u0ca9\u0cb4\u0cba-\u0cbb\u0cc5\u0cc9\u0cce-\u0cd4\u0cd7-\u0cdd\u0cdf\u0ce4-\u0cf0\u0cf3-\u0cff\u0d04\u0d0d\u0d11\u0d45\u0d49\u0d4f-\u0d53\u0d58-\u0d5e\u0d64-\u0d79\u0d80-\u0d81\u0d84\u0d97-\u0d99\u0db2\u0dbc\u0dbe-\u0dbf\u0dc7-\u0dc9\u0dcb-\u0dce\u0dd5\u0dd7\u0de0-\u0df1\u0df4-\u0e00\u0e3b-\u0e3f\u0e4f-\u0e80\u0e83\u0e85\u0e8b\u0ea4\u0ea6\u0ebe-\u0ebf\u0ec5\u0ec7\u0ece-\u0edb\u0ee0-\u0eff\u0f01-\u0f17\u0f1a-\u0f34\u0f36\u0f38\u0f3a-\u0f3d\u0f48\u0f6d-\u0f70\u0f85\u0f98\u0fbd-\u0fc5\u0fc7-\u0fff\u1040-\u104f\u1090-\u1099\u109e-\u109f\u10c6\u10c8-\u10cc\u10ce-\u10cf\u10fb\u1249\u124e-\u124f\u1257\u1259\u125e-\u125f\u1289\u128e-\u128f\u12b1\u12b6-\u12b7\u12bf\u12c1\u12c6-\u12c7\u12d7\u1311\u1316-\u1317\u135b-\u135c\u1360-\u137f\u1390-\u139f\u13f6-\u13f7\u13fe-\u1400\u166d-\u166e\u169b-\u169f\u16eb-\u16f0\u16f9-\u16ff\u170d\u1715-\u171f\u1735-\u173f\u1754-\u175f\u176d\u1771\u1774-\u177f\u17d4-\u17d6\u17d8-\u17db\u17de-\u180a\u180e-\u181f\u1879-\u187f\u18ab-\u18af\u18f6-\u18ff\u191f\u192c-\u192f\u193c-\u194f\u196e-\u196f\u1975-\u197f\u19ac-\u19af\u19ca-\u19ff\u1a1c-\u1a1f\u1a5f\u1a7d-\u1a7e\u1a80-\u1aa6\u1aa8-\u1aaf\u1abf-\u1aff\u1b4c-\u1b6a\u1b74-\u1b7f\u1bb0-\u1bb9\u1bf4-\u1bff\u1c38-\u1c4c\u1c50-\u1c59\u1c7e-\u1c7f\u1c89-\u1c8f\u1cbb-\u1cbc\u1cc0-\u1ccf\u1cd3\u1cfb-\u1cff\u1dfa\u1f16-\u1f17\u1f1e-\u1f1f\u1f46-\u1f47\u1f4e-\u1f4f\u1f58\u1f5a\u1f5c\u1f5e\u1f7e-\u1f7f\u1fb5\u1fbd\u1fbf-\u1fc1\u1fc5\u1fcd-\u1fcf\u1fd4-\u1fd5\u1fdc-\u1fdf\u1fed-\u1ff1\u1ff5\u1ffd-\u1fff\u200b-\u2027\u202a-\u202e\u2030-\u205e\u2060-\u2070\u2072-\u207e\u2080-\u208f\u209d-\u20cf\u20f1-\u2101\u2103-\u2106\u2108-\u2109\u2114\u2116-\u2118\u211e-\u2123\u2125\u2127\u2129\u212e\u213a-\u213b\u2140-\u2144\u214a-\u214d\u214f-\u2182\u2185-\u2bff\u2c2f\u2c5f\u2ce5-\u2cea\u2cf4-\u2cff\u2d26\u2d28-\u2d2c\u2d2e-\u2d2f\u2d68-\u2d6e\u2d70-\u2d7e\u2d97-\u2d9f\u2da7\u2daf\u2db7\u2dbf\u2dc7\u2dcf\u2dd7\u2ddf\u2e00-\u2e2e\u2e30-\u2fff\u3001-\u3004\u3007-\u3029\u3030\u3036-\u303a\u303d-\u3040\u3097-\u3098\u309b-\u309c\u30a0\u30fb\u3100-\u3104\u3130\u318f-\u319f\u31bb-\u31ef\u3200-\u33ff\u4db6-\u4dff\u9ff0-\u9fff\ua48d-\ua4cf\ua4fe-\ua4ff\ua60d-\ua60f\ua620-\ua629\ua62c-\ua63f\ua673\ua67e\ua6e6-\ua6ef\ua6f2-\ua716\ua720-\ua721\ua789-\ua78a\ua7c0-\ua7c1\ua7c7-\ua7f6\ua828-\ua83f\ua874-\ua87f\ua8c6-\ua8df\ua8f8-\ua8fa\ua8fc\ua900-\ua909\ua92e-\ua92f\ua954-\ua95f\ua97d-\ua97f\ua9c1-\ua9ce\ua9d0-\ua9df\ua9f0-\ua9f9\ua9ff\uaa37-\uaa3f\uaa4e-\uaa5f\uaa77-\uaa79\uaac3-\uaada\uaade-\uaadf\uaaf0-\uaaf1\uaaf7-\uab00\uab07-\uab08\uab0f-\uab10\uab17-\uab1f\uab27\uab2f\uab5b\uab68-\uab6f\uabeb\uabee-\uabff\ud7a4-\ud7af\ud7c7-\ud7ca\ud7fc-\uf8ff\ufa6e-\ufa6f\ufada-\ufaff\ufb07-\ufb12\ufb18-\ufb1c\ufb29\ufb37\ufb3d\ufb3f\ufb42\ufb45\ufbb2-\ufbd2\ufd3e-\ufd4f\ufd90-\ufd91\ufdc8-\ufdef\ufdfc-\ufdff\ufe10-\ufe1f\ufe30-\ufe6f\ufe75\ufefd-\ufefe\uff00-\uff20\uff3b-\uff40\uff5b-\uff65\uffbf-\uffc1\uffc8-\uffc9\uffd0-\uffd1\uffd8-\uffd9]+/g;
var someSymbols = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;

var Slugger =
/*#__PURE__*/
function (_BaseSlugger) {
  _inherits(Slugger, _BaseSlugger);

  function Slugger() {
    _classCallCheck(this, Slugger);

    return _possibleConstructorReturn(this, _getPrototypeOf(Slugger).call(this, notLetterOrMark));
  }

  return Slugger;
}(BaseSlugger);

var MarkedSlugger =
/*#__PURE__*/
function (_BaseSlugger2) {
  _inherits(MarkedSlugger, _BaseSlugger2);

  function MarkedSlugger() {
    _classCallCheck(this, MarkedSlugger);

    return _possibleConstructorReturn(this, _getPrototypeOf(MarkedSlugger).call(this, someSymbols));
  }

  return MarkedSlugger;
}(BaseSlugger);

function any(list) {
  return function (name) {
    return list.indexOf(name) !== -1;
  };
}

function not(list) {
  return function (name) {
    return list.indexOf(name) === -1;
  };
}

var block$2 = {
  block: true
};
var childless = {
  "void": true
};
var style = {
  styles: true
};
var unknown = {
  unknown: true
};
var a = {
  endsOn: any(['a']),
  styles: true
};
var address = block$2;
var area = childless;
var article = block$2;
var aside = block$2;
var blockquote = block$2;
var canvas = block$2;
var b = style;
var base = childless;
var br = {
  vivificates: true,
  "void": true
};
var caption = {
  endsOn: any(['td', 'tr', 'tbody', 'thead', 'tfoot', 'colgroup', 'col'])
};
var code = style;
var col = childless;
var colgroup = {
  endsOn: not(['col']),
  evicts: true
};
var command = childless;
var dd = {
  block: true,
  endsOn: any(['dd', 'dt'])
};
var div = block$2;
var dl = block$2;
var dt = dd;
var em = style;
var embed = childless;
var fieldset = block$2;
var figcaption = block$2;
var figure = block$2;
var footer = block$2;
var form = block$2;
var header = block$2;
var h1 = {
  block: true,
  endsOn: any(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
};
var h2 = h1;
var h3 = h1;
var h4 = h1;
var h5 = h1;
var h6 = h1;
var hr = {
  block: true,
  "void": true
};
var i = style;
var img = childless;
var input = childless;
var keygen = childless;
var li = {
  block: true,
  endsOn: any(['li'])
};
var link = childless;
var main = block$2;
var meta = childless;
var nav = block$2;
var noscript = block$2;
var ol = {
  block: true,
  expects: any(['li'])
};
var p = {
  block: true,
  endsOn: any(['address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'main', 'menu', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul']),
  vivificates: true
};
var param = childless;
var pre = {
  block: true,
  trims: true
};
var section = block$2;
var source = childless;
var small = style;
var strong = style;
var table = {
  block: true,
  clears: true,
  evicts: true,
  expects: any(['td', 'tr', 'tbody', 'thead', 'tfoot', 'caption', 'colgroup', 'col']),
  implicit: {
    tr: 'tbody',
    td: 'tbody',
    th: 'tbody',
    col: 'colgroup'
  }
};
var tbody = {
  clears: true,
  endsOn: any(['tbody', 'thead', 'tfoot']),
  evicts: true,
  expects: any(['tr']),
  implicit: {
    td: 'tr',
    th: 'tr'
  }
};
var td = {
  clears: true,
  endsOn: any(['td', 'th'])
};
var tfoot = tbody;
var th = td;
var thead = tbody;
var tr = {
  clears: true,
  endsOn: any(['tr']),
  evicts: true,
  expects: any(['td', 'th'])
};
var track = childless;
var u = style;
var ul = ol;
var wbr = childless;
var tagProperties = {
  a: a,
  address: address,
  area: area,
  article: article,
  aside: aside,
  blockquote: blockquote,
  canvas: canvas,
  b: b,
  base: base,
  br: br,
  caption: caption,
  code: code,
  col: col,
  colgroup: colgroup,
  command: command,
  dd: dd,
  div: div,
  dl: dl,
  dt: dt,
  em: em,
  embed: embed,
  fieldset: fieldset,
  figcaption: figcaption,
  figure: figure,
  footer: footer,
  form: form,
  header: header,
  h1: h1,
  h2: h2,
  h3: h3,
  h4: h4,
  h5: h5,
  h6: h6,
  hr: hr,
  i: i,
  img: img,
  input: input,
  keygen: keygen,
  li: li,
  link: link,
  main: main,
  meta: meta,
  nav: nav,
  noscript: noscript,
  ol: ol,
  p: p,
  param: param,
  pre: pre,
  section: section,
  source: source,
  small: small,
  strong: strong,
  table: table,
  tbody: tbody,
  td: td,
  tfoot: tfoot,
  th: th,
  thead: thead,
  tr: tr,
  track: track,
  u: u,
  ul: ul,
  wbr: wbr
};

function getTagProperties(tagName) {
  return tagProperties[tagName] || unknown;
}

var tagAliases = {
  image: 'img'
};

function findTagAlias(tagName) {
  return tagAliases[tagName];
}

var BaseRenderer =
/*#__PURE__*/
function () {
  function BaseRenderer(options, props) {
    _classCallCheck(this, BaseRenderer);

    this.options = mergeDefaults(options);
    this.slugger = null;

    if (this.options.headerFormat === 'marked') {
      this.sluggerClass = MarkedSlugger;
    } else {
      this.sluggerClass = Slugger;
    }

    this.renderFunctions = {
      text: this.renderText,
      text_block: this.renderTextBlock,
      space: this.renderSpace,
      strong: this.renderStrong,
      em: this.renderEmphasized,
      codespan: this.renderCodeSpan,
      del: this.renderDeleted,
      br: this.renderLineBreak,
      link: this.renderLink,
      autolink: this.renderAutolink,
      url: this.renderUrl,
      image: this.renderImage,
      html_block: this.renderHtmlBlock,
      paragraph: this.renderParagraph,
      code: this.renderCode,
      blockquote: this.renderBlockquote,
      html_tag: this.renderHtmlTag,
      heading: this.renderHeading,
      hr: this.renderHorizontalRule,
      list: this.renderList,
      list_item: this.renderListItem,
      loose_item: this.renderLooseItem,
      table: this.renderTable,
      table_header: this.renderTableHeader,
      table_row: this.renderTableRow,
      table_header_cell: this.renderTableHeaderCell,
      table_row_cell: this.renderTableRowCell,
      def: this.renderRefDefinition,
      raw: this.renderRaw
    };
    Object.assign(this, props);
  }

  _createClass(BaseRenderer, [{
    key: "output",
    value: function output() {
      /* abstract */
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.tokens = [];
      this.slugger = new this.sluggerClass();
    }
  }, {
    key: "addToken",
    value: function addToken(token) {
      this.tokens.push(token);
    }
  }, {
    key: "addText",
    value: function addText(text) {
      var type = 'text';
      this.addToken({
        type: type,
        text: text
      });
    }
  }, {
    key: "addLinefeed",
    value: function addLinefeed() {
      var omitLinefeed = this.options.omitLinefeed;

      if (!omitLinefeed) {
        this.addText('\n');
      }
    }
  }, {
    key: "addHighlighted",
    value: function addHighlighted(highlighted) {
      var type = 'raw';
      this.addToken({
        type: type,
        highlighted: highlighted
      });
    }
  }, {
    key: "addElement",
    value: function addElement(tagName, attributes) {
      var type = 'html_element';
      var children = null;
      this.addToken({
        type: type,
        tagName: tagName,
        attributes: attributes,
        children: children
      });
    }
  }, {
    key: "endElement",
    value: function endElement(tagName) {
      var type = 'html_element_end';
      this.addToken({
        type: type,
        tagName: tagName
      });
    }
  }, {
    key: "render",
    value: function render(tokens) {
      this.initialize();
      this.renderTokens(tokens);

      if (this.options.normalizeTags) {
        this.normalize();
      }

      return this.output();
    }
  }, {
    key: "renderTokens",
    value: function renderTokens(tokens) {
      if (tokens) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = tokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var token = _step.value;
            this.renderToken(token);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: "renderToken",
    value: function renderToken(token) {
      var f = this.renderFunctions[token.type];

      if (f) {
        return f.call(this, token);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Unrecognized token: ' + token.type);
        }
      }
    }
  }, {
    key: "renderInlineElement",
    value: function renderInlineElement(token) {
      this.addElement(token.type, null);
      this.renderTokens(token.children);
      this.endElement(token.type);
    }
  }, {
    key: "renderCode",
    value: function renderCode(token) {
      var text = token.text,
          lang = token.lang,
          highlighted = token.highlighted;
      var langPrefix = this.options.langPrefix;
      var className = lang ? langPrefix + lang : undefined;
      this.addElement('pre', null);
      this.addElement('code', {
        "class": className
      });

      if (highlighted) {
        this.addHighlighted(highlighted);
      } else {
        this.addText(text);
      }

      this.endElement('code');
      this.endElement('pre');

      if (lang) {
        this.addLinefeed();
      }
    }
  }, {
    key: "renderBlockquote",
    value: function renderBlockquote(token) {
      this.addElement('blockquote');
      this.addLinefeed();
      this.renderTokens(token.children);
      this.endElement('blockquote');
      this.addLinefeed();
    }
  }, {
    key: "renderHtmlTag",
    value: function renderHtmlTag(token) {
      var normalizeTags = this.options.normalizeTags;

      if (normalizeTags) {
        var html = token.html;

        var _this$parseHtmlTag = this.parseHtmlTag(html),
            type = _this$parseHtmlTag.type,
            _name = _this$parseHtmlTag.name,
            attributes = _this$parseHtmlTag.attributes,
            before = _this$parseHtmlTag.before,
            after = _this$parseHtmlTag.after;

        if (before) {
          this.addText(before);
        }

        if (type === 'start') {
          var alias = this.options.fixBrokenTags ? this.findTagAlias(_name) : null;
          this.addElement(alias || _name, attributes);
        } else if (type === 'end') {
          this.endElement(_name);
        }

        if (after) {
          this.addText(after);
        }
      } else {
        this.addToken(token);
      }
    }
  }, {
    key: "renderHeading",
    value: function renderHeading(token) {
      var tagName = "h".concat(token.depth);
      var id = this.generateHeadingId(token);
      this.addElement(tagName, {
        id: id
      });
      this.renderTokens(token.children);
      this.endElement(tagName);
      this.addLinefeed();
    }
  }, {
    key: "renderHorizontalRule",
    value: function renderHorizontalRule(token) {
      this.addElement('hr');
      this.addLinefeed();
    }
  }, {
    key: "renderList",
    value: function renderList(token) {
      var ordered = token.ordered,
          first = token.first;
      var type = ordered ? 'ol' : 'ul';
      var start = first !== 1 ? first : undefined;
      this.addElement(type, {
        start: start
      });
      this.addLinefeed();
      this.renderTokens(token.children);
      this.endElement(type);
      this.addLinefeed();
    }
  }, {
    key: "renderListItem",
    value: function renderListItem(token) {
      var checked = token.checked,
          loose = token.loose;
      this.addElement('li', null);

      if (checked !== undefined) {
        // put checkbox in front of content, inserting it before inline elements
        // if that's what follow; otherwise (i.e. the list item holds a block
        // element), insert it into a separate block
        var child = token.children[0];

        if (child && (child.type === 'text_block' || child.type === 'paragraph')) {
          if (child.type === 'paragraph') {
            this.addElement('p');
          }

          this.renderCheckbox(token);
          this.addText(' ');

          if (loose && !this.options.omitLinefeed) {
            this.addText(' ');
          }

          this.renderTokens(child.children);

          if (child.type === 'paragraph') {
            this.endElement('p');
            this.addLinefeed();
          }

          this.renderTokens(token.children.slice(1));
        } else {
          // put p tag around checkbox if item is loose
          if (loose) {
            this.addElement('p');
          }

          this.renderCheckbox(token);
          this.addText(' ');

          if (loose) {
            this.endElement('p');
            this.addLinefeed();
          }

          this.renderTokens(token.children);
        }
      } else {
        this.renderTokens(token.children);
      }

      this.endElement('li');
      this.addLinefeed();
    }
  }, {
    key: "renderLooseItem",
    value: function renderLooseItem(token) {
      this.renderListItem(token);
    }
  }, {
    key: "renderCheckbox",
    value: function renderCheckbox(token) {
      var checked = token.checked;
      var disabled = true;
      var type = 'checkbox';
      this.addElement('input', {
        checked: checked,
        disabled: disabled,
        type: type
      });
    }
  }, {
    key: "renderParagraph",
    value: function renderParagraph(token) {
      this.addElement('p');
      this.renderTokens(token.children);
      this.endElement('p');
      this.addLinefeed();
    }
  }, {
    key: "renderTable",
    value: function renderTable(token) {
      this.addElement('table');
      this.addLinefeed();
      this.renderTableHead(token);
      this.renderTableBody(token);
      this.endElement('table');
      this.addLinefeed();
    }
  }, {
    key: "renderTableHead",
    value: function renderTableHead(token) {
      var children = token.children;
      this.addElement('thead');
      this.addLinefeed();
      this.renderTokens(children.slice(0, 1));
      this.endElement('thead');
      this.addLinefeed();
    }
  }, {
    key: "renderTableBody",
    value: function renderTableBody(token) {
      var children = token.children;

      if (children.length > 1) {
        this.addElement('tbody');
        this.renderTokens(children.slice(1));
        this.endElement('tbody');
      }
    }
  }, {
    key: "renderTableRow",
    value: function renderTableRow(token) {
      this.addElement('tr');
      this.addLinefeed();
      this.renderTokens(token.children);
      this.endElement('tr');
      this.addLinefeed();
    }
  }, {
    key: "renderTableHeader",
    value: function renderTableHeader(token) {
      this.renderTableRow(token);
    }
  }, {
    key: "renderTableHeaderCell",
    value: function renderTableHeaderCell(token) {
      var align = token.align;
      this.addElement('th', {
        align: align
      });
      this.renderTokens(token.children);
      this.endElement('th');
      this.addLinefeed();
    }
  }, {
    key: "renderTableRowCell",
    value: function renderTableRowCell(token) {
      var align = token.align;
      this.addElement('td', {
        align: align
      });
      this.renderTokens(token.children);
      this.endElement('td');
      this.addLinefeed();
    }
  }, {
    key: "renderStrong",
    value: function renderStrong(token) {
      this.renderInlineElement(token);
    }
  }, {
    key: "renderEmphasized",
    value: function renderEmphasized(token) {
      this.renderInlineElement(token);
    }
  }, {
    key: "renderCodeSpan",
    value: function renderCodeSpan(token) {
      var text = token.text;
      this.addElement('code');
      this.addText(text);
      this.endElement('code');
    }
  }, {
    key: "renderLineBreak",
    value: function renderLineBreak(token) {
      this.addElement('br');
    }
  }, {
    key: "renderDeleted",
    value: function renderDeleted(token) {
      this.renderInlineElement(token);
    }
  }, {
    key: "renderUrl",
    value: function renderUrl(token) {
      var hrefUnescaped = token.href,
          text = token.text;
      var href = this.cleanUrl(hrefUnescaped, false, true);

      if (href !== null) {
        this.addElement('a', {
          href: href
        });
      }

      this.addText(text);

      if (href !== null) {
        this.endElement('a');
      }
    }
  }, {
    key: "renderAutolink",
    value: function renderAutolink(token) {
      this.renderUrl(token);
    }
  }, {
    key: "renderLink",
    value: function renderLink(token) {
      var hrefHtml = token.hrefHtml,
          title = token.title;
      var href = this.cleanUrl(hrefHtml, true, true);

      if (href !== null) {
        this.addElement('a', {
          href: href,
          title: title
        });
      }

      this.renderTokens(token.children);

      if (href !== null) {
        this.endElement('a');
      }
    }
  }, {
    key: "renderImage",
    value: function renderImage(token) {
      var hrefHtml = token.hrefHtml,
          title = token.title,
          alt = token.text;
      var src = this.cleanUrl(hrefHtml, true, true);

      if (src !== null) {
        this.addElement('img', {
          src: src,
          alt: alt,
          title: title
        });
      } else {
        this.addText(alt);
      }
    }
  }, {
    key: "renderText",
    value: function renderText(token) {
      this.addToken(token);
    }
  }, {
    key: "renderHtmlBlock",
    value: function renderHtmlBlock(token) {
      this.renderTokens(token.children);
    }
  }, {
    key: "renderTextBlock",
    value: function renderTextBlock(token) {
      this.renderTokens(token.children);
    }
  }, {
    key: "renderRefDefinition",
    value: function renderRefDefinition(token) {}
  }, {
    key: "renderSpace",
    value: function renderSpace(token) {}
  }, {
    key: "renderRaw",
    value: function renderRaw(token) {
      this.addToken(token);
    }
  }, {
    key: "getPlainText",
    value: function getPlainText(token) {
      var children = token.children;

      if (text) {
        return text;
      } else if (children) {
        var content = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var child = _step2.value;
            content.push(this.getPlainText(child));
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return content.join('');
      } else {
        return '';
      }
    }
  }, {
    key: "generateHeadingId",
    value: function generateHeadingId(token) {
      var _this$options = this.options,
          headerIds = _this$options.headerIds,
          headerPrefix = _this$options.headerPrefix;

      if (headerIds) {
        var plain;

        if (this.slugger instanceof MarkedSlugger) {
          var strings = findMarkedStrings(token);
          plain = unescape$1(strings.join(''));
        } else {
          var _strings = findTextStrings(token);

          plain = _strings.join('');
        }

        name = this.slugger.slug(plain);
        return headerPrefix + name;
      }
    }
  }, {
    key: "cleanUrl",
    value: function cleanUrl(url, escaped, unescapeAfter) {
      var _this$options2 = this.options,
          sanitize = _this$options2.sanitize,
          baseUrl = _this$options2.baseUrl;

      if (!escaped) {
        // cleanUrl() expect the URL to be escaped
        url = escape$1(url);
      }

      var cleaned = cleanUrl$1(sanitize, baseUrl, url);

      if (unescapeAfter) {
        cleaned = this.decodeEntities(cleaned);
      }

      return cleaned;
    }
  }, {
    key: "shouldOmit",
    value: function shouldOmit(element) {
      var tagName = element.tagName,
          attributes = element.attributes,
          children = element.children;
      var omit = this.options.omitTags;

      if (omit instanceof Array) {
        if (omit.indexOf(tagName) !== -1) {
          return true;
        }
      } else if (omit instanceof Function) {
        return omit(tagName, attributes, children);
      }
    }
  }, {
    key: "normalize",
    value: function normalize() {
      // push element onto stack when its start tag is encountered; pop it off
      // when its end tag is seen (when tags are properly paired up)
      var stack = [];
      var index = 0;

      for (;;) {
        var token = this.tokens[index];
        var newDepth = -1;
        var endTagPartner = null;
        var closureTagName = '';

        if (token) {
          if (token.type == 'html_element') {
            var tag = this.getTagProperties(token.tagName); // see if the tag closes an element that permits omission of end-tag

            for (var i = stack.length - 1; i >= 0; i--) {
              var priorTag = this.getTagProperties(stack[i].tagName);

              if (priorTag.endsOn && priorTag.endsOn(token.tagName)) {
                newDepth = i;
                closureTagName = token.tagName;
                break;
              } else if (priorTag.expects && priorTag.expects(token.tagName)) {
                // don't go further up the stack when the element is expected
                // (e.g. <li> in <ul>)
                break;
              }
            }

            if (newDepth === -1) {
              // don't push onto stack when element is void (e.g. <img>)
              if (!tag["void"]) {
                stack.push(token);
              }

              index++;
            }
          } else if (token.type === 'html_element_end') {
            // see if the end tag closes an element in the stack
            var _tag = this.getTagProperties(token.tagName);

            for (var _i = stack.length - 1; _i >= 0; _i--) {
              if (token.tagName === stack[_i].tagName) {
                newDepth = _i;
                endTagPartner = stack[_i];
                break;
              }
            }

            if (newDepth !== -1 || !_tag.vivificates) {
              // toss the end tag
              this.tokens.splice(index, 1);
            } else {
              // insert empty element to match browser behavior
              this.tokens[index] = {
                type: 'html_element',
                tagName: token.tagName,
                attributes: {},
                children: []
              };
              index++;
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
          for (var _i2 = stack.length - 1; _i2 >= newDepth; _i2--) {
            // when an inline element is being terminated, check if there
            // are any block element in the stack; terminate there if one
            // is found
            if (stack[_i2].tagName === 'a') {
              for (var j = _i2 + 1; j < stack.length; j++) {
                var _priorTag = this.getTagProperties(stack[j].tagName);

                if (_priorTag.block) {
                  token = stack[j];
                  index = this.tokens.indexOf(token);
                  stack.splice(j);
                  closureTagName = token.tagName;
                  endTagPartner = undefined;
                  break;
                }
              }
            }
          } // pop elements off the stack and insert children into them,
          // keeping an eye out for text styling tags


          var styleElements = [];
          var newContext = stack[newDepth - 1];
          var outerTag = newContext ? this.getTagProperties(newContext.tagName) : null;
          var restoreStyle = outerTag ? !outerTag.evicts : true;

          while (stack.length > newDepth) {
            var closingElement = stack.pop();

            if (restoreStyle) {
              if (closingElement !== endTagPartner) {
                if (closingElement.tagName !== closureTagName) {
                  // not the element explicitly targeted for closing
                  // we might need to restore it later
                  var closingTag = this.getTagProperties(closingElement.tagName);

                  if (closingTag.styles) {
                    styleElements.push(_objectSpread2({}, closingElement));
                  }
                }
              }
            }

            var closingElementIndex = this.tokens.indexOf(closingElement);
            var startIndex = closingElementIndex + 1;
            closingElement.children = this.tokens.splice(startIndex, index - startIndex);
            index = closingElementIndex + 1; // create implicit elements

            this.createImplicitElements(closingElement); // remove white-space

            this.removeExtraWhitespaces(closingElement); // extract stray elements and place them in front of this one

            var evictions = this.evictStrayElements(closingElement);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = evictions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var evicted = _step3.value;
                this.tokens.splice(index - 1, 0, evicted);
                index++;
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }

          for (var _i3 = 0, _styleElements = styleElements; _i3 < _styleElements.length; _i3++) {
            var styleElement = _styleElements[_i3];
            // insert the styling tags where text content start again
            var insertionIndex = -1;
            var firstInlineIndex = -1;

            for (var _i4 = index; _i4 < this.tokens.length; _i4++) {
              var ahead = this.tokens[_i4];

              if (ahead.type === 'html_element') {
                var tagAhead = this.getTagProperties(ahead.tagName); // that is, unless we encounter a clearing table
                // <table> is the only one, I think

                if (tagAhead.clears) {
                  break;
                } // if the same tag is encountered then there's no need to restore


                if (styleElement.tagName === ahead.tagName) {
                  break;
                }

                if (tagAhead["void"]) {
                  // treat void element like text
                  insertionIndex = firstInlineIndex !== -1 ? firstInlineIndex : _i4;
                  break;
                } // remember where we first encountered an inline element


                if (firstInlineIndex === -1) {
                  if (!tagAhead.block) {
                    firstInlineIndex = _i4;
                  }
                }
              } else if (ahead.type === 'html_element_end') {
                if (styleElement.tagName === ahead.tagName) {
                  break;
                }
              } else if (ahead.type === 'text') {
                // restore the style at the first inline element or right here
                insertionIndex = firstInlineIndex !== -1 ? firstInlineIndex : _i4;
                break;
              }
            }

            if (insertionIndex !== -1) {
              this.tokens.splice(insertionIndex, 0, styleElement);
            }
          }
        }
      }
    }
  }, {
    key: "createImplicitElements",
    value: function createImplicitElements(element) {
      var tagName = element.tagName,
          children = element.children;
      var tag = this.getTagProperties(tagName);

      if (!tag.implicit) {
        return;
      }

      var index = 0;
      var implicitElement = null;
      var implicitTag = null;
      var newElements = [];

      while (index < children.length) {
        var child = children[index];

        if (child.type === 'html_element') {
          // see if the tag would implicit create its (absent) container
          var implicitTagName = tag.implicit[child.tagName];

          if (implicitElement) {
            // see if the child would terminate the implicitly created container
            if (implicitTag.endsOn && implicitTag.endsOn(child.tagName)) {
              implicitElement = implicitTag = null;
            } else if (implicitTagName && implicitElement.tagName !== implicitTagName) {
              implicitElement = implicitTag = null;
            }
          }

          if (implicitTagName && !implicitElement) {
            implicitElement = {
              type: 'html_element',
              tagName: implicitTagName,
              html: "<".concat(implicitTagName, ">"),
              children: []
            };
            implicitTag = this.getTagProperties(implicitTagName);
            newElements.push(implicitElement);
            children.splice(index, 0, implicitElement);
            index++;
          }
        }

        if (implicitElement) {
          // remove the child and place it in the implicit element instead
          // (e.g. <tr> goes into <tbody>)
          children.splice(index, 1);
          implicitElement.children.push(child);
        } else {
          index++;
        }
      }

      for (var _i5 = 0, _newElements = newElements; _i5 < _newElements.length; _i5++) {
        var newElement = _newElements[_i5];
        this.createImplicitElements(newElement);
        this.removeExtraWhitespaces(newElement);
        var evictions = this.evictStrayElements(newElement);
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = evictions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var evicted = _step4.value;

            var _index = children.indexOf(newElement);

            children.splice(_index, 0, evicted);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }
    }
  }, {
    key: "removeExtraWhitespaces",
    value: function removeExtraWhitespaces(element) {
      var tagName = element.tagName,
          children = element.children;
      var tag = this.getTagProperties(tagName);

      if (tag.evicts) {
        if (this.options.omitNonvisualWhitespace) {
          var index = 0;

          while (index < children.length) {
            var child = children[index];
            var filter = false;

            if (child.type === 'text') {
              filter = /^\s+$/.test(child.text);
            }

            if (filter) {
              children.splice(index, 1);
            } else {
              index++;
            }
          }
        }
      } else if (tag.trims) {
        var first = children[0];

        if (first.type === 'text' && /^\n/.test(first.text)) {
          first.text = first.text.substr(1);
          first.html = first.html.substr(1);
        }
      }
    }
  }, {
    key: "evictStrayElements",
    value: function evictStrayElements(element) {
      var tagName = element.tagName,
          children = element.children;
      var tag = this.getTagProperties(tagName);
      var evictions = [];

      if (tag.evicts) {
        var index = 0;

        while (index < children.length) {
          var child = children[index];
          var evict = false;

          if (child.type === 'html_element') {
            evict = tag.expects ? !tag.expects(child.tagName) : false;
          } else if (child.type === 'text') {
            evict = /\S/.test(child.text);
          }

          if (evict) {
            children.splice(index, 1);
            evictions.push(child);
          } else {
            index++;
          }
        }
      }

      return evictions;
    }
  }, {
    key: "parseHtmlTag",
    value: function parseHtmlTag(html) {
      var startTag = /^(\s*)<([a-zA-Z][\w.:-]*)([^>]*)>([\s\S]*)/;
      var endTag = /^(\s*)<\/([a-zA-Z][\w.:-]*)[^>]*>([\s\S]*)/;
      var scap = startTag.exec(html);

      if (scap) {
        var attribute = /\s*([a-zA-Z:_][\w.:-]*)(?:\s*=\s*"([^"]*)"|\s*=\s*'([^']*)'|\s*=\s*([^\s"'=<>`]+))?/g;
        var type = 'start';

        var _name2 = scap[2].toLowerCase();

        var before = scap[1];
        var after = scap[4];
        var attributes = {};
        var m;

        while (m = attribute.exec(scap[3])) {
          var key = m[1];
          var value = m[2] || m[3] || m[4] || '';
          attributes[key] = this.decodeEntities(value);
        }

        return {
          type: type,
          name: _name2,
          attributes: attributes,
          before: before,
          after: after
        };
      }

      var ecap = endTag.exec(html);

      if (ecap) {
        var _type = 'end';

        var _name3 = ecap[2].toLowerCase();

        var _before = ecap[1];
        var _after = ecap[3];
        return {
          type: _type,
          name: _name3,
          before: _before,
          after: _after
        };
      }

      return {};
    }
  }, {
    key: "decodeEntities",
    value: function decodeEntities(html) {
      return decodeHtmlEntities(html);
    }
  }, {
    key: "getTagProperties",
    value: function getTagProperties$1(tagName) {
      return getTagProperties(tagName);
    }
  }, {
    key: "findTagAlias",
    value: function findTagAlias$1(tagName) {
      return findTagAlias(tagName);
    }
  }]);

  return BaseRenderer;
}();

var HtmlRenderer =
/*#__PURE__*/
function (_BaseRenderer) {
  _inherits(HtmlRenderer, _BaseRenderer);

  function HtmlRenderer(options, props) {
    var _this;

    _classCallCheck(this, HtmlRenderer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HtmlRenderer).call(this, options, props));
    _this.outputFunctions = {
      html_tag: _this.outputHtmlTag,
      html_element: _this.outputHtmlElement,
      html_element_end: _this.outputHtmlElementEnd,
      text: _this.outputText,
      raw: _this.outputRaw
    };
    return _this;
  }

  _createClass(HtmlRenderer, [{
    key: "output",
    value: function output() {
      return this.outputTokens(this.tokens);
    }
  }, {
    key: "outputTokens",
    value: function outputTokens(tokens) {
      var list = [];

      if (tokens) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = tokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var token = _step.value;
            var output = this.outputToken(token);

            if (output) {
              list.push(output);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return list.join('');
    }
  }, {
    key: "outputToken",
    value: function outputToken(token) {
      var f = this.outputFunctions[token.type];

      if (f) {
        return f.call(this, token);
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error("Unknown tag type: ".concat(token.type));
        }
      }
    }
  }, {
    key: "outputHtmlTag",
    value: function outputHtmlTag(token) {
      var html = token.html;

      if (this.options.omitDeclarations) {
        if (/^\s*<!/.test(html)) {
          return '';
        }
      }

      if (this.options.omitEmbeddedCode) {
        if (/^\s*<\?/.test(html)) {
          return '';
        }
      }

      return this.sanitize(html);
    }
  }, {
    key: "outputHtmlElement",
    value: function outputHtmlElement(token) {
      if (this.shouldOmit(token)) {
        return;
      }

      var tagName = token.tagName,
          attributes = token.attributes,
          children = token.children;
      var tag = this.getTagProperties(tagName);
      var html = "<".concat(tagName);

      if (attributes) {
        for (var _i = 0, _Object$entries = Object.entries(attributes); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          if (typeof value === 'string') {
            value = escape$1(value, true);
          } else if (typeof value === 'boolean') {
            value = value ? '' : undefined;
          }

          if (value != undefined) {
            html += " ".concat(key, "=\"").concat(value, "\"");
          }
        }
      }

      if (tag["void"] && this.options.xhtml) {
        html += '/>';
      } else {
        html += '>';
      }

      if (!tag["void"] && this.options.normalizeTags) {
        html += this.outputTokens(children);
        html += "</".concat(tagName, ">");
      }

      return html;
    }
  }, {
    key: "outputHtmlElementEnd",
    value: function outputHtmlElementEnd(token) {
      var tagName = token.tagName;
      return "</".concat(tagName, ">");
    }
  }, {
    key: "outputText",
    value: function outputText(token) {
      var text = token.text,
          html = token.html;

      if (this.options.decodeEntities || html === undefined) {
        return escape$1(text, true);
      } else {
        return escape$1(html);
      }
    }
  }, {
    key: "outputRaw",
    value: function outputRaw(token) {
      var html = token.html,
          highlighted = token.highlighted;

      if (highlighted) {
        return highlighted;
      } else {
        return this.sanitize(html);
      }
    }
  }, {
    key: "renderLink",
    value: function renderLink(token) {
      if (!this.options.decodeEntities) {
        var hrefHtml = token.hrefHtml,
            titleHtml = token.titleHtml;
        var hrefCleaned = this.cleanUrl(hrefHtml, true, false);

        if (hrefCleaned !== null) {
          var href = this.boxAttribute(hrefCleaned, true);
          var title = this.boxAttribute(titleHtml, true);
          this.addElement('a', {
            href: href,
            title: title
          });
        }

        this.renderTokens(token.children);

        if (hrefCleaned !== null) {
          this.endElement('a');
        }
      } else {
        _get(_getPrototypeOf(HtmlRenderer.prototype), "renderLink", this).call(this, token);
      }
    }
  }, {
    key: "renderImage",
    value: function renderImage(token) {
      if (!this.options.decodeEntities) {
        var hrefHtml = token.hrefHtml,
            titleHtml = token.titleHtml,
            alt = token.text;
        var srcHtml = this.cleanUrl(hrefHtml, true, false);

        if (srcHtml !== null) {
          var title = this.boxAttribute(titleHtml, true);
          var src = this.boxAttribute(srcHtml, false);
          this.addElement('img', {
            src: src,
            alt: alt,
            title: title
          });
        } else {
          this.addText(alt);
        }
      } else {
        _get(_getPrototypeOf(HtmlRenderer.prototype), "renderImage", this).call(this, token);
      }
    }
  }, {
    key: "cleanUrl",
    value: function cleanUrl(url, escaped, unescapeAfter) {
      if (url && this.options.mangle) {
        if (url.startsWith('mailto:')) {
          var address = url.substr(7);
          var mangled = this.mangle(address);
          return this.boxRawHtml("mailto:".concat(mangled));
        }
      }

      return _get(_getPrototypeOf(HtmlRenderer.prototype), "cleanUrl", this).call(this, url, escaped, unescapeAfter);
    }
  }, {
    key: "sanitize",
    value: function sanitize(html) {
      var _this$options = this.options,
          sanitize = _this$options.sanitize,
          sanitizer = _this$options.sanitizer;

      if (sanitize) {
        html = sanitizer ? sanitizer(html) : escape$1(html);
      }

      return html;
    }
  }, {
    key: "boxAttribute",
    value: function boxAttribute(text, needEscaping) {
      if (text) {
        if (needEscaping) {
          text = escape$1(text);
        }

        return new String(text);
      }

      return text;
    }
  }, {
    key: "mangle",
    value: function mangle(text) {
      var mangled = '';

      for (var i = 0; i < text.length; i++) {
        var ch = text.charCodeAt(i);

        if (Math.random() > 0.5) {
          mangled += "&#x".concat(ch.toString(16));
        } else {
          mangled += "&#".concat(ch);
        }
      }

      return mangled;
    }
  }]);

  return HtmlRenderer;
}(BaseRenderer);

function convertAttributes(tagName, attrs, options) {
  if (!attrs) {
    return;
  }

  var props = {};
  var count = 0;

  for (var _i = 0, _Object$entries = Object.entries(attrs); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        name = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (/^on/i.test(name)) {
      // omit handlers
      continue;
    }

    if (value != undefined) {
      name = getDOMName(name);

      if (name === 'style') {
        value = parseStyle(value);
      } else if (isBooleanProp(tagName, name)) {
        value = true;
      } else if (name === 'width' || name === 'height') {
        if (tagName === 'img' || tagName === 'image') {
          if (!/^\d+$/.test(value)) {
            var omitInvalidDimensions = options.omitInvalidDimensions;

            if (value.endsWith('%')) {
              if (omitInvalidDimensions) {
                continue;
              }
            } else {
              var number = parseInt(value);

              if (!isNaN(number)) {
                value = number.toString();
              } else {
                if (omitInvalidDimensions) {
                  continue;
                }
              }
            }
          }
        }
      } else if (name === 'ref') {
        continue;
      }

      props[name] = value;
      count++;
    }
  }

  return count > 0 ? props : undefined;
}

var camelCaseNames = {
  "class": 'className',
  checked: 'defaultChecked',
  colspan: 'colSpan',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  "for": 'htmlFor',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  readonly: 'readOnly',
  rowspan: 'rowSpan',
  tabindex: 'tabIndex'
};

function getDOMName(name) {
  name = name.toLowerCase();
  return camelCaseNames[name] || name;
}

var booleanAttributes = ['checked', 'disabled', 'hidden', 'multiple', 'open', 'readOnly', 'muted', 'noValidate', 'preload', 'selected', 'spellcheck', 'translate', 'wrap'];

function isBooleanProp(tagName, attrName) {
  if (booleanAttributes.indexOf(attrName) !== -1) {
    return true;
  }

  return false;
}

function parseStyle(styleText) {
  var style = {};
  var items = styleText.split(';');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      item = item.trim();

      if (item) {
        var cap = /([^:\s]*)\s*:\s*(.*)/.exec(item);

        if (cap) {
          var name = cap[1];
          var value = cap[2];
          var domName = name.toLowerCase().replace(/-(\S{2})/g, function (m, letters) {
            if (letters !== 'ms') {
              letters = letters.charAt(0).toUpperCase() + letters.charAt(1);
            }

            return letters;
          });
          var acceptableValue = value.replace(/\s*!important/i, '');
          style[domName] = acceptableValue;
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return style;
}

var JsonRenderer =
/*#__PURE__*/
function (_BaseRenderer) {
  _inherits(JsonRenderer, _BaseRenderer);

  function JsonRenderer(options, props) {
    var _this;

    _classCallCheck(this, JsonRenderer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JsonRenderer).call(this, options, props));
    _this.outputFunctions = {
      html_tag: _this.outputHtmlTag,
      html_element: _this.outputHtmlElement,
      text: _this.outputText,
      raw: _this.outputRaw
    };
    return _this;
  }

  _createClass(JsonRenderer, [{
    key: "output",
    value: function output() {
      return this.outputTokens(this.tokens) || [];
    }
  }, {
    key: "outputTokens",
    value: function outputTokens(tokens) {
      var list = [];

      if (tokens) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = tokens.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                token = _step$value[1];

            var output = this.outputToken(token, key);

            if (output) {
              list.push(output);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return list.length > 0 ? mergeStrings(list) : undefined;
    }
  }, {
    key: "outputToken",
    value: function outputToken(token, key) {
      var f = this.outputFunctions[token.type];

      if (f) {
        return f.call(this, token, key);
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error("Unknown tag type: ".concat(token.type));
        }
      }
    }
  }, {
    key: "outputHtmlTag",
    value: function outputHtmlTag(token) {}
  }, {
    key: "outputHtmlElement",
    value: function outputHtmlElement(token, key) {
      if (this.shouldOmit(token)) {
        return;
      }

      var tagName = token.tagName,
          attributes = token.attributes,
          children = token.children;
      var props = this.convertAttributes(tagName, attributes);
      var elements = this.outputTokens(children);
      var object = {
        type: tagName
      };

      if (props) {
        object.props = props;
      }

      if (elements) {
        object.children = elements;
      }

      return object;
    }
  }, {
    key: "outputText",
    value: function outputText(token) {
      var text = token.text;
      return text;
    }
  }, {
    key: "outputRaw",
    value: function outputRaw(token) {
      var highlighted = token.highlighted;

      if (highlighted) {
        return highlighted;
      }
    }
  }, {
    key: "convertAttributes",
    value: function convertAttributes$1(tagName, attrs) {
      return convertAttributes(tagName, attrs, {
        omitInvalidDimensions: false
      });
    }
  }]);

  return JsonRenderer;
}(BaseRenderer);

function parse(text, options) {
  var parser = new Parser(options);
  var renderer = new HtmlRenderer(options);
  var tokens = parser.parse(text);

  if (options && options.highlight) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = findCodeSections(tokens)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var token = _step.value;
        token.highlighted = options.highlight(token.text, token.lang);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  var html = renderer.render(tokens);
  return html;
}

function parseAsync(_x, _x2) {
  return _parseAsync.apply(this, arguments);
}

function _parseAsync() {
  _parseAsync = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(text, options) {
    var parser, renderer, tokens, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, token, html;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            parser = new AsyncParser(options);
            renderer = new HtmlRenderer(options);
            _context.next = 4;
            return parser.parse(text);

          case 4:
            tokens = _context.sent;

            if (!(options && options.highlight)) {
              _context.next = 35;
              break;
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 9;
            _iterator2 = findCodeSections(tokens)[Symbol.iterator]();

          case 11:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 21;
              break;
            }

            token = _step2.value;
            _context.next = 15;
            return options.highlight(token.text, token.lang);

          case 15:
            token.highlighted = _context.sent;
            _context.next = 18;
            return nextTick();

          case 18:
            _iteratorNormalCompletion2 = true;
            _context.next = 11;
            break;

          case 21:
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](9);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 27:
            _context.prev = 27;
            _context.prev = 28;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 30:
            _context.prev = 30;

            if (!_didIteratorError2) {
              _context.next = 33;
              break;
            }

            throw _iteratorError2;

          case 33:
            return _context.finish(30);

          case 34:
            return _context.finish(27);

          case 35:
            html = renderer.render(tokens);
            return _context.abrupt("return", html);

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 23, 27, 35], [28,, 30, 34]]);
  }));
  return _parseAsync.apply(this, arguments);
}

export { BlockLexer, HtmlRenderer as HTMLRenderer, HtmlRenderer, InlineLexer, JsonRenderer as JSONRenderer, JsonRenderer, Parser, HtmlRenderer as Renderer, changeDefaults, defaults$1 as defaults, findCodeSections, findTextStrings, getDefaults, mergeDefaults, parse, parseAsync };
