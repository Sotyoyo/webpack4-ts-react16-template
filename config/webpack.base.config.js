// const webpack = require('webpack')
/** TODO
    1. import scss error in console
*/

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');

const isDevEnvironment = !(process.env.NODE_ENV === 'production');

module.exports = {
    mode: isDevEnvironment ? 'development' : 'production',
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': paths.appSrcPath,
        },
    },
    output: {
        filename: '[name].[hash:6].bundle.js',
        path: paths.appDistPath,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: paths.appSrcPath,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                include: paths.appSrcPath,
                use: ['ts-loader'],
            },
            {
                test: /\.s?css$/,
                include: paths.appSrcPath,
                use: [
                    {
                        loader: isDevEnvironment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true,
                        },
                    },
                    'sass-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[hash:6].[ext]',
                        outputPath: 'images/',
                        limit: 10240,
                    },
                },
            },
            {
                test: /\.(eot|ttf|svg|woff2?)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash:6].[ext]',
                        outputPath: 'fonts/',
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: paths.appHtmlPath,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:6].css',
            chunkFilename: '[name].[hash:6].chunk.css',
        }),
    ],
};
