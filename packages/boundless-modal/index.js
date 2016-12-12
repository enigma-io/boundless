import React, {PropTypes} from 'react';
import cx from 'classnames';

import Dialog from '../boundless-dialog/index';
import Portal from '../boundless-portal/index';
import extractChildProps from '../boundless-utils-object-intersection/index';
import omit from '../boundless-utils-omit-keys/index';

/**
 * A blocking, focus-stealing container.
 */
export default class Modal extends React.PureComponent {
    static propTypes = {
        ...Dialog.propTypes,
        maskProps: PropTypes.object,
        modalProps: PropTypes.object,
        portalProps: PropTypes.object,
    }

    static defaultProps = {
        ...Dialog.defaultProps,
        captureFocus: true,
        maskProps: {},
        modalProps: {},
        portalProps: {},
    }

    static internalKeys = Object.keys(Modal.defaultProps)

    render() {
        const {props} = this;

        return (
            <Portal {...props.portalProps}>
                <div
                    {...omit(props, Modal.internalKeys)}
                    ref={(node) => (this.$modal = node)}
                    className={cx('ui-modal-wrapper', props.className)}>
                    <div
                        {...props.maskProps}
                        className={cx('ui-modal-mask', props.maskProps.className)} />

                    <Dialog
                        {...extractChildProps(props, Dialog.defaultProps)}
                        {...props.modalProps}
                        className={cx('ui-modal', props.modalProps.className)}>
                        {props.children}
                    </Dialog>
                </div>
            </Portal>
        );
    }
}
