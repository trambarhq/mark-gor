
var fs = require('fs');
var path = require('path');
var marked = require('marked');
var glob = require('glob');
var prettydiff = require("prettydiff").api;

var Parser = require('../lib/parser');
var HtmlRenderer = require('../lib/html-renderer');

glob.sync(__dirname + '/tests/*.text').forEach(compareOutput);

function compareOutput(mdPath) {
    var parser = new Parser();
    var markdown = fs.readFileSync(mdPath, { encoding: 'utf8' });

    var tokens = parser.parse(markdown);
    var renderer = new HtmlRenderer();
    var mdHtml1 = renderer.render(tokens);
    var mdHtml2 = marked(markdown);

    mdHtml1 = beautify(mdHtml1);
    mdHtml2 = beautify(mdHtml2);

    // generate a diff file if the outputs aren't the same
    var testName = path.basename(mdPath);
    var diffFile = testName + '.html';
    if (mdHtml1 !== mdHtml2) {
        var diffHtml = diff(mdHtml1, mdHtml2);
        fs.writeFileSync(diffFile, diffHtml);
        console.log('Failure: ' + testName);
    }

    if (mdHtml1 === mdHtml2) {
        var start1 = new Date;
        for (var i = 0; i < 1000; i++) {
            var tokens = parser.parse(markdown);
            var renderer = new HtmlRenderer();
            renderer.render(tokens);
        }
        end1 = new Date;

        var start2 = new Date;
        for (var i = 0; i < 1000; i++) {
            mdHtml2 = marked(markdown);
        }
        end2 = new Date;

        var dur1 = end1 - start1;
        var dur2 = end2 - start2;
        console.log('Mark-Gor: ' + dur1 + ', Marked: ' + dur2 + ' (' + testName + ')')
        if (fs.existsSync(diffFile)) {
            fs.unlinkSync(diffFile);
        }
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
