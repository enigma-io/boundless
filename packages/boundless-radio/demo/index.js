import { createElement, PureComponent } from 'react';
import Radio from '../';

export default class RadioDemo extends PureComponent {
    state = {
        options: [ {
            labelContent: 'Business',
            name: 'major',
            selected: false,
            value: 'bus',
        }, {
            labelContent: 'Engineering',
            name: 'major',
            selected: true,
            value: 'eng',
        }, {
            labelContent: 'Physical Sciences',
            name: 'major',
            selected: false,
            value: 'phys-sci',
        }, {
            labelContent: 'Psychology',
            name: 'major',
            selected: false,
            value: 'psy',
        }, {
            labelContent: 'Law',
            name: 'major',
            selected: false,
            value: 'law',
        } ],
    }

    handleInteraction(code) {
        // eslint-disable-next-line no-alert
        alert(`${code} selected!\n\nThe input will now revert to its previous state because this demo does not persist model changes.`);
    }

    render() {
        return (
            <div>
                <p>What is your academic major?</p>
                <div className='spread'>
                    {this.state.options.map((definition) => {
                        let boundFunc = this.handleInteraction.bind(this, definition.value);

                        return (
                            <Radio {...definition}
                                     key={definition.value}
                                     labelContent={definition.labelContent}
                                     onSelected={boundFunc} />
                        );
                    })}
                </div>
            </div>
        );
    }
}
