import React from 'react';
import UICheckboxGroup from '../index';
import UIView from '../../UIView';
import {filter, map, merge, some} from 'lodash';

export default class UICheckboxGroupDemo extends UIView {
    state = {
        items: [{
            checked: false,
            label: 'Science',
            name: 'likes-science',
        }, {
            checked: false,
            label: 'Mathematics',
            name: 'likes-math',
        }, {
            checked: false,
            label: 'Technology',
            name: 'likes-tech',
        }, {
            checked: false,
            label: 'Art',
            name: 'likes-art',
        }, {
            checked: false,
            label: 'Sports',
            name: 'likes-sports',
        }],
    }

    mutateAll(delta) {
        this.setState({
            items: map(this.state.items, function transformer(item) {
                return merge({}, item, delta);
            }),
        });
    }

    mutateOne(name, delta) {
        this.setState({
            items: map(this.state.items, function transformer(item) {
                if (item.name !== name) {
                    return item;
                }

                return merge({}, item, delta);
            }),
        });
    }

    handleAllChecked = () => {
        this.mutateAll({checked: true});
    }

    handleAllUnchecked = () => {
        this.mutateAll({checked: false});
    }

    handleChildChecked = (name) => {
        this.mutateOne(name, {checked: true});
    }

    handleChildUnchecked = (name) => {
        this.mutateOne(name, {checked: false});
    }

    renderFeedback() {
        if (some(this.state.items, {checked: true})) {
            const liked = map(filter(this.state.items, {checked: true}), 'label');
            const lastIndex = liked.length - 1;

            return (
                <p>You said you like: {liked.length === 1 ? liked[0] : [liked.slice(0, lastIndex).join(', '), 'and', liked.slice(lastIndex)].join(' ')}.</p>
            );
        }
    }

    render() {
        return (
            <div>
                <p>What subjects are you interested in?</p>
                <UICheckboxGroup items={this.state.items}
                                 selectAll={true}
                                 selectAllLabel='All of the above'
                                 selectAllPosition={UICheckboxGroup.Constants.SELECT_ALL_AFTER}
                                 onAllChecked={this.handleAllChecked}
                                 onAllUnchecked={this.handleAllUnchecked}
                                 onChildChecked={this.handleChildChecked}
                                 onChildUnchecked={this.handleChildUnchecked} />
                {this.renderFeedback()}
            </div>
        );
    }
}
