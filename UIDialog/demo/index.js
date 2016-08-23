import React from 'react';
import {findDOMNode} from 'react-dom';
import UIButton from '../../UIButton';
import UIDialog from '../index';

export default class UIDialogDemo extends React.PureComponent {
    state = {
        showDialog: false,
    }

    componentDidMount() {
        const node = findDOMNode(this.refs.trigger);

        this.setState({
            leftPosition: node.offsetLeft + node.offsetWidth + 10 + 'px',
            topPosition: node.offsetTop + 'px',
        });
    }

    toggleDialog = () => {
        this.setState({showDialog: !this.state.showDialog});
    }

    renderDialog() {
        if (this.state.showDialog) {
            return (
                <UIDialog closeOnEscKey={true}
                          closeOnOutsideClick={true}
                          closeOnOutsideScroll={true}
                          onClose={this.toggleDialog}
                          style={{
                              left: this.state.leftPosition,
                              top: this.state.topPosition,
                          }}>
                    <iframe className='dialog-demo-video-frame'
                            width='560'
                            height='315'
                            src='https://www.youtube.com/embed/jtnKv7GrOz0?autoplay=1&showinfo=0&autohide=1'
                            frameBorder='0'
                            allowFullScreen />
                    <UIButton className='dialog-demo-close-button'
                              title='Close'
                              onPressed={this.toggleDialog} />
                </UIDialog>
            );
        }
    }

    render() {
        return (
            <div>
                <UIButton ref='trigger' onPressed={this.toggleDialog}>Launch Video</UIButton>
                {this.renderDialog()}
            </div>
        );
    }
}
