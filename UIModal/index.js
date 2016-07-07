/**
 * A blocking, focus-stealing container.
 * @class UIModal
 */

import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import omit from 'lodash.omit';

import UIDialog from '../UIDialog';
import UIView from '../UIView';
import extractChildProps from '../UIUtils/extractChildProps';

export default class UIModal extends UIView {
    static propTypes = {
        ...UIDialog.propTypes,
        maskProps: React.PropTypes.object,
        modalProps: React.PropTypes.object,
    }

    static internal_keys = Object.keys(UIModal.propTypes)

    static defaultProps = {
        ...UIDialog.defaultProps,
        captureFocus: true,
        maskProps: {},
        modalProps: {},
    }

    updateInternalModalCache(instance) {
        this.modal = instance;
    }

    componentWillMount() {
        this.$container = document.createElement('div');

        document.body.appendChild(this.$container);

        this.renderModal();
    }

    componentDidUpdate() {
        this.renderModal();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.$container);
        document.body.removeChild(this.$container);
    }

    renderModal() {
        const {props} = this;

        this.updateInternalModalCache(
            ReactDOM.render(
                <div
                    {...omit(props, UIModal.internal_keys)}
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
            , this.$container)
        );
    }

    render() {
        return (<div />);
    }
}
