import UICheckboxGroup from '../index';
import UIView from '../../UIView';
import React from 'react';
import _ from 'lodash';

export default class UICheckboxGroupDemo extends UIView {
    initialState() {
        return {
            items: [{
                checked: false,
                label: 'Science',
                name: 'likes-science'
            }, {
                checked: false,
                label: 'Mathematics',
                name: 'likes-math'
            }, {
                checked: false,
                label: 'Technology',
                name: 'likes-tech'
            }, {
                checked: false,
                label: 'Art',
                name: 'likes-art'
            }, {
                checked: false,
                label: 'Sports',
                name: 'likes-sports'
            }]
        };
    }

    render() {
        return (
            <div>
                <p>What subjects are you interested in?</p>
                <UICheckboxGroup
                    items={this.state.items}
                    selectAll={true}
                    selectAllLabel='All of the above'
                    selectAllPosition={UICheckboxGroup.Constants.SELECT_ALL_AFTER}
                    onAllChecked={this.handleAllChecked.bind(this)}
                    onAllUnchecked={this.handleAllUnchecked.bind(this)}
                    onChildChecked={this.handleChildChecked.bind(this)}
                    onChildUnchecked={this.handleChildUnchecked.bind(this)} />
                {this.renderFeedback()}
            </div>
        );
    }

    renderFeedback() {
        if (_.any(this.state.items, {checked: true})) {
            let liked = _.pluck(_.where(this.state.items, {checked: true}), 'label');
            let lastIndex = liked.length - 1;

            return (
                <p>You said you like: {liked.length === 1 ? liked[0] : [liked.slice(0, lastIndex).join(', '), 'and', liked.slice(lastIndex)].join(' ')}.</p>
            );
        }
    }

    mutateAll(delta) {
        this.setState({
            items: _.map(this.state.items, function transformer(item) {
                return _.merge({}, item, delta);
            })
        });
    }

    mutateOne(name, delta) {
        this.setState({
            items: _.map(this.state.items, function transformer(item) {
                if (item.name !== name) {
                    return item;
                }

                return _.merge({}, item, delta);
            })
        });
    }

    handleAllChecked() {
        this.mutateAll({checked: true});
    }

    handleAllUnchecked() {
        this.mutateAll({checked: false});
    }

    handleChildChecked(name) {
        this.mutateOne(name, {checked: true});
    }

    handleChildUnchecked(name) {
        this.mutateOne(name, {checked: false});
    }
}
