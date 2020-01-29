const webpack = require('webpack');
const paths = require('./paths');

module.exports = {
    mode: 'none',
    entry: ['react', 'react-dom', 'axios', 'antd'],
    devtool: false,
    output: {
        path: paths.appDllPath,
        filename: 'dll.js',
        library: '[name]_[hash]',
    },
    plugins: [
        new webpack.DllPlugin({
            path: paths.appMainFestPath,
            name: '[name]_[hash]',
            context: __dirname,
        }),
    ],
};
