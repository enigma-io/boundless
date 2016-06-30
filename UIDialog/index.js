/**
 * A non-blocking, focus-stealing container.
 * @class UIDialog
 */

import React from 'react';
import UIView from '../UIView';
import cx from 'classnames';
import noop from '../UIUtils/noop';

export default class UIDialog extends UIView {
    static propTypes = {
        bodyProps: React.PropTypes.object,
        captureFocus: React.PropTypes.bool,
        children: React.PropTypes.node,
        closeOnEscKey: React.PropTypes.bool,
        closeOnOutsideClick: React.PropTypes.bool,
        closeOnOutsideFocus: React.PropTypes.bool,
        closeOnOutsideScroll: React.PropTypes.bool,
        footer: React.PropTypes.node,
        footerProps: React.PropTypes.object,
        header: React.PropTypes.node,
        headerProps: React.PropTypes.object,
        onClose: React.PropTypes.func,
    }

    static defaultProps = {
        bodyProps: {},
        captureFocus: true,
        closeOnEscKey: false,
        closeOnOutsideClick: false,
        closeOnOutsideFocus: false,
        closeOnOutsideScroll: false,
        footerProps: {},
        headerProps: {},
        onClose: noop,
    }

    state = {
        headerUUID: this.uuid(),
        bodyUUID: this.uuid(),
    }

    componentDidMount() {
        if (this.props.captureFocus && !this.isPartOfDialog(document.activeElement)) {
            this.$dialog.focus();
        }

        window.addEventListener('click', this.handleOutsideClick, true);
        window.addEventListener('contextmenu', this.handleOutsideClick, true);
        window.addEventListener('focus', this.handleFocus, true);
        window.addEventListener('scroll', this.handleOutsideScrollWheel, true);
        window.addEventListener('wheel', this.handleOutsideScrollWheel, true);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleOutsideClick, true);
        window.removeEventListener('contextmenu', this.handleOutsideClick, true);
        window.removeEventListener('focus', this.handleFocus, true);
        window.removeEventListener('scroll', this.handleOutsideScrollWheel, true);
        window.removeEventListener('wheel', this.handleOutsideScrollWheel, true);
    }

    isPartOfDialog(node) {
        if (!node || node === window) { return false; }

        return this.$dialog.contains(node.nodeType === 3 ? node.parentNode : node);
    }

    handleFocus = (nativeEvent) => {
        if (!this.props.captureFocus) {
            if (this.props.closeOnOutsideFocus) {
                if (!this.isPartOfDialog(nativeEvent.target)) {
                    return window.setTimeout(() => this.props.onClose(), 0);
                }
            }

            return;
        }

        // explicitOriginalTarget is for Firefox, as it doesn't support relatedTarget
        let previous = nativeEvent.explicitOriginalTarget || nativeEvent.relatedTarget;

        if (   this.isPartOfDialog(previous)
            && !this.isPartOfDialog(nativeEvent.target)) {
            nativeEvent.preventDefault();
            previous.focus(); // restore focus
        }
    }

    handleKeyDown = (event) => {
        if (this.props.closeOnEscKey && event.key === 'Escape') {
            window.setTimeout(() => this.props.onClose(), 0);
        }

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
    }

    handleOutsideClick = (nativeEvent) => {
        if (this.props.closeOnOutsideClick && !this.isPartOfDialog(nativeEvent.target)) {
            window.setTimeout(() => this.props.onClose(), 0);
        }
    }

    handleOutsideScrollWheel = (nativeEvent) => {
        if (this.props.closeOnOutsideScroll && !this.isPartOfDialog(nativeEvent.target)) {
            window.setTimeout(() => this.props.onClose(), 0);
        }
    }

    renderBody() {
        return (
            <div
                {...this.props.bodyProps}
                id={this.state.bodyUUID}
                className={cx({
                   'ui-dialog-body': true,
                   [this.props.bodyProps.className]: !!this.props.bodyProps.className,
                })}>
                {this.props.children}
            </div>
        );
    }

    renderFooter() {
        if (this.props.footer) {
            return (
                <footer
                    {...this.props.footerProps}
                    className={cx({
                        'ui-dialog-footer': true,
                        [this.props.footerProps.className]: !!this.props.footerProps.className,
                    })}>
                    {this.props.footer}
                </footer>
            );
        }
    }

    renderHeader() {
        if (this.props.header) {
            return (
                <header
                    {...this.props.headerProps}
                    id={this.state.headerUUID}
                    className={cx({
                        'ui-dialog-header': true,
                        [this.props.headerProps.className]: !!this.props.headerProps.className,
                    })}>
                    {this.props.header}
                </header>
            );
        }
    }

    renderFocusBoundary() {
        if (this.props.captureFocus) {
            return (
                <div className='ui-offscreen' tabIndex='0'>&nbsp;</div>
            );
        }
    } // used to lock focus into a particular subset of DOM

    render() {
        return (
            <div>
                {this.renderFocusBoundary()}

                <div
                    {...this.props}
                    ref={node => (this.$dialog = node)}
                    className={cx({
                        'ui-dialog': true,
                        [this.props.className]: !!this.props.className,
                    })}
                    onKeyDown={this.handleKeyDown}
                    role='dialog'
                    aria-labelledby={this.state.headerUUID}
                    aria-describedby={this.state.bodyUUID}
                    tabIndex='0'>
                    {this.renderHeader()}
                    {this.renderBody()}
                    {this.renderFooter()}
                </div>

                {this.renderFocusBoundary()}
            </div>
        );
    }
}
