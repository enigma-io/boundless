import UIView from '../UIView';
import Cell from './cell';
import React from 'react';
import transformProp from '../UIUtils/transform';

class UITableRow extends UIView {
    initialState() {
        return {
            data: this.props.data
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                data: nextProps.data
            });
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

        return classes;
    }

    renderCells() {
        let data = this.state.data instanceof Promise ? {} : this.state.data;

        return this.props.columns.map((definition, index) => {
            return (
                <Cell key={index}
                      content={data[definition.mapping]}
                      header={this.props.header}
                      resizable={definition.resizable}
                      resizeFunc={this.props.resizeFunc}
                      width={definition.width} />
            );
        });
    }

    render() {
        return (
            <div className={this.getClasses()}
                 style={{[transformProp]: this.props.y ? `translate3d(0px, ${this.props.y}px, 0px)` : null}}>
                {this.renderCells()}
            </div>
        );
    }
}

UITableRow.propTypes = {
    columns: React.PropTypes.array,
    even: React.PropTypes.bool,
    data: React.PropTypes.object,
    header: React.PropTypes.bool,
    resizeFunc: React.PropTypes.func,
    y: React.PropTypes.number
};

export default UITableRow;
