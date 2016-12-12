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
            const buttons = [
                <Button key='y' onPressed={this.toggleModal}>Yes</Button>,
                <Button key='n' className='demo-modal-cancel-button' onPressed={this.toggleModal}>No</Button>,
            ];

            return (
                <Modal
                    className='demo-modal'
                    header='Account Deletion'
                    footer={buttons}>
                    Are you sure you want to remove your account permanently?
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
