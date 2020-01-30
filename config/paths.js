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
    appVendorsMainFestPath: resolve('dll/vendors.mainfest.json'),
    appAntdMainFestPath: resolve('dll/antd.mainfest.json'),
    appVendorsDllJsPath: resolve('dll/vendors.dll.js'),
    appAntdDllJsPath: resolve('dll/antd.dll.js'),
};
