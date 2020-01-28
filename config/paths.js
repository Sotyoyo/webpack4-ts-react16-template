const path = require('path');

function resolve(pathName = '') {
    return path.resolve(__dirname, '../', pathName);
}

module.exports = {
    // dir
    appPath: resolve(),
    appSrcPath: resolve('src'),
    appDistPath: resolve('dist'),
    appModulesPath: resolve('node_modules'),
    // file
    appHtmlPath: resolve('public/index.html'),
};
