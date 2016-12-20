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

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-modal-mask` node
         */
        maskProps: PropTypes.object,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-modal` node
         */
        modalProps: PropTypes.object,

        /**
         * any/all supported [Portal props](boundless-portal/README.md)
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
