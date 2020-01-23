# My Little Rainbow

## Problem Statement

In this lab, we're going to make a rainbow with HTML `<div>` elements. And while
we do it we're going to learn about HTML elements, CSS styling, CSS selectors,
how color works in CSS, and importing stylesheets.

Before we start, here's some basic info about HTML and CSS. Skip to
[Make a Rainbow](#make-a-rainbow) if you feel comfortable enough with HTML
and CSS.

## Review HTML Basics

Hyper Text Markup Language, or HTML, is a way to structure a document with
different parts. Each section of content is _marked_ by elements (using tags).
Each element has its own special meaning that the browser uses to _render_ the
HTML document. Use this [cheat sheet](https://htmlcheatsheet.com/) on HTML elements for guidance.

### Elements

- All begin with `<` and end with `>`, e.g., `<div>` (this last part is a tag).
- Most have an opening tag such as `<div>` and a closing tag `</div>`.
  + The `/` indicates to the browser that that tag is a closing tag.
  + The element is everything between the tags and the tags themselves.
- Some tags are self closing like the line break element `<br>`.
- Elements can have IDs and classes to aid the browser in finding specific tags.
  + Must begin with a letter A-Z or a-z.
  + Can be followed by: letters (`A-Za-z`), digits (`0-9`), hyphens (`-`), and underscores (`_`).
  + IDs **can** only be used once per page. E.g.: `<div id="this-special-div"></div>`.
  + Classes can be used as many times as you want. E.g.: `<div class="a-less-special-div"></div>`.
- Elements nested inside other elements are called children.
  + Children inherit attributes from their parents.
  + Don't nest everything.
- Elements next to one another are siblings.
  + Siblings do not inherit from one another, but are important for selecting in CSS.

Here is an example of element relations:

```html
<div>  <!-- the parent element -->
  <p></p>  <!-- the first sibling element/the first child-->
  <p></p>  <!-- the second sibling element/the second child -->
</div>
```

## Review CSS Basics

Cascading Style Sheets, or CSS, is a language created to style HTML documents by
telling the browser how specific elements should look. CSS does this by
selecting elements based on their tag, ids, classes, or all of the above. The
reason for CSS is the separation of concerns. We want HTML to focus on the
structure and meaning of our content. We let CSS worry about how to make that
information appear clear and engaging.

### CSS selectors

  - They select elements to assign them styles.
  - `*` (wildcard) selects every element.
  - An element, such as `div`, will select all elements of that type.
  - They select an id like `#some-id`
  - Classes are selected like this `.some-class`
  - To select all children elements of a parent do something like this `div p`
  - To select multiple different elements separate them by commas like this `div, p, a`

Here's an example of CSS styling:

```css
* {
  color: red;  /* color in CSS refers to font color */
}  /* all elements will have red font */
```

## Make a Rainbow

In the directory you'll see three files: `index.html`, `main.css`, and this
file, `README.md`. Start the web server using the `httpserver` command.  Using
another tab in your browser, navigate to the "launched" web server and add
`/index.html`. The URL should be something like `10.0.0.1:41234/index.html`.

If everything is working correctly, you should see a white page.

Good job!

### Making the Divs Visible

If you look at the file in your text editor or use the inspector, you'll see
that the basic HTML structure is present in `index.html`. So why can't we see
anything?

Well, `div`s are _structural_ elements. They're used to _invisibly_ group other
visible elements together. But the stylesheet that would tell our `div`s to do
something a little different hasn't been linked yet!

Let's fix this by adding the stylesheet to the `head`:

```html
<head>
...
  <link rel="stylesheet" type="text/css" href="main.css">
...
</head>
```

`Link` is a self-closing tag that will create a relative path with the `href`
attribute. A relative path means the browser knows that the `main.css` file is
in the same place as `index.html`. The `head` is a hidden part of the page that
tells the browser where to find any other files it needs to display the page
correctly, the `title` for the tab, and any other possible important
information.

Now if you refresh the `index.html` page in your browser you should see a
perfectly [Goth][goth] solid-black rainbow.

We got the basic outline because in the `main.css` all the `div` elements were
selected and given a `border` whose color is `#000`, "black." While we could
set `color: red;`, we will have more colors available if we define colors
without words.

Instead of `red`, `green`, or the exotic `tomato`, professionals prefer a set
of numbers with a base pair of 16 rather than a base pair of 10 like we use
everyday. These numbers are called "hexadecimals" and we can use them to make a
wide range of colors.

#### Some Stuff You Should Know About Hex Colors (and Web Colors in General)

Hex colors begin with `#` and are followed by, generally, 6 numbers, but some of
these numbers are actually letters. The lowest single digit number in hex is `0`
and the highest single digit number is `f`. This table might help to visualize
what we mean by this.

```
Decimal Numbers:      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
Hexadecimal Numbers:  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,  a,  b,  c,  d,  e,  f, 10
```

Hex colors work by creating Red, Green, Blue (RGB) values. Traditional RGB
colors are on a scale of 0 to 255 for each of the three colors in the spectrum.
Hex colors are considered true colors since they can represent ~16 million
colors—but your eye can only see 10 million of those. So `#000000` translates
to black since 0 reds, 0 green, 0 blues represents the absence of all colors,
and `#ffffff` makes white since 255 reds, 255 greens, and 255 blues is the
maximum of each of the colors.

Hex colors can be shortened to just three numbers when each RGB value is the
same for each digit. So `#11dd99` can be written as `#1d9`.

#### Coloring the Rainbow

To get ROYGBIV onto our rainbow we'll need seven hex colors. Red:
`#f00`; Orange: `#ffa500`; Yellow: `#ff0`; Green: `#00bc3f`; Blue: `#06f`;
Indigo: `#8a2be2`; Violet: `#d300c9`

All we have to do next is select each div individually and apply each of those
colors. That is a perfect use for ids since they're meant to style one specific
element only. We need to add an id for each div, so a logical name for each div
would be the color that they have to be. It could be something random, but good
names make for semantic code. So let's give the outermost div the id red.

```html
<div id="red">
  ...
</div>
```

To give that id some CSS attributes we'll go into `main.css`, select the id,
and mark its color as red.

```css
#red { /* this selects any elements with the red id */
  border-top-color: #f00;
}
```

To make sure the rainbow isn't so monochromatic you now need to repeat the
above steps with the final six colors, and when you do you should
have [a complete, colorful rainbow](http://i0.kym-cdn.com/photos/images/original/000/118/087/2468904593_6a7c692ab6.jpg).

## Moving On

When you're done with this lab type `learn` at the terminal. Make sure you pass
the tests. Once they pass, type `learn submit` and you'll be ready to move on!

## Conclusion

After we reviewed HTML and CSS basics, we moved on to create an HTML rainbow.
We linked our stylesheet to our HTML page and added ids to our HTML elements. We
then created CSS rules, using hexadecimal color values, for those elements to
display all the colors on our completed HTML page.

<p class='util--hide'>View <a href='https://learn.co/lessons/my-little-rainbow'>My Little Rainbow</a> on Learn.co and start learning to code for free.</p>

[cheat sheet]: https://web.stanford.edu/group/csp/cs21/htmlcheatsheet.pdf
[goth]: https://en.wikipedia.org/wiki/Goth_subculture
