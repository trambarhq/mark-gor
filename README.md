# Mark-Gor

Mark-Gor is a Markdown parser based on [Marked](https://github.com/chjj/marked) that can generate both HTML text and React elements. The lexers was completely reworked to make them independent from the rendering stage. It generates a complete token tree that can then be fed to either the HTML renderer or React renderer. The new engine is also much more flexible. Most aspects can be customized by overriding methods of the lexers or renderers.

## Install

``` bash
npm install mark-gor --save-dev
```

## Usage

HTML:

```js
var markGor = require('mark-gor');
console.log(markGor.parse('I am using __markdown__.'));
// Outputs: <p>I am using <strong>markdown</strong>.</p>
```

React:

```js
var markGor = require('mark-gor/react');

function Markdown(props) {
  var elements = markGor.parse(props.text, props.options);
  return <div>{elements}</div>;
}
```

Note: The React version of the parse() returns an array of ReactElement or strings. You will need to place them in a container element.

## Options

### gfm

Type: `boolean`
Default: `true`
Used by: BlockLexer, InlineLexer

Enable [GitHub flavored markdown][gfm].

### tables

Type: `boolean`
Default: `true`
Used by: BlockLexer, InlineLexer

Enable GFM [tables][tables].
This option requires the `gfm` option to be true.

### breaks

Type: `boolean`
Default: `false`
Used by: BlockLexer, InlineLexer

Enable GFM [line breaks][breaks].
This option requires the `gfm` option to be true.

### pedantic

Type: `boolean`
Default: `false`
Used by: BlockLexer, InlineLexer

Conform to obscure parts of `markdown.pl` as much as possible. Don't fix any of
the original markdown bugs or poor behavior.

### smartLists

Type: `boolean`
Default: `true`
Used by: BlockLexer

Use smarter list behavior than the original markdown.

### sanitize

Type: `boolean`
Default: `false`
Used by: HTMLRenderer, ReactRenderer

### langPrefix

Type: `string`
Default: `lang-`
Used by: HTMLRenderer, ReactRenderer

Prefix added to language name when it's used as a CSS class name of code blocks.

### headerPrefix

Type: `string`
Default: `<empty>`
Used by: HTMLRenderer, ReactRenderer

Prefix added to anchor names of headers.

## Limitations

Currently, the React renderer ignores HTML tags embedded in the Markdown text.

## Performance

Mark-Gor performs roughly as well as Marked. Generally it's just slightly slower.
