import UITable from '../index';
import UIView from '../../UIView';
import React from 'react';

export default class UITableDemo extends UIView {
    initialState() {
        return {
            columns: [{
                title: 'First Name',
                mapping: 'first_name',
                resizable: true,
            }, {
                title: 'Last Name',
                mapping: 'last_name',
                resizable: true,
            }, {
                defaultWidth: 100,
                title: 'Job Title',
                mapping: 'job_title',
                resizable: true,
            }, {
                title: 'Phone',
                mapping: 'phone',
                resizable: true,
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
            rows: [],
        };
    }

    componentDidMount() {
        // fetch data
        let xhr = new XMLHttpRequest();

        xhr.open('GET', './UITable/demo/fixture.json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4
                && xhr.status > 199
                && xhr.status < 399) {
                this.setState({
                    rows: JSON.parse(xhr.responseText),
                });
            }
        };

        xhr.send();
    }

    handleRowRequest(index) {
        // this might be async if row must be retrieved remotely

        if (index > 800) {
            return new Promise((resolve) => {
                window.setTimeout((setIndex) => {
                    resolve(this.state.rows[setIndex]);
                }, 2000, index);
            });
        }

        return this.state.rows[index];
    }

    handleCellClick(event, rowData, cellData) {
        console.debug('clicked the cell containing', cellData);
    }

    handleRowClick(event, rowData) {
        console.debug('clicked the row containing', rowData);
    }

    render() {
        if (this.state.rows.length) {
            return (
                <UITable columns={this.state.columns}
                         totalRows={this.state.rows.length}
                         getRow={this.handleRowRequest.bind(this)}
                         onCellInteract={this.handleCellClick}
                         onRowInteract={this.handleRowClick} />
            );
        }

        return null;
    }
}
