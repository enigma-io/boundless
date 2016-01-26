import React from 'react';
import UIView from '../UIView';
import cx from 'classnames';

class UIPaginatedViewItem extends UIView {
    initialState() {
        return {
            data: this.props.data,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ data: nextProps.data });
        }
    }

    waitForContentIfNecessary() {
        if (this.state.data instanceof Promise) {
            this.state.data.then(function cautiouslySetItemData(promise, value) {
                if (this.state.data === promise) {
                    this.setState({data: value});
                } // only replace if we're looking at the same promise, otherwise do nothing
            }.bind(this, this.state.data));
        }
    }

    componentDidMount() {
        this.waitForContentIfNecessary();
    }

    componentDidUpdate() {
        this.waitForContentIfNecessary();
    }

    getClasses(extraClasses) {
        return cx({
            'ui-paginated-view-item': true,
            'ui-paginated-view-item-even': this.props.even,
            'ui-paginated-view-item-odd': !this.props.even,
            'ui-paginated-view-item-loading': this.state.data instanceof Promise,
        }) + (extraClasses ? ' ' + extraClasses : '');
    }

    cloneWithClasses(element) {
        if (element instanceof Promise) {
            return (<div {...this.props} className={this.getClasses()}></div>);
        }

        return React.cloneElement(element, {...this.props, className: this.getClasses(this.state.data.props.className)});
    }

    render() {
        return this.cloneWithClasses(this.state.data);
    }
}

UIPaginatedViewItem.propTypes = {
    even: React.PropTypes.bool,
    data: React.PropTypes.object,
};

export default UIPaginatedViewItem;
