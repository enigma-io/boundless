import React from 'react';
import Radio from '../index';

export default class RadioDemo extends React.PureComponent {
    state = {
        options: [{
            selected: false,
            label: 'Business',
            value: 'bus',
            name: 'major',
        }, {
            selected: true,
            label: 'Engineering',
            value: 'eng',
            name: 'major',
        }, {
            selected: false,
            label: 'Physical Sciences',
            value: 'phys-sci',
            name: 'major',
        }, {
            selected: false,
            label: 'Psychology',
            value: 'psy',
            name: 'major',
        }, {
            selected: false,
            label: 'Law',
            value: 'law',
            name: 'major',
        }],
    }

    handleInteraction(code) {
        // eslint-disable-next-line no-alert
        alert(`${code} selected!\n\nThe input will now revert to its previous state because this demo does not persist model changes.`);
    }

    render() {
        return (
            <div>
                <p>What is your academic major?</p>
                <div className='ui-spread-even'>
                    {this.state.options.map((definition) => {
                        let boundFunc = this.handleInteraction.bind(this, definition.value);

                        return (
                            <Radio {...definition}
                                     key={definition.value}
                                     label={definition.label}
                                     onSelected={boundFunc} />
                        );
                    })}
                </div>
            </div>
        );
    }
}
