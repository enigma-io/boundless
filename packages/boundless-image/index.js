import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';
import cx from 'classnames';

import omit from 'boundless-utils-omit-keys';
import uuid from 'boundless-utils-uuid';

export default class Image extends PureComponent {
    static status = {
        LOADING: uuid(),
        LOADED: uuid(),
        ERROR: uuid(),
    }

    static propTypes = {
        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
         */
        '*': PropTypes.any,

        /**
         * a written description of the image for search engines, hovertext and those using accessibility technologies
         */
        alt: PropTypes.string,

        /**
         * overrides the component HTML tag
         */
        component: PropTypes.string,

        /**
         * a valid path to the desired image
         */
        src: PropTypes.string.isRequired,
    }

    static defaultProps = {
        alt: '',
        component: 'div',
        src: 'about:blank',
    }

    static internalKeys = Object.keys(Image.defaultProps)

    state = {
        status: Image.status.LOADING,
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.resetPreloader();
            this.setState({ status: Image.status.LOADING });
        }
    }

    componentDidMount()     { this.preload(); }
    componentDidUpdate()    { this.preload(); }
    componentWillUnmount()  { this.resetPreloader(); }

    resetPreloader() {
        this.loader.onload = null;
        this.loader.onerror = null;
        this.loader = null;
    }

    preload() {
        if (this.loader) { return; }

        this.loader = document.createElement('img');

        this.loader.onload = () => this.setState({ status: Image.status.LOADED });
        this.loader.onerror = () => this.setState({ status: Image.status.ERROR });

        this.loader.src = this.props.src;
    }

    render() {
        return (
            <this.props.component
                {...omit(this.props, Image.internalKeys)}
                className={cx('b-image', this.props.className, {
                    'b-image-loading': this.state.status === Image.status.LOADING,
                    'b-image-loaded': this.state.status === Image.status.LOADED,
                    'b-image-error': this.state.status === Image.status.ERROR,
                })}
                title={this.props.alt}
                role='img'
                style={{
                    ...this.props.style,
                    backgroundImage: `url(${this.props.src})`,
                }}>
                &nbsp;
            </this.props.component>
        );
    }
}
