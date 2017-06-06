import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';
import cx from 'classnames';

import Portal from 'boundless-portal';
import omit from 'boundless-utils-omit-keys';

const isFunction = (x) => typeof x === 'function';
const noop = () => {};
const toArray = Array.prototype.slice;

/**
A dialog differs from a modal in that it does not come with a masking layer (to obscure the rest of the page)
and the user can choose to shift focus away from the dialog contents via mouse click or a keyboard shortcut.

If you decide to provide a header inside your dialog, it's recommended to configure the [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute) attribute, which can be added to `props.dialogProps`.
 */
export default class Dialog extends PureComponent {
    static propTypes = {
        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
         */
        '*': PropTypes.any,

        /**
         * arbitrary content to be rendered after the dialog in the DOM
         */
        after: PropTypes.node,

        /**
         * arbitrary content to be rendered before the dialog in the DOM
         */
        before: PropTypes.node,

        /**
         * determines if focus is allowed to move away from the dialog
         */
        captureFocus: PropTypes.bool,

        /**
         * enable detection of "Escape" keypresses to trigger `props.onClose`; if a function is provided, the return
         * value determines if the dialog will be closed
         */
        closeOnEscKey: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func,
        ]),

        /**
         * enable detection of clicks inside the dialog area to trigger `props.onClose`; if a function is provided, the return
         * value determines if the dialog will be closed
         */
        closeOnInsideClick: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func,
        ]),

        /**
         * enable detection of clicks outside the dialog area to trigger `props.onClose`; if a function is provided, the return
         * value determines if the dialog will be closed
         */
        closeOnOutsideClick: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func,
        ]),

        /**
         * enable detection of focus outside the dialog area to trigger `props.onClose`; if a function is provided, the return
         * value determines if the dialog will be closed
         */
        closeOnOutsideFocus: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func,
        ]),

        /**
         * enable detection of scroll and mousewheel events outside the dialog area to trigger `props.onClose`; if a function
         * is provided, the return value determines if the dialog will be closed
         */
        closeOnOutsideScroll: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func,
        ]),

        /**
         * override the type of `.b-dialog-wrapper` HTML element
         */
        component: PropTypes.string,

        /**
         * override the type of `.b-dialog` HTML element
         */
        dialogComponent: PropTypes.string,

        dialogProps: PropTypes.shape({
            /**
             * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
             */
            '*': PropTypes.any,
        }),

        /**
         * a custom event handler that is called to indicate that the dialog should be unrendered by its parent; the event occurs if one or more of the "closeOn" props (`closeOnEscKey`, `closeOnOutsideClick`, etc.) are passed as `true` and the dismissal criteria are satisfied
         */
        onClose: PropTypes.func,
    }

    static defaultProps = {
        after: null,
        before: null,
        captureFocus: true,
        children: null,
        closeOnEscKey: false,
        closeOnInsideClick: false,
        closeOnOutsideClick: false,
        closeOnOutsideFocus: false,
        closeOnOutsideScroll: false,
        component: 'div',
        dialogComponent: 'div',
        dialogProps: {},
        onClose: noop,
        onKeyDown: noop,
    }

    static internalKeys = Object.keys(Dialog.defaultProps)

    mounted = false

    isPartOfDialog(node) {
        if (!node || node === window) { return false; }

        const roots = [ this.$wrapper ].concat(
            toArray.call(
                this.$wrapper.querySelectorAll(`[${Portal.PORTAL_DATA_ATTRIBUTE}]`)
            ).map((dom) => document.getElementById(dom.getAttribute(Portal.PORTAL_DATA_ATTRIBUTE)))
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

    shouldDialogCloseOnEvent(prop, event) {
        return isFunction(this.props[prop]) ? this.props[prop](event) : this.props[prop];
    }

    handleFocus = (nativeEvent) => {
        if (!this.props.captureFocus) {
            if (this.shouldDialogCloseOnEvent('closeOnOutsideFocus', nativeEvent) && !this.isPartOfDialog(nativeEvent.target)) {
                return window.setTimeout(this.props.onClose, 0);
            }

            return;
        }

        // explicitOriginalTarget is for Firefox, as it doesn't support relatedTarget
        let previous = nativeEvent.explicitOriginalTarget || nativeEvent.relatedTarget;

        if (this.isPartOfDialog(previous) && !this.isPartOfDialog(nativeEvent.target)) {
            nativeEvent.preventDefault();
            previous.focus(); // restore focus
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            if (this.shouldDialogCloseOnEvent('closeOnEscKey', event)) {
                window.setTimeout(this.props.onClose, 0);
            }
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    }

    handleInsideClick = (event) => {
        if (this.shouldDialogCloseOnEvent('closeOnInsideClick', event)) {
            window.setTimeout(this.props.onClose, 0);
        }
    }

    handleOutsideClick = (nativeEvent) => {
        if (this.shouldDialogCloseOnEvent('closeOnOutsideClick', nativeEvent) && !this.isPartOfDialog(nativeEvent.target)) {
            window.setTimeout(this.props.onClose, 0);
        }
    }

    handleOutsideScrollWheel = (nativeEvent) => {
        if (this.shouldDialogCloseOnEvent('closeOnOutsideScroll', nativeEvent) && !this.isPartOfDialog(nativeEvent.target)) {
            window.setTimeout(this.props.onClose, 0);
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
            <this.props.component
                {...omit(this.props, Dialog.internalKeys)}
                ref={(node) => (this.$wrapper = node)}
                className={cx('b-dialog-wrapper', this.props.className)}>
                {this.renderFocusBoundary()}

                {this.props.before}

                <this.props.dialogComponent
                    {...this.dialogProps}
                    ref={(node) => (this.$dialog = node)}
                    className={cx('b-dialog', this.props.dialogProps.className)}
                    onClick={this.handleInsideClick}
                    onKeyDown={this.handleKeyDown}
                    role={this.props.captureFocus ? 'alertdialog' : 'dialog'}
                    tabIndex='0'>
                    {this.props.children}
                </this.props.dialogComponent>

                {this.props.after}

                {this.renderFocusBoundary()}
            </this.props.component>
        );
    }
}
