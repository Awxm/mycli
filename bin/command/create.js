const path = require('path');
const inquirer = require('inquirer');
const { config } = require('../repo');
const { download } = require('../download');
const { updatePackage } = require('../updatePackage');
const { start } = require('../start');

async function createProject(name) {
  const prompList = [
    {
      type: 'input',
      name: 'description',
      message: '请输入项目描述信息:'
    },
    {
      type: 'list',
      message: '请选择一个模板下载:',
      name: 'template',
      choices: Object.keys(config) // 从配置文件repo.js中动态获取所有模板的名称
    }
  ];

  const { template, description } = await inquirer.prompt(prompList);

  const project_dir = path.join(process.cwd(), name); //新建项目的路径

  try {
    await download(template, project_dir); // 下载项目到本地

    await updatePackage(project_dir, { name, description, template }); //修改package.json

    start(project_dir, template, name); // 启动项目
  } catch (error) {
    console.log(error);
  }
}

module.exports = createProject;
