import React from 'react';
import Button from '../../boundless-button/index';
import Modal from '../index';

export default class ModalDemo extends React.PureComponent {
    state = {
        showModal: false,
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    }

    renderModal() {
        if (this.state.showModal) {
            return (
                <Modal className='demo-modal'>
                    <h3>Account Deletion</h3>

                    <p>Are you sure you want to remove your account permanently?</p>

                    <Button onPressed={this.toggleModal}>Yes</Button>
                    <Button className='demo-modal-cancel-button' onPressed={this.toggleModal}>No</Button>
                </Modal>
            );
        }
    }

    render() {
        return (
            <div>
                <Button ref='trigger' onPressed={this.toggleModal}>
                    Delete Account
                </Button>
                {this.renderModal()}
            </div>
        );
    }
}
