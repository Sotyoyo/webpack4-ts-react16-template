const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const paths = require('./paths');

const SERVER_PORT = process.env.SERVER_PORT || 8080;
const isDebugEnvironment = process.env.DEBUG_ENV === 'true';

module.exports = merge(base, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        hot: true,
        port: SERVER_PORT,
        publicPath: '/',
        contentBase: paths.appDistPath,
        watchContentBase: true,
        overlay: true,
        historyApiFallback: {
            // Paths with dots should still use the history fallback.
            // See https://github.com/facebook/create-react-app/issues/387.
            disableDotRule: true,
        },
        proxy: {
            '/dev': 'http://127.0.0.1:3000',
        },
        writeToDisk: isDebugEnvironment,
        // quiet: true,
        // open: true,
    },
});
