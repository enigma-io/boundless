import React, {PropTypes} from 'react';
import cx from 'classnames';

import {PORTAL_DATA_ATTRIBUTE} from '../boundless-portal/index';
import isFunction from '../boundless-utils-is-function/index';
import noop from '../boundless-utils-noop/index';
import omit from '../boundless-utils-omit-keys/index';
import uuid from '../boundless-utils-uuid/index';

const toArray = Array.prototype.slice;

/**
 * A non-blocking, focus-stealing container.
 */
export default class Dialog extends React.PureComponent {
    static propTypes = {
        /**
         * arbitrary content to be rendered after the dialog in the DOM
         */
        after: PropTypes.node,

        /**
         * arbitrary content to be rendered before the dialog in the DOM
         */
        before: PropTypes.node,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog-body` node
         */
        bodyProps: PropTypes.object,

        /**
         * determines if focus is allowed to move away from the dialog
         */
        captureFocus: PropTypes.bool,

        children: PropTypes.node,

        /**
         * enable detection of "Escape" keypresses to trigger `props.onClose`
         */
        closeOnEscKey: PropTypes.bool,

        /**
         * enable detection of clicks outside the dialog area to trigger `props.onClose`
         */
        closeOnOutsideClick: PropTypes.bool,

        /**
         * enable detection of focus outside the dialog area to trigger `props.onClose`
         */
        closeOnOutsideFocus: PropTypes.bool,

        /**
         * enable detection of scroll and mousewheel events outside the dialog area to trigger `props.onClose`
         */
        closeOnOutsideScroll: PropTypes.bool,

        /**
         * text, ReactElements, etc. comprising the "footer" area of the dialog, e.g. confirm/cancel buttons
         */
        footer: PropTypes.node,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog-footer` node
         */
        footerProps: PropTypes.object,

        /**
         * text, ReactElements, etc. to represent the "title bar" area of the dialog
         */
        header: PropTypes.node,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog-header` node
         */
        headerProps: PropTypes.object,

        /**
         * a custom event handler that is called to indicate that the dialog should be unrendered by its parent; the event occurs if one or more of the `closeOn` props (`closeOnEscKey`, `closeOnOutsideClick`, etc.) are passed as `true` and the dismissal criteria are satisfied
         */
        onClose: PropTypes.func,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.ui-dialog-wrapper` node
         */
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

    static internalKeys = Object.keys(Dialog.defaultProps)

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
                className={cx('b-dialog-body', this.props.bodyProps.className)}>
                {this.props.children}
            </div>
        );
    }

    renderFooter() {
        if (this.props.footer) {
            return (
                <footer
                    {...this.props.footerProps}
                    className={cx('b-dialog-footer', this.props.footerProps.className)}>
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
                    className={cx('b-dialog-header', this.props.headerProps.className)}>
                    {this.props.header}
                </header>
            );
        }
    }

    renderFocusBoundary() {
        if (this.props.captureFocus) {
            return (
                <div className='b-offscreen' tabIndex='0' aria-hidden='true'>&nbsp;</div>
            );
        }
    } // used to lock focus into a particular subset of DOM

    render() {
        return (
            <div
                {...this.props.wrapperProps}
                ref={(node) => (this.$wrapper = node)}
                className={cx('b-dialog-wrapper', this.props.wrapperProps.className)}
                tabIndex='0'>
                {this.renderFocusBoundary()}

                {this.props.before}

                <div
                    {...omit(this.props, Dialog.internalKeys)}
                    ref={(node) => (this.$dialog = node)}
                    className={cx('b-dialog', this.props.className)}
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
