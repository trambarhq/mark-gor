/**
 * Inline Lexer
 */

module.exports = InlineLexer;

var defaultOptions = {
  gfm: true,
  breaks: false,
  pedantic: false,
};

function InlineLexer(/* ...objects */) {
  this.inLink = false;
  this.links = {};
  this.remaining = '';

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    var keys = Object.keys(arg);
    for (var j = 0; j < keys.length; j++) {
      var key = keys[j];
      this[key] = arg[key];
    }
  }

  if (!this.options) {
    this.options = defaultOptions;
  }
  if (!this.rules) {
    this.rules = inline.normal;
    if (this.options.gfm) {
      if (this.options.breaks) {
        this.rules = inline.breaks;
      } else {
        this.rules = inline.gfm;
      }
    } else if (this.options.pedantic) {
      this.rules = inline.pedantic;
    }
  }
}

InlineLexer.prototype.findRefLink = function(name) {
  return this.links[name];
}

InlineLexer.prototype.tokenize = function(text) {
  var tokens = [];
  var prevToken = null;
  this.remaining = text;
  while (this.remaining) {
    var token = this.captureToken();
    if (!token) {
      throw new
        Error('Infinite loop on byte: ' + this.remaining.charCodeAt(0));
    }
    if (token.type === 'text') {
      // merge adjacent text tokens
      if (prevToken && prevToken.type === 'text') {
        prevToken.text += token.text;
        continue;
      }
    }
    tokens.push(token);
    prevToken = token;
  }
  return tokens;
};

InlineLexer.prototype.captureToken = function() {
  return this.captureEscape()
      || this.captureAutolink()
      || this.captureUrl()
      || this.captureTag()
      || this.captureLink()
      || this.captureRefLink(false)
      || this.captureRefLink(true)
      || this.captureStrong()
      || this.captureEm()
      || this.captureCode()
      || this.captureBr()
      || this.captureDel()
      || this.captureText();
};

InlineLexer.prototype.captureEscape = function() {
  var cap = this.capture(this.rules.escape);
  if (cap) {
    return {
      type: 'text',
      text: cap[1],
    };
  }
};

InlineLexer.prototype.captureAutolink = function() {
  var cap = this.capture(this.rules.autolink);
  if (cap) {
    return {
      type: 'autolink',
      text: cap[1],
      href: cap[1],
    }
  };
};

InlineLexer.prototype.captureUrl = function() {
  if (this.inLink) {
    return;
  }
  var cap = this.capture(this.rules.url);
  if (cap) {
    return {
      type: 'url',
      text: cap[1],
      href: cap[1],
    };
  }
};

InlineLexer.prototype.captureTag = function() {
  var cap = this.capture(this.rules.tag);
  if (cap) {
    if (!this.inLink && /^<a /i.test(cap[0])) {
      this.inLink = true;
    } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
      this.inLink = false;
    }
    return {
      type: 'html',
      html: cap[0],
    };
  }
};

InlineLexer.prototype.captureLink = function() {
  var cap = this.capture(this.rules.link);
  if (cap) {
    return {
      type: cap[0].charAt(0) !== '!'
        ? 'link'
        : 'image',
      href: cap[2],
      title: cap[3],
      text: cap[1],
    };
  }
};

InlineLexer.prototype.captureRefLink = function(noLink) {
  var rule = noLink
    ? this.rules.nolink
    : this.rules.reflink;
  var cap = this.capture(rule);
  if (cap) {
    var name = (cap[2] || cap[1])
                .replace(/\s+/g, ' ')
                .toLowerCase();
    var link = this.findRefLink(name);
    if (link && link.href) {
      return {
        type: cap[0].charAt(0) !== '!'
          ? 'link'
          : 'image',
        href: link.href,
        title: link.title,
        text: cap[1],
      };
    } else {
      this.backpedal(cap[0].substr(1));
      return {
        type: 'text',
        text: cap[0].substr(0, 1),
      };
    }
  }
};

InlineLexer.prototype.captureStrong = function() {
  var cap = this.capture(this.rules.strong);
  if (cap) {
    var text = cap[2] || cap[1];
    var lexer = new InlineLexer(this);
    var tokens = lexer.tokenize(text);
    return {
      type: 'strong',
      children: tokens,
    };
  }
};

InlineLexer.prototype.captureEm = function() {
  var cap = this.capture(this.rules.em);
  if (cap) {
    var text = cap[2] || cap[1];
    var lexer = new InlineLexer(this);
    var tokens = lexer.tokenize(text);
    return {
      type: 'em',
      children: tokens
    };
  }
};

InlineLexer.prototype.captureCode = function() {
  var cap = this.capture(this.rules.code);
  if (cap) {
    var text = escape(cap[2], true);
    var lexer = new InlineLexer(this);
    var tokens = lexer.tokenize(text);
    return {
      type: 'codespan',
      children: tokens,
    };
  }
};

InlineLexer.prototype.captureBr = function() {
  var cap = this.capture(this.rules.br);
  if (cap) {
    return {
      type: 'br'
    };
  }
};

InlineLexer.prototype.captureDel = function() {
  var cap = this.capture(this.rules.del);
  if (cap) {
    var text = cap[1];
    var lexer = new InlineLexer(this);
    var tokens = lexer.tokenize(text);
    return {
      type: 'del',
      children: tokens,
    };
  }
};

InlineLexer.prototype.captureText = function() {
  var cap = this.capture(this.rules.text);
  if (cap) {
    var text = cap[0];
    return {
      type: 'text',
      text: text,
    }
  }
};

InlineLexer.prototype.capture = function(regExp) {
  var cap = regExp.exec(this.remaining);
  if (cap) {
    this.remaining = this.remaining.substr(cap[0].length);
    return cap;
  }
};

InlineLexer.prototype.backpedal = function(text) {
  this.remaining = text + this.remaining;
};

/**
 * Inline-Level Grammar
 */

var helpers = require('./helpers');
var noop = helpers.noop;
var merge = helpers.merge;
var replace = helpers.replace;

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});
