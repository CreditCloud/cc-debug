var winston = require('winston')
require('winston-logio')
var config = require('config')
var pathFn = require('path')
var _ = require('lodash')

// 将console消息,发送到winston
// 使用winston默认的logger
// 文件 file.log
// log.io `console` 作为stream名称

// transports
// console
winston.remove(winston.transports.Console) // 移除 console
// file
winston.add(winston.transports.File, {
    levels: config.levels,
    level: config.file_level,

    filename: pathFn.join(config.logs_dir, config.console_file_name) // project root 下面的logs文件夹,需要process.cwd = project root
})
// logio
winston.add(winston.transports.Logio, {
    levels: config.levels,
    level: config.logio_level,

    host: config.logio.host,
    port: config.logio.port,
    localhost: config.project_name,
    node_name: config.console_stream_name,
})

// console.log -> winston.info
var _log = console.log
console.log = function() {
    // reject the log operation
    _log.apply(console, arguments)
    winston.debug.apply(winston, arguments)
};

// 将 winston 上的方法 放到console上
// console.debug console.warn blabla ...
_.forOwn(winston.levels,function(num,m) {
    // [xxx]
    // e.g : m = info ,m 指 method
    (function(m) {
        var old = console[m]
        console[m] = function() {
            winston[m].apply(winston, arguments)
            old && old.apply(console, arguments) // only when console.xxx available
        };
    })(m)
})