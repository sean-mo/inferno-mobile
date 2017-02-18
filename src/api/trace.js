import { MonitorConf } from 'core/env';
import { GET } from 'core/utils/http';

export function getTracesDetail(paramemter) {
    return GET({
        // host: 'localhost:8060',
        pathname: `/mock/tracedetail.json`
    }, null, { 
        credentials: 'omit'
    })
}
