import {cloneElement, createElement, isValidElement, PropTypes, PureComponent} from 'react';
import cx from 'classnames';

import omit from 'boundless-utils-omit-keys';

const get = (base, path, fallback) => path.split('.').reduce((current, fragment) => current[fragment] || fallback, base);

/**
 * There are plenty of situations where you need to fetch content to be displayed, but want
 * to show some sort of loading graphic in the interim. This component helps to simplify
 * that pattern by handling common types of promises and providing a simple mechanism
 * for materializing the fulfilled payload into JSX.
 */
export default class Async extends PureComponent {
    static propTypes = {
        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
         */
        '*': PropTypes.any,

        /**
         * a promise, function that returns a promise, or other type of renderable content; if a function is passed, it will
         * be called with the current props
         *
         * Promise example:
         *
         * ```jsx
         * const listDataPromise = fetch('/some/list/data/endpoint').then(
         *     (response) => response.ok ? response.json() : 'Failed to receive list data',
         *     (error) => error.message,
         * ).then((payload) => {
         *     if (typeof payload === 'string') {
         *         return (<div className='error'>{payload}</div>);
         *     }
         *
         *     return (
         *         <ul>
         *             {payload.map((item) => (<li key={item.id}>{item.content}</li>))}
         *         </ul>
         *     );
         * });
         * ```
         *
         * <Async>{listDataPromise}</Async>
         *
         * Function example:
         *
         * ```jsx
         * const fetchListData = (props) => fetch(props['data-endpoint']).then(
         *     (response) => response.ok ? response.json() : 'Failed to receive list data',
         *     (error) => error.message,
         * ).then((payload) => {
         *     if (typeof payload === 'string') {
         *         return (<div className='error'>{payload}</div>);
         *     }
         *
         *     return (
         *         <ul>
         *             {payload.map((item) => (<li key={item.id}>{item.content}</li>))}
         *         </ul>
         *     );
         * });
         *
         * <Async data-endpoint='/some/list/data/endpoint'>{fetchListData}</Async>
         * ```
         */
        children: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.node,
            PropTypes.instanceOf(Promise),
        ]).isRequired,

        /** a callback for when real content has been rendered; this will be called immediately if normal JSX is passed to Async, or, in the case of a promise, upon resolution or rejection */
        childrenDidRender: PropTypes.func,

        /** content to be shown while the promise is in "pending" state (like a loading graphic, perhaps) */
        pendingContent: PropTypes.node,
    }

    static defaultProps = {
        children: <div />,
        childrenDidRender: () => {},
        pendingContent: <div />,
    }

    static internalKeys = Object.keys(Async.defaultProps)

    mounted = false
    promise = null
    state = {}

    handlePromiseFulfillment(context, payload) {
        if (!this.mounted) { return; }

        // only set the component if the promise that is fulfilled matches
        // the one we're tracking in state, otherwise ignore it and retain the previous data
        this.setState(function renderPayloadIfPromiseMatches(state) {
            if (this.promise === context) {
                this.promise = null;

                return {component: payload};
            }

            return state;
        }, this.fireRenderCallback);
    }

    handleChildren(children) {
        let content = children;

        if (isValidElement(content)) {
            return this.setState({component: content}, this.fireRenderCallback);
        } else if (typeof content === 'function') {
            return this.handleChildren(content(this.props));
        }

        const boundHandler = this.handlePromiseFulfillment.bind(this, content);

        // this is kept outside state so it can be set immediately if the props change
        this.promise = content;

        this.setState({component: null}, () => content.then(boundHandler, boundHandler));
    }

    fireRenderCallback() {
        if (this.state.component) {
            this.props.childrenDidRender();
        }
    }

    componentWillMount()                 { this.handleChildren(this.props.children); }
    componentDidMount()                  { this.mounted = true; }
    componentWillReceiveProps(nextProps) { this.handleChildren(nextProps.children); }
    componentWillUnmount()               { this.mounted = false; }

    render() {
        const {props, state} = this;

        return cloneElement(state.component || props.pendingContent, {
            ...omit(props, Async.internalKeys),
            className: cx(
                'b-async',
                props.className,
                state.component === null && get(props, 'pendingContent.props.className'),
                state.component && get(state, 'component.props.className', ''),
                {'b-async-pending': state.component === null}
            ),
        });
    }
}
