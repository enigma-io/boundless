/**
 * A blocking, focus-stealing container.
 * @class UIModal
 */

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
    body: React.PropTypes.node,
    bodyAttributes: React.PropTypes.object,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    closeOnEscKey: React.PropTypes.bool,
    closeOnOutsideClick: React.PropTypes.bool,
    footer: React.PropTypes.node,
    footerAttributes: React.PropTypes.object,
    header: React.PropTypes.node,
    headerAttributes: React.PropTypes.object,
    maskAttributes: React.PropTypes.object,
    onClose: React.PropTypes.func,
    wrapperAttributes: React.PropTypes.object
};

UIModal.defaultProps = {
    maskAttributes: {},
    wrapperAttributes: {}
};

export default UIModal;
