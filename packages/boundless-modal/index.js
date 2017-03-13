import {createElement, PropTypes, PureComponent} from 'react';
import cx from 'classnames';

import Dialog from 'boundless-dialog';
import Portal from 'boundless-portal';
import extractChildProps from 'boundless-utils-object-intersection';
import omit from 'boundless-utils-omit-keys';

/**
Modal is an enhancement upon [Dialog](https://github.com/enigma-io/boundless/blob/master/packages/boundless-dialog). Typically, a masking layer is provided to obscure the rest of the page in some fashion, while also blocking outside click and keystroke access until the modal is dismissed.
 */
export default class Modal extends PureComponent {
    static propTypes = {
        ...Dialog.propTypes,

        maskProps: PropTypes.shape({
            /**
             * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
             */
            '*': PropTypes.any,
        }),

        modalProps: PropTypes.shape({
            /**
             * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
             */
            '*': PropTypes.any,
        }),

        portalProps: PropTypes.shape(Portal.propTypes),
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
                    className={cx('b-modal-wrapper', props.className)}>
                    <div
                        {...props.maskProps}
                        className={cx('b-modal-mask', props.maskProps.className)} />

                    <Dialog
                        {...extractChildProps(props, Dialog.defaultProps)}
                        {...props.modalProps}
                        className={cx('b-modal', props.modalProps.className)}>
                        {props.children}
                    </Dialog>
                </div>
            </Portal>
        );
    }
}
