import Inferno from 'inferno';
import PageTraceDetail from './traceDetail';

const traceId = location.search.substr(1);
Inferno.render(<PageTraceDetail traceId={traceId} />, document.querySelector('#container'));

if (module.hot) {
    module.hot.accept()
    require('inferno-devtools')
}