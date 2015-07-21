import UIButton from '../UIButton';
import UIDialog from './index';
import UIView from '../UIView';
import React from 'react';

export default class UIDialogDemo extends UIView {
    constructor(...args) {
        super(...args);

        this.toggleDialog = this.toggleDialog.bind(this);
    }

    initialState() {
        return {
            showDialog: false
        };
    }

    componentDidMount() {
        let box = React.findDOMNode(this.refs.trigger).getBoundingClientRect();

        this.setState({
            leftPosition: box.right + 10 + 'px',
            topPosition: box.top + 'px'
        });
    }

    render() {
        return (
            <div>
                <UIButton ref='trigger' onClick={this.toggleDialog}>Launch Dialog</UIButton>
                {this.renderDialog()}
            </div>
        );
    }

    renderDialog() {
        if (this.state.showDialog) {
            let okButton = <UIButton onClick={this.toggleDialog}>OK</UIButton>;

            return (
                <UIDialog headerContent='Test Dialog'
                          bodyContent='Tweedle dee, TweedleDum'
                          footerContent={okButton}
                          closeOnEscKey={true}
                          closeOnOutsideClick={true}
                          onClose={this.toggleDialog}
                          style={{left: this.state.leftPosition, top: this.state.topPosition}} />
            );
        }
    }

    toggleDialog() {
        this.setState({ showDialog: !this.state.showDialog });
    }
}
