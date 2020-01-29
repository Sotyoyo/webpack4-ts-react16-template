const webpack = require('webpack');
const paths = require('./paths');

const vendors = ['react', 'react-dom', 'axios'];

module.exports = {
    mode: 'none',
    devtool: 'cheap-module-source-map',
    entry: {
        vendor: vendors,
    },
    output: {
        path: paths.appDllPath,
        filename: '[name]_[hash].js',
        library: '[name]_[hash]',
    },
    plugins: [
        new webpack.DllPlugin({
            path: paths.appMainFestPath,
            name: '[name]_[hash]',
        }),
    ],
};
