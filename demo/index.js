require('cc-debug')

var debug = require('debug')("cc:test")

// console.log message
console.log("console.log message also sends to logio&file")
console.info("console.info ...")
console.error("this is an error ...")


// # 要用 `DEBUG=cc:test node xxx` 运行
// ## debug() as debug level
debug("hello debug() as `debug` level ...")
// ## debug.info()
debug.info("hello debug.info() as `info` level ...")

// // error
debug.error('this is an error for cc:test and as `error` level')