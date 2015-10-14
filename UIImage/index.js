/**
 * An image block with placeholder support for loading and fallback scenarios.
 * @class UIImage
 */

import UIView from '../UIView';
import React from 'react';
import cx from 'classnames';
import {noop} from 'lodash';

class UIImage extends UIView {
    initialState() {
        return {
            status: UIImage.Constants.IMAGE_LOADING
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.setState({ status: UIImage.Constants.IMAGE_LOADING });
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

        this.loader.onload = () => { this.setState({status: UIImage.Constants.IMAGE_LOADED}); };
        this.loader.onerror = () => { this.setState({status: UIImage.Constants.IMAGE_ERROR}); };

        this.loader.src = this.props.src;
    }

    renderImage() {
        if (this.props.displayAsBackgroundImage) {
            return (
                <div {...this.props}
                     ref='image'
                     className={cx({'ui-image': true, [this.props.className]: !!this.props.className})}
                     alt={null}
                     title={this.props.alt}
                     style={{backgroundImage: 'url(' + this.props.src + ')'}} />
            );
        }

        return (
            <img {...this.props}
                 ref='image'
                 className={cx({'ui-image': true, [this.props.className]: !!this.props.className})}
                 onLoad={noop}
                 onError={noop} />
        );
    }

    renderStatus() {
        return (
            <div {...this.props.statusAttributes}
                 ref='status'
                 className={cx({
                    'ui-image-status': true,
                    'ui-image-loading': this.state.status === UIImage.Constants.IMAGE_LOADING,
                    'ui-image-loaded': this.state.status === UIImage.Constants.IMAGE_LOADED,
                    'ui-image-error': this.state.status === UIImage.Constants.IMAGE_ERROR,
                    [this.props.statusAttributes.className]: !!this.props.statusAttributes.className
                 })}
                 role='presentation' />
        );
    }

    render() {
        return (
            <div {...this.props.wrapperAttributes}
                 className={cx({
                    'ui-image-wrapper': true,
                    [this.props.wrapperAttributes]: !!this.props.wrapperAttributes
                 })}>
                {this.renderImage()}
                {this.renderStatus()}
            </div>
        );
    }
}

UIImage.Constants = {
    IMAGE_LOADING: 'IMAGE_LOADING',
    IMAGE_LOADED: 'IMAGE_LOADED',
    IMAGE_ERROR: 'IMAGE_ERROR'
};

UIImage.propTypes = {
    alt: React.PropTypes.string,
    className: React.PropTypes.string,
    displayAsBackgroundImage: React.PropTypes.bool,
    src: React.PropTypes.string,
    statusAttributes: React.PropTypes.object,
    wrapperAttributes: React.PropTypes.object
};

UIImage.defaultProps = {
    statusAttributes: {},
    wrapperAttributes: {}
};

export default UIImage;
