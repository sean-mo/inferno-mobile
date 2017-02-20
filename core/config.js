'use strict';

module.exports = {
    development: { // 开发环境
        ServiceConf: {
            serviceServer: '127.0.0.1:9000',
            serviceApiServer: '127.0.0.1:8000'
        },
        ConfigConf: {
            configServer: '127.0.0.1:8080'
        },
        MonitorConf: {
            monitorServer: '127.0.0.1',
        }
    },
    test: { // 测试环境
        ServiceConf: {
            serviceServer: '127.0.0.1:9000',
            serviceApiServer: '127.0.0.1:8000'
        },
        ConfigConf: {
            configServer: '127.0.0.1:8080' // 测试
        },
        MonitorConf: {
            monitorServer: '127.0.0.1'
        }
    },
    production: { // 生产环境
        ServiceConf: {
            serviceServer: '127.0.0.1',
            serviceApiServer: '127.0.0.1'
        },
        ConfigConf: {
            configServer: '127.0.0.1' // 生产
        },
        MonitorConf: {
            monitorServer: '127.0.0.1'
        }
    }
}

