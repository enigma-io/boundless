import React from 'react';
import UIButton from '../../UIButton';
import UIModal from '../index';

export default class UIModalDemo extends React.PureComponent {
    state = {
        showModal: false,
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    }

    renderModal() {
        if (this.state.showModal) {
            const buttons = [
                <UIButton key='y' onPressed={this.toggleModal}>Yes</UIButton>,
                <UIButton key='n' className='demo-modal-cancel-button' onPressed={this.toggleModal}>No</UIButton>,
            ];

            return (
                <UIModal
                    className='demo-modal'
                    header='Account Deletion'
                    footer={buttons}>
                    Are you sure you want to remove your account permanently?
                </UIModal>
            );
        }
    }

    render() {
        return (
            <div>
                <UIButton ref='trigger' onPressed={this.toggleModal}>
                    Delete Account
                </UIButton>
                {this.renderModal()}
            </div>
        );
    }
}
