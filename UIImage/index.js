/**
 * An image block with placeholder support for loading and fallback scenarios.
 * @class UIImage
 */

import UIView from '../UIView';
import React from 'react';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UIImage extends UIView {
    initialState() {
        return {
            status: UIImage.status.IMAGE_LOADING
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.setState({status: UIImage.status.IMAGE_LOADING});
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
        if (this.loader) {
            this.resetPreloader();
        }

        this.loader = document.createElement('img');

        this.loader.onload = () => { this.setState({status: UIImage.status.IMAGE_LOADED}); };
        this.loader.onerror = () => { this.setState({status: UIImage.status.IMAGE_ERROR}); };

        this.loader.src = this.props.src;
    }

    renderImage() {
        if (this.props.displayAsBackgroundImage) {
            return (
                <div {...this.props.attrs}
                     ref='image'
                     className={cx({'ui-image': true, [this.props.className]: !!this.props.className})}
                     alt={null}
                     title={this.props.alt}
                     style={{backgroundImage: 'url(' + this.props.src + ')'}} />
            );
        }

        return (
            <img {...this.props.attrs}
                 ref='image'
                 className={cx({
                    'ui-image': true,
                    [this.props.className]: !!this.props.className,
                    [this.props.attrs.className]: !!this.props.attrs.className
                 })}
                 src={this.props.src}
                 alt={this.props.alt}
                 onLoad={noop}
                 onError={noop} />
        );
    }

    renderStatus() {
        return (
            <div {...this.props.statusAttrs}
                 ref='status'
                 className={cx({
                    'ui-image-status': true,
                    'ui-image-loading': this.state.status === UIImage.status.IMAGE_LOADING,
                    'ui-image-loaded': this.state.status === UIImage.status.IMAGE_LOADED,
                    'ui-image-error': this.state.status === UIImage.status.IMAGE_ERROR,
                    [this.props.statusAttrs.className]: !!this.props.statusAttrs.className
                 })}
                 role='presentation' />
        );
    }

    render() {
        return (
            <div {...this.props.wrapperAttrs}
                 className={cx({
                    'ui-image-wrapper': true,
                    [this.props.wrapperAttrs]: !!this.props.wrapperAttrs
                 })}>
                {this.renderImage()}
                {this.renderStatus()}
            </div>
        );
    }
}

UIImage.status = {
    IMAGE_LOADING: 'IMAGE_LOADING',
    IMAGE_LOADED: 'IMAGE_LOADED',
    IMAGE_ERROR: 'IMAGE_ERROR'
};

UIImage.propTypes = {
    attrs: React.PropTypes.object,
    alt: React.PropTypes.string,
    className: React.PropTypes.string,
    displayAsBackgroundImage: React.PropTypes.bool,
    src: React.PropTypes.string,
    statusAttrs: React.PropTypes.object,
    wrapperAttrs: React.PropTypes.object
};

UIImage.defaultProps = {
    attrs: {},
    statusAttrs: {},
    wrapperAttrs: {}
};

export default UIImage;
