var pathFn = require('path')
var winston = require('winston')
var config = require('config');
var Logio = require("winston-logio").Logio
var getLogger = require('./util').getLogger

module.exports = _debug

function _debug(namespace) {
    var logger = getLogger(namespace)

    // 必须配置debug level
    var debug = logger.debug;

    // 添加 debug.debug 等配置在levels里的方法
    for (var level in logger.levels) {
        if (logger.hasOwnProperty(level)) {
            debug[level] = logger[level].bind(logger);
        }
    }
    return debug
}

var Module = module.constructor
var nativeLoad = Module._load
Module._load = function(request, parent, isMain) {
    if (request === 'debug') {
        return _debug
    }
    return nativeLoad.apply(this, arguments);
};