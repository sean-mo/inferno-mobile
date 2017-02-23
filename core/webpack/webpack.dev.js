const path = require('path')
const logger = require('debug')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const DashboardPlugin = require('webpack-dashboard/plugin');
const config = require('./webpack.base.js')
const port = 2002
// Merge with base configuration
//-------------------------------
Object.assign(config, {
    cache: true,
    devtool: 'source-map', // eval eval-cheap-module-source-map source-map
})
const devFile = [
    `webpack-dev-server/client?http://0.0.0.0:${port}`,
    'webpack/hot/only-dev-server'
]
Object.keys(config.entry).forEach(k => {
    config.entry[k] = [...devFile, config.entry[k]]
})
config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.WatchIgnorePlugin([
        // path.join(__dirname, '../../dist')
    ]),
    new DashboardPlugin()
)

// Run DEV server for hot-reloading
//---------------------------------
const compiler = webpack(config)

new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, "../../dist"),
    publicPath: config.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap'
    },
    hot: true,
    compress: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: false
    },
    stats: {
        colors: true,
        hash: false,
        timings: false,
        version: false,
        chunks: false,
        modules: false,
        children: false,
        chunkModules: false
    }
}).listen(port, '0.0.0.0', function (err, result) {
    if (err) return logger('webpack:error', err);

    logger('webpack:compiler')('Running on port ' + port)
})
