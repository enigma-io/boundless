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
    }

    static internalKeys = Object.keys(UIModal.propTypes)

    static defaultProps = {
        ...UIDialog.defaultProps,
        captureFocus: true,
        maskProps: {},
        modalProps: {},
    }

    render() {
        const {props} = this;

        return (
            <UIPortal>
                <div
                    {...omit(props, UIModal.internalKeys)}
                    ref={(node) => (this.$modal = node)}
                    className={cx({
                        'ui-modal-wrapper': true,
                        [props.className]: !!props.className,
                    })}>
                    <div
                        {...props.maskProps}
                        className={cx({
                            'ui-modal-mask': true,
                            [props.maskProps.className]: !!props.maskProps.className,
                        })} />

                    <UIDialog
                        {...extractChildProps(props, UIDialog.propTypes)}
                        {...props.modalProps}
                        className={cx({
                            'ui-modal': true,
                            [props.modalProps.className]: !!props.modalProps.className,
                        })}>
                        {props.children}
                    </UIDialog>
                </div>
            </UIPortal>
        );
    }
}
