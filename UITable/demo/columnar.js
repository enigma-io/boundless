import UITable from '../index';
import UIView from '../../UIView';
import React from 'react';

const json = require('./fixture.columnar.json');

export default class UITableColumnarDemo extends UIView {
    initialState() {
        return {
            columns: Object.keys(json.result[0]).map(key => {
                return {title: key, mapping: key, resizable: true}
            }),
            rows: json.result,
            totalRows: json.info.rows_limit,
        };
    }

    handleRowRequest(index) {
        return this.state.rows[index];
    }

    render() {
        if (this.state.rows.length) {
            return (
                <UITable columns={this.state.columns}
                         totalRows={this.state.rows.length}
                         getRow={this.handleRowRequest.bind(this)} />
            );
        }

        return null;
    }
}
