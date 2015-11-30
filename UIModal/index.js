/**
 * A blocking, focus-stealing container.
 * @class UIModal
 */

import React from 'react';
import UIDialog from '../UIDialog';
import UIView from '../UIView';
import cx from 'classnames';

class UIModal extends UIView {
    render() {
        const dialogSpecificProps = Object.keys(UIDialog.propTypes).reduce((props, key) => {
            props[key] = this.props[key];

            return props;
        }, {});

        return (
            <div {...this.props}
                 ref='wrapper'
                 className={cx({
                    'ui-modal-wrapper': true,
                    [this.props.className]: !!this.props.className,
                 })}>
                <div {...this.props.maskProps}
                     ref='mask'
                     className={cx({
                        'ui-modal-mask': true,
                        [this.props.maskProps.className]: !!this.props.maskProps.className,
                     })} />
                <UIDialog {...dialogSpecificProps}
                          {...this.props.modalProps}
                          ref='dialog'
                          className={cx({
                            'ui-modal': true,
                            [this.props.modalProps.className]: !!this.props.modalProps.className,
                          })} />
            </div>
        );
    }
}

UIModal.propTypes = {
    ...UIDialog.propTypes,
    maskProps: React.PropTypes.object,
    modalProps: React.PropTypes.object,
};

UIModal.defaultProps = {
    ...UIDialog.defaultProps,
    maskProps: {},
    modalProps: {},
};

export default UIModal;
