/**
 * A non-blocking, focus-stealing container.
 * @class UIDialog
 */

import UIView from '../UIView';
import React from 'react';
import ReactDOM from 'react-dom';
import {noop} from 'lodash';

class UIDialog extends UIView {
    initialState() {
        return {
            headerUUID: this.uuid(),
            bodyUUID: this.uuid()
        };
    }

    componentDidMount() {
        if (this.props.captureFocus) {
            ReactDOM.findDOMNode(this).focus();
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
        return ReactDOM.findDOMNode(this).contains(node);
    }

    handleFocus(nativeEvent) {
        if (!this.props.captureFocus) {
            return;
        }

        // explicitOriginalTarget is for Firefox, as it doesn't support relatedTarget
        let previous = nativeEvent.explicitOriginalTarget || nativeEvent.relatedTarget;

        if (this.isPartOfDialog(previous)
            && !this.isPartOfDialog(nativeEvent.target)) {
            nativeEvent.preventDefault();
            previous.focus(); // restore focus
        }
    }

    handleKeydown(event) {
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

    getBodyClasses() {
        return ['ui-dialog-body'].concat(this.props.bodyAttributes.className || []).join(' ');
    }

    renderBody() {
        if (this.props.body) {
            return (
                <div {...this.props.bodyAttributes}
                     ref='body'
                     id={this.state.bodyUUID}
                     className={this.getBodyClasses()}>
                    {this.props.body}
                </div>
            );
        }
    }

    getFooterClasses() {
        return ['ui-dialog-footer'].concat(this.props.footerAttributes.className || []).join(' ');
    }

    renderFooter() {
        if (this.props.footer) {
            return (
                <footer {...this.props.footerAttributes}
                        ref='footer'
                        className={this.getFooterClasses()}>
                    {this.props.footer}
                </footer>
            );
        }
    }

    getHeaderClasses() {
        return ['ui-dialog-header'].concat(this.props.headerAttributes.className || []).join(' ');
    }

    renderHeader() {
        if (this.props.header) {
            return (
                <header {...this.props.headerAttributes}
                        ref='header'
                        id={this.state.headerUUID}
                        className={this.getHeaderClasses()}>
                    {this.props.header}
                </header>
            );
        }
    }

    getRootClasses() {
        return ['ui-dialog'].concat(this.props.className || []).join(' ');
    }

    render() {
        return (
            <div {...this.props}
                 className={this.getRootClasses()}
                 onDragEnd={this.handleDrop}
                 onKeyDown={this.handleKeydown.bind(this)}
                 role='dialog'
                 aria-labelledby={this.state.headerUUID}
                 aria-describedby={this.state.bodyUUID}
                 tabIndex='0'>
                {this.renderHeader()}
                {this.props.children || this.renderBody()}
                {this.renderFooter()}
            </div>
        );
    }
}

UIDialog.propTypes = {
    body: React.PropTypes.node,
    bodyAttributes: React.PropTypes.object,
    captureFocus: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    closeOnEscKey: React.PropTypes.bool,
    closeOnOutsideClick: React.PropTypes.bool,
    footer: React.PropTypes.node,
    footerAttributes: React.PropTypes.object,
    header: React.PropTypes.node,
    headerAttributes: React.PropTypes.object,
    onClose: React.PropTypes.func
};

UIDialog.defaultProps = {
    bodyAttributes: {},
    captureFocus: true,
    footerAttributes: {},
    headerAttributes: {},
    onClose: noop
};

export default UIDialog;
