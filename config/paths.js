const path = require('path');

function resolve(pathName = '') {
    return path.resolve(__dirname, '../', pathName);
}

module.exports = {
    // dir
    appPath: resolve(),
    appSrcPath: resolve('src'),
    appDistPath: resolve('dist'),
    appDllPath: resolve('dll'),
    appModulesPath: resolve('node_modules'),
    // file
    appHtmlPath: resolve('public/index.html'),
    appMainFestPath: resolve('dll/mainfest.json'),
    appDllJsPath: resolve('dll/dll.js'),
};
