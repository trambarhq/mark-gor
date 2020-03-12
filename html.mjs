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

function loopAsync(f) {
  return new Promise(function (resolve, reject) {
    var next = function next() {
      try {
        var ret = f();

        if (ret && ret.then instanceof Function) {
          ret.then(next, reject);
        } else {
          resolve(ret);
        }
      } catch (err) {
        reject(err);
      }
    };

    next();
  });
}

function eachAsync(array, f) {
  var index = 0;
  return loopAsync(function () {
    if (index >= array.length) {
      return;
    }

    return f(array[index++]);
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

var htmlEntityTable = {
  AElig: 'Æ',
  AMP: '&',
  Aacute: 'Á',
  Abreve: 'Ă',
  Acirc: 'Â',
  Acy: 'А',
  Afr: '𝔄',
  Agrave: 'À',
  Alpha: 'Α',
  Amacr: 'Ā',
  And: '⩓',
  Aogon: 'Ą',
  Aopf: '𝔸',
  ApplyFunction: '⁡',
  Aring: 'Å',
  Ascr: '𝒜',
  Assign: '≔',
  Atilde: 'Ã',
  Auml: 'Ä',
  Backslash: '∖',
  Barv: '⫧',
  Barwed: '⌆',
  Bcy: 'Б',
  Because: '∵',
  Bernoullis: 'ℬ',
  Beta: 'Β',
  Bfr: '𝔅',
  Bopf: '𝔹',
  Breve: '˘',
  Bscr: 'ℬ',
  Bumpeq: '≎',
  CHcy: 'Ч',
  COPY: '©',
  Cacute: 'Ć',
  Cap: '⋒',
  CapitalDifferentialD: 'ⅅ',
  Cayleys: 'ℭ',
  Ccaron: 'Č',
  Ccedil: 'Ç',
  Ccirc: 'Ĉ',
  Cconint: '∰',
  Cdot: 'Ċ',
  Cedilla: '¸',
  CenterDot: '·',
  Cfr: 'ℭ',
  Chi: 'Χ',
  CircleDot: '⊙',
  CircleMinus: '⊖',
  CirclePlus: '⊕',
  CircleTimes: '⊗',
  ClockwiseContourIntegral: '∲',
  CloseCurlyDoubleQuote: '”',
  CloseCurlyQuote: '’',
  Colon: '∷',
  Colone: '⩴',
  Congruent: '≡',
  Conint: '∯',
  ContourIntegral: '∮',
  Copf: 'ℂ',
  Coproduct: '∐',
  CounterClockwiseContourIntegral: '∳',
  Cross: '⨯',
  Cscr: '𝒞',
  Cup: '⋓',
  CupCap: '≍',
  DD: 'ⅅ',
  DDotrahd: '⤑',
  DJcy: 'Ђ',
  DScy: 'Ѕ',
  DZcy: 'Џ',
  Dagger: '‡',
  Darr: '↡',
  Dashv: '⫤',
  Dcaron: 'Ď',
  Dcy: 'Д',
  Del: '∇',
  Delta: 'Δ',
  Dfr: '𝔇',
  DiacriticalAcute: '´',
  DiacriticalDot: '˙',
  DiacriticalDoubleAcute: '˝',
  DiacriticalGrave: '`',
  DiacriticalTilde: '˜',
  Diamond: '⋄',
  DifferentialD: 'ⅆ',
  Dopf: '𝔻',
  Dot: '¨',
  DotDot: '⃜',
  DotEqual: '≐',
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
  DownArrow: '↓',
  DownArrowBar: '⤓',
  DownArrowUpArrow: '⇵',
  DownBreve: '̑',
  DownLeftRightVector: '⥐',
  DownLeftTeeVector: '⥞',
  DownLeftVector: '↽',
  DownLeftVectorBar: '⥖',
  DownRightTeeVector: '⥟',
  DownRightVector: '⇁',
  DownRightVectorBar: '⥗',
  DownTee: '⊤',
  DownTeeArrow: '↧',
  Downarrow: '⇓',
  Dscr: '𝒟',
  Dstrok: 'Đ',
  ENG: 'Ŋ',
  ETH: 'Ð',
  Eacute: 'É',
  Ecaron: 'Ě',
  Ecirc: 'Ê',
  Ecy: 'Э',
  Edot: 'Ė',
  Efr: '𝔈',
  Egrave: 'È',
  Element: '∈',
  Emacr: 'Ē',
  EmptySmallSquare: '◻',
  EmptyVerySmallSquare: '▫',
  Eogon: 'Ę',
  Eopf: '𝔼',
  Epsilon: 'Ε',
  Equal: '⩵',
  EqualTilde: '≂',
  Equilibrium: '⇌',
  Escr: 'ℰ',
  Esim: '⩳',
  Eta: 'Η',
  Euml: 'Ë',
  Exists: '∃',
  ExponentialE: 'ⅇ',
  Fcy: 'Ф',
  Ffr: '𝔉',
  FilledSmallSquare: '◼',
  FilledVerySmallSquare: '▪',
  Fopf: '𝔽',
  ForAll: '∀',
  Fouriertrf: 'ℱ',
  Fscr: 'ℱ',
  GJcy: 'Ѓ',
  GT: '>',
  Gamma: 'Γ',
  Gammad: 'Ϝ',
  Gbreve: 'Ğ',
  Gcedil: 'Ģ',
  Gcirc: 'Ĝ',
  Gcy: 'Г',
  Gdot: 'Ġ',
  Gfr: '𝔊',
  Gg: '⋙',
  Gopf: '𝔾',
  GreaterEqual: '≥',
  GreaterEqualLess: '⋛',
  GreaterFullEqual: '≧',
  GreaterGreater: '⪢',
  GreaterLess: '≷',
  GreaterSlantEqual: '⩾',
  GreaterTilde: '≳',
  Gscr: '𝒢',
  Gt: '≫',
  HARDcy: 'Ъ',
  Hacek: 'ˇ',
  Hat: '^',
  Hcirc: 'Ĥ',
  Hfr: 'ℌ',
  HilbertSpace: 'ℋ',
  Hopf: 'ℍ',
  HorizontalLine: '─',
  Hscr: 'ℋ',
  Hstrok: 'Ħ',
  HumpDownHump: '≎',
  HumpEqual: '≏',
  IEcy: 'Е',
  IJlig: 'Ĳ',
  IOcy: 'Ё',
  Iacute: 'Í',
  Icirc: 'Î',
  Icy: 'И',
  Idot: 'İ',
  Ifr: 'ℑ',
  Igrave: 'Ì',
  Im: 'ℑ',
  Imacr: 'Ī',
  ImaginaryI: 'ⅈ',
  Implies: '⇒',
  Int: '∬',
  Integral: '∫',
  Intersection: '⋂',
  InvisibleComma: '⁣',
  InvisibleTimes: '⁢',
  Iogon: 'Į',
  Iopf: '𝕀',
  Iota: 'Ι',
  Iscr: 'ℐ',
  Itilde: 'Ĩ',
  Iukcy: 'І',
  Iuml: 'Ï',
  Jcirc: 'Ĵ',
  Jcy: 'Й',
  Jfr: '𝔍',
  Jopf: '𝕁',
  Jscr: '𝒥',
  Jsercy: 'Ј',
  Jukcy: 'Є',
  KHcy: 'Х',
  KJcy: 'Ќ',
  Kappa: 'Κ',
  Kcedil: 'Ķ',
  Kcy: 'К',
  Kfr: '𝔎',
  Kopf: '𝕂',
  Kscr: '𝒦',
  LJcy: 'Љ',
  LT: '<',
  Lacute: 'Ĺ',
  Lambda: 'Λ',
  Lang: '⟪',
  Laplacetrf: 'ℒ',
  Larr: '↞',
  Lcaron: 'Ľ',
  Lcedil: 'Ļ',
  Lcy: 'Л',
  LeftAngleBracket: '⟨',
  LeftArrow: '←',
  LeftArrowBar: '⇤',
  LeftArrowRightArrow: '⇆',
  LeftCeiling: '⌈',
  LeftDoubleBracket: '⟦',
  LeftDownTeeVector: '⥡',
  LeftDownVector: '⇃',
  LeftDownVectorBar: '⥙',
  LeftFloor: '⌊',
  LeftRightArrow: '↔',
  LeftRightVector: '⥎',
  LeftTee: '⊣',
  LeftTeeArrow: '↤',
  LeftTeeVector: '⥚',
  LeftTriangle: '⊲',
  LeftTriangleBar: '⧏',
  LeftTriangleEqual: '⊴',
  LeftUpDownVector: '⥑',
  LeftUpTeeVector: '⥠',
  LeftUpVector: '↿',
  LeftUpVectorBar: '⥘',
  LeftVector: '↼',
  LeftVectorBar: '⥒',
  Leftarrow: '⇐',
  Leftrightarrow: '⇔',
  LessEqualGreater: '⋚',
  LessFullEqual: '≦',
  LessGreater: '≶',
  LessLess: '⪡',
  LessSlantEqual: '⩽',
  LessTilde: '≲',
  Lfr: '𝔏',
  Ll: '⋘',
  Lleftarrow: '⇚',
  Lmidot: 'Ŀ',
  LongLeftArrow: '⟵',
  LongLeftRightArrow: '⟷',
  LongRightArrow: '⟶',
  Longleftarrow: '⟸',
  Longleftrightarrow: '⟺',
  Longrightarrow: '⟹',
  Lopf: '𝕃',
  LowerLeftArrow: '↙',
  LowerRightArrow: '↘',
  Lscr: 'ℒ',
  Lsh: '↰',
  Lstrok: 'Ł',
  Lt: '≪',
  Map: '⤅',
  Mcy: 'М',
  MediumSpace: ' ',
  Mellintrf: 'ℳ',
  Mfr: '𝔐',
  MinusPlus: '∓',
  Mopf: '𝕄',
  Mscr: 'ℳ',
  Mu: 'Μ',
  NJcy: 'Њ',
  Nacute: 'Ń',
  Ncaron: 'Ň',
  Ncedil: 'Ņ',
  Ncy: 'Н',
  NegativeMediumSpace: '​',
  NegativeThickSpace: '​',
  NegativeThinSpace: '​',
  NegativeVeryThinSpace: '​',
  NestedGreaterGreater: '≫',
  NestedLessLess: '≪',
  NewLine: '\n',
  Nfr: '𝔑',
  NoBreak: '⁠',
  NonBreakingSpace: ' ',
  Nopf: 'ℕ',
  Not: '⫬',
  NotCongruent: '≢',
  NotCupCap: '≭',
  NotDoubleVerticalBar: '∦',
  NotElement: '∉',
  NotEqual: '≠',
  NotEqualTilde: '≂̸',
  NotExists: '∄',
  NotGreater: '≯',
  NotGreaterEqual: '≱',
  NotGreaterFullEqual: '≧̸',
  NotGreaterGreater: '≫̸',
  NotGreaterLess: '≹',
  NotGreaterSlantEqual: '⩾̸',
  NotGreaterTilde: '≵',
  NotHumpDownHump: '≎̸',
  NotHumpEqual: '≏̸',
  NotLeftTriangle: '⋪',
  NotLeftTriangleBar: '⧏̸',
  NotLeftTriangleEqual: '⋬',
  NotLess: '≮',
  NotLessEqual: '≰',
  NotLessGreater: '≸',
  NotLessLess: '≪̸',
  NotLessSlantEqual: '⩽̸',
  NotLessTilde: '≴',
  NotNestedGreaterGreater: '⪢̸',
  NotNestedLessLess: '⪡̸',
  NotPrecedes: '⊀',
  NotPrecedesEqual: '⪯̸',
  NotPrecedesSlantEqual: '⋠',
  NotReverseElement: '∌',
  NotRightTriangle: '⋫',
  NotRightTriangleBar: '⧐̸',
  NotRightTriangleEqual: '⋭',
  NotSquareSubset: '⊏̸',
  NotSquareSubsetEqual: '⋢',
  NotSquareSuperset: '⊐̸',
  NotSquareSupersetEqual: '⋣',
  NotSubset: '⊂⃒',
  NotSubsetEqual: '⊈',
  NotSucceeds: '⊁',
  NotSucceedsEqual: '⪰̸',
  NotSucceedsSlantEqual: '⋡',
  NotSucceedsTilde: '≿̸',
  NotSuperset: '⊃⃒',
  NotSupersetEqual: '⊉',
  NotTilde: '≁',
  NotTildeEqual: '≄',
  NotTildeFullEqual: '≇',
  NotTildeTilde: '≉',
  NotVerticalBar: '∤',
  Nscr: '𝒩',
  Ntilde: 'Ñ',
  Nu: 'Ν',
  OElig: 'Œ',
  Oacute: 'Ó',
  Ocirc: 'Ô',
  Ocy: 'О',
  Odblac: 'Ő',
  Ofr: '𝔒',
  Ograve: 'Ò',
  Omacr: 'Ō',
  Omega: 'Ω',
  Omicron: 'Ο',
  Oopf: '𝕆',
  OpenCurlyDoubleQuote: '“',
  OpenCurlyQuote: '‘',
  Or: '⩔',
  Oscr: '𝒪',
  Oslash: 'Ø',
  Otilde: 'Õ',
  Otimes: '⨷',
  Ouml: 'Ö',
  OverBar: '‾',
  OverBrace: '⏞',
  OverBracket: '⎴',
  OverParenthesis: '⏜',
  PartialD: '∂',
  Pcy: 'П',
  Pfr: '𝔓',
  Phi: 'Φ',
  Pi: 'Π',
  PlusMinus: '±',
  Poincareplane: 'ℌ',
  Popf: 'ℙ',
  Pr: '⪻',
  Precedes: '≺',
  PrecedesEqual: '⪯',
  PrecedesSlantEqual: '≼',
  PrecedesTilde: '≾',
  Prime: '″',
  Product: '∏',
  Proportion: '∷',
  Proportional: '∝',
  Pscr: '𝒫',
  Psi: 'Ψ',
  QUOT: '"',
  Qfr: '𝔔',
  Qopf: 'ℚ',
  Qscr: '𝒬',
  RBarr: '⤐',
  REG: '®',
  Racute: 'Ŕ',
  Rang: '⟫',
  Rarr: '↠',
  Rarrtl: '⤖',
  Rcaron: 'Ř',
  Rcedil: 'Ŗ',
  Rcy: 'Р',
  Re: 'ℜ',
  ReverseElement: '∋',
  ReverseEquilibrium: '⇋',
  ReverseUpEquilibrium: '⥯',
  Rfr: 'ℜ',
  Rho: 'Ρ',
  RightAngleBracket: '⟩',
  RightArrow: '→',
  RightArrowBar: '⇥',
  RightArrowLeftArrow: '⇄',
  RightCeiling: '⌉',
  RightDoubleBracket: '⟧',
  RightDownTeeVector: '⥝',
  RightDownVector: '⇂',
  RightDownVectorBar: '⥕',
  RightFloor: '⌋',
  RightTee: '⊢',
  RightTeeArrow: '↦',
  RightTeeVector: '⥛',
  RightTriangle: '⊳',
  RightTriangleBar: '⧐',
  RightTriangleEqual: '⊵',
  RightUpDownVector: '⥏',
  RightUpTeeVector: '⥜',
  RightUpVector: '↾',
  RightUpVectorBar: '⥔',
  RightVector: '⇀',
  RightVectorBar: '⥓',
  Rightarrow: '⇒',
  Ropf: 'ℝ',
  RoundImplies: '⥰',
  Rrightarrow: '⇛',
  Rscr: 'ℛ',
  Rsh: '↱',
  RuleDelayed: '⧴',
  SHCHcy: 'Щ',
  SHcy: 'Ш',
  SOFTcy: 'Ь',
  Sacute: 'Ś',
  Sc: '⪼',
  Scaron: 'Š',
  Scedil: 'Ş',
  Scirc: 'Ŝ',
  Scy: 'С',
  Sfr: '𝔖',
  ShortDownArrow: '↓',
  ShortLeftArrow: '←',
  ShortRightArrow: '→',
  ShortUpArrow: '↑',
  Sigma: 'Σ',
  SmallCircle: '∘',
  Sopf: '𝕊',
  Sqrt: '√',
  Square: '□',
  SquareIntersection: '⊓',
  SquareSubset: '⊏',
  SquareSubsetEqual: '⊑',
  SquareSuperset: '⊐',
  SquareSupersetEqual: '⊒',
  SquareUnion: '⊔',
  Sscr: '𝒮',
  Star: '⋆',
  Sub: '⋐',
  Subset: '⋐',
  SubsetEqual: '⊆',
  Succeeds: '≻',
  SucceedsEqual: '⪰',
  SucceedsSlantEqual: '≽',
  SucceedsTilde: '≿',
  SuchThat: '∋',
  Sum: '∑',
  Sup: '⋑',
  Superset: '⊃',
  SupersetEqual: '⊇',
  Supset: '⋑',
  THORN: 'Þ',
  TRADE: '™',
  TSHcy: 'Ћ',
  TScy: 'Ц',
  Tab: '	',
  Tau: 'Τ',
  Tcaron: 'Ť',
  Tcedil: 'Ţ',
  Tcy: 'Т',
  Tfr: '𝔗',
  Therefore: '∴',
  Theta: 'Θ',
  ThickSpace: '  ',
  ThinSpace: ' ',
  Tilde: '∼',
  TildeEqual: '≃',
  TildeFullEqual: '≅',
  TildeTilde: '≈',
  Topf: '𝕋',
  TripleDot: '⃛',
  Tscr: '𝒯',
  Tstrok: 'Ŧ',
  Uacute: 'Ú',
  Uarr: '↟',
  Uarrocir: '⥉',
  Ubrcy: 'Ў',
  Ubreve: 'Ŭ',
  Ucirc: 'Û',
  Ucy: 'У',
  Udblac: 'Ű',
  Ufr: '𝔘',
  Ugrave: 'Ù',
  Umacr: 'Ū',
  UnderBar: '_',
  UnderBrace: '⏟',
  UnderBracket: '⎵',
  UnderParenthesis: '⏝',
  Union: '⋃',
  UnionPlus: '⊎',
  Uogon: 'Ų',
  Uopf: '𝕌',
  UpArrow: '↑',
  UpArrowBar: '⤒',
  UpArrowDownArrow: '⇅',
  UpDownArrow: '↕',
  UpEquilibrium: '⥮',
  UpTee: '⊥',
  UpTeeArrow: '↥',
  Uparrow: '⇑',
  Updownarrow: '⇕',
  UpperLeftArrow: '↖',
  UpperRightArrow: '↗',
  Upsi: 'ϒ',
  Upsilon: 'Υ',
  Uring: 'Ů',
  Uscr: '𝒰',
  Utilde: 'Ũ',
  Uuml: 'Ü',
  VDash: '⊫',
  Vbar: '⫫',
  Vcy: 'В',
  Vdash: '⊩',
  Vdashl: '⫦',
  Vee: '⋁',
  Verbar: '‖',
  Vert: '‖',
  VerticalBar: '∣',
  VerticalLine: '|',
  VerticalSeparator: '❘',
  VerticalTilde: '≀',
  VeryThinSpace: ' ',
  Vfr: '𝔙',
  Vopf: '𝕍',
  Vscr: '𝒱',
  Vvdash: '⊪',
  Wcirc: 'Ŵ',
  Wedge: '⋀',
  Wfr: '𝔚',
  Wopf: '𝕎',
  Wscr: '𝒲',
  Xfr: '𝔛',
  Xi: 'Ξ',
  Xopf: '𝕏',
  Xscr: '𝒳',
  YAcy: 'Я',
  YIcy: 'Ї',
  YUcy: 'Ю',
  Yacute: 'Ý',
  Ycirc: 'Ŷ',
  Ycy: 'Ы',
  Yfr: '𝔜',
  Yopf: '𝕐',
  Yscr: '𝒴',
  Yuml: 'Ÿ',
  ZHcy: 'Ж',
  Zacute: 'Ź',
  Zcaron: 'Ž',
  Zcy: 'З',
  Zdot: 'Ż',
  ZeroWidthSpace: '​',
  Zeta: 'Ζ',
  Zfr: 'ℨ',
  Zopf: 'ℤ',
  Zscr: '𝒵',
  aacute: 'á',
  abreve: 'ă',
  ac: '∾',
  acE: '∾̳',
  acd: '∿',
  acirc: 'â',
  acute: '´',
  acy: 'а',
  aelig: 'æ',
  af: '⁡',
  afr: '𝔞',
  agrave: 'à',
  alefsym: 'ℵ',
  aleph: 'ℵ',
  alpha: 'α',
  amacr: 'ā',
  amalg: '⨿',
  amp: '&',
  and: '∧',
  andand: '⩕',
  andd: '⩜',
  andslope: '⩘',
  andv: '⩚',
  ang: '∠',
  ange: '⦤',
  angle: '∠',
  angmsd: '∡',
  angmsdaa: '⦨',
  angmsdab: '⦩',
  angmsdac: '⦪',
  angmsdad: '⦫',
  angmsdae: '⦬',
  angmsdaf: '⦭',
  angmsdag: '⦮',
  angmsdah: '⦯',
  angrt: '∟',
  angrtvb: '⊾',
  angrtvbd: '⦝',
  angsph: '∢',
  angst: 'Å',
  angzarr: '⍼',
  aogon: 'ą',
  aopf: '𝕒',
  ap: '≈',
  apE: '⩰',
  apacir: '⩯',
  ape: '≊',
  apid: '≋',
  apos: "'",
  approx: '≈',
  approxeq: '≊',
  aring: 'å',
  ascr: '𝒶',
  ast: '*',
  asymp: '≈',
  asympeq: '≍',
  atilde: 'ã',
  auml: 'ä',
  awconint: '∳',
  awint: '⨑',
  bNot: '⫭',
  backcong: '≌',
  backepsilon: '϶',
  backprime: '‵',
  backsim: '∽',
  backsimeq: '⋍',
  barvee: '⊽',
  barwed: '⌅',
  barwedge: '⌅',
  bbrk: '⎵',
  bbrktbrk: '⎶',
  bcong: '≌',
  bcy: 'б',
  bdquo: '„',
  becaus: '∵',
  because: '∵',
  bemptyv: '⦰',
  bepsi: '϶',
  bernou: 'ℬ',
  beta: 'β',
  beth: 'ℶ',
  between: '≬',
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
  bnot: '⌐',
  bopf: '𝕓',
  bot: '⊥',
  bottom: '⊥',
  bowtie: '⋈',
  boxDL: '╗',
  boxDR: '╔',
  boxDl: '╖',
  boxDr: '╓',
  boxH: '═',
  boxHD: '╦',
  boxHU: '╩',
  boxHd: '╤',
  boxHu: '╧',
  boxUL: '╝',
  boxUR: '╚',
  boxUl: '╜',
  boxUr: '╙',
  boxV: '║',
  boxVH: '╬',
  boxVL: '╣',
  boxVR: '╠',
  boxVh: '╫',
  boxVl: '╢',
  boxVr: '╟',
  boxbox: '⧉',
  boxdL: '╕',
  boxdR: '╒',
  boxdl: '┐',
  boxdr: '┌',
  boxh: '─',
  boxhD: '╥',
  boxhU: '╨',
  boxhd: '┬',
  boxhu: '┴',
  boxminus: '⊟',
  boxplus: '⊞',
  boxtimes: '⊠',
  boxuL: '╛',
  boxuR: '╘',
  boxul: '┘',
  boxur: '└',
  boxv: '│',
  boxvH: '╪',
  boxvL: '╡',
  boxvR: '╞',
  boxvh: '┼',
  boxvl: '┤',
  boxvr: '├',
  bprime: '‵',
  breve: '˘',
  brvbar: '¦',
  bscr: '𝒷',
  bsemi: '⁏',
  bsim: '∽',
  bsime: '⋍',
  bsol: '\\',
  bsolb: '⧅',
  bsolhsub: '⟈',
  bull: '•',
  bullet: '•',
  bump: '≎',
  bumpE: '⪮',
  bumpe: '≏',
  bumpeq: '≏',
  cacute: 'ć',
  cap: '∩',
  capand: '⩄',
  capbrcup: '⩉',
  capcap: '⩋',
  capcup: '⩇',
  capdot: '⩀',
  caps: '∩︀',
  caret: '⁁',
  caron: 'ˇ',
  ccaps: '⩍',
  ccaron: 'č',
  ccedil: 'ç',
  ccirc: 'ĉ',
  ccups: '⩌',
  ccupssm: '⩐',
  cdot: 'ċ',
  cedil: '¸',
  cemptyv: '⦲',
  cent: '¢',
  centerdot: '·',
  cfr: '𝔠',
  chcy: 'ч',
  check: '✓',
  checkmark: '✓',
  chi: 'χ',
  cir: '○',
  cirE: '⧃',
  circ: 'ˆ',
  circeq: '≗',
  circlearrowleft: '↺',
  circlearrowright: '↻',
  circledR: '®',
  circledS: 'Ⓢ',
  circledast: '⊛',
  circledcirc: '⊚',
  circleddash: '⊝',
  cire: '≗',
  cirfnint: '⨐',
  cirmid: '⫯',
  cirscir: '⧂',
  clubs: '♣',
  clubsuit: '♣',
  colon: ':',
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
  conint: '∮',
  copf: '𝕔',
  coprod: '∐',
  copy: '©',
  copysr: '℗',
  crarr: '↵',
  cross: '✗',
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
  cup: '∪',
  cupbrcap: '⩈',
  cupcap: '⩆',
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
  curvearrowleft: '↶',
  curvearrowright: '↷',
  cuvee: '⋎',
  cuwed: '⋏',
  cwconint: '∲',
  cwint: '∱',
  cylcty: '⌭',
  dArr: '⇓',
  dHar: '⥥',
  dagger: '†',
  daleth: 'ℸ',
  darr: '↓',
  dash: '‐',
  dashv: '⊣',
  dbkarow: '⤏',
  dblac: '˝',
  dcaron: 'ď',
  dcy: 'д',
  dd: 'ⅆ',
  ddagger: '‡',
  ddarr: '⇊',
  ddotseq: '⩷',
  deg: '°',
  delta: 'δ',
  demptyv: '⦱',
  dfisht: '⥿',
  dfr: '𝔡',
  dharl: '⇃',
  dharr: '⇂',
  diam: '⋄',
  diamond: '⋄',
  diamondsuit: '♦',
  diams: '♦',
  die: '¨',
  digamma: 'ϝ',
  disin: '⋲',
  div: '÷',
  divide: '÷',
  divideontimes: '⋇',
  divonx: '⋇',
  djcy: 'ђ',
  dlcorn: '⌞',
  dlcrop: '⌍',
  dollar: '$',
  dopf: '𝕕',
  dot: '˙',
  doteq: '≐',
  doteqdot: '≑',
  dotminus: '∸',
  dotplus: '∔',
  dotsquare: '⊡',
  doublebarwedge: '⌆',
  downarrow: '↓',
  downdownarrows: '⇊',
  downharpoonleft: '⇃',
  downharpoonright: '⇂',
  drbkarow: '⤐',
  drcorn: '⌟',
  drcrop: '⌌',
  dscr: '𝒹',
  dscy: 'ѕ',
  dsol: '⧶',
  dstrok: 'đ',
  dtdot: '⋱',
  dtri: '▿',
  dtrif: '▾',
  duarr: '⇵',
  duhar: '⥯',
  dwangle: '⦦',
  dzcy: 'џ',
  dzigrarr: '⟿',
  eDDot: '⩷',
  eDot: '≑',
  eacute: 'é',
  easter: '⩮',
  ecaron: 'ě',
  ecir: '≖',
  ecirc: 'ê',
  ecolon: '≕',
  ecy: 'э',
  edot: 'ė',
  ee: 'ⅇ',
  efDot: '≒',
  efr: '𝔢',
  eg: '⪚',
  egrave: 'è',
  egs: '⪖',
  egsdot: '⪘',
  el: '⪙',
  elinters: '⏧',
  ell: 'ℓ',
  els: '⪕',
  elsdot: '⪗',
  emacr: 'ē',
  empty: '∅',
  emptyset: '∅',
  emptyv: '∅',
  emsp13: ' ',
  emsp14: ' ',
  emsp: ' ',
  eng: 'ŋ',
  ensp: ' ',
  eogon: 'ę',
  eopf: '𝕖',
  epar: '⋕',
  eparsl: '⧣',
  eplus: '⩱',
  epsi: 'ε',
  epsilon: 'ε',
  epsiv: 'ϵ',
  eqcirc: '≖',
  eqcolon: '≕',
  eqsim: '≂',
  eqslantgtr: '⪖',
  eqslantless: '⪕',
  equals: '=',
  equest: '≟',
  equiv: '≡',
  equivDD: '⩸',
  eqvparsl: '⧥',
  erDot: '≓',
  erarr: '⥱',
  escr: 'ℯ',
  esdot: '≐',
  esim: '≂',
  eta: 'η',
  eth: 'ð',
  euml: 'ë',
  euro: '€',
  excl: '!',
  exist: '∃',
  expectation: 'ℰ',
  exponentiale: 'ⅇ',
  fallingdotseq: '≒',
  fcy: 'ф',
  female: '♀',
  ffilig: 'ﬃ',
  fflig: 'ﬀ',
  ffllig: 'ﬄ',
  ffr: '𝔣',
  filig: 'ﬁ',
  fjlig: 'fj',
  flat: '♭',
  fllig: 'ﬂ',
  fltns: '▱',
  fnof: 'ƒ',
  fopf: '𝕗',
  forall: '∀',
  fork: '⋔',
  forkv: '⫙',
  fpartint: '⨍',
  frac12: '½',
  frac13: '⅓',
  frac14: '¼',
  frac15: '⅕',
  frac16: '⅙',
  frac18: '⅛',
  frac23: '⅔',
  frac25: '⅖',
  frac34: '¾',
  frac35: '⅗',
  frac38: '⅜',
  frac45: '⅘',
  frac56: '⅚',
  frac58: '⅝',
  frac78: '⅞',
  frasl: '⁄',
  frown: '⌢',
  fscr: '𝒻',
  gE: '≧',
  gEl: '⪌',
  gacute: 'ǵ',
  gamma: 'γ',
  gammad: 'ϝ',
  gap: '⪆',
  gbreve: 'ğ',
  gcirc: 'ĝ',
  gcy: 'г',
  gdot: 'ġ',
  ge: '≥',
  gel: '⋛',
  geq: '≥',
  geqq: '≧',
  geqslant: '⩾',
  ges: '⩾',
  gescc: '⪩',
  gesdot: '⪀',
  gesdoto: '⪂',
  gesdotol: '⪄',
  gesl: '⋛︀',
  gesles: '⪔',
  gfr: '𝔤',
  gg: '≫',
  ggg: '⋙',
  gimel: 'ℷ',
  gjcy: 'ѓ',
  gl: '≷',
  glE: '⪒',
  gla: '⪥',
  glj: '⪤',
  gnE: '≩',
  gnap: '⪊',
  gnapprox: '⪊',
  gne: '⪈',
  gneq: '⪈',
  gneqq: '≩',
  gnsim: '⋧',
  gopf: '𝕘',
  grave: '`',
  gscr: 'ℊ',
  gsim: '≳',
  gsime: '⪎',
  gsiml: '⪐',
  gt: '>',
  gtcc: '⪧',
  gtcir: '⩺',
  gtdot: '⋗',
  gtlPar: '⦕',
  gtquest: '⩼',
  gtrapprox: '⪆',
  gtrarr: '⥸',
  gtrdot: '⋗',
  gtreqless: '⋛',
  gtreqqless: '⪌',
  gtrless: '≷',
  gtrsim: '≳',
  gvertneqq: '≩︀',
  gvnE: '≩︀',
  hArr: '⇔',
  hairsp: ' ',
  half: '½',
  hamilt: 'ℋ',
  hardcy: 'ъ',
  harr: '↔',
  harrcir: '⥈',
  harrw: '↭',
  hbar: 'ℏ',
  hcirc: 'ĥ',
  hearts: '♥',
  heartsuit: '♥',
  hellip: '…',
  hercon: '⊹',
  hfr: '𝔥',
  hksearow: '⤥',
  hkswarow: '⤦',
  hoarr: '⇿',
  homtht: '∻',
  hookleftarrow: '↩',
  hookrightarrow: '↪',
  hopf: '𝕙',
  horbar: '―',
  hscr: '𝒽',
  hslash: 'ℏ',
  hstrok: 'ħ',
  hybull: '⁃',
  hyphen: '‐',
  iacute: 'í',
  ic: '⁣',
  icirc: 'î',
  icy: 'и',
  iecy: 'е',
  iexcl: '¡',
  iff: '⇔',
  ifr: '𝔦',
  igrave: 'ì',
  ii: 'ⅈ',
  iiiint: '⨌',
  iiint: '∭',
  iinfin: '⧜',
  iiota: '℩',
  ijlig: 'ĳ',
  imacr: 'ī',
  image: 'ℑ',
  imagline: 'ℐ',
  imagpart: 'ℑ',
  imath: 'ı',
  imof: '⊷',
  imped: 'Ƶ',
  "in": '∈',
  incare: '℅',
  infin: '∞',
  infintie: '⧝',
  inodot: 'ı',
  "int": '∫',
  intcal: '⊺',
  integers: 'ℤ',
  intercal: '⊺',
  intlarhk: '⨗',
  intprod: '⨼',
  iocy: 'ё',
  iogon: 'į',
  iopf: '𝕚',
  iota: 'ι',
  iprod: '⨼',
  iquest: '¿',
  iscr: '𝒾',
  isin: '∈',
  isinE: '⋹',
  isindot: '⋵',
  isins: '⋴',
  isinsv: '⋳',
  isinv: '∈',
  it: '⁢',
  itilde: 'ĩ',
  iukcy: 'і',
  iuml: 'ï',
  jcirc: 'ĵ',
  jcy: 'й',
  jfr: '𝔧',
  jmath: 'ȷ',
  jopf: '𝕛',
  jscr: '𝒿',
  jsercy: 'ј',
  jukcy: 'є',
  kappa: 'κ',
  kappav: 'ϰ',
  kcedil: 'ķ',
  kcy: 'к',
  kfr: '𝔨',
  kgreen: 'ĸ',
  khcy: 'х',
  kjcy: 'ќ',
  kopf: '𝕜',
  kscr: '𝓀',
  lAarr: '⇚',
  lArr: '⇐',
  lAtail: '⤛',
  lBarr: '⤎',
  lE: '≦',
  lEg: '⪋',
  lHar: '⥢',
  lacute: 'ĺ',
  laemptyv: '⦴',
  lagran: 'ℒ',
  lambda: 'λ',
  lang: '⟨',
  langd: '⦑',
  langle: '⟨',
  lap: '⪅',
  laquo: '«',
  larr: '←',
  larrb: '⇤',
  larrbfs: '⤟',
  larrfs: '⤝',
  larrhk: '↩',
  larrlp: '↫',
  larrpl: '⤹',
  larrsim: '⥳',
  larrtl: '↢',
  lat: '⪫',
  latail: '⤙',
  late: '⪭',
  lates: '⪭︀',
  lbarr: '⤌',
  lbbrk: '❲',
  lbrace: '{',
  lbrack: '[',
  lbrke: '⦋',
  lbrksld: '⦏',
  lbrkslu: '⦍',
  lcaron: 'ľ',
  lcedil: 'ļ',
  lceil: '⌈',
  lcub: '{',
  lcy: 'л',
  ldca: '⤶',
  ldquo: '“',
  ldquor: '„',
  ldrdhar: '⥧',
  ldrushar: '⥋',
  ldsh: '↲',
  le: '≤',
  leftarrow: '←',
  leftarrowtail: '↢',
  leftharpoondown: '↽',
  leftharpoonup: '↼',
  leftleftarrows: '⇇',
  leftrightarrow: '↔',
  leftrightarrows: '⇆',
  leftrightharpoons: '⇋',
  leftrightsquigarrow: '↭',
  leftthreetimes: '⋋',
  leg: '⋚',
  leq: '≤',
  leqq: '≦',
  leqslant: '⩽',
  les: '⩽',
  lescc: '⪨',
  lesdot: '⩿',
  lesdoto: '⪁',
  lesdotor: '⪃',
  lesg: '⋚︀',
  lesges: '⪓',
  lessapprox: '⪅',
  lessdot: '⋖',
  lesseqgtr: '⋚',
  lesseqqgtr: '⪋',
  lessgtr: '≶',
  lesssim: '≲',
  lfisht: '⥼',
  lfloor: '⌊',
  lfr: '𝔩',
  lg: '≶',
  lgE: '⪑',
  lhard: '↽',
  lharu: '↼',
  lharul: '⥪',
  lhblk: '▄',
  ljcy: 'љ',
  ll: '≪',
  llarr: '⇇',
  llcorner: '⌞',
  llhard: '⥫',
  lltri: '◺',
  lmidot: 'ŀ',
  lmoust: '⎰',
  lmoustache: '⎰',
  lnE: '≨',
  lnap: '⪉',
  lnapprox: '⪉',
  lne: '⪇',
  lneq: '⪇',
  lneqq: '≨',
  lnsim: '⋦',
  loang: '⟬',
  loarr: '⇽',
  lobrk: '⟦',
  longleftarrow: '⟵',
  longleftrightarrow: '⟷',
  longmapsto: '⟼',
  longrightarrow: '⟶',
  looparrowleft: '↫',
  looparrowright: '↬',
  lopar: '⦅',
  lopf: '𝕝',
  loplus: '⨭',
  lotimes: '⨴',
  lowast: '∗',
  lowbar: '_',
  loz: '◊',
  lozenge: '◊',
  lozf: '⧫',
  lpar: '(',
  lparlt: '⦓',
  lrarr: '⇆',
  lrcorner: '⌟',
  lrhar: '⇋',
  lrhard: '⥭',
  lrm: '‎',
  lrtri: '⊿',
  lsaquo: '‹',
  lscr: '𝓁',
  lsh: '↰',
  lsim: '≲',
  lsime: '⪍',
  lsimg: '⪏',
  lsqb: '[',
  lsquo: '‘',
  lsquor: '‚',
  lstrok: 'ł',
  lt: '<',
  ltcc: '⪦',
  ltcir: '⩹',
  ltdot: '⋖',
  lthree: '⋋',
  ltimes: '⋉',
  ltlarr: '⥶',
  ltquest: '⩻',
  ltrPar: '⦖',
  ltri: '◃',
  ltrie: '⊴',
  ltrif: '◂',
  lurdshar: '⥊',
  luruhar: '⥦',
  lvertneqq: '≨︀',
  lvnE: '≨︀',
  mDDot: '∺',
  macr: '¯',
  male: '♂',
  malt: '✠',
  maltese: '✠',
  map: '↦',
  mapsto: '↦',
  mapstodown: '↧',
  mapstoleft: '↤',
  mapstoup: '↥',
  marker: '▮',
  mcomma: '⨩',
  mcy: 'м',
  mdash: '—',
  measuredangle: '∡',
  mfr: '𝔪',
  mho: '℧',
  micro: 'µ',
  mid: '∣',
  midast: '*',
  midcir: '⫰',
  middot: '·',
  minus: '−',
  minusb: '⊟',
  minusd: '∸',
  minusdu: '⨪',
  mlcp: '⫛',
  mldr: '…',
  mnplus: '∓',
  models: '⊧',
  mopf: '𝕞',
  mp: '∓',
  mscr: '𝓂',
  mstpos: '∾',
  mu: 'μ',
  multimap: '⊸',
  mumap: '⊸',
  nGg: '⋙̸',
  nGt: '≫⃒',
  nGtv: '≫̸',
  nLeftarrow: '⇍',
  nLeftrightarrow: '⇎',
  nLl: '⋘̸',
  nLt: '≪⃒',
  nLtv: '≪̸',
  nRightarrow: '⇏',
  nVDash: '⊯',
  nVdash: '⊮',
  nabla: '∇',
  nacute: 'ń',
  nang: '∠⃒',
  nap: '≉',
  napE: '⩰̸',
  napid: '≋̸',
  napos: 'ŉ',
  napprox: '≉',
  natur: '♮',
  natural: '♮',
  naturals: 'ℕ',
  nbsp: ' ',
  nbump: '≎̸',
  nbumpe: '≏̸',
  ncap: '⩃',
  ncaron: 'ň',
  ncedil: 'ņ',
  ncong: '≇',
  ncongdot: '⩭̸',
  ncup: '⩂',
  ncy: 'н',
  ndash: '–',
  ne: '≠',
  neArr: '⇗',
  nearhk: '⤤',
  nearr: '↗',
  nearrow: '↗',
  nedot: '≐̸',
  nequiv: '≢',
  nesear: '⤨',
  nesim: '≂̸',
  nexist: '∄',
  nexists: '∄',
  nfr: '𝔫',
  ngE: '≧̸',
  nge: '≱',
  ngeq: '≱',
  ngeqq: '≧̸',
  ngeqslant: '⩾̸',
  nges: '⩾̸',
  ngsim: '≵',
  ngt: '≯',
  ngtr: '≯',
  nhArr: '⇎',
  nharr: '↮',
  nhpar: '⫲',
  ni: '∋',
  nis: '⋼',
  nisd: '⋺',
  niv: '∋',
  njcy: 'њ',
  nlArr: '⇍',
  nlE: '≦̸',
  nlarr: '↚',
  nldr: '‥',
  nle: '≰',
  nleftarrow: '↚',
  nleftrightarrow: '↮',
  nleq: '≰',
  nleqq: '≦̸',
  nleqslant: '⩽̸',
  nles: '⩽̸',
  nless: '≮',
  nlsim: '≴',
  nlt: '≮',
  nltri: '⋪',
  nltrie: '⋬',
  nmid: '∤',
  nopf: '𝕟',
  not: '¬',
  notin: '∉',
  notinE: '⋹̸',
  notindot: '⋵̸',
  notinva: '∉',
  notinvb: '⋷',
  notinvc: '⋶',
  notni: '∌',
  notniva: '∌',
  notnivb: '⋾',
  notnivc: '⋽',
  npar: '∦',
  nparallel: '∦',
  nparsl: '⫽⃥',
  npart: '∂̸',
  npolint: '⨔',
  npr: '⊀',
  nprcue: '⋠',
  npre: '⪯̸',
  nprec: '⊀',
  npreceq: '⪯̸',
  nrArr: '⇏',
  nrarr: '↛',
  nrarrc: '⤳̸',
  nrarrw: '↝̸',
  nrightarrow: '↛',
  nrtri: '⋫',
  nrtrie: '⋭',
  nsc: '⊁',
  nsccue: '⋡',
  nsce: '⪰̸',
  nscr: '𝓃',
  nshortmid: '∤',
  nshortparallel: '∦',
  nsim: '≁',
  nsime: '≄',
  nsimeq: '≄',
  nsmid: '∤',
  nspar: '∦',
  nsqsube: '⋢',
  nsqsupe: '⋣',
  nsub: '⊄',
  nsubE: '⫅̸',
  nsube: '⊈',
  nsubset: '⊂⃒',
  nsubseteq: '⊈',
  nsubseteqq: '⫅̸',
  nsucc: '⊁',
  nsucceq: '⪰̸',
  nsup: '⊅',
  nsupE: '⫆̸',
  nsupe: '⊉',
  nsupset: '⊃⃒',
  nsupseteq: '⊉',
  nsupseteqq: '⫆̸',
  ntgl: '≹',
  ntilde: 'ñ',
  ntlg: '≸',
  ntriangleleft: '⋪',
  ntrianglelefteq: '⋬',
  ntriangleright: '⋫',
  ntrianglerighteq: '⋭',
  nu: 'ν',
  num: '#',
  numero: '№',
  numsp: ' ',
  nvDash: '⊭',
  nvHarr: '⤄',
  nvap: '≍⃒',
  nvdash: '⊬',
  nvge: '≥⃒',
  nvgt: '>⃒',
  nvinfin: '⧞',
  nvlArr: '⤂',
  nvle: '≤⃒',
  nvlt: '<⃒',
  nvltrie: '⊴⃒',
  nvrArr: '⤃',
  nvrtrie: '⊵⃒',
  nvsim: '∼⃒',
  nwArr: '⇖',
  nwarhk: '⤣',
  nwarr: '↖',
  nwarrow: '↖',
  nwnear: '⤧',
  oS: 'Ⓢ',
  oacute: 'ó',
  oast: '⊛',
  ocir: '⊚',
  ocirc: 'ô',
  ocy: 'о',
  odash: '⊝',
  odblac: 'ő',
  odiv: '⨸',
  odot: '⊙',
  odsold: '⦼',
  oelig: 'œ',
  ofcir: '⦿',
  ofr: '𝔬',
  ogon: '˛',
  ograve: 'ò',
  ogt: '⧁',
  ohbar: '⦵',
  ohm: 'Ω',
  oint: '∮',
  olarr: '↺',
  olcir: '⦾',
  olcross: '⦻',
  oline: '‾',
  olt: '⧀',
  omacr: 'ō',
  omega: 'ω',
  omicron: 'ο',
  omid: '⦶',
  ominus: '⊖',
  oopf: '𝕠',
  opar: '⦷',
  operp: '⦹',
  oplus: '⊕',
  or: '∨',
  orarr: '↻',
  ord: '⩝',
  order: 'ℴ',
  orderof: 'ℴ',
  ordf: 'ª',
  ordm: 'º',
  origof: '⊶',
  oror: '⩖',
  orslope: '⩗',
  orv: '⩛',
  oscr: 'ℴ',
  oslash: 'ø',
  osol: '⊘',
  otilde: 'õ',
  otimes: '⊗',
  otimesas: '⨶',
  ouml: 'ö',
  ovbar: '⌽',
  par: '∥',
  para: '¶',
  parallel: '∥',
  parsim: '⫳',
  parsl: '⫽',
  part: '∂',
  pcy: 'п',
  percnt: '%',
  period: '.',
  permil: '‰',
  perp: '⊥',
  pertenk: '‱',
  pfr: '𝔭',
  phi: 'φ',
  phiv: 'ϕ',
  phmmat: 'ℳ',
  phone: '☎',
  pi: 'π',
  pitchfork: '⋔',
  piv: 'ϖ',
  planck: 'ℏ',
  planckh: 'ℎ',
  plankv: 'ℏ',
  plus: '+',
  plusacir: '⨣',
  plusb: '⊞',
  pluscir: '⨢',
  plusdo: '∔',
  plusdu: '⨥',
  pluse: '⩲',
  plusmn: '±',
  plussim: '⨦',
  plustwo: '⨧',
  pm: '±',
  pointint: '⨕',
  popf: '𝕡',
  pound: '£',
  pr: '≺',
  prE: '⪳',
  prap: '⪷',
  prcue: '≼',
  pre: '⪯',
  prec: '≺',
  precapprox: '⪷',
  preccurlyeq: '≼',
  preceq: '⪯',
  precnapprox: '⪹',
  precneqq: '⪵',
  precnsim: '⋨',
  precsim: '≾',
  prime: '′',
  primes: 'ℙ',
  prnE: '⪵',
  prnap: '⪹',
  prnsim: '⋨',
  prod: '∏',
  profalar: '⌮',
  profline: '⌒',
  profsurf: '⌓',
  prop: '∝',
  propto: '∝',
  prsim: '≾',
  prurel: '⊰',
  pscr: '𝓅',
  psi: 'ψ',
  puncsp: ' ',
  qfr: '𝔮',
  qint: '⨌',
  qopf: '𝕢',
  qprime: '⁗',
  qscr: '𝓆',
  quaternions: 'ℍ',
  quatint: '⨖',
  quest: '?',
  questeq: '≟',
  quot: '"',
  rAarr: '⇛',
  rArr: '⇒',
  rAtail: '⤜',
  rBarr: '⤏',
  rHar: '⥤',
  race: '∽̱',
  racute: 'ŕ',
  radic: '√',
  raemptyv: '⦳',
  rang: '⟩',
  rangd: '⦒',
  range: '⦥',
  rangle: '⟩',
  raquo: '»',
  rarr: '→',
  rarrap: '⥵',
  rarrb: '⇥',
  rarrbfs: '⤠',
  rarrc: '⤳',
  rarrfs: '⤞',
  rarrhk: '↪',
  rarrlp: '↬',
  rarrpl: '⥅',
  rarrsim: '⥴',
  rarrtl: '↣',
  rarrw: '↝',
  ratail: '⤚',
  ratio: '∶',
  rationals: 'ℚ',
  rbarr: '⤍',
  rbbrk: '❳',
  rbrace: '}',
  rbrack: ']',
  rbrke: '⦌',
  rbrksld: '⦎',
  rbrkslu: '⦐',
  rcaron: 'ř',
  rcedil: 'ŗ',
  rceil: '⌉',
  rcub: '}',
  rcy: 'р',
  rdca: '⤷',
  rdldhar: '⥩',
  rdquo: '”',
  rdquor: '”',
  rdsh: '↳',
  real: 'ℜ',
  realine: 'ℛ',
  realpart: 'ℜ',
  reals: 'ℝ',
  rect: '▭',
  reg: '®',
  rfisht: '⥽',
  rfloor: '⌋',
  rfr: '𝔯',
  rhard: '⇁',
  rharu: '⇀',
  rharul: '⥬',
  rho: 'ρ',
  rhov: 'ϱ',
  rightarrow: '→',
  rightarrowtail: '↣',
  rightharpoondown: '⇁',
  rightharpoonup: '⇀',
  rightleftarrows: '⇄',
  rightleftharpoons: '⇌',
  rightrightarrows: '⇉',
  rightsquigarrow: '↝',
  rightthreetimes: '⋌',
  ring: '˚',
  risingdotseq: '≓',
  rlarr: '⇄',
  rlhar: '⇌',
  rlm: '‏',
  rmoust: '⎱',
  rmoustache: '⎱',
  rnmid: '⫮',
  roang: '⟭',
  roarr: '⇾',
  robrk: '⟧',
  ropar: '⦆',
  ropf: '𝕣',
  roplus: '⨮',
  rotimes: '⨵',
  rpar: ')',
  rpargt: '⦔',
  rppolint: '⨒',
  rrarr: '⇉',
  rsaquo: '›',
  rscr: '𝓇',
  rsh: '↱',
  rsqb: ']',
  rsquo: '’',
  rsquor: '’',
  rthree: '⋌',
  rtimes: '⋊',
  rtri: '▹',
  rtrie: '⊵',
  rtrif: '▸',
  rtriltri: '⧎',
  ruluhar: '⥨',
  rx: '℞',
  sacute: 'ś',
  sbquo: '‚',
  sc: '≻',
  scE: '⪴',
  scap: '⪸',
  scaron: 'š',
  sccue: '≽',
  sce: '⪰',
  scedil: 'ş',
  scirc: 'ŝ',
  scnE: '⪶',
  scnap: '⪺',
  scnsim: '⋩',
  scpolint: '⨓',
  scsim: '≿',
  scy: 'с',
  sdot: '⋅',
  sdotb: '⊡',
  sdote: '⩦',
  seArr: '⇘',
  searhk: '⤥',
  searr: '↘',
  searrow: '↘',
  sect: '§',
  semi: ';',
  seswar: '⤩',
  setminus: '∖',
  setmn: '∖',
  sext: '✶',
  sfr: '𝔰',
  sfrown: '⌢',
  sharp: '♯',
  shchcy: 'щ',
  shcy: 'ш',
  shortmid: '∣',
  shortparallel: '∥',
  shy: '­',
  sigma: 'σ',
  sigmaf: 'ς',
  sigmav: 'ς',
  sim: '∼',
  simdot: '⩪',
  sime: '≃',
  simeq: '≃',
  simg: '⪞',
  simgE: '⪠',
  siml: '⪝',
  simlE: '⪟',
  simne: '≆',
  simplus: '⨤',
  simrarr: '⥲',
  slarr: '←',
  smallsetminus: '∖',
  smashp: '⨳',
  smeparsl: '⧤',
  smid: '∣',
  smile: '⌣',
  smt: '⪪',
  smte: '⪬',
  smtes: '⪬︀',
  softcy: 'ь',
  sol: '/',
  solb: '⧄',
  solbar: '⌿',
  sopf: '𝕤',
  spades: '♠',
  spadesuit: '♠',
  spar: '∥',
  sqcap: '⊓',
  sqcaps: '⊓︀',
  sqcup: '⊔',
  sqcups: '⊔︀',
  sqsub: '⊏',
  sqsube: '⊑',
  sqsubset: '⊏',
  sqsubseteq: '⊑',
  sqsup: '⊐',
  sqsupe: '⊒',
  sqsupset: '⊐',
  sqsupseteq: '⊒',
  squ: '□',
  square: '□',
  squarf: '▪',
  squf: '▪',
  srarr: '→',
  sscr: '𝓈',
  ssetmn: '∖',
  ssmile: '⌣',
  sstarf: '⋆',
  star: '☆',
  starf: '★',
  straightepsilon: 'ϵ',
  straightphi: 'ϕ',
  strns: '¯',
  sub: '⊂',
  subE: '⫅',
  subdot: '⪽',
  sube: '⊆',
  subedot: '⫃',
  submult: '⫁',
  subnE: '⫋',
  subne: '⊊',
  subplus: '⪿',
  subrarr: '⥹',
  subset: '⊂',
  subseteq: '⊆',
  subseteqq: '⫅',
  subsetneq: '⊊',
  subsetneqq: '⫋',
  subsim: '⫇',
  subsub: '⫕',
  subsup: '⫓',
  succ: '≻',
  succapprox: '⪸',
  succcurlyeq: '≽',
  succeq: '⪰',
  succnapprox: '⪺',
  succneqq: '⪶',
  succnsim: '⋩',
  succsim: '≿',
  sum: '∑',
  sung: '♪',
  sup1: '¹',
  sup2: '²',
  sup3: '³',
  sup: '⊃',
  supE: '⫆',
  supdot: '⪾',
  supdsub: '⫘',
  supe: '⊇',
  supedot: '⫄',
  suphsol: '⟉',
  suphsub: '⫗',
  suplarr: '⥻',
  supmult: '⫂',
  supnE: '⫌',
  supne: '⊋',
  supplus: '⫀',
  supset: '⊃',
  supseteq: '⊇',
  supseteqq: '⫆',
  supsetneq: '⊋',
  supsetneqq: '⫌',
  supsim: '⫈',
  supsub: '⫔',
  supsup: '⫖',
  swArr: '⇙',
  swarhk: '⤦',
  swarr: '↙',
  swarrow: '↙',
  swnwar: '⤪',
  szlig: 'ß',
  target: '⌖',
  tau: 'τ',
  tbrk: '⎴',
  tcaron: 'ť',
  tcedil: 'ţ',
  tcy: 'т',
  tdot: '⃛',
  telrec: '⌕',
  tfr: '𝔱',
  there4: '∴',
  therefore: '∴',
  theta: 'θ',
  thetasym: 'ϑ',
  thetav: 'ϑ',
  thickapprox: '≈',
  thicksim: '∼',
  thinsp: ' ',
  thkap: '≈',
  thksim: '∼',
  thorn: 'þ',
  tilde: '˜',
  times: '×',
  timesb: '⊠',
  timesbar: '⨱',
  timesd: '⨰',
  tint: '∭',
  toea: '⤨',
  top: '⊤',
  topbot: '⌶',
  topcir: '⫱',
  topf: '𝕥',
  topfork: '⫚',
  tosa: '⤩',
  tprime: '‴',
  trade: '™',
  triangle: '▵',
  triangledown: '▿',
  triangleleft: '◃',
  trianglelefteq: '⊴',
  triangleq: '≜',
  triangleright: '▹',
  trianglerighteq: '⊵',
  tridot: '◬',
  trie: '≜',
  triminus: '⨺',
  triplus: '⨹',
  trisb: '⧍',
  tritime: '⨻',
  trpezium: '⏢',
  tscr: '𝓉',
  tscy: 'ц',
  tshcy: 'ћ',
  tstrok: 'ŧ',
  twixt: '≬',
  twoheadleftarrow: '↞',
  twoheadrightarrow: '↠',
  uArr: '⇑',
  uHar: '⥣',
  uacute: 'ú',
  uarr: '↑',
  ubrcy: 'ў',
  ubreve: 'ŭ',
  ucirc: 'û',
  ucy: 'у',
  udarr: '⇅',
  udblac: 'ű',
  udhar: '⥮',
  ufisht: '⥾',
  ufr: '𝔲',
  ugrave: 'ù',
  uharl: '↿',
  uharr: '↾',
  uhblk: '▀',
  ulcorn: '⌜',
  ulcorner: '⌜',
  ulcrop: '⌏',
  ultri: '◸',
  umacr: 'ū',
  uml: '¨',
  uogon: 'ų',
  uopf: '𝕦',
  uparrow: '↑',
  updownarrow: '↕',
  upharpoonleft: '↿',
  upharpoonright: '↾',
  uplus: '⊎',
  upsi: 'υ',
  upsih: 'ϒ',
  upsilon: 'υ',
  upuparrows: '⇈',
  urcorn: '⌝',
  urcorner: '⌝',
  urcrop: '⌎',
  uring: 'ů',
  urtri: '◹',
  uscr: '𝓊',
  utdot: '⋰',
  utilde: 'ũ',
  utri: '▵',
  utrif: '▴',
  uuarr: '⇈',
  uuml: 'ü',
  uwangle: '⦧',
  vArr: '⇕',
  vBar: '⫨',
  vBarv: '⫩',
  vDash: '⊨',
  vangrt: '⦜',
  varepsilon: 'ϵ',
  varkappa: 'ϰ',
  varnothing: '∅',
  varphi: 'ϕ',
  varpi: 'ϖ',
  varpropto: '∝',
  varr: '↕',
  varrho: 'ϱ',
  varsigma: 'ς',
  varsubsetneq: '⊊︀',
  varsubsetneqq: '⫋︀',
  varsupsetneq: '⊋︀',
  varsupsetneqq: '⫌︀',
  vartheta: 'ϑ',
  vartriangleleft: '⊲',
  vartriangleright: '⊳',
  vcy: 'в',
  vdash: '⊢',
  vee: '∨',
  veebar: '⊻',
  veeeq: '≚',
  vellip: '⋮',
  verbar: '|',
  vert: '|',
  vfr: '𝔳',
  vltri: '⊲',
  vnsub: '⊂⃒',
  vnsup: '⊃⃒',
  vopf: '𝕧',
  vprop: '∝',
  vrtri: '⊳',
  vscr: '𝓋',
  vsubnE: '⫋︀',
  vsubne: '⊊︀',
  vsupnE: '⫌︀',
  vsupne: '⊋︀',
  vzigzag: '⦚',
  wcirc: 'ŵ',
  wedbar: '⩟',
  wedge: '∧',
  wedgeq: '≙',
  weierp: '℘',
  wfr: '𝔴',
  wopf: '𝕨',
  wp: '℘',
  wr: '≀',
  wreath: '≀',
  wscr: '𝓌',
  xcap: '⋂',
  xcirc: '◯',
  xcup: '⋃',
  xdtri: '▽',
  xfr: '𝔵',
  xhArr: '⟺',
  xharr: '⟷',
  xi: 'ξ',
  xlArr: '⟸',
  xlarr: '⟵',
  xmap: '⟼',
  xnis: '⋻',
  xodot: '⨀',
  xopf: '𝕩',
  xoplus: '⨁',
  xotime: '⨂',
  xrArr: '⟹',
  xrarr: '⟶',
  xscr: '𝓍',
  xsqcup: '⨆',
  xuplus: '⨄',
  xutri: '△',
  xvee: '⋁',
  xwedge: '⋀',
  yacute: 'ý',
  yacy: 'я',
  ycirc: 'ŷ',
  ycy: 'ы',
  yen: '¥',
  yfr: '𝔶',
  yicy: 'ї',
  yopf: '𝕪',
  yscr: '𝓎',
  yucy: 'ю',
  yuml: 'ÿ',
  zacute: 'ź',
  zcaron: 'ž',
  zcy: 'з',
  zdot: 'ż',
  zeetrf: 'ℨ',
  zeta: 'ζ',
  zfr: '𝔷',
  zhcy: 'ж',
  zigrarr: '⇝',
  zopf: '𝕫',
  zscr: '𝓏',
  zwj: '‍',
  zwnj: '‌'
};

function decodeHTMLEntities(html) {
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

    this.captureFunctions = [this.captureNewline, this.captureCode, this.captureFences, this.captureHeading, this.capturePipelessTable, this.captureHorizontalRule, this.captureBlockquote, this.captureList, this.captureHTML, this.captureDefinition, this.captureTable, this.captureUnderlineHeading, this.captureParagraph, this.captureText];
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
    key: "captureHTML",
    value: function captureHTML() {
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
        var hrefHTML = cap[2];
        var titleHTML;

        if (cap[3]) {
          titleHTML = cap[3].substring(1, cap[3].length - 1);
        }
        var title = this.decodeEntities(titleHTML);
        var href = this.decodeEntities(hrefHTML);
        this.setRefLink(name, {
          href: href,
          hrefHTML: hrefHTML,
          title: title,
          titleHTML: titleHTML
        });
        return {
          type: type,
          name: name,
          href: href,
          hrefHTML: hrefHTML,
          title: title,
          titleHTML: titleHTML
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
      return decodeHTMLEntities(html);
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
    value: function findRefLink(name, type) {
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
        var hrefHTML = cap[2];
        var titleHTML = cap[3];
        var lastParenIndex = findClosingBracket$1(hrefHTML, '()');

        if (lastParenIndex > -1) {
          var start = type === 'image' ? 5 : 4;
          var linkLen = start + cap[1].length + lastParenIndex;
          hrefHTML = hrefHTML.substring(0, lastParenIndex);
          titleHTML = undefined;
          var capZero = cap[0].substring(0, linkLen).trim();
          this.backpedal(cap[0].substr(capZero.length));
        }

        if (this.options.pedantic) {
          var link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(hrefHTML);

          if (link) {
            hrefHTML = link[1];
            titleHTML = link[3];
          }
        } else if (titleHTML) {
          titleHTML = titleHTML.slice(1, -1);
        }

        if (!titleHTML) {
          titleHTML = undefined;
        }

        hrefHTML = hrefHTML.trim().replace(/^<([\s\S]*)>$/, '$1');
        hrefHTML = this.unescapeSlashes(hrefHTML);
        titleHTML = this.unescapeSlashes(titleHTML);
        var title = this.decodeEntities(titleHTML);
        var href = this.decodeEntities(hrefHTML);

        if (type === 'image') {
          var text = cap[1];
          return {
            type: type,
            href: href,
            hrefHTML: hrefHTML,
            title: title,
            titleHTML: titleHTML,
            text: text
          };
        } else {
          var markdown = cap[1];
          var children = null;
          return {
            type: type,
            href: href,
            hrefHTML: hrefHTML,
            title: title,
            titleHTML: titleHTML,
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
        var link = this.findRefLink(ref, type);

        if (link) {
          var href = link.href,
              hrefHTML = link.hrefHTML,
              title = link.title,
              titleHTML = link.titleHTML;

          if (type === 'image') {
            var text = cap[1];
            return {
              type: type,
              ref: ref,
              href: href,
              hrefHTML: hrefHTML,
              title: title,
              titleHTML: titleHTML,
              text: text
            };
          } else {
            var markdown = cap[1];
            var children = null;
            return {
              type: type,
              ref: ref,
              href: href,
              hrefHTML: hrefHTML,
              title: title,
              titleHTML: titleHTML,
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
      return decodeHTMLEntities(html);
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
      this.processCode();
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
  }, {
    key: "processCode",
    value: function processCode() {
      var highlight = this.options.highlight;

      if (highlight) {
        var sections = findCodeSections(this.tokens);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = sections[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var section = _step2.value;
            var html = highlight(section.text, section.lang);

            if (typeof html === 'string') {
              var parser = new this.constructor({
                htmlOnly: true
              });
              var tokens = parser.parse(html);
              section.children = tokens;
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
    value: function tokenize(text, containerType) {
      var _this = this;

      this.initialize(text, containerType);
      return this.process().then(function () {
        return _this.tokens;
      });
    }
  }, {
    key: "process",
    value: function process() {
      var _this2 = this;

      return loopAsync(function () {
        if (_this2.remaining) {
          var token = _this2.captureToken();

          _this2.append(token);

          return nextTick();
        }
      });
    }
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
    value: function tokenize(text) {
      var _this = this;

      this.initialize(text);
      return this.process().then(function () {
        return _this.tokens;
      });
    }
  }, {
    key: "process",
    value: function process() {
      var _this2 = this;

      return loopAsync(function () {
        if (_this2.remaining) {
          var token = _this2.captureToken();

          _this2.append(token);

          return nextTick();
        }
      });
    }
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
    value: function parse(text) {
      var _this = this;

      this.initialize(text);
      return this.processBlocks().then(function () {
        return _this.processInline().then(function () {
          return _this.processCode().then(function () {
            return _this.tokens;
          });
        });
      });
    }
  }, {
    key: "processBlocks",
    value: function processBlocks() {
      var _this2 = this;

      if (this.options.htmlOnly) {
        var type = 'html_block';
        var markdown = this.text;
        var children = null;
        this.tokens = [{
          type: type,
          markdown: markdown,
          children: children
        }];
        return Promise.resolve();
      } else {
        return this.blockLexer.tokenize(this.text).then(function (tokens) {
          _this2.tokens = tokens;
        });
      }
    }
  }, {
    key: "processInline",
    value: function processInline(tokens) {
      return this.tokenizeInline(this.tokens);
    }
  }, {
    key: "tokenizeInline",
    value: function tokenizeInline(tokens) {
      var _this3 = this;

      return eachAsync(tokens, function (token) {
        var children = token.children,
            markdown = token.markdown,
            type = token.type;

        if (children) {
          return _this3.tokenizeInline(children);
        } else if (markdown) {
          return _this3.inlineLexer.tokenize(markdown, type).then(function (tokens) {
            token.children = tokens;
          });
        } else {
          return Promise.resolve();
        }
      });
    }
  }, {
    key: "processCode",
    value: function processCode() {
      var _this4 = this;

      var highlight = this.options.highlight;

      if (highlight) {
        var sections = findCodeSections(this.tokens);
        return eachAsync(sections, function (section) {
          var html = highlight(section.text, section.lang);
          return Promise.resolve(html).then(function (html) {
            if (typeof html === 'string') {
              var parser = new _this4.constructor({
                htmlOnly: true
              });
              return parser.parse(html).then(function (tokens) {
                section.children = tokens;
              });
            }
          });
        });
      } else {
        return Promise.resolve();
      }
    }
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
      html_block: this.renderHTMLBlock,
      paragraph: this.renderParagraph,
      code: this.renderCode,
      blockquote: this.renderBlockquote,
      html_tag: this.renderHTMLTag,
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
          children = token.children;
      var langPrefix = this.options.langPrefix;
      var className = lang ? langPrefix + lang : undefined;
      this.addElement('pre', null);
      this.addElement('code', {
        "class": className
      });

      if (children) {
        this.renderTokens(children);
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
    key: "renderHTMLTag",
    value: function renderHTMLTag(token) {
      var normalizeTags = this.options.normalizeTags;

      if (normalizeTags) {
        var html = token.html;

        var _this$parseHTMLTag = this.parseHTMLTag(html),
            type = _this$parseHTMLTag.type,
            name = _this$parseHTMLTag.name,
            attributes = _this$parseHTMLTag.attributes,
            before = _this$parseHTMLTag.before,
            after = _this$parseHTMLTag.after;

        if (before) {
          this.addText(before);
        }

        if (type === 'start') {
          var alias = this.options.fixBrokenTags ? this.findTagAlias(name) : null;
          this.addElement(alias || name, attributes);
        } else if (type === 'end') {
          this.endElement(name);
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
      var hrefHTML = token.hrefHTML,
          title = token.title;
      var href = this.cleanUrl(hrefHTML, true, true);

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
      var hrefHTML = token.hrefHTML,
          title = token.title,
          alt = token.text;
      var src = this.cleanUrl(hrefHTML, true, true);

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
    key: "renderHTMLBlock",
    value: function renderHTMLBlock(token) {
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

        var name = this.slugger.slug(plain);
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
    key: "parseHTMLTag",
    value: function parseHTMLTag(html) {
      var startTag = /^(\s*)<([a-zA-Z][\w.:-]*)([^>]*)>([\s\S]*)/;
      var endTag = /^(\s*)<\/([a-zA-Z][\w.:-]*)[^>]*>([\s\S]*)/;
      var scap = startTag.exec(html);

      if (scap) {
        var attribute = /\s*([a-zA-Z:_][\w.:-]*)(?:\s*=\s*"([^"]*)"|\s*=\s*'([^']*)'|\s*=\s*([^\s"'=<>`]+))?/g;
        var type = 'start';
        var name = scap[2].toLowerCase();
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
          name: name,
          attributes: attributes,
          before: before,
          after: after
        };
      }

      var ecap = endTag.exec(html);

      if (ecap) {
        var _type = 'end';

        var _name = ecap[2].toLowerCase();

        var _before = ecap[1];
        var _after = ecap[3];
        return {
          type: _type,
          name: _name,
          before: _before,
          after: _after
        };
      }

      return {};
    }
  }, {
    key: "decodeEntities",
    value: function decodeEntities(html) {
      return decodeHTMLEntities(html);
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

var HTMLRenderer =
/*#__PURE__*/
function (_BaseRenderer) {
  _inherits(HTMLRenderer, _BaseRenderer);

  function HTMLRenderer(options, props) {
    var _this;

    _classCallCheck(this, HTMLRenderer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HTMLRenderer).call(this, options, props));
    _this.outputFunctions = {
      html_tag: _this.outputHTMLTag,
      html_element: _this.outputHTMLElement,
      html_element_end: _this.outputHTMLElementEnd,
      text: _this.outputText,
      raw: _this.outputRaw
    };
    return _this;
  }

  _createClass(HTMLRenderer, [{
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
    key: "outputHTMLTag",
    value: function outputHTMLTag(token) {
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
    key: "outputHTMLElement",
    value: function outputHTMLElement(token) {
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
    key: "outputHTMLElementEnd",
    value: function outputHTMLElementEnd(token) {
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
        var hrefHTML = token.hrefHTML,
            titleHTML = token.titleHTML;
        var hrefCleaned = this.cleanUrl(hrefHTML, true, false);

        if (hrefCleaned !== null) {
          var href = this.boxAttribute(hrefCleaned, true);
          var title = this.boxAttribute(titleHTML, true);
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
        _get(_getPrototypeOf(HTMLRenderer.prototype), "renderLink", this).call(this, token);
      }
    }
  }, {
    key: "renderImage",
    value: function renderImage(token) {
      if (!this.options.decodeEntities) {
        var hrefHTML = token.hrefHTML,
            titleHTML = token.titleHTML,
            alt = token.text;
        var srcHTML = this.cleanUrl(hrefHTML, true, false);

        if (srcHTML !== null) {
          var title = this.boxAttribute(titleHTML, true);
          var src = this.boxAttribute(srcHTML, false);
          this.addElement('img', {
            src: src,
            alt: alt,
            title: title
          });
        } else {
          this.addText(alt);
        }
      } else {
        _get(_getPrototypeOf(HTMLRenderer.prototype), "renderImage", this).call(this, token);
      }
    }
  }, {
    key: "cleanUrl",
    value: function cleanUrl(url, escaped, unescapeAfter) {
      if (url && this.options.mangle) {
        if (url.startsWith('mailto:')) {
          var address = url.substr(7);
          var mangled = this.mangle(address);
          return this.boxRawHTML("mailto:".concat(mangled));
        }
      }

      return _get(_getPrototypeOf(HTMLRenderer.prototype), "cleanUrl", this).call(this, url, escaped, unescapeAfter);
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

  return HTMLRenderer;
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
  accesskey: 'accessKey',
  allowfullscreen: 'allowFullScreen',
  allowtransparency: 'allowTransparency',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  "class": 'className',
  checked: 'defaultChecked',
  colspan: 'colSpan',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controlslist: 'controlsList',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  enctype: 'encType',
  "for": 'htmlFor',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formmethod: 'formMethod',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  'http-equiv': 'httpEquiv',
  inputmode: 'inputMode',
  marginheight: 'marginHeight',
  marginwidth: 'marginWidth',
  maxlength: 'maxLength',
  mediagroup: 'mediaGroup',
  minlength: 'minLength',
  novalidate: 'noValidate',
  playsinline: 'playsInline',
  readonly: 'readOnly',
  referrerpolicy: 'referrerPolicy',
  rowspan: 'rowSpan',
  srcset: 'srcSet',
  tabindex: 'tabIndex'
};

function getDOMName(name) {
  name = name.toLowerCase();
  return camelCaseNames[name] || name;
}

var booleanAttributes = ['allowFullScreen', 'async', 'autoplay', 'capture', 'checked', 'controls', 'default', 'defer', 'disabled', 'formNoValidate', 'hidden', 'loop', 'multiple', 'muted', 'noValidate', 'open', 'playsInline', 'preload', 'readOnly', 'required', 'reversed', 'seamless', 'selected', 'spellcheck', 'translate', 'wrap'];

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

var JSONRenderer =
/*#__PURE__*/
function (_BaseRenderer) {
  _inherits(JSONRenderer, _BaseRenderer);

  function JSONRenderer(options, props) {
    var _this;

    _classCallCheck(this, JSONRenderer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JSONRenderer).call(this, options, props));
    _this.outputFunctions = {
      html_tag: _this.outputHTMLTag,
      html_element: _this.outputHTMLElement,
      text: _this.outputText,
      raw: _this.outputRaw
    };
    return _this;
  }

  _createClass(JSONRenderer, [{
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
    key: "outputHTMLTag",
    value: function outputHTMLTag(token) {}
  }, {
    key: "outputHTMLElement",
    value: function outputHTMLElement(token, key) {
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

  return JSONRenderer;
}(BaseRenderer);

function parse(text, options) {
  var parser = new Parser(options);
  var renderer = new HTMLRenderer(options);
  var tokens = parser.parse(text);
  var html = renderer.render(tokens);
  return html;
}

function parseAsync(text, options) {
  var parser = new AsyncParser(options);
  var renderer = new HTMLRenderer(options);
  return parser.parse(text).then(function (tokens) {
    var html = renderer.render(tokens);
    return html;
  });
}

export { AsyncParser, BlockLexer, HTMLRenderer, HTMLRenderer as HtmlRenderer, InlineLexer, JSONRenderer, JSONRenderer as JsonRenderer, Parser, changeDefaults, defaults$1 as defaults, findCodeSections, findTextStrings, getDefaults, mergeDefaults, parse, parseAsync };
