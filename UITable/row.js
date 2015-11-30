import React from 'react';
import UIView from '../UIView';
import Cell from './cell';
import transformProp from '../UIUtils/transform';

class UITableRow extends UIView {
    constructor(...args) {
        super(...args);

        this.handleClick = this.handleClick.bind(this);
    }

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

    shouldComponentUpdate() {
        return true;
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

    getClasses() {
        let classes = 'ui-table-row';

        if (this.props.even) {
            classes += ' ui-table-row-even';
        } else {
            classes += ' ui-table-row-odd';
        }

        if (this.state.data instanceof Promise) {
            classes += ' ui-table-row-loading';
        }

        if (this.props.active) {
            classes += ' ui-table-row-active';
        }

        return classes;
    }

    renderCells() {
        let data = this.state.data instanceof Promise ? {} : this.state.data;

        if (data) {
            return this.props.columns.map((definition, index) => {
                return (
                    <Cell key={index}
                          content={data[definition.mapping]}
                          width={definition.width}
                          onInteract={this.props.onCellInteract}
                          row={this.state.data} />
                );
            });
        }
    }

    handleClick(event) {
        if (this.props.onInteract) {
            event.persist();
            this.props.onInteract(event, this.state.data);
        }
    }

    render() {
        return (
            <div className={this.getClasses()}
                 style={{
                    [transformProp]:   this.props.y
                                     ? `translate3d(0px, ${this.props.y}px, 0px)`
                                     : null
                 }}
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
