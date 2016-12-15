import React, {PropTypes} from 'react';
import cx from 'classnames';

import noop from '../boundless-utils-noop/index';
import omit from '../boundless-utils-omit-keys/index';

/**
 * An image block with placeholder support for loading and fallback scenarios.
 */
export default class Image extends React.PureComponent {
    static status = {
        LOADING: 'LOADING',
        LOADED: 'LOADED',
        ERROR: 'ERROR',
    }

    static propTypes = {
        alt: PropTypes.string,
        displayAsBackgroundImage: PropTypes.bool,
        imageProps: PropTypes.object,
        src: PropTypes.string.isRequired,
        statusProps: PropTypes.object,
    }

    static defaultProps = {
        alt: null,
        displayAsBackgroundImage: false,
        imageProps: {},
        src: 'about:blank',
        statusProps: {},
    }

    static internalKeys = Object.keys(Image.defaultProps)

    state = {
        status: Image.status.LOADING,
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.resetPreloader();
            this.setState({status: Image.status.LOADING});
        }
    }

    componentDidMount() {
        this.preload();
    }

    componentDidUpdate() {
        this.preload();
    }

    componentWillUnmount() {
        this.resetPreloader();
    }

    resetPreloader() {
        this.loader.onload = null;
        this.loader.onerror = null;
        this.loader = null;
    }

    preload() {
        if (this.loader) { return; }

        this.loader = document.createElement('img');

        this.loader.onload = () => this.setState({status: Image.status.LOADED});
        this.loader.onerror = () => this.setState({status: Image.status.ERROR});

        this.loader.src = this.props.src;
    }

    renderImage() {
        if (this.props.displayAsBackgroundImage) {
            return (
                <div
                    {...this.props.imageProps}
                    ref='image'
                    className={cx('b-image', this.props.imageProps.className)}
                    title={this.props.alt}
                    style={{
                        ...this.props.imageProps.style,
                        backgroundImage: `url(${this.props.src})`,
                    }} />
            );
        }

        return (
            <img
                {...this.props.imageProps}
                ref='image'
                className={cx('b-image', this.props.imageProps.className)}
                src={this.props.src}
                alt={this.props.alt}
                onLoad={noop}
                onError={noop} />
        );
    }

    renderStatus() {
        return (
            <div {...this.props.statusProps}
                 ref='status'
                 className={cx('b-image-status', this.props.statusProps.className, {
                    'b-image-loading': this.state.status === Image.status.LOADING,
                    'b-image-loaded': this.state.status === Image.status.LOADED,
                    'b-image-error': this.state.status === Image.status.ERROR,
                 })}
                 role='presentation' />
        );
    }

    render() {
        return (
            <div
                {...omit(this.props, Image.internalKeys)}
                ref='wrapper'
                className={cx('b-image-wrapper', this.props.className)}>
                {this.renderImage()}
                {this.renderStatus()}
            </div>
        );
    }
}
