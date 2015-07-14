import UIView from '../UIView';
import React from 'react';
import _ from 'lodash';

class UIImage extends UIView {
    initialState() {
        return {
            status: UIImage.Constants.IMAGE_LOADING
        };
    }

    getClassNames() {
        return ['ui-image-wrapper'].concat(this.props.className).join(' ');
    }

    getStatusClass() {
        switch (this.state.status) {
        case UIImage.Constants.IMAGE_LOADING:
            return 'ui-image-loading';

        case UIImage.Constants.IMAGE_LOADED:
            return 'ui-image-loaded';

        case UIImage.Constants.IMAGE_ERROR:
            return 'ui-image-error';
        }
    }

    componentDidMount() {
        const loader = document.createElement('img');

        loader.onload = () => { this.setState({ status: UIImage.Constants.IMAGE_LOADED }); };
        loader.onerror = () => { this.setState({ status: UIImage.Constants.IMAGE_ERROR }); };

        loader.src = this.props.src;
    }

    render() {
        return (
            <div className={this.getClassNames()}>
                {this.renderImage()}
                <div className={this.getStatusClass()} role='presentation' />
            </div>
        );
    }

    renderImage() {
        if (this.state.status === UIImage.Constants.IMAGE_LOADED) {
            if (this.props.displayAsBackgroundImage) {
                return (
                    <div
                        {...this.props}
                        ref='image'
                        className='ui-image'
                        title={this.props.alt}
                        style={{backgroundImage: 'url(' + this.props.src + ')'}} />
                );
            }

            return (
                <img
                    {...this.props}
                    ref='image'
                    className='ui-image'
                    onLoad={_.noop}
                    onError={_.noop} />
            );
        }
    }
}

UIImage.Constants = {
    IMAGE_LOADING: _.uniqueId(),
    IMAGE_LOADED: _.uniqueId(),
    IMAGE_ERROR: _.uniqueId()
};

UIImage.propTypes = {
    alt: React.PropTypes.string,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    displayAsBackgroundImage: React.PropTypes.bool,
    src: React.PropTypes.string
};

export default UIImage;
