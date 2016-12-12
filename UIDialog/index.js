import React, {PropTypes} from 'react';
import cx from 'classnames';

import {PORTAL_DATA_ATTRIBUTE} from '../UIPortal';
import isFunction from '../UIUtils/isFunction';
import noop from '../UIUtils/noop';
import omit from '../UIUtils/omit';
import uuid from '../UIUtils/uuid';

const toArray = Array.prototype.slice;

/**
 * A non-blocking, focus-stealing container.
 */
export default class UIDialog extends React.PureComponent {
    static propTypes = {
        after: PropTypes.node,
        before: PropTypes.node,
        bodyProps: PropTypes.object,
        captureFocus: PropTypes.bool,
        children: PropTypes.node,
        closeOnEscKey: PropTypes.bool,
        closeOnOutsideClick: PropTypes.bool,
        closeOnOutsideFocus: PropTypes.bool,
        closeOnOutsideScroll: PropTypes.bool,
        footer: PropTypes.node,
        footerProps: PropTypes.object,
        header: PropTypes.node,
        headerProps: PropTypes.object,
        onClose: PropTypes.func,
        wrapperProps: PropTypes.object,
    }

    static defaultProps = {
        after: null,
        before: null,
        bodyProps: {},
        captureFocus: true,
        children: null,
        closeOnEscKey: false,
        closeOnOutsideClick: false,
        closeOnOutsideFocus: false,
        closeOnOutsideScroll: false,
        footer: null,
        footerProps: {},
        header: null,
        headerProps: {},
        onClose: noop,
        wrapperProps: {},
    }

    static internalKeys = Object.keys(UIDialog.defaultProps)

    mounted = false

    // fallbacks if one isn't passed
    uuidHeader = uuid()
    uuidBody = uuid()

    isPartOfDialog(node) {
        if (!node || node === window) { return false; }

        const roots = [this.$wrapper].concat(
            toArray.call(
                this.$wrapper.querySelectorAll(`[${PORTAL_DATA_ATTRIBUTE}]`)
            ).map((dom) => document.getElementById(dom.getAttribute(PORTAL_DATA_ATTRIBUTE)))
        );

        const element = node.nodeType !== Node.ELEMENT_NODE ? node.parentNode : node;

        return roots.some((dom) => dom.contains(element));
    }

    componentDidMount() {
        window.addEventListener('click', this.handleOutsideClick, true);
        window.addEventListener('contextmenu', this.handleOutsideClick, true);
        window.addEventListener('focus', this.handleFocus, true);
        window.addEventListener('scroll', this.handleOutsideScrollWheel, true);
        window.addEventListener('wheel', this.handleOutsideScrollWheel, true);

        if (this.props.captureFocus && !this.isPartOfDialog(document.activeElement)) {
            this.$dialog.focus();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleOutsideClick, true);
        window.removeEventListener('contextmenu', this.handleOutsideClick, true);
        window.removeEventListener('focus', this.handleFocus, true);
        window.removeEventListener('scroll', this.handleOutsideScrollWheel, true);
        window.removeEventListener('wheel', this.handleOutsideScrollWheel, true);
    }

    handleFocus = (nativeEvent) => {
        if (!this.props.captureFocus) {
            if (this.props.closeOnOutsideFocus) {
                if (!this.isPartOfDialog(nativeEvent.target)) {
                    return window.setTimeout(this.props.onClose, 0);
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
            window.setTimeout(this.props.onClose, 0);
        }

        if (isFunction(this.props.onKeyDown)) {
            this.props.onKeyDown(event);
        }
    }

    handleOutsideClick = (nativeEvent) => {
        if (this.props.closeOnOutsideClick && !this.isPartOfDialog(nativeEvent.target)) {
            window.setTimeout(this.props.onClose, 0);
        }
    }

    handleOutsideScrollWheel = (nativeEvent) => {
        if (this.props.closeOnOutsideScroll && !this.isPartOfDialog(nativeEvent.target)) {
            window.setTimeout(this.props.onClose, 0);
        }
    }

    renderBody() {
        return (
            <div
                {...this.props.bodyProps}
                id={this.props.bodyProps.id || this.uuidBody}
                className={cx('ui-dialog-body', this.props.bodyProps.className)}>
                {this.props.children}
            </div>
        );
    }

    renderFooter() {
        if (this.props.footer) {
            return (
                <footer
                    {...this.props.footerProps}
                    className={cx('ui-dialog-footer', this.props.footerProps.className)}>
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
                    id={this.props.headerProps.id || this.uuidHeader}
                    className={cx('ui-dialog-header', this.props.headerProps.className)}>
                    {this.props.header}
                </header>
            );
        }
    }

    renderFocusBoundary() {
        if (this.props.captureFocus) {
            return (
                <div className='ui-offscreen' tabIndex='0' aria-hidden='true'>&nbsp;</div>
            );
        }
    } // used to lock focus into a particular subset of DOM

    render() {
        return (
            <div
                {...this.props.wrapperProps}
                ref={(node) => (this.$wrapper = node)}
                className={cx('ui-dialog-wrapper', this.props.wrapperProps.className)}
                tabIndex='0'>
                {this.renderFocusBoundary()}

                {this.props.before}

                <div
                    {...omit(this.props, UIDialog.internalKeys)}
                    ref={(node) => (this.$dialog = node)}
                    className={cx('ui-dialog', this.props.className)}
                    onKeyDown={this.handleKeyDown}
                    role='dialog'
                    aria-labelledby={this.uuidHeader}
                    aria-describedby={this.uuidBody}
                    tabIndex='0'>
                    {this.renderHeader()}
                    {this.renderBody()}
                    {this.renderFooter()}
                </div>

                {this.props.after}

                {this.renderFocusBoundary()}
            </div>
        );
    }
}
