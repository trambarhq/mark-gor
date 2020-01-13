import { expect } from 'chai';

import { parse } from '../src/html.mjs';
import { parse as parseMarked } from 'marked';

describe('Header IDs', function() {
  it ('should match how Marked handles headings with HTML tags', function() {
    const options = { headerFormat: 'marked', omitLinefeed: false };
    const markdown = `# <u>Hi!</u>`;
    const html1 = parse(markdown, options);
    const html2 = parseMarked(markdown, options);
    expect(html1).to.equal(html2);
  })
  it ('should match how GitHub handles headings with accented characters', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# Głośną, wrzaskliwą, a nic nie znaczącą."`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="głośną-wrzaskliwą-a-nic-nie-znaczącą">Głośną, wrzaskliwą, a nic nie znaczącą.&quot;</h1>`);
  })
  it ('should match how GitHub handles single quote', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# I don't know`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="i-dont-know">I don&#39;t know</h1>`);
  })
  it ('should match how GitHub handles Cyrillic', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# Київ`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="київ">Київ</h1>`);
  })
  it ('should match how GitHub handles HTML tags', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# <u>Hi!</u>`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="hi"><u>Hi!</u></h1>`);
  })
  it ('should match how GitHub handles HTML entites', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# &copy; &reg;`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="-">© ®</h1>`);
  })
  it ('should match how GitHub handles symbols', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# !"#$%&'()*+,-./:;<=>?[]^_{|}~`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="-_">!&quot;#$%&amp;&#39;()*+,-./:;&lt;=&gt;?[]^_{|}~</h1>`);
  })
  it ('should match how GitHub handles Latin-1 symbols', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿×÷`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="ªµº">¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿×÷</h1>`);
  })
  it ('should match how GitHub handles general punctuations', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# ‐‑‒–—―‘’‚‛“”„‟⁈⁉⁋⁕‼`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="">‐‑‒–—―‘’‚‛“”„‟⁈⁉⁋⁕‼</h1>`);
  })
  it ('should match how GitHub handles dashes', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# dingo-dongo`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="dingo-dongo">dingo-dongo</h1>`);
  })
  it ('should match how GitHub handles duplicates', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# Hi!\n\n# Hi`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="hi">Hi!</h1><h1 id="hi-1">Hi</h1>`);
  })
  it ('should match how GitHub handles emoji', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# 😃 😄 😅 😆 😊`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="----">😃 😄 😅 😆 😊</h1>`);
  })
  it ('should match how GitHub handles multiple whitespaces', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# Multiple space           <- Doh!`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="multiple-space-------------doh">Multiple space           &lt;- Doh!</h1>`);
  })
  it ('should match how GitHub handles arrows, lines, blocks, another symbols', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# ←↑→↓─━│┃☀☁☂☃▀▁▂▃`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="">←↑→↓─━│┃☀☁☂☃▀▁▂▃</h1>`);
  })
  it ('should match how GitHub handles currency symbols', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# ₠₡₢₣₤₥₿€₩`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="">₠₡₢₣₤₥₿€₩</h1>`);
  })
  it ('should match how GitHub handles Chinese characters', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# 餃子`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="餃子">餃子</h1>`);
  })
  it ('should match how GitHub handles letter-like symbols', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# ②③④①℀℁ℂ℃ℙℚℛℜ⁴⁵⁶⅓⅔⅕⅐⅒`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="ℂℙℚℛℜ">②③④①℀℁ℂ℃ℙℚℛℜ⁴⁵⁶⅓⅔⅕⅐⅒</h1>`);
  })
  it ('should match how GitHub handles Geez', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# ሳቜሬ`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="ሳቜሬ">ሳቜሬ</h1>`);
  })
  it ('should match how GitHub handles dingbats', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# ✀✁✂✃✄✅✆✇✈✉`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="">✀✁✂✃✄✅✆✇✈✉</h1>`);
  })
  it ('should match how GitHub handles Braille', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# ⠁⠂⠃⠄⠅⠆`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="">⠁⠂⠃⠄⠅⠆</h1>`);
  })
  it ('should match how GitHub handles soft-hypthen', function() {
    const options = { headerFormat: 'github' };
    const markdown = `# soft­hyphen`;
    const html = parse(markdown, options)
    expect(html).to.equal(`<h1 id="softhyphen">soft­hyphen</h1>`);
  })
})
