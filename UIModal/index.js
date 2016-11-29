import React, {PropTypes} from 'react';
import cx from 'classnames';

import UIDialog from '../UIDialog';
import UIPortal from '../UIPortal';
import extractChildProps from '../UIUtils/extractChildProps';
import omit from '../UIUtils/omit';

/**
 * A blocking, focus-stealing container.
 */
export default class UIModal extends React.PureComponent {
    static propTypes = {
        ...UIDialog.propTypes,
        maskProps: PropTypes.object,
        modalProps: PropTypes.object,
        portalProps: PropTypes.object,
    }

    static defaultProps = {
        ...UIDialog.defaultProps,
        captureFocus: true,
        maskProps: {},
        modalProps: {},
        portalProps: {},
    }

    static internalKeys = Object.keys(UIModal.defaultProps)

    render() {
        const {props} = this;

        return (
            <UIPortal {...props.portalProps}>
                <div
                    {...omit(props, UIModal.internalKeys)}
                    ref={(node) => (this.$modal = node)}
                    className={cx('ui-modal-wrapper', props.className)}>
                    <div
                        {...props.maskProps}
                        className={cx('ui-modal-mask', props.maskProps.className)} />

                    <UIDialog
                        {...extractChildProps(props, UIDialog.defaultProps)}
                        {...props.modalProps}
                        className={cx('ui-modal', props.modalProps.className)}>
                        {props.children}
                    </UIDialog>
                </div>
            </UIPortal>
        );
    }
}
