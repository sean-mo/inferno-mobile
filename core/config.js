'use strict';

module.exports = {
    development: { // 开发环境
        ServiceConf: {
            serviceServer: '192.168.160.121:9000',
            serviceApiServer: '192.168.160.121:8000'
        },
        ConfigConf: {
            configServer: 'configApi.juanpi.org:8080'
        },
        MonitorConf: {
            monitorServer: 'monitor.juanpi.org',
        }
    },
    test: { // 测试环境
        ServiceConf: {
            serviceServer: '192.168.160.121:9000',
            serviceApiServer: '192.168.160.121:8000'
        },
        ConfigConf: {
            configServer: 'configApi.juanpi.org:8080' // 测试
        },
        MonitorConf: {
            monitorServer: 'monitor.juanpi.org'
        }
    },
    production: { // 生产环境
        ServiceConf: {
            serviceServer: 'api.service.juanpi.org',
            serviceApiServer: 'api.devtesttool.juanpi.org'
        },
        ConfigConf: {
            configServer: 'api.config.juanpi.org:80' // 生产
        },
        MonitorConf: {
            monitorServer: 'monitorapi.juanpi.com'
        }
    }
}

