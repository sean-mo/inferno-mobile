'use strict';

require('shelljs/global');
const path = require('path');
const outDir = path.join(__dirname, '../')
const outDist = path.join(__dirname, '../dist')
// run cli
rm('-rf', outDist);
mkdir(outDist);
cp('-rf', `${outDir}/core/helpers/.`, `${outDist}/helpers`);
// Compile files on PROD or launch DEV server
if (process.env.NODE_ENV === 'production') {
    require('./webpack/webpack.prod.js')
} else {
    cp('-rf', `${outDir}/mock`, `${outDist}/mock`);
    require('./webpack/webpack.dev.js')
}
