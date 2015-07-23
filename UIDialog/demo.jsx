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
                <UIButton ref='trigger' onClick={this.toggleDialog}>Launch Video</UIButton>
                {this.renderDialog()}
            </div>
        );
    }

    renderDialog() {
        if (this.state.showDialog) {
            let closeButton = <UIButton onClick={this.toggleDialog}>Close</UIButton>;

            return (
                <UIDialog bodyContent={
                            <iframe className='video-frame'
                                    width='560'
                                    height='315'
                                    src='https://www.youtube.com/embed/jtnKv7GrOz0?autoplay=1&showinfo=0&autohide=1'
                                    frameBorder='0'
                                    allowFullScreen />
                          }
                          footerContent={closeButton}
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
