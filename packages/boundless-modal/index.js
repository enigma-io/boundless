import React, {PropTypes} from 'react';
import cx from 'classnames';

import Dialog from '../boundless-dialog/index';
import Portal from '../boundless-portal/index';
import extractChildProps from '../boundless-utils-object-intersection/index';
import omit from '../boundless-utils-omit-keys/index';

/**
# Modal
__A blocking, focus-stealing container.__

Modal is an enhancement upon [Dialog](https://github.com/bibliotech/uikit/blob/master/packages/boundless-dialog/README.md). Typically, a masking layer is provided to obscure the rest of the page in some fashion, while also blocking outside click and keystroke access until the modal is dismissed.

> The Boundless Team recommends reviewing the [Alerts](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/WindowAlerts.html#//apple_ref/doc/uid/20000957-CH44-SW1) section of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `Modal` in your project.

### Interactions

Refer to [Dialog](https://github.com/bibliotech/uikit/blob/master/packages/boundless-dialog/README.md)

 */
export default class Modal extends React.PureComponent {
    static propTypes = {
        /** Modal supports all [Dialog props](/Dialog#props) */
        ...Dialog.propTypes,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-modal-mask` HTML element
         */
        maskProps: PropTypes.object,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-modal` HTML element
         */
        modalProps: PropTypes.object,

        /**
         * any/all supported [Portal props](/Portal/README.md)
         */
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
