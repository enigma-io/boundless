/**
 * An image block with placeholder support for loading and fallback scenarios.
 * @class UIImage
 */

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
            this.setState({status: UIImage.status.LOADING});
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

        this.loader.onload = () => { this.setState({status: UIImage.status.LOADED}); };
        this.loader.onerror = () => { this.setState({status: UIImage.status.ERROR}); };

        this.loader.src = this.props.src;
    }

    renderImage() {
        if (this.props.displayAsBackgroundImage) {
            return (
                <div {...this.props.imageAttrs}
                     ref='image'
                     className={cx({
                         'ui-image': true,
                         [this.props.imageAttrs.className]: !!this.props.imageAttrs.className,
                     })}
                     title={this.props.alt}
                     style={{
                         ...this.props.imageAttrs.style,
                         backgroundImage: `url(${this.props.src})`,
                     }} />
            );
        }

        return (
            <img {...this.props.imageAttrs}
                 ref='image'
                 className={cx({
                    'ui-image': true,
                    [this.props.imageAttrs.className]: !!this.props.imageAttrs.className,
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
                    'ui-image-loading': this.state.status === UIImage.status.LOADING,
                    'ui-image-loaded': this.state.status === UIImage.status.LOADED,
                    'ui-image-error': this.state.status === UIImage.status.ERROR,
                    [this.props.statusAttrs.className]: !!this.props.statusAttrs.className,
                 })}
                 role='presentation' />
        );
    }

    render() {
        return (
            <div {...this.props.attrs}
                 ref='wrapper'
                 className={cx({
                    'ui-image-wrapper': true,
                    [this.props.className]: !!this.props.className,
                    [this.props.attrs.className]: !!this.props.attrs.className,
                 })}
                 id={this.props.id || this.props.attrs.id}
                 style={{...this.props.style, ...this.props.attrs.style}}>
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
    attrs: React.PropTypes.object,
    alt: React.PropTypes.string,
    className: React.PropTypes.string,
    displayAsBackgroundImage: React.PropTypes.bool,
    imageAttrs: React.PropTypes.object,
    src: React.PropTypes.string.isRequired,
    statusAttrs: React.PropTypes.object,
};

UIImage.defaultProps = {
    attrs: {},
    imageAttrs: {},
    statusAttrs: {},
};

export default UIImage;
