cc-debug
========

替换 tj 的 debug module，向 log.io 输出日志

# 使用

## 1. 其他用debug的第三方库

例如
var debug = require('debug')("express")
这个level定为 `debug`

1.1 File: express.log , 传送最低level为warn

1.2 Log.io , node名称全局配置,生存一个叫 express 的stream,传送最低level为 debug

1.3 debug 不走console了



## 2. console 消息

我把 winston 这个默认的logger绑定到console上面,可以使用 console.warn,console.debug ...

    console.log

    1. 输出到控制台

    2. 输出到winston,level为debug

        1. 文件 console.log

        2. log.io stream name : console_msg



## 3. 自己用
### 3.1 同第三方库那样,我们自己的namespace

### 3.2 console.xxx


-----------

# config

参照demo/config/default.js 配置

----------------

winston 默认 levels 
{ silly: 0, debug: 1, verbose: 2, info: 3, warn: 4, error: 5 }