
const path = require('path')
//使用node.js中的导出语法,向外导出一个webpack的配置对象
module.exports = {
    //代表webpack运行的模式,可选值有两个development和production
    //development:生成速度快
    //production:压缩体积小
    mode: 'development',
    //entry:"指定要处理哪个文件"
    entry: path.join(__dirname, './src/index1.js'),
    //指定要生成的文件要存到哪里
    output: {
        //存放的目录
        path: path.join(__dirname, './dist'),
        //生成的文件名
        filename: 'bundle.js'
    }
}