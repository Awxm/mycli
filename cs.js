const fs = require('fs'); // 导入 fs 模块
const path = require('path'); // 导入 path 模块
function aa() {
  fs.readFile('./bin/cs.js', 'utf8', function (err, dataStr) {
    // 如果读取成功，则err的值为null，dataStr会显示例1.txt的文本内容
    // 如果读取失败，err的值为错误对象，展示出错误信息，dataStr的值为undefined
    console.log(err);
    console.log('------');
    console.log(dataStr);
    const aaa = require('./bin/cs.js');
    console.log(aaa);
    console.log(JSON.parse(dataStr));
  });
}
aa();
