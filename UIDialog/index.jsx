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

    getClassNames() {
        return ['ui-dialog'].concat(this.props.className).join(' ');
    }

    componentDidMount() {
        React.findDOMNode(this).focus();

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
                 className={this.getClassNames()}
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

    renderHeader() {
        return (
            <header ref='header'
                    id={this.state.headerUUID}
                    className='ui-dialog-header'>
                {this.props.headerContent}
            </header>
        );
    }

    renderBody() {
        return (
            <div ref='body'
                 id={this.state.bodyUUID}
                 className='ui-dialog-body'>
                {this.props.bodyContent}
            </div>
        );
    }

    renderFooter() {
        return (
            <footer ref='footer'
                    className='ui-dialog-footer'>
                {this.props.footerContent}
            </footer>
        );
    }

    isPartOfDialog(node) {
        return React.findDOMNode(this).contains(node);
    }

    handleFocus(nativeEvent) {
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
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    headerContent: React.PropTypes.node,
    bodyContent: React.PropTypes.node,
    footerContent: React.PropTypes.node,
    closeOnEscKey: React.PropTypes.bool,
    closeOnOutsideClick: React.PropTypes.bool,
    onClose: React.PropTypes.func
};

UIDialog.defaultProps = {
    onClose: function noop() {}
};

export default UIDialog;
