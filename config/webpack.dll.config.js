const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const paths = require('./paths');
const path = require('path');

const entries = {
    vendors: ['react', 'react-dom'],
    antd: ['antd'],
};

module.exports = {
    mode: 'production',
    entry: entries,
    devtool: false,
    output: {
        path: paths.appDllPath,
        filename: '[name].dll.js',
        library: '[name]_[hash]',
    },
    plugins: [
        new CleanWebpackPlugin({
            path: paths.appDllPath,
        }),
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../dll/[name].mainfest.json'),
            name: '[name]_[hash]',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};
