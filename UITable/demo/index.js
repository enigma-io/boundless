import UITable from '../index';
import UISegmentedControl from '../../UISegmentedControl';
import UIView from '../../UIView';
import React from 'react';

const json = require('./fixture.json');
const json2 = require('./fixture.columnar.json');

export default class UITableDemo extends UIView {
    initialState() {
        return {
            options: [{
                columns: [{
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
                getRow: index => {
                    if (index > 800) {
                        return new Promise((resolve) => {
                            window.setTimeout((setIndex) => {
                                resolve(json[setIndex]);
                            }, 2000, index);
                        });
                    }

                    return json[index];
                },
                content: 'Normal Example',
                value: 'normal',
                selected: true,
            }, {
                columns: Object.keys(json2.result[0]).map(key => {
                    return {title: key, mapping: key, resizable: true}
                }),
                rows: json2.result,
                totalRows: json2.info.rows_limit,
                getRow: index => json2.result[index],
                content: 'Many Column Example',
                value: 'columnar',
                selected: false,
            }],
        };
    }

    handleCellClick(event, rowIndex, columnName) {
        const source = this.state.options.find(option => option.selected);

        console.debug(`clicked ${source.rows[rowIndex][columnName]} (${columnName}), in:`, source.rows[rowIndex]);
    }

    handleRowClick(event, rowIndex) {
        const source = this.state.options.find(option => option.selected);

        console.debug('clicked the row containing', source.rows[rowIndex]);
    }

    handleOptionSelected(value) {
        this.setState({
            options: this.state.options.map(option => {
                return {
                    ...option,
                    selected: option.value === value,
                };
            })
        });
    }

    render() {
        const source = this.state.options.find(option => option.selected);

        return (
            <div>
                <UISegmentedControl options={this.state.options}
                                    onOptionSelected={this.handleOptionSelected.bind(this)} />
                <br />
                <UITable identifier={source.value}
                         columns={source.columns}
                         totalRows={source.totalRows}
                         getRow={source.getRow}
                         onCellInteract={this.handleCellClick.bind(this)}
                         onRowInteract={this.handleRowClick.bind(this)} />
            </div>
        );
    }
}
