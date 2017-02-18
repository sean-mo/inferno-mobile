const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const LESSPluginFunctions = require('less-plugin-functions');
const sources = (location) => path.join(__dirname, '../../src', location)
const sourceCore = (location) => path.join(__dirname, '../../core', location);
const outDir =  path.join(__dirname, '../../dist')
const htmlConfig = [
    new HtmlWebpackPlugin({
        chunks: ['polyfill', 'trace'],
        filename: 'trace.html',
        template: sources('/template/trace.html')
    })
]
const env = process.env.NODE_ENV;
const config = require('../config');
const apiConfig = config[env] || config.development;
module.exports = {
    entry: {
        polyfill: sourceCore('/polyfills.js'),
        trace: sources('/standalone/trace/index.jsx')
    },
    performance: {
        hints: false
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [sources(''), sources('../core')],
                query: {
                    cacheDirectory: false,
                    presets: [],
                    plugins: [
                        "add-module-exports",
                        "transform-es2015-modules-commonjs",
                        "transform-es2015-destructuring",
                        "transform-object-rest-spread",
                        "transform-decorators-legacy",
                        "transform-class-properties",
                        "inferno",
                        ["fast-async"]
                    ]
                }
            },
            // {
            //     test: /\.(jpg|png|svg)(\?.+)?$/,
            //     loader: 'url-loader?limit=100000',
            //     include: [sources('assets'), sources('client/components')]
            // },
            // {
            //     test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
            //     loader: 'file-loader',
            //     include: [sources('assets'), sources('client/components')]
            // },
            {
                test: /\.(css|less)(\?.+)?$/,
                loaders: [
                    { loader: 'file-loader?name=[name].css' },
                    { loader: 'postcss-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            plugins: [new LESSPluginFunctions()]
                        }
                    }
                ],
                include: [sources('standalone')]
            }
        ]
    },

    output: {
        path: outDir,
        filename: '[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name][hash:4].js',
        libraryTarget: 'var',
        pathinfo: true
    },

    resolve: {
        alias: {
            'react': 'inferno',
            'core': path.join(__dirname, '../'),
            'API': path.join(__dirname, '../../src/api'),
            'Components': path.join(__dirname, '../../src/components'),
            'less': path.join(__dirname, '../../src/assets/less')
        },
        extensions: ['.js', '.jsx', '.json', '.less']
    },

    plugins: [
        ...htmlConfig,
        new ProgressBarPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `'${env}'`,
            'process.env': JSON.stringify({
                Service_API: apiConfig.ServiceConf,
                Monitor_API: apiConfig.MonitorConf,
                Config_API: apiConfig.ConfigConf
            })
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'polyfill'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                postcss() {
                    return [
                        autoprefixer({ browsers: ['last 10 Chrome versions', 'IE >= 8', 'iOS > 6', 'Android >= 4'] }),
                        cssnano({
                            zindex: false
                        })
                    ]
                }
            }
        })
    ]
};
