import UISegmentedControl from '../index';
import UIView from '../../UIView';
import React from 'react';
import _ from 'lodash';

export default class UISegmentedControlDemo extends UIView {
    initialState() {
        return {
            options: [{
                selected: true,
                content: 'Planets',
                value: 'planets'
            }, {
                selected: false,
                content: 'Solar systems',
                value: 'solar-systems'
            }, {
                selected: false,
                content: 'Galaxies',
                value: 'galaxies'
            }]
        };
    }

    handleOptionSelected(value) {
        this.setState({
            options: _.map(this.state.options, function transformer(option) {
                return {...option, selected: option.value === value};
            })
        });
    }

    render() {
        return (
            <div>
                <p>Which astronomical features would you like to view?</p>
                <div className='ui-spread-even'>
                    <UISegmentedControl
                        options={this.state.options}
                        onOptionSelected={this.handleOptionSelected.bind(this)} />
                </div>
            </div>
        );
    }
}
