/**
 * A blocking, focus-stealing container.
 * @class UIModal
 */

import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

import UIDialog from '../UIDialog';
import extractChildProps from '../UIUtils/extractChildProps';
import omit from '../UIUtils/omit';
import uuid from '../UIUtils/uuid';

export default class UIModal extends React.PureComponent {
    static propTypes = {
        ...UIDialog.propTypes,
        maskProps: React.PropTypes.object,
        modalProps: React.PropTypes.object,
    }

    static internalKeys = Object.keys(UIModal.propTypes)

    static defaultProps = {
        ...UIDialog.defaultProps,
        captureFocus: true,
        maskProps: {},
        modalProps: {},
    }

    portalID = uuid()

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
                    {...omit(props, UIModal.internalKeys)}
                    className={cx({
                        'ui-modal-wrapper': true,
                        [props.className]: !!props.className,
                    })}
                    id={this.props.id || this.portalID}>
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
        return (<div data-portal={this.props.id || this.portalID} />);
    }
}
