const path = require('path');
const inquirer = require('inquirer');
const Mustache = require('mustache'); // 模板引擎
const fse = require('fs-extra');

/**
 * 创建新页面
 */
async function newPage(pageName) {
  //创建的页面名称
  try {
    const { type } = await inquirer.prompt([
      {
        type: 'list',
        message: '请选择一个模板下载:',
        name: 'type',
        choices: ['vue']
      }
    ]);
    const fn = eval(`${type}Handler`);
    fn && fn(pageName, type);
  } catch (error) {
    console.log('\n请在项目根路径下执行此命令!\n');
    throw error;
  }
}

/**
 * 创建vue2模板的新页面
 */
const vueHandler = async (name, template) => {
  let template_content = await fse.readFile(path.join(__dirname, `../template/${template}/index`));
  template_content = template_content.toString();
  const result = Mustache.render(template_content, { name });
  //开始创建文件
  await fse.writeFile(path.join('./src/views', `${name}.vue`), result);
  console.log('\n页面创建成功!\n');
};

module.exports = newPage;
