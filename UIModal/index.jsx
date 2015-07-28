import UIDialog from '../UIDialog';
import UIView from '../UIView';
import React from 'react';

class UIModal extends UIView {
    getDialogClasses() {
        return ['ui-modal'].concat(this.props.className || []).join(' ');
    }

    getMaskClasses() {
        return ['ui-modal-mask'].concat(this.props.maskAttributes.className || []).join(' ');
    }

    getWrapperClasses() {
        return ['ui-modal-wrapper'].concat(this.props.wrapperAttributes.className || []).join(' ');
    }

    render() {
        return (
            <div {...this.props.wrapperAttributes}
                 className={this.getWrapperClasses()}>
                <div {...this.props.maskAttributes}
                     ref='mask'
                     className={this.getMaskClasses()} />
                <UIDialog {...this.props}
                          ref='dialog'
                          className={this.getDialogClasses()} />
            </div>
        );
    }
}

UIModal.propTypes = {
    bodyAttributes: React.PropTypes.object,
    bodyContent: React.PropTypes.node,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    closeOnEscKey: React.PropTypes.bool,
    closeOnOutsideClick: React.PropTypes.bool,
    footerAttributes: React.PropTypes.object,
    footerContent: React.PropTypes.node,
    headerAttributes: React.PropTypes.object,
    headerContent: React.PropTypes.node,
    maskAttributes: React.PropTypes.object,
    onClose: React.PropTypes.func,
    wrapperAttributes: React.PropTypes.object
};

UIModal.defaultProps = {
    maskAttributes: {},
    wrapperAttributes: {}
};

export default UIModal;
