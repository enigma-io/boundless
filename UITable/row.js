import React from 'react';
import UIView from '../UIView';
import Cell from './cell';
import transformProp from '../UIUtils/transform';

class UITableRow extends UIView {
    constructor(...args) {
        super(...args);

        this.handleClick = this.handleClick.bind(this);
        this.cache_style = {[transformProp]: null};
    }

    initialState() {
        return {
            data: this.props.data,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return    nextProps.data !== this.props.data
               || nextState.data !== this.state.data
               || nextProps.even !== this.props.even
               || nextProps.columns !== this.props.columns
               || nextProps.y !== this.props.y;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ data: nextProps.data });
        }
    }

    waitForContentIfNecessary() {
        if (this.state.data instanceof Promise) {
            this.state.data.then(function cautiouslySetRowData(promise, value) {
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

    handleClick(event) {
        if (this.props.onInteract) {
            event.persist();
            this.props.onInteract(event, this.state.data);
        }
    }

    renderCells() {
        if (this.state.data && this.state.data instanceof Promise === false) {
            return this.props.columns.map((definition) => {
                return (
                    <Cell key={definition.mapping}
                          content={this.state.data[definition.mapping]}
                          width={definition.width}
                          onInteract={this.props.onCellInteract}
                          row={this.state.data} />
                );
            });
        }
    }

    render() {
        return (
            <div className={
                      'ui-table-row'
                    + (this.props.even ? ' ui-table-row-even' : ' ui-table-row-odd')
                    + (this.state.data instanceof Promise ? ' ui-table-row-loading' : '')
                    + (this.props.active ? ' ui-table-row-active' : '')
                 }
                 style={{[transformProp]: 'translate3d(0px, ' + this.props.y + 'px, 0px)'}}
                 onClick={this.handleClick}>
                {this.renderCells()}
            </div>
        );
    }
}

UITableRow.propTypes = {
    columns: React.PropTypes.array,
    even: React.PropTypes.bool,
    data: React.PropTypes.object,
    onCellInteract: React.PropTypes.func,
    onInteract: React.PropTypes.func,
    y: React.PropTypes.number,
};

export default UITableRow;
