
var fs = require('fs');
var path = require('path');
var marked = require('marked');
var glob = require('glob');
var prettydiff = require("prettydiff").api;

var Parser = require('../lib/parser');
var HtmlRenderer = require('../lib/html-renderer');

var options = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: false,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  xhtml: false
};

var passed = 0, failed = 0;

glob.sync(__dirname + '/tests/*.text').forEach(compareOutput);
glob.sync(__dirname + '/../node_modules/**/*.md').forEach(compareOutput);

console.log('Passed: ', passed);
console.log('Failed: ', failed);

function compareOutput(mdPath) {
  var parser = new Parser();
  var markdown = fs.readFileSync(mdPath, { encoding: 'utf8' });

  var tokens = parser.parse(markdown);
  var renderer = new HtmlRenderer();
  var mdHtml1 = renderer.render(tokens);
  var mdHtml2 = marked(markdown, options);

  mdHtml1 = beautify(mdHtml1);
  mdHtml2 = beautify(mdHtml2);

  // generate a diff file if the outputs aren't the same
  var testName = path.basename(mdPath);
  var diffFile = testName + '.html';
  if (mdHtml1 !== mdHtml2) {
    var diffHtml = diff(mdHtml1, mdHtml2);
    fs.writeFileSync(diffFile, diffHtml);
    console.log('Failure: ' + mdPath);
    failed++;
  } else {
    if (fs.existsSync(diffFile)) {
      fs.unlinkSync(diffFile);
    }
    passed++;
  }
}

function beautify(html) {
  var args = {
    source: html,
    mode: 'beautify',
    lang  : "html"
  };
  var output = prettydiff(args);
  return output[0];
}

function diff(html1, html2) {
  var args = {
    source: html1,
    diff: html2,
    mode: 'diff',
    lang  : "html"
  };
  var output = prettydiff(args);
  return output[0];
}
