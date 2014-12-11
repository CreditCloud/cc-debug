var pathFn = require('path')
var winston = require('winston')
var config = require('config');
var Logio = require("winston-logio").Logio


var util = module.exports = {}
util.getLogger = getLogger

// loggers_map
var loggers = {}
function getLogger(namespace) {
    if (loggers[namespace]) {
        return loggers[namespace]
    }

    var logger = loggers[namespace] = new winston.Logger({
        levels: config.levels // logger 的 levels
    })

    // file
    logger.add(winston.transports.File, {
        levels: config.levels,
        level: config.file_level,

        filename: pathFn.join(config.logs_dir, namespace + '.log') // 在项目主文件夹运行
    })

    // log.io
    logger.add(Logio, {
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