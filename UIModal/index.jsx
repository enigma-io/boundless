import UIDialog from '../UIDialog';
import UIView from '../UIView';
import React from 'react';

class UIModal extends UIView {
    getClassNames() {
        return ['ui-modal-wrapper'].concat(this.props.className).join(' ');
    }

    render() {
        return (
            <div {...this.props}
                 className={this.getClassNames()}>
                <div ref='mask' className='ui-modal-mask' />
                <UIDialog ref='dialog'
                          className='ui-modal'
                          headerContent={this.props.headerContent}
                          bodyContent={this.props.bodyContent}
                          footerContent={this.props.footerContent}
                          closeOnEscKey={this.props.closeOnEscKey}
                          closeOnOutsideClick={this.props.closeOnOutsideClick}
                          onClose={this.props.onClose} />
            </div>
        );
    }
}

UIModal.propTypes = {
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

export default UIModal;
