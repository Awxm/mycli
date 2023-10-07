const path = require('path');
const inquirer = require('inquirer');
const Mustache = require('mustache'); // 模板引擎
const fse = require('fs-extra');
const { routerMap } = require('../template/router');
const { routerConfig } = require('../repo');
/**
 * 创建新页面
 */
async function newRouter(routerName) {
  //创建的页面名称
  try {
    const prompList = [
      {
        type: 'input',
        name: 'title',
        message: '请输入router文件title'
      },
      {
        type: 'list',
        message: '请选择一个模块:',
        name: 'template',
        choices: routerConfig // 从配置文件repo.js中动态获取所有模板的名称
      }
    ];
    const { title, template } = await inquirer.prompt(prompList);
    // 创建一个文件夹
    await createTemplateFile(routerName, template);
    // 创建路由文件并修改路由文件
    await createRouterFile(routerName, title);
  } catch (error) {
    console.log('\n请在项目根路径下执行此命令!\n');
    throw error;
  }
}

const createTemplateFile = async (name, template) => {
  // 读取文件
  let templateContent = await fse.readFile(path.join(__dirname, `../template/vue/${template}`));
  let dialogContent = await fse.readFile(path.join(__dirname, `../template/dialog/index`));
  templateContent = templateContent.toString();
  dialogContent = dialogContent.toString();
  const result = Mustache.render(templateContent, { name, vueName: uppercaseName(name) });
  const dialogResult = Mustache.render(dialogContent, { name, vueName: uppercaseName(name) });
  //开始创建文件
  const fPath = `./src/views/${name}`;
  const temPath = `./src/views/${name}/components`;
  // 插入一个模板列表
  await fse.ensureDir(path.join(fPath));
  await fse.ensureDir(path.join(temPath));
  await fse.writeFile(path.join(`${fPath}/index.vue`), result);
  await fse.writeFile(path.join(`${temPath}/${name}Dialog.vue`), dialogResult);
  console.log('\n模块创建成功!\n');
};

const createRouterFile = async (name, title) => {
  const filename = path.join(`./src/router/sort/index.json`);
  let sortJson = await fse.readFile(filename);
  // 写入modules name.js
  sortJson = JSON.parse(sortJson.toString());
  sortJson.data.push(name);
  sortJson = { data: sortJson.data };
  sortJson = JSON.stringify(sortJson, null, '\t');
  // 插入路由文件
  await fse.writeFile(path.join(`./src/router/modules/${name}.js`), routerMap(name, uppercaseName(name), title));
  // 写入路由脚本
  await fse.writeFile(filename, sortJson);
};
// 名字大小写转换
function uppercaseName(name) {
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
}

module.exports = newRouter;
