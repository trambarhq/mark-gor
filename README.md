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

```js
import { useState, useEffect } from 'react';
import { parseAsync } from 'mark-gor';

function Markdown(props) {
  const { markdown } = props;
  const [ content, setContent ] = useState();
  useEffect(async () => {
    const content = await parseAsync(markdown);
    setContent(content);
  }, [ markdown ]);
  return content;
}
```

## Parsing HTML

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

## Using the classes

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

## Extracting text

```js
import { Parser, findTextStrings } from 'mark-gor';

const markdown = `
`;
const parser = new Parser;
const tokens = parser.parse(markdown);
const strings = findTextStrings(tokens);
console.log(strings);

// Outputs:
```

## Server-side parsing

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
