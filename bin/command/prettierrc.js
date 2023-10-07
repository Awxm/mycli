const path = require('path');
const Mustache = require('mustache'); // 模板引擎
const fse = require('fs-extra');

async function createPrettierrc() {
  let prettierrcContent = await fse.readFile(path.join(__dirname, `../template/prettierrc/index`));
  prettierrcContent = prettierrcContent.toString();
  const result = Mustache.render(prettierrcContent);
  await fse.writeFile('.prettierrc.js', result);
}

module.exports = createPrettierrc;
