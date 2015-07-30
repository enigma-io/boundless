import UIView from '../UIView';
import React from 'react';

class UIDialog extends UIView {
    constructor(...args) {
        super(...args);

        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    initialState() {
        return {
            headerUUID: this.uuid(),
            bodyUUID: this.uuid()
        };
    }

    getBodyClasses() {
        return ['ui-dialog-body'].concat(this.props.bodyAttributes.className || []).join(' ');
    }

    getFooterClasses() {
        return ['ui-dialog-footer'].concat(this.props.footerAttributes.className || []).join(' ');
    }

    getHeaderClasses() {
        return ['ui-dialog-header'].concat(this.props.headerAttributes.className || []).join(' ');
    }

    getRootClasses() {
        return ['ui-dialog'].concat(this.props.className || []).join(' ');
    }

    componentDidMount() {
        if (this.props.closeOnOutsideClick) {
            window.addEventListener('click', this.handleOutsideClick, true);
        }

        window.addEventListener('focus', this.handleFocus, true);
    }

    componentWillUnmount() {
        if (this.props.closeOnOutsideClick) {
            window.removeEventListener('click', this.handleOutsideClick, true);
        }

        window.removeEventListener('focus', this.handleFocus, true);
    }

    render() {
        return (
            <div {...this.props}
                 className={this.getRootClasses()}
                 onDragEnd={this.handleDrop}
                 onKeyDown={this.handleKeydown}
                 role='dialog'
                 aria-labelledby={this.state.headerUUID}
                 aria-describedby={this.state.bodyUUID}
                 tabIndex='0'>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </div>
        );
    }

    renderBody() {
        return (
            <div {...this.props.bodyAttributes}
                 ref='body'
                 id={this.state.bodyUUID}
                 className={this.getBodyClasses()}>
                {this.props.body}
            </div>
        );
    }

    renderFooter() {
        return (
            <footer {...this.props.footerAttributes}
                    ref='footer'
                    className={this.getFooterClasses()}>
                {this.props.footer}
            </footer>
        );
    }

    renderHeader() {
        return (
            <header {...this.props.headerAttributes}
                    ref='header'
                    id={this.state.headerUUID}
                    className={this.getHeaderClasses()}>
                {this.props.header}
            </header>
        );
    }

    isPartOfDialog(node) {
        return React.findDOMNode(this).contains(node);
    }

    handleFocus(nativeEvent) {
        if (!this.props.captureFocus) {
            return;
        }

        // explicitOriginalTarget is for Firefox, as it doesn't support relatedTarget
        let previous = nativeEvent.explicitOriginalTarget || nativeEvent.relatedTarget;

        if (this.isPartOfDialog(previous) && !this.isPartOfDialog(nativeEvent.target)) {
            nativeEvent.preventDefault();
            previous.focus(); // restore focus
        }
    }

    handleKeydown(event) {
        if (this.props.closeOnEscKey && event.key === 'Escape') {
            this.props.onClose();
        }
    }

    handleOutsideClick(nativeEvent) {
        if (!this.isPartOfDialog(nativeEvent.target)) {
            this.props.onClose();
        }
    }
}

UIDialog.propTypes = {
    body: React.PropTypes.node,
    bodyAttributes: React.PropTypes.object,
    captureFocus: React.PropTypes.bool,
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
    onClose: function noop() {}
};

export default UIDialog;
