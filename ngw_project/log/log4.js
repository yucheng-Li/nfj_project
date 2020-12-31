// //testLog4.js
// var log4js = require('log4js');
// var logger = log4js.getLogger();
// file: simplest.js


// //logger 是log4js的实例
var log4js = require("log4js");
var logger = log4js.getLogger();

//新版根据等级划分，数字为权重
// const defaultLevels = {
//     ALL: new Level(Number.MIN_VALUE, 'ALL', 'grey'),
//     TRACE: new Level(5000, 'TRACE', 'blue'),
//     DEBUG: new Level(10000, 'DEBUG', 'cyan'),
//     INFO: new Level(20000, 'INFO', 'green'),
//     WARN: new Level(30000, 'WARN', 'yellow'),
//     ERROR: new Level(40000, 'ERROR', 'red'),
//     FATAL: new Level(50000, 'FATAL', 'magenta'),
//     MARK: new Level(9007199254740992, 'MARK', 'grey'), // 2^53
//     OFF: new Level(Number.MAX_VALUE, 'OFF', 'grey')
//   };

//testLog4.js
log4js.configure({
    appenders: {
        error: {
            "category":"errorLogger",       //logger的名称
            "type":"dateFile",              //日志类型
            "filename":"log/error/error",   //日志输出位置
            "alwaysIncludePattern":true,    //是否总是有后缀名
            "pattern":"yyyy-MM-dd.log"      //每天创建一个新的日志文件 
        },
        request: {
            "category":"requestLogger",       //logger的名称
            "type":"dateFile",              //日志类型
            "filename":"log/request/request",   //日志输出位置
            "alwaysIncludePattern":true,    //是否总是有后缀名
            "pattern":"yyyy-MM-dd.log"      //每天创建一个新的日志文件 
        },
        common: {
            "category":"commonLogger",       //logger的名称
            "type":"dateFile",              //日志类型
            "filename":"log/common/common",   //日志输出位置
            "alwaysIncludePattern":true,    //是否总是有后缀名
            "pattern":"yyyy-MM-dd.log",      //每天创建一个新的日志文件 
            "daysToKeep":1
        },
      },
     categories: {
        error: { 
            appenders: ['error'],
            level: 'error' 
        },
        request: { 
            appenders: ['request'],
            level: 'MARK' 
        },
        default: { 
            appenders: ['common'],
            level: 'info' 
        }
    }
  })


//   logger.info('this no error'); 

module.exports = log4js