const path = require('path');
const fse = require('fs-extra');

//更改package.json文件

exports.updatePackage = async (dirpath, data) => {
  // 获取文件路径下的package.json
  const filename = path.join(dirpath, 'package.json');

  try {
    // 确保文件存在，如果请求创建的文件位于不存在的目录中，则会创建这些目录。如果该文件已存在，则不进行修改
    await fse.ensureFile(filename);
    // 获取文件内容流
    let packageJson = await fse.readFile(filename);
    packageJson = JSON.parse(packageJson.toString());
    packageJson = { ...packageJson, ...data };
    packageJson = JSON.stringify(packageJson, null, '\t');
    // 写入数据
    await fse.writeFile(filename, packageJson);
  } catch (err) {
    console.error('\npackage.json文件操作失败!\n');
    throw err;
  }
};
