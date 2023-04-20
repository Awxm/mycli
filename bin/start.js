const exec = require('child_process').exec;
const { config } = require('./repo');

const installLib = (path, template) => {
  const install_command = config[template].install || 'npm i'; //安装依赖的命令

  return new Promise((resolve, reject) => {
    const workerProcess = exec(
      install_command,
      {
        cwd: path
      },
      (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(null);
        }
      }
    );

    workerProcess.stdout.on('data', function (data) {
      console.log(data);
    });

    workerProcess.stderr.on('data', function (data) {
      console.log(data);
    });
  });
};

const startProject = (path, template) => {
  const bootstrap_command = config[template].bootstrap || 'npm run serve'; //启动项目的命令

  return new Promise((resolve, reject) => {
    const workerProcess = exec(
      bootstrap_command,
      {
        cwd: path
      },
      (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(null);
        }
      }
    );

    workerProcess.stdout.on('data', function (data) {
      console.log(data);
    });

    workerProcess.stderr.on('data', function (data) {
      console.log(data);
    });
  });
};

/**
 * 打开浏览器
 */
const openBroswer = (url) => {
  return new Promise((resolve, reject) => {
    exec(`start ${url}`, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
};

/**
 * 安装依赖并启动项目
 */
exports.start = async (path, template, name) => {
  await installLib(path, template);
  console.log('项目依赖安装完毕...');
  console.log(`cd ${name}`);
  // await startProject(path, template);
  // console.log('项目启动成功...');
};
