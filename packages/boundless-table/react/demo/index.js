import React from 'react';
import UIPopover from '../../UIPopover';
import UITable from '../index';
import UISegmentedControl from '../../UISegmentedControl';

const json = require('./fixture.json');
const json2 = require('./fixture.columnar.json');

export default class UITableDemo extends React.PureComponent {
    // if we pre-bind with arrow syntax, the function needs to be placed above the state = {} declaration
    // due to allocation order and use of `spawnIDColumnPopover` inside the column definition
    spawnIDColumnPopover = (event) => this.setState({idPopoverAnchor: event.target})
    // the alternative would be to do a `setState()` in cWM with the initial state
    // instead of ahead of time

    state = {
        options: [{
            id: 'table_a',
            content: 'Normal Example',
            value: 'normal',
            selected: true,
        }, {
            id: 'table_b',
            content: 'Many Column Example',
            value: 'columnar',
            selected: false,
        }],
        table_a: {
            columns: [{
                children: [{
                    children: '📤',
                    className: 'table-demo-popover-toggle',
                    onclick: this.spawnIDColumnPopover,
                }],
                title: 'ID',
                mapping: 'id',
                resizable: true,
            }, {
                title: 'First Name',
                mapping: 'first_name',
                resizable: true,
            }, {
                title: 'Last Name',
                mapping: 'last_name',
                resizable: true,
            }, {
                title: 'Job Title',
                mapping: 'job_title',
                resizable: true,
                width: 100,
            }, {
                title: 'Phone',
                mapping: 'phone',
                resizable: false,
            }, {
                title: 'Email Address',
                mapping: 'email',
                resizable: true,
            }, {
                title: 'Street Address',
                mapping: 'address1',
                resizable: true,
            }, {
                title: 'City',
                mapping: 'city',
                resizable: true,
            }, {
                title: 'Country',
                mapping: 'country',
                resizable: true,
            }, {
                title: 'Country Code',
                mapping: 'country_code',
                resizable: true,
            }],
            rows: json,
            totalRows: json.length,
            getRow: (index) => {
                if (index > 800) {
                    return new Promise((resolve) => {
                        window.setTimeout((setIndex) => {
                            resolve(json[setIndex]);
                        }, 2000, index);
                    });
                }

                return json[index];
            },
        },
        table_b: {
            columns: Object.keys(json2.result[0]).map((key) => {
                return {title: key, mapping: key, resizable: true};
            }),
            rows: json2.result,
            totalRows: json2.info.rows_limit,
            getRow: (index) => json2.result[index],
        },
        jumpToRowIndex: 0,
        idPopoverAnchor: null,
    }

    despawnIDColumnPopover = () => this.setState({idPopoverAnchor: null})

    handleChange = (event) => {
        this.setState({jumpToRowIndex: event.target.value ? parseInt(event.target.value, 10) - 1 : null});
    }

    getCurrentTable() {
        return this.state[this.state.options.find((option) => option.selected).id];
    }

    handleCellClick = (event, rowIndex, columnName) => {
        const source = this.getCurrentTable();

        // eslint-disable-next-line no-console
        console.debug(`clicked ${source.rows[rowIndex][columnName]} (${columnName}), in:`, source.rows[rowIndex]);
    }

    handleRowClick = (event, rowIndex) => {
        const source = this.getCurrentTable();

        // eslint-disable-next-line no-console
        console.debug('clicked the row containing', source.rows[rowIndex]);
    }

    handleOptionSelected = (value) => {
        this.setState({
            options: this.state.options.map((option) => {
                return {
                    ...option,
                    selected: option.value === value,
                };
            }),
        });
    }

    handleColumnResize = (mapping, width) => {
        const tableId = this.state.options.find((option) => option.selected).id;
        const source = this.state[tableId];

        const columns = source.columns.map((column) => {
            return column.mapping === mapping ? {...column, width} : column;
        });

        this.setState({ [tableId]: {...this.state[tableId], columns} });
    }

    maybeRenderIDPopover() {
        if (this.state.idPopoverAnchor) {
            return (
                <UIPopover
                    anchor={this.state.idPopoverAnchor}
                    onClose={this.despawnIDColumnPopover}>
                    Something something.
                </UIPopover>
            );
        }
    }

    render() {
        const source = this.getCurrentTable();

        return (
            <div>
                <p>
                    <label>
                        Jump to row&nbsp;&nbsp;
                        <input type='number'
                               onChange={this.handleChange}
                               defaultValue={1}
                               max={source.totalRows}
                               min={1} />
                        &nbsp;&nbsp;<small>(performs a full re-render)</small>
                    </label>
                </p>

                <UISegmentedControl options={this.state.options}
                                    onOptionSelected={this.handleOptionSelected} />
                <br />
                <UITable
                    identifier={source.value}
                    columns={source.columns}
                    totalRows={source.totalRows}
                    jumpToRowIndex={this.state.jumpToRowIndex}
                    getRow={source.getRow}
                    onCellInteract={this.handleCellClick}
                    onRowInteract={this.handleRowClick}
                    onColumnResize={this.handleColumnResize} />

                {this.maybeRenderIDPopover()}
            </div>
        );
    }
}
