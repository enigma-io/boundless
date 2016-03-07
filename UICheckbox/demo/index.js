import React from 'react';
import UICheckbox from '../index';
import UIView from '../../UIView';

export default class UICheckboxDemo extends UIView {
    state = {
        checkboxes: [{
            checked: false,
            indeterminate: false,
            label: 'An unchecked checkbox',
            name: 'box1',
        }, {
            checked: true,
            indeterminate: false,
            label: 'A checked checkbox',
            name: 'box2',
        }, {
            checked: false,
            indeterminate: true,
            label: 'An indeterminate (mixed) checkbox',
            name: 'box3',
        }],
    }

    handleInteraction(name) {
        alert(`${name} checked!\n\nThe input will now revert to its previous state because this demo does not persist model changes.`);
    }

    render() {
        return (
            <div className='ui-spread-even'>
                {this.state.checkboxes.map(definition => {
                    let boundFunc = this.handleInteraction.bind(this, definition.name);

                    return (
                        <UICheckbox {...definition}
                                    key={definition.name}
                                    label={definition.label}
                                    onChecked={boundFunc}
                                    onUnchecked={boundFunc} />
                    );
                })}
            </div>
        );
    }
}
