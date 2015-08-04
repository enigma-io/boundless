import UIRadio from '../index.jsx';
import UIView from '../../UIView';
import React from 'react';

require('./index.scss');

export default class UIRadioDemo extends UIView {
    initialState() {
        return {
            options: [{
                selected: false,
                label: 'Business',
                value: 'bus',
                name: 'major'
            }, {
                selected: true,
                label: 'Engineering',
                value: 'eng',
                name: 'major'
            }, {
                selected: false,
                label: 'Physical Sciences',
                value: 'phys-sci',
                name: 'major'
            }, {
                selected: false,
                label: 'Psychology',
                value: 'psy',
                name: 'major'
            }, {
                selected: false,
                label: 'Law',
                value: 'law',
                name: 'major'
            }]
        };
    }

    render() {
        return (
            <div>
                <p>What is your academic major?</p>
                <div className='ui-spread-even'>
                    {this.state.options.map((definition) => {
                        let boundFunc = this.handleInteraction.bind(this, definition.value);

                        return (
                            <UIRadio {...definition}
                                     key={definition.value}
                                     label={definition.label}
                                     onSelected={boundFunc}
                                     onDeselected={boundFunc} />
                        );
                    })}
                </div>
            </div>
        );
    }

    handleInteraction(code) {
        alert(`${code} selected!\n\nThe input will now revert to its previous state because this demo does not persist model changes.`);
    }
}
