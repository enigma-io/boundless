import React, {PropTypes} from 'react';
import cx from 'classnames';

import omit from 'boundless-utils-omit-keys';


/**
 * # Async
 * __A higher-order component for rendering data that isn't ready yet.__
 *
 * There are plenty of situations where you need to fetch content to be displayed, but want
 * to show some sort of loading graphic in the interim. This component helps to simplify
 * that pattern by handling common types of promises and providing a simple mechanism
 * for materializing the resolved data into JSX.
 */
export default class Async extends React.PureComponent {
    static propTypes = {
        /** a callback for when real content has been rendered; either normal passed data or when a passed promise resolves */
        contentRenderedFunc: PropTypes.func,

        /** a function that takes the resolved payload of a promise provided by `props.data` and returns renderable JSX; defaults to trying to render the resolved value of the Promise */
        convertToJSXFunc: PropTypes.func,

        /** a promise, or some other piece of data to be run through `props.convertToJSXFunc` */
        data: PropTypes.any,

        /** content to be shown if the promise is rejected */
        errorContent: PropTypes.node,

        /** content to be shown while the promise is in pending state */
        loadingContent: PropTypes.node,
    }

    static defaultProps = {
        contentRenderedFunc: () => {},
        convertToJSXFunc: (x) => x,
        data: null,
        errorContent: '⚠️',
        loadingContent: null,
    }

    static internalKeys = Object.keys(Async.defaultProps)

    mounted = false
    state = {}

    convertDataToJSXOrWait(props = this.props) {
        const {data} = props;

        if (data instanceof Promise) {
            this.setState({component: null});

            return data.then((payload) => {
                if (this.mounted) {
                    // only replace if we're looking at the same promise, otherwise do nothing
                    this.setState((state, currentProps) => ({
                        component: currentProps.data === data
                                   ? currentProps.convertToJSXFunc(payload)
                                   : state.component,
                    }));
                }
            }, () => this.setState({component: false}));
        }

        this.setState({component: props.convertToJSXFunc(data)});
    }

    fireCallbackIfDataRendered() {
        if (this.state.component) {
            this.props.contentRenderedFunc();
        }
    }

    componentWillMount()                 { this.convertDataToJSXOrWait(); }
    componentDidMount()                  { this.mounted = true; this.fireCallbackIfDataRendered(); }
    componentDidUpdate()                 { this.fireCallbackIfDataRendered(); }
    componentWillReceiveProps(nextProps) { this.convertDataToJSXOrWait(nextProps); }
    componentWillUnmount()               { this.mounted = false; }

    getClasses(extraClasses) {
        return cx('b-async', this.props.className, extraClasses, {
            'b-async-error': this.state.component === false,
            'b-async-loading': this.state.component === null,
        });
    }

    render() {
        if (this.state.component === null || this.state.component === false) {
            return (
                <div {...omit(this.props, Async.internalKeys)} className={this.getClasses()}>
                    {this.state.component === null
                     ? this.props.loadingContent
                     : this.props.errorContent}
                </div>
            );
        }

        return React.cloneElement(this.state.component, {
            ...omit(this.props, Async.internalKeys),
            className: this.getClasses(this.state.component.props && this.state.component.props.className),
        });
    }
}
