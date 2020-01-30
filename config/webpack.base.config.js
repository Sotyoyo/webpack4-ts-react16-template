const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const paths = require('./paths');
const path = require('path');

const isDevEnvironment = !(process.env.NODE_ENV === 'production');

const pluginsPublic = [
    new HtmlWebpackPlugin({
        template: paths.appHtmlPath,
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
        {
            from: path.resolve(paths.appModulesPath, 'antd', 'dist', 'antd.min.css'),
            to: paths.appDistPath,
        },
    ]),
    new MiniCssExtractPlugin({
        filename: '[name].[hash:6].css',
        chunkFilename: '[name].[hash:6].chunk.css',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new AddAssetHtmlWebpackPlugin({
    //     filepath: paths.appAntdDllJsPath,
    // }),
    // new AddAssetHtmlWebpackPlugin({
    //     filepath: paths.appVendorsDllJsPath,
    // }),
    // new webpack.DllReferencePlugin({
    //     manifest: paths.appVendorsMainFestPath,
    // }),
    // new webpack.DllReferencePlugin({
    //     manifest: paths.appAntdMainFestPath,
    // }),
    new ForkTsCheckerWebpackPlugin({
        eslint: true,
    }),
];

const dllFiles = fs.readdirSync(paths.appDllPath);
dllFiles.forEach((filename) => {
    if (/\.*\.dll\.js$/.test(filename)) {
        // console.log(filename);
        pluginsPublic.push(
            new AddAssetHtmlWebpackPlugin({
                filepath: path.resolve(paths.appDllPath, filename),
            })
        );
    }
    if (/\.*\.mainfest\.json$/.test(filename)) {
        // console.log(filename);
        pluginsPublic.push(
            new webpack.DllReferencePlugin({
                manifest: path.resolve(paths.appDllPath, filename),
            })
        );
    }
});

const pluginsDev = [
    // new BundleAnalyzerPlugin({
    //     analyzerMode: 'server',
    //     analyzerHost: '127.0.0.1',
    //     analyzerPort: 8888,
    //     reportFilename: 'report.html',
    //     defaultSizes: 'parsed',
    //     openAnalyzer: true,
    //     generateStatsFile: false,
    //     statsFilename: 'stats.json',
    //     statsOptions: null,
    //     logLevel: 'info',
    // }),
    new webpack.HotModuleReplacementPlugin(), // HMR
];

const pluginsProd = [new webpack.HashedModuleIdsPlugin()];

module.exports = {
    mode: isDevEnvironment ? 'development' : 'production',
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [paths.appSrcPath, paths.appModulesPath],
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
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            // getCustomTransformers: () => ({
                            //     before: [
                            //         tsImportPluginFactory({
                            //             libraryName: 'antd',
                            //             style: 'css',
                            //             libraryDirectory: 'lib',
                            //         }),
                            //     ],
                            // }),
                            // compilerOptions: {
                            //     module: 'es2015'
                            // }
                        },
                    },
                ],
            },
            {
                test: /\.s?css$/,
                include: paths.appSrcPath,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: false,
                        },
                    },
                    'sass-loader',
                    'postcss-loader',
                ],
            },
            // just for antd below
            {
                test: /\.(css|less)$/,
                include: paths.appModulesPath,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: false,
                        },
                    },
                    'less-loader',
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
    plugins: isDevEnvironment
        ? pluginsPublic.concat(pluginsDev)
        : pluginsPublic.concat(pluginsProd),
    optimization: {
        minimizer: [
            (compiler) => {
                const TerserPlugin = require('terser-webpack-plugin');
                !isDevEnvironment &&
                    new TerserPlugin({
                        cache: true,
                        parallel: true,
                        sourceMap: false, // Must be set to true if using source-maps in production
                        terserOptions: {
                            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                        },
                    }).apply(compiler);
            },
            (compiler) => {
                const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
                !isDevEnvironment && new OptimizeCSSAssetsPlugin({}).apply(compiler);
            },
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 1 * 1024 * 1024, // byte
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '_',
            name: true,
            cacheGroups: {
                modules_vender: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 1 * 1024 * 1024, // byte
        maxAssetSize: 3 * 1024 * 1024, // byte
    },
};
