var pathFn = require('path');
var fs = require('fs');
var config = require('config')

// require(cc-debug) 一次,后面require(debug)
// 不用 exports
if(!fs.existsSync(config.logs_dir)) {
    try {
        require('mkdirp').sync(config.logs_dir)
    } catch (e) {
        console.error("can not create the logs directory `%s`, please re-configurate.",config.logs_dir)
        throw e
    }
}

// load console related
require('./console')

// Module._load patch debug
require('./debug')