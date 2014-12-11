var winston = require('winston')
var Logio = require('winston-logio').Logio
var config = require('config')
var pathFn = require('path')
var getLogger = require('./util').getLogger

// stramname / namespace
var logger = getLogger(config.console_stream_name)

// console.log -> logger.debug
var _log = console.log
console.log = function() {
    // reject the log operation
    _log.apply(console, arguments)
    logger.debug.apply(logger, arguments)
};

// 将 logger 上的方法 放到console上
for (var m in logger.levels) {
    (function(m) {
        var old = console[m]
        console[m] = function() {
            logger[m].apply(logger, arguments)
            old && old.apply(console, arguments) // only when console.xxx available
        };
    })(m)
}