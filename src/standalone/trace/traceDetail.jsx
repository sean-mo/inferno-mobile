import Component from 'inferno-component';
import { dateTimeFormat } from 'core/utils/dateTime';
import { getTracesDetail } from 'API/trace';
import './trace';

export default class PageTraceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }
    componentDidMount() {
        getTracesDetail({ traceId: this.props.traceId }).then(res => {
            this.setState({
                data: this.bindExpandProps(res.data)
            })
        })
    }
    bindExpandProps(data) {
        let expand = 'expand';
        data[expand] = true;
        if (!(data.children instanceof Array)) {
            data.children = [data.children]
        }
        data.children = data.children.filter(d => d != null || d != undefined).map(d => {
            if ( d === null || d === undefined ) {
                return d
            }
            d = this.bindExpandProps(d);
            return d;
        })
        return data;
    }
    handleExpand(e) {
        let n = e.target;
        let div = n.parentNode;
        let ul = div.querySelector('ul');
        if ( ul.style.display === 'none') {
            ul.style.display = '';
            n.className = n.className.replace('plus-square', 'minus-square');
        } else {
            ul.style.display = 'none';
            n.className = n.className.replace('minus-square', 'plus-square')
        }
    }
    renderTree(list, depth = 0) {
        list = list || [];
        depth += 1;
        let len = list.length;
        let last = len - 1;
        let max = this.state.data.duration;
        let liStyle = depth === 1 ? { overflow: 'hidden'} : {};
        return (
            <ul>
                {len > 0 ? list.map((c, index) => {
                    let strongClass = index === last ? 'last' : (index === 0 ? 'first' : '');
                    if ( index === 0 && index === last ) {
                        strongClass = 'first last';
                    }
                    let hasChild = c.children && c.children.length > 0 ? true : false;
                    let serviceType = c.type ? c.type.toLowerCase() : 'service';
                    let hasShowContent = ['mysql', 'redis'].filter(k => serviceType === k).length > 0;
                    let spanContent = hasShowContent ? c.content : c.serviceName;
                    return (
                        <li style={liStyle} key={index} className={hasChild && index < last ? 'hasChild' : ''}>
                            <TreeIcon
                                    expand={c.expand}
                                    hasChild={hasChild}
                                    onClick={this.handleExpand.bind(this)}
                            />
                            <div className={`item${depth === 1 ? ' root' : ''}`}>
                                <strong>{c.type || '服务'}</strong>
                                <span>
                                     | {depth > 1 ? `${c.duration}  ms | `  :  ''}
                                     {`${!hasShowContent ? c.appName : ''}`} | { spanContent}
                                </span>
                                { c.duration > 0 && depth > 1 ? 
                                <span className="cite" style={{ width: `${c.duration / max * 100}%`}}></span>
                                : undefined }
                            </div>
                            { c.expand && hasChild ?  this.renderTree(c.children, depth) : undefined }
                        </li>
                    )
                }) : undefined }
            </ul>
        )
    }
    render() {
        return (
            <div className="container">
                <div className="header">
                    链路查询：{ this.props.traceId }
                </div>
                <div className="content">
                    <div className="tree">
                        { this.state.data && this.renderTree([this.state.data]) }
                    </div>
                </div>
            </div>
        )
    }
}


class TreeIcon extends Component {
    handlerClick(e) {
        if ( this.props.hasChild ) {
            this.props.onClick(e);
        }
    }
    render() {
        let { hasChild, expand } = this.props;
        let icon = hasChild ? expand ? 'minus-square' : 'plus-square' : 'square'
        return (
            <i className={icon} onTouchStart={this.handlerClick.bind(this)} />
        )
    }
}
