import { createElement, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import Button from '../../boundless-button/index';
import Dialog from '../';

export default class DialogDemo extends PureComponent {
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
        this.setState({ showDialog: !this.state.showDialog });
    }

    renderDialog() {
        if (this.state.showDialog) {
            return (
                <Dialog
                    closeOnEscKey={true}
                    closeOnOutsideClick={true}
                    onClose={this.toggleDialog}
                    style={{
                        left: this.state.leftPosition,
                        top: this.state.topPosition,
                    }}>
                    <iframe
                        className='dialog-demo-video-frame'
                        width='560'
                        height='315'
                        src='https://www.youtube.com/embed/HEheh1BH34Q?autoplay=1&showinfo=0&autohide=1'
                        frameBorder='0'
                        title='A youtube video showcasing the relative size of celestial objects.'
                        allowFullScreen />
                    <Button
                        className='dialog-demo-close-button'
                        title='Close'
                        onPressed={this.toggleDialog} />
                </Dialog>
            );
        }
    }

    render() {
        return (
            <div>
                <Button ref='trigger' onPressed={this.toggleDialog}>Launch Video</Button>
                {this.renderDialog()}
            </div>
        );
    }
}
