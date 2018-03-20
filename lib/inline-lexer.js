/**
 * Inline Lexer
 */

function InlineLexer(/* ...objects */) {
  this.inLink = false;
  this.links = {};
  this.remaining = '';
  this.offset = 0;

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    var keys = Object.keys(arg);
    for (var j = 0; j < keys.length; j++) {
      var key = keys[j];
      this[key] = arg[key];
    }
  }

  if (!this.options) {
    this.options = InlineLexer.defaults;
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

InlineLexer.defaults = {
  gfm: true,
  breaks: false,
  pedantic: false,
};

InlineLexer.prototype.findRefLink = function(name, image) {
  return this.links[name];
};

InlineLexer.prototype.tokenize = function(text) {
  var tokens = [];
  var prevToken = null;
  this.remaining = text;
  this.offset = 0;
  while (this.remaining) {
    var before = this.offset;
    var token = this.captureToken();
    var after = this.offset;
    if (!token) {
      throw new
        Error('Infinite loop on byte: ' + this.remaining.charCodeAt(0));
    }
    token.captured = text.substring(before, after);
    if (token.type === 'text') {
      // merge adjacent text tokens
      if (prevToken && prevToken.type === 'text') {
        if (prevToken.escaped === token.escaped) {
          prevToken.text += token.text;
          prevToken.captured += token.captured;
          continue;
        }
      }
    } else if (token.markdown) {
      // process children
      var lexer = new InlineLexer(this);
      if (token.type === 'link') {
        lexer.inLink = true;
      }
      token.children = lexer.tokenize(token.markdown);
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
      escaped: true,
      text: cap[1],
    };
  }
};

InlineLexer.prototype.captureAutolink = function() {
  var cap = this.capture(this.rules.autolink);
  if (cap) {
    var href = cap[1];
    if (cap[2] === '@') {
      href = 'mailto:' + href;
    }
    return {
      type: 'autolink',
      href: href,
      text: cap[1],
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
      href: cap[1],
      text: cap[1],
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
    var image = cap[0].charAt(0) === '!';
    if (image) {
      return {
        type: 'image',
        href: cap[2],
        title: cap[3],
        text: cap[1],
      };
    } else {
      return {
        type: 'link',
        href: cap[2],
        title: cap[3],
        markdown: cap[1],
        children: null
      };
    }
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
    var image = cap[0].charAt(0) === '!';
    var link = this.findRefLink(name, image);
    if (link && link.href) {
      if (image) {
        return {
          type: 'image',
          ref: name,
          href: link.href,
          title: link.title,
          text: cap[1]
        };
      } else {
        return {
          type: 'link',
          ref: name,
          href: link.href,
          title: link.title,
          markdown: cap[1],
          children: null
        };
      }
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
    return {
      type: 'strong',
      markdown: cap[2] || cap[1],
      children: null
    };
  }
};

InlineLexer.prototype.captureEm = function() {
  var cap = this.capture(this.rules.em);
  if (cap) {
    return {
      type: 'em',
      markdown: cap[2] || cap[1],
      children: null
    };
  }
};

InlineLexer.prototype.captureCode = function() {
  var cap = this.capture(this.rules.code);
  if (cap) {
    return {
      type: 'codespan',
      text: cap[2],
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
    return {
      type: 'del',
      markdown: cap[1],
      children: null,
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
    var len = cap[0].length;
    this.remaining = this.remaining.substr(len);
    this.offset += len;
    return cap;
  }
};

InlineLexer.prototype.backpedal = function(text) {
  this.remaining = text + this.remaining;
  this.offset -= text.length;
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

module.exports = InlineLexer;
