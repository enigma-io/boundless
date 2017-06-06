import { createElement, PureComponent } from 'react';
import Checkbox from '../';

export default class CheckboxDemo extends PureComponent {
    state = {
        checkboxes: [ {
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
        } ],
    }

    handleInteraction(event) {
        // eslint-disable-next-line no-alert
        alert(`${event.target.name} ${event.target.checked ? 'checked' : 'unchecked'}!\n\nThe input will now revert to its previous state because this demo does not persist model changes.`);
    }

    render() {
        return (
            <div className='spread'>
                {this.state.checkboxes.map((definition) => {
                    return (
                        <Checkbox
                            key={definition.name}
                            inputProps={definition}
                            label={definition.label}
                            onChange={this.handleInteraction} />
                    );
                })}
            </div>
        );
    }
}
