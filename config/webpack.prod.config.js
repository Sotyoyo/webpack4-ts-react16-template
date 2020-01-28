const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const paths = require('./paths');

module.exports = merge(base, {
    mode: 'production',
    devtool: false,
});
