# Mark-Gor

Mark-Gor is a Markdown parser designed for [React](https://github.com/facebook/react) applications. It's based on on [Marked](https://github.com/markedjs/marked). It makes use of regular expressions and helper functions from that library. Besides Markdown formatted text, Mark-Gor is also capable of correctly rendering embedded HTML contents (starting from version 2).

## Install

``` bash
npm install mark-gor --save-dev
```

## Simple Usage

Mark-Gor is distributed in three separate bundles: one for React, one for [Preact](https://github.com/preactjs/preact), and one for straight HTML. The React one is the default:

```js
import { parse } from 'mark-gor';

function Markdown(props) {
  return parse(props.markdown);
}
```

`parse()` is a helper function that let you display Markdown text with one function call. It returns a `React.Fragment`. For customized behaviors you would want to work directly with the classes provided by the library.

The Preact version of Mark-Gor requires importing different bundle:

```js
import { parse } from 'mark-gor/preact';

function Markdown(props) {
  return parse(props.markdown);
}
```

HTML:

```js
import { parse } from 'mark-gor/html';

const markdown = 'I am using __markdown__.';
const html = parse(markdown);
console.log(html);

// Outputs: <p>I am using <strong>markdown</strong>.</p>
```

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

### langPrefix

Type: `string`
Default: `lang-`
Used by: HTMLRenderer, ReactRenderer

Prefix added to language name when it's used as a CSS class name of code blocks.

### headerIds

Type: `boolean`
Default: `true`
Used by: HTMLRenderer, ReactRenderer

Automatically add IDs to heading tags.

### headerPrefix

Type: `string`
Default: `<empty>`
Used by: HTMLRenderer, ReactRenderer

Prefix added to IDs of headings.

### headerFormat

Type: `string`
Default: `github`
Used by: HTMLRenderer, ReactRenderer

Controls how header IDs are generated. By default, the library follows the convention used in GitHub. Set this option to `marked` if you want to replicate the library's odd behaviors.

### decodeEntities

Type: `boolean`
Default: `true`
Used by: HTMLRenderer

Determines whether HTML entities get decoded and get sent as regular Unicode characters.

### fixBrokenTags

Type: `boolean`
Default: `true`
Used by: HTMLRenderer, ReactRenderer

### normalizeTags

Type: `boolean`
Default: `true`
Used by: HTMLRenderer, ReactRenderer

### omitLinefeed

Type: `boolean`
Default: `true`
Used by: HTMLRenderer, ReactRenderer

### omitDeclarations

Type: `boolean`
Default: `true`
Used by: HTMLRenderer

### omitEmbeddedCode

Type: `boolean`
Default: `true`
Used by: HTMLRenderer

### omitNonvisualWhitespace

Type: `boolean`
Default: `true`
Used by: HTMLRenderer, ReactRenderer

### omitTags

Type: `string[]`
Default: `[ 'script', 'style', 'link', 'meta' ]`
Used by: HTMLRenderer, ReactRenderer
