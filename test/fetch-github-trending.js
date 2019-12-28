const FS = require('fs');
const CrossFetch = require('cross-fetch');
const { fetchRepositories } = require('@huchenme/github-trending');

async function run() {
  await fetch('javascript');
  await fetch('ruby');
  await fetch('python');
  await fetch('C++');
  await fetch('C');
  await fetch('C#');
  await fetch('php');
  await fetch('java');
  await fetch('perl');
  await fetch('swift');
  await fetch('go');
}

async function fetch(language) {
  const repos = await fetchRepositories({ language });
  for (let repo of repos) {
    const { author, name } = repo;
    await download(author, name);
  }
}

async function download(user, project) {
  try {
    const url = `https://raw.githubusercontent.com/${user}/${project}/master/README.md`;
    console.log(`Downloading ${url}`);
    const res = await CrossFetch(url);
    const text = await res.text();
    let filename = user.toLowerCase();
    if (user !== project) {
      filename += '-' + project.toLowerCase();
    }
    const path = `${__dirname}/github/${filename}.md`;
    FS.writeFileSync(path, text);
  } catch (err) {
    console.log(err.message);
  }
}

run();
