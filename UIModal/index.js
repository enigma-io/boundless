/**
 * A blocking, focus-stealing container.
 * @class UIModal
 */

import UIDialog from '../UIDialog';
import UIView from '../UIView';
import React from 'react';
import cx from 'classnames';

class UIModal extends UIView {
    render() {
        return (
            <div {...this.props.wrapperAttributes}
                 className={cx({
                    'ui-modal-wrapper': true,
                    [this.props.wrapperAttributes.className]: !!this.props.wrapperAttributes.className
                 })}>
                <div {...this.props.maskAttributes}
                     ref='mask'
                     className={cx({
                        'ui-modal-mask': true,
                        [this.props.maskAttributes.className]: !!this.props.maskAttributes.className
                     })} />
                <UIDialog {...this.props}
                          ref='dialog'
                          className={cx({
                            'ui-modal': true,
                            [this.props.className]: !!this.props.className
                          })} />
            </div>
        );
    }
}

UIModal.propTypes = {
    body: React.PropTypes.node,
    bodyAttributes: React.PropTypes.object,
    className: React.PropTypes.string,
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
