import UIButton from '../UIButton';
import UIModal from './index';
import UIView from '../UIView';
import React from 'react';

export default class UIModalDemo extends UIView {
    constructor(...args) {
        super(...args);

        this.toggleModal = this.toggleModal.bind(this);
    }

    initialState() {
        return {
            showModal: false
        };
    }

    render() {
        return (
            <div>
                <UIButton ref='trigger' onClick={this.toggleModal}>
                    Delete Account
                </UIButton>
                {this.renderModal()}
            </div>
        );
    }

    renderModal() {
        if (this.state.showModal) {
            let buttons = [
                <UIButton key='y' onClick={this.toggleModal}>Yes</UIButton>,
                <UIButton key='n' className='cancel-button' onClick={this.toggleModal}>No</UIButton>
            ];

            return (
                <UIModal header='Account Deletion'
                         body='Are you sure you want to remove your account permanently?'
                         footer={buttons} />
            );
        }
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }
}
