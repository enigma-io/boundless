import UIButton from '../../UIButton';
import UIModal from '../index';
import UIView from '../../UIView';
import React from 'react';

export default class UIModalDemo extends UIView {
    constructor(...args) {
        super(...args);

        this.toggleModal = this.toggleModal.bind(this);
    }

    initialState() {
        return {
            showModal: false,
        };
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    renderModal() {
        if (this.state.showModal) {
            let buttons = [
                <UIButton key='y' onPressed={this.toggleModal}>Yes</UIButton>,
                <UIButton key='n' className='demo-modal-cancel-button' onPressed={this.toggleModal}>No</UIButton>,
            ];

            return (
                <UIModal header='Account Deletion'
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
