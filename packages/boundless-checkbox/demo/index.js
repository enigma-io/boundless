import React from 'react';
import Checkbox from '../index';

export default class CheckboxDemo extends React.PureComponent {
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
        // eslint-disable-next-line no-alert
        alert(`${name} checked!\n\nThe input will now revert to its previous state because this demo does not persist model changes.`);
    }

    render() {
        return (
            <div className='spread'>
                {this.state.checkboxes.map((definition) => {
                    let boundFunc = this.handleInteraction.bind(this, definition.name);

                    return (
                        <Checkbox
                            key={definition.name}
                            inputProps={definition}
                            label={definition.label}
                            onChecked={boundFunc}
                            onUnchecked={boundFunc} />
                    );
                })}
            </div>
        );
    }
}
