const path = require('path');
const inquirer = require('inquirer');
const Mustache = require('mustache'); // 模板引擎
const fse = require('fs-extra');
const { routerMap } = require('../template/router');

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
      }
    ];
    const { title } = await inquirer.prompt(prompList);
    await createTemplateFile(routerName);
    await createRouterFile(routerName, title);
  } catch (error) {
    console.log('\n请在项目根路径下执行此命令!\n');
    throw error;
  }
}

const createTemplateFile = async (name) => {
  // 读取文件
  let templateContent = await fse.readFile(path.join(__dirname, `../template/vue/index`));
  templateContent = templateContent.toString();
  const result = Mustache.render(templateContent, { name: uppercaseName(name) });
  //开始创建文件
  await fse.writeFile(path.join(`./src/views/${name}/index.vue`), result);
  console.log('\n模块创建成功!\n');
};

const createRouterFile = async (name, title) => {
  // 创建一个router文件写入modules目录中
  await fse.writeFile(path.join(`./src/router/modules/${name}.js`), routerMap(name, uppercaseName(name), title));
  // 修改router index中的方法
};
// 名字大小写转换
function uppercaseName(name) {
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
}

module.exports = newRouter;
