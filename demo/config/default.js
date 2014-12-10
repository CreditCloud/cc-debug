var pathFn = require('path');

module.exports = {
    // logio config
    logio: {
        host: "127.0.0.1",
        port: 28777
    },

    // winston 默认的levels
    levels: {
        silly: 0,
        debug: 1,
        verbose: 2,
        info: 3,
        warn: 4,
        error: 5
    },

    // project name 作为 log.io的 node name
    project_name: "project_95lc",

    // console消息到 log.io 的 stream 名称
    console_stream_name: "console_msg",
    // console消息 记录到文件的 文件名
    console_file_name: "console.log",

    // 记录到文件的最低level
    file_level: "warn",
    // 输出到文件的最低level
    logio_level: "debug",

    // 存放xxx.log 的文件夹
    logs_dir: pathFn.join(__dirname,"../logs")
}