import UIView from '../UIView';
import React from 'react';

function noop() {}

class UIImage extends UIView {
    initialState() {
        return {
            status: UIImage.Constants.IMAGE_LOADING
        };
    }

    getImageClasses() {
        return ['ui-image'].concat(this.props.className || []).join(' ');
    }

    getStatusClasses() {
        let classes = ['ui-image-status'];

        switch (this.state.status) {
        case UIImage.Constants.IMAGE_LOADING:
            classes.push('ui-image-loading');
            break;

        case UIImage.Constants.IMAGE_LOADED:
            classes.push('ui-image-loaded');
            break;

        case UIImage.Constants.IMAGE_ERROR:
            classes.push('ui-image-error');
            break;
        }

        return classes.concat(this.props.statusAttributes.className || []).join(' ');
    }

    getWrapperClasses() {
        return ['ui-image-wrapper'].concat(this.props.wrapperAttributes.className || []).join(' ');
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

    render() {
        return (
            <div {...this.props.wrapperAttributes}
                 className={this.getWrapperClasses()}>
                {this.renderImage()}
                {this.renderStatus()}
            </div>
        );
    }

    renderImage() {
        if (this.props.displayAsBackgroundImage) {
            return (
                <div {...this.props}
                     ref='image'
                     className={this.getImageClasses()}
                     alt={null}
                     title={this.props.alt}
                     style={{backgroundImage: 'url(' + this.props.src + ')'}} />
            );
        }

        return (
            <img {...this.props}
                 ref='image'
                 className={this.getImageClasses()}
                 onLoad={noop}
                 onError={noop} />
        );
    }

    renderStatus() {
        return (
            <div {...this.props.statusAttributes}
                 ref='status'
                 className={this.getStatusClasses()}
                 role='presentation' />
        );
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

        this.loader.onload = () => { this.setState({ status: UIImage.Constants.IMAGE_LOADED }); };
        this.loader.onerror = () => { this.setState({ status: UIImage.Constants.IMAGE_ERROR }); };

        this.loader.src = this.props.src;
    }
}

UIImage.Constants = {
    IMAGE_LOADING: 'IMAGE_LOADING',
    IMAGE_LOADED: 'IMAGE_LOADED',
    IMAGE_ERROR: 'IMAGE_ERROR'
};

UIImage.propTypes = {
    alt: React.PropTypes.string,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
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
