var pathFn = require('path')
var winston = require('winston')
var config = require('config');
var _ = require('lodash');
require("winston-logio")
var debugFactory= require('debug'); // tj's debug

// debug config , copy from log4js-or-debug
process.env.DEBUG_COLORS = 'no'; // make sure debug formatter not add color characters for tty
debugFactory.formatArgs = false

module.exports = _debug

// loggers_map
var loggers = {}
function getLogger (namespace) {
    if(loggers[namespace]){
        return loggers[namespace]
    }

    var logger = loggers[namespace] = new winston.Logger({
        levels: config.levels // logger 的 levels
    })
    
    // // console
    // logger.add(winston.transports.Console,{
    //     level: config.console_level
    // })

    // file
    logger.add(winston.transports.File,{
        levels: config.levels,
        level: config.file_level, 

        filename: pathFn.join(config.logs_dir,namespace+'.log') // 在项目主文件夹运行
    })

    // log.io
    logger.add(winston.transports.Logio,{
        levels: config.levels,
        level: config.logio_level,

        host: config.logio.host,
        port: config.logio.port,
        localhost: config.project_name, // node
        node_name: namespace // stream
    })

    // TODO : splunk or elk blabla
    // logger.add()
    return logger
}

function _debug (namespace) {
    var debug = debugFactory(namespace)

    var logger = getLogger(namespace)

    // debug(abc) level 为 debug
    debug.log = logger.debug.bind(logger) // debug() -> debug level
    
    // 添加 debug.debug 等配置在levels里的方法
    _.forOwn(logger.levels,function(num,m) {
        // enabled ?
        debug[m] = function() {
            // 不判断是否启用,logio接收所有debug消息
            logger[m].apply(logger,arguments);
        };
    })

    return debug
}

var Module = module.constructor
var nativeLoad = Module._load
Module._load = function(request, parent, isMain) {
    var exports = nativeLoad.apply(this, arguments);

    if (request === 'debug') {
        // exports
        return _debug
    }
    return exports;
};