import {createElement, PureComponent} from 'react';
import CheckboxGroup from '../';
import {filter, map, merge, some} from 'lodash';

export default class CheckboxGroupDemo extends PureComponent {
    state = {
        items: [{
            inputProps: {
                checked: false,
                name: 'likes-science',
            },
            label: 'Science',
        }, {
            inputProps: {
                checked: false,
                name: 'likes-math',
            },
            label: 'Mathematics',
        }, {
            inputProps: {
                checked: false,
                name: 'likes-tech',
            },
            label: 'Technology',
        }, {
            inputProps: {
                checked: false,
                name: 'likes-art',
            },
            label: 'Art',
        }, {
            inputProps: {
                checked: false,
                name: 'likes-sports',
            },
            label: 'Sports',
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
                if (item.inputProps.name !== name) {
                    return item;
                }

                return merge({}, item, delta);
            }),
        });
    }

    handleAllChecked = () => {
        this.mutateAll({inputProps: {checked: true}});
    }

    handleAllUnchecked = () => {
        this.mutateAll({inputProps: {checked: false}});
    }

    handleChildChecked = (name) => {
        this.mutateOne(name, {inputProps: {checked: true}});
    }

    handleChildUnchecked = (name) => {
        this.mutateOne(name, {inputProps: {checked: false}});
    }

    renderFeedback() {
        if (some(this.state.items, {inputProps: {checked: true}})) {
            const liked = map(filter(this.state.items, {inputProps: {checked: true}}), 'label');
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
                <CheckboxGroup
                    className='checkbox-group-demo'
                    items={this.state.items}
                    selectAll={CheckboxGroup.selectAll.AFTER}
                    selectAllProps={{label: 'All of the above'}}
                    onAllChecked={this.handleAllChecked}
                    onAllUnchecked={this.handleAllUnchecked}
                    onChildChecked={this.handleChildChecked}
                    onChildUnchecked={this.handleChildUnchecked} />
                    <br />
                {this.renderFeedback()}
            </div>
        );
    }
}
