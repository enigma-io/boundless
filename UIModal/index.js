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
            <div {...this.props.wrapperAttrs}
                 className={cx({
                    'ui-modal-wrapper': true,
                    [this.props.wrapperAttrs.className]: !!this.props.wrapperAttrs.className
                 })}>
                <div {...this.props.maskAttrs}
                     ref='mask'
                     className={cx({
                        'ui-modal-mask': true,
                        [this.props.maskAttrs.className]: !!this.props.maskAttrs.className
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
    ...UIDialog.propTypes,
    maskAttrs: React.PropTypes.object,
    wrapperAttrs: React.PropTypes.object
};

UIModal.defaultProps = {
    maskAttrs: {},
    wrapperAttrs: {}
};

export default UIModal;
