/**
 * A non-blocking, focus-stealing container.
 * @class UIDialog
 */

import React from 'react';
import UIView from '../UIView';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UIDialog extends UIView {
    initialState() {
        return {
            headerUUID: this.uuid(),
            bodyUUID: this.uuid(),
        };
    }

    componentDidMount() {
        if (this.props.captureFocus && !this.isPartOfDialog(document.activeElement)) {
            this.refs.dialog.focus();
        }

        if (this.props.closeOnOutsideClick) {
            this.handleOutsideClick = this.handleOutsideClick.bind(this);

            window.addEventListener('click', this.handleOutsideClick, true);
        }

        this.handleFocus = this.handleFocus.bind(this);

        window.addEventListener('focus', this.handleFocus, true);
    }

    componentWillUnmount() {
        if (this.props.closeOnOutsideClick) {
            window.removeEventListener('click', this.handleOutsideClick, true);
        }

        window.removeEventListener('focus', this.handleFocus, true);
    }

    isPartOfDialog(node) {
        return this.refs.dialog.contains(node);
    }

    handleFocus(nativeEvent) {
        if (!this.props.captureFocus) {
            return;
        }

        // explicitOriginalTarget is for Firefox, as it doesn't support relatedTarget
        let previous = nativeEvent.explicitOriginalTarget || nativeEvent.relatedTarget;

        return previous;

        if (   this.isPartOfDialog(previous)
            && !this.isPartOfDialog(nativeEvent.target)) {
            nativeEvent.preventDefault();
            previous.focus(); // restore focus
        }
    }

    handleKeyDown(event) {
        if (this.props.closeOnEscKey
            && event.key === 'Escape') {
            this.props.onClose();
        }
    }

    handleOutsideClick(nativeEvent) {
        if (!this.isPartOfDialog(nativeEvent.target)) {
            this.props.onClose();
        }
    }

    renderBody() {
        if (this.props.body) {
            return (
                <div {...this.props.bodyAttrs}
                     ref='body'
                     id={this.state.bodyUUID}
                     className={cx({
                        'ui-dialog-body': true,
                        [this.props.bodyAttrs.className]: !!this.props.bodyAttrs.className,
                     })}>
                    {this.props.body}
                </div>
            );
        }
    }

    renderFooter() {
        if (this.props.footer) {
            return (
                <footer {...this.props.footerAttrs}
                        ref='footer'
                        className={cx({
                            'ui-dialog-footer': true,
                            [this.props.footerAttrs.className]: !!this.props.footerAttrs.className,
                        })}>
                    {this.props.footer}
                </footer>
            );
        }
    }

    renderHeader() {
        if (this.props.header) {
            return (
                <header {...this.props.headerAttrs}
                        ref='header'
                        id={this.state.headerUUID}
                        className={cx({
                            'ui-dialog-header': true,
                            [this.props.headerAttrs.className]: !!this.props.headerAttrs.className,
                        })}>
                    {this.props.header}
                </header>
            );
        }
    }

    render() {
        return (
            <div {...this.props.attrs}
                 ref='dialog'
                 className={cx({
                    'ui-dialog': true,
                    [this.props.className]: !!this.props.className,
                    [this.props.attrs.className]: !!this.props.attrs.className,
                 })}
                 id={this.props.id || this.props.attrs.id}
                 onDragEnd={this.handleDrop}
                 onKeyDown={this.handleKeyDown.bind(this)}
                 role='dialog'
                 aria-labelledby={this.state.headerUUID}
                 aria-describedby={this.state.bodyUUID}
                 style={{...this.props.style, ...this.props.attrs.style}}
                 tabIndex='0'>
                {this.renderHeader()}
                {this.props.children || this.renderBody()}
                {this.renderFooter()}
            </div>
        );
    }
}

UIDialog.propTypes = {
    attrs: React.PropTypes.object,
    body: React.PropTypes.node,
    bodyAttrs: React.PropTypes.object,
    captureFocus: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    closeOnEscKey: React.PropTypes.bool,
    closeOnOutsideClick: React.PropTypes.bool,
    footer: React.PropTypes.node,
    footerAttrs: React.PropTypes.object,
    header: React.PropTypes.node,
    headerAttrs: React.PropTypes.object,
    id: React.PropTypes.string,
    onClose: React.PropTypes.func,
    style: React.PropTypes.object,
};

UIDialog.defaultProps = {
    attrs: {},
    bodyAttrs: {},
    captureFocus: true,
    footerAttrs: {},
    headerAttrs: {},
    onClose: noop,
};

export default UIDialog;
