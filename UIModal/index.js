/**
 * A blocking, focus-stealing container.
 * @class UIModal
 */

import React from 'react';
import UIDialog from '../UIDialog';
import extractChildProps from '../UIUtils/extractChildProps';
import UIView from '../UIView';
import cx from 'classnames';

export default class UIModal extends UIView {
    static propTypes = {
        ...UIDialog.propTypes,
        maskProps: React.PropTypes.object,
        modalProps: React.PropTypes.object,
    }

    static defaultProps = {
        ...UIDialog.defaultProps,
        maskProps: {},
        modalProps: {},
    }

    render() {
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
                <UIDialog {...extractChildProps(this.props, UIDialog.propTypes)}
                          {...this.props.modalProps}
                          ref='dialog'
                          className={cx({
                              'ui-modal': true,
                              [this.props.modalProps.className]: !!this.props.modalProps.className,
                          })}>
                    {this.props.children}
                </UIDialog>
            </div>
        );
    }
}
