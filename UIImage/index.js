/**
 * An image block with placeholder support for loading and fallback scenarios.
 * @class UIImage
 */

import React from 'react';
import UIView from '../UIView';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UIImage extends UIView {
    initialState() {
        return {
            status: UIImage.status.LOADING,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.resetPreloader();
            this.setState({status: UIImage.status.LOADING});
        }
    }

    componentDidMount() {
        this.preload();
    }

    componentDidUpdate(prevProps) {
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

        this.loader.onload = () => this.setState({status: UIImage.status.LOADED});
        this.loader.onerror = () => this.setState({status: UIImage.status.ERROR});

        this.loader.src = this.props.src;
    }

    renderImage() {
        if (this.props.displayAsBackgroundImage) {
            return (
                <div {...this.props.imageProps}
                     ref='image'
                     className={cx({
                         'ui-image': true,
                         [this.props.imageProps.className]: !!this.props.imageProps.className,
                     })}
                     title={this.props.alt}
                     style={{
                         ...this.props.imageProps.style,
                         backgroundImage: `url(${this.props.src})`,
                     }} />
            );
        }

        return (
            <img {...this.props.imageProps}
                 ref='image'
                 className={cx({
                    'ui-image': true,
                    [this.props.imageProps.className]: !!this.props.imageProps.className,
                 })}
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
                 className={cx({
                    'ui-image-status': true,
                    'ui-image-loading': this.state.status === UIImage.status.LOADING,
                    'ui-image-loaded': this.state.status === UIImage.status.LOADED,
                    'ui-image-error': this.state.status === UIImage.status.ERROR,
                    [this.props.statusProps.className]: !!this.props.statusProps.className,
                 })}
                 role='presentation' />
        );
    }

    render() {
        return (
            <div {...this.props}
                 alt={null}
                 src={null}
                 ref='wrapper'
                 className={cx({
                    'ui-image-wrapper': true,
                    [this.props.className]: !!this.props.className,
                 })}>
                {this.renderImage()}
                {this.renderStatus()}
            </div>
        );
    }
}

UIImage.status = {
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    ERROR: 'ERROR',
};

UIImage.propTypes = {
    alt: React.PropTypes.string,
    displayAsBackgroundImage: React.PropTypes.bool,
    imageProps: React.PropTypes.object,
    src: React.PropTypes.string.isRequired,
    statusProps: React.PropTypes.object,
};

UIImage.defaultProps = {
    imageProps: {},
    statusProps: {},
};

export default UIImage;
