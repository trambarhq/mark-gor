# Mark-Gor

Mark-Gor is a Markdown parser designed for [React](https://github.com/facebook/react) applications. It's based on on [Marked](https://github.com/markedjs/marked). It makes use of regular expressions and helper functions from that library. Besides Markdown formatted text, Mark-Gor is also capable of correctly rendering embedded HTML contents (without resorting to `dangerouslySetInnerHTML`).

## Install

``` bash
npm install mark-gor --save-dev
```

## Basic usage

Mark-Gor is distributed in three separate bundles: one for React, one for [Preact](https://github.com/preactjs/preact), and one for straight HTML. The React one is the default:

```js
import { parse } from 'mark-gor';

function Markdown(props) {
  const { markdown } = props;
  return parse(markdown);
}
```

`parse()` is a helper function that let you display Markdown text with a single function call. It returns a `React.Fragment`.

For more complex behaviors you would want to work directly with the classes provided by this library.

The Preact version of Mark-Gor requires importing a different bundle:

```js
import { parse } from 'mark-gor/preact';

function Markdown(props) {
  const { markdown } = props;
  return parse(markdown);
}
```

Use the `html` bundle if you want HTML as the output:

```js
import { parse } from 'mark-gor/html';

const markdown = 'I am using __markdown__.';
const html = parse(markdown);
console.log(html);

// Outputs: <p>I am using <strong>markdown</strong>.</p>
```

## Asynchronous parsing

Parsing long document could cause the browser to become unresponsive momentarily. Mark-Gor provides an alternative, asynchronous mode of operation that keeps this from happening. Instead of returning the result, `parseAsync()` returns a promise of the result:   

```js
import { useState, useEffect } from 'react';
import { parseAsync } from 'mark-gor';

function Markdown(props) {
  const { markdown } = props;
  const [ content, setContent ] = useState();
  useEffect(() => {
    parseAsync(markdown).then(setContent);
  }, [ markdown ]);
  return content;
}
```

During the initial render, `content` is `undefined`. The `useEffect` hook is used to trigger parseing of the Markdown text whenever it changes. When the promise returned by `parseAsync()` is filfilled, the callback passed to its `then()` method is called with the outcome. The component then rerenders with the newly available content.

## Parsing HTML

You can use Mark-Gor to render HTML fragments, leveraging the same code that handles HTML embedded in Markdown. The `htmlOnly` option basically disables the parsing of Markdown format:

```js
import { useMemo } from 'react';
import { parse } from 'mark-gor';

function HTML(props) {
  const { html } = props;
  const content = useMemo(() => {
    return parse(html, { htmlOnly: true });
  }, [ html ])
  return content;
}
```

## Using the Mark-Gor classes

`parse()` is simply a helper function. Most of the heavy lifting is actually performed by Mark-Gor's classes. They're listed below along with their descendants:

* Parser
  - AsyncParser
* BlockLexer
  - AsyncBlockLexer
* InlineLexer
  - AsyncInlineLexer
* BaseRenderer
  - ReactRenderer
  - PreactRenderer
  - HtmlRenderer
  - JsonRenderer

`Parser` parses the Markdown text into a list of tokens. It uses `BlockLexer` to scan for the basic  document structure and `InlineLexer` to scan for styling applied to the text. `BaseRenderer` takes this tree-like structure and generates a linear list of HTML tokens (start tags, end tags, and text basically). It then performs [normalization](#html-normalization), transforming the list into something that resembles the final DOM structure. Each of the descendant renderer will then render it in the appropriate manner.

The following example shows how to parse Markdown text by using the classes directly:  

```js
import { useMemo } from 'react';
import { Parser, ReactRenderer } from 'mark-gor';

function Markdown(props) {
  const { markdown, options } = props;
  const content = useMemo(() => {
    const parser = new Parser(options);
    const renderer = new ReactRenderer(options);
    const tokens = parser.parse(text);
    return renderer.render(tokens);
  }, [ markdown ]);
  return content;
}
```

Mark-Gor is designed to be highly customizable. Nearly all its behaviors can be altered by extending the appropriate class and overriding a method.

## Extracting text

If you need to index Markdown text for search purpose, you can use the helper function `findTextStrings()` to extract text strings from a list of tokens produced by `Parser`:

```js
import { Parser, findTextStrings } from 'mark-gor';

const markdown = `
Heading level 1
===============

I really like using Markdown.

I just love **bold text**.

- First item
- Second item
- Third item
- Fourth item

![Tux, the Linux mascot](/assets/images/tux.png)

<h1>Embedded HTML</h1>`;
const parser = new Parser;
const tokens = parser.parse(markdown);
const strings = findTextStrings(tokens);
console.log(strings);

/* Outputs: [
'Heading level 1',
'I really like using Markdown.',
'I just love ',
'bold text',
'.',
'First item',
'Second item',
'Third item',
'Fourth item',
'Tux, the Linux mascot',
'Embedded HTML'
]; */
```

Note that this function is not designed to produce a plain text representation of the Markdown text.

## Server-side parsing

Parsing Markdown takes time. You can make your web application feels more responsive by parsing the text on the server side and caching the result. Mark-Gor provides the class `JsonRenderer`. It produces an object containing arguments to `React.createElement()`. On the client side, you just need to create the elements through a simple recursive function:  

Server-side code:

```js
import Express from 'express';
import { promises as FS } from 'FS';
import { AsyncParser, JsonRenderer } from 'mark-gor';

let app = Express();

app.get('/markdown/*', async(req, res) => {
  const markdown = await FS.readFile(req.url);
  const parser = new AsyncParser;
  const renderer = new JsonRenderer;
  const tokens = await parser.parse(markdown);
  const json = renderer.render(tokens);
  res.json(json);
});
```

Client-side code:

```js
import { useMemo } from 'react';
import { reactivate } from 'mark-gor/reactivate';

function PreparsedMarkdown(props) {
  const { json } = props;
  const content = useMemo(() => {
    return reactivate(json);
  }, [ json ]);
  return content;
}
```

`reactivate()` is provided in a separate bundle for the purpose of handling the simplest case. You can easily roll your own solution instead.

## HTML normalization

Hand-written HTML is often not completely standard compliant. The HTML5 specification itself permits certain omissions. For instance, <tbody> tags in <table> and end-tags of <p>. While web-browsers are able to deal with not-so-well-formed HTML, rendering in React requires elements to follow strict rules (as they are created directly through the DOM API). To avoid inconsistent appearance and warning messages from React, Mark-Gor endeavors to normalize its output to match what Chrome's parser would produce.

For example, `<p>Hello<p>world` would get normalized to `<p>Hello</p><p>world</p>`. Meanwhile, `<p><div>Hello</div><div>world</div></p>` would become `<p></p><div>Hello</div><div>world</div><p></p>` because according to the standard, `<p>` tags are automatically closed by `<div>` tags (hence `<div>` cannot reside within `<p>`).   

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
Used by: BaseRenderer

Prefix added to language name when it's used as a CSS class name of code blocks.

### headerIds

Type: `boolean`
Default: `true`
Used by: BaseRenderer

Automatically add IDs to heading tags.

### headerPrefix

Type: `string`
Default: `<empty>`
Used by: BaseRenderer

Prefix added to IDs of headings.

### headerFormat

Type: `string`
Default: `github`
Used by: BaseRenderer

Controls how header IDs are generated. By default, the library follows the convention used in GitHub. Set this option to `marked` if you want to replicate that library's odder behaviors.

### decodeEntities

Type: `boolean`
Default: `true`
Used by: HTMLRenderer

Determines whether HTML entities get decoded and get sent as regular Unicode characters.

### fixBrokenTags

Type: `boolean`
Default: `true`
Used by: InlineLexer

Handle ill-formated HTML attributes.

### normalizeTags

Type: `boolean`
Default: `true`
Used by: BaseRenderer

Apply transformations such that resultant HTML tree is structurally sound.  

### omitLinefeed

Type: `boolean`
Default: `true`
Used by: BaseRenderer

Do not put a line-feed after each end-tag.

### omitDeclarations

Type: `boolean`
Default: `true`
Used by: HTMLRenderer

Omit HTML comments and other declarations.

### omitEmbeddedCode

Type: `boolean`
Default: `true`
Used by: HTMLRenderer

Omit `<? ... ?>` tags.

### omitNonvisualWhitespace

Type: `boolean`
Default: `true`
Used by: BaseRenderer

Remove whitespaces from places where they serve no purpose. Between <tr> tags in a table, for instance. Setting this to `false` will lead to complaints from React.

### omitTags

Type: `string[]`
Default: `[ 'script', 'style', 'link', 'meta' ]`
Used by: BaseRenderer

Omit certain HTML tags from the output. Only works when `normalizeTags` is `true`.
