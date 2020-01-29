const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const paths = require('./paths');

module.exports = {
    mode: 'production',
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
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};
