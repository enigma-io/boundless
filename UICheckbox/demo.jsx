import UICheckbox from './index.jsx';
import UIView from '../UIView';
import React from 'react';

export default class UICheckboxDemo extends UIView {
    render() {
        return (
            <div className='ui-spread-even'>
                <UICheckbox
                    name='box1'
                    label='An unchecked checkbox'
                    checked={false}
                    onChecked={this.handleChecked}
                    onUnchecked={this.handleUnchecked} />
                <UICheckbox
                    name='box2'
                    label='A checked checkbox'
                    checked={true}
                    onChecked={this.handleChecked}
                    onUnchecked={this.handleUnchecked} />
                <UICheckbox
                    name='box3'
                    label='An indeterminate (mixed) checkbox'
                    checked={false}
                    indeterminate={true}
                    onChecked={this.handleChecked}
                    onUnchecked={this.handleUnchecked} />
            </div>
        );
    }

    handleChecked(name) {
        alert(`${name} checked!\n\nThe input will now revert to its previous state because this demo does not persist model changes.`);
    }

    handleUnchecked(name) {
        alert(`${name} unchecked!\n\nThe input will now revert to its previous state because this demo does not persist model changes.`);
    }
}
