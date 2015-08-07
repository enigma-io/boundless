import UITable from '../index.jsx';
import UIView from '../../UIView';
import React from 'react';

export default class UITableDemo extends UIView {
    initialState() {
        return {
            columns: [{
                title: 'First Name',
                mapping: 'first_name',
                resizable: true
            }, {
                title: 'Last Name',
                mapping: 'last_name',
                resizable: true
            }, {
                defaultWidth: 100,
                title: 'Job Title',
                mapping: 'job_title',
                resizable: true
            }, {
                title: 'Phone',
                mapping: 'phone',
                resizable: true
            }, {
                title: 'Email Address',
                mapping: 'email',
                resizable: true
            }, {
                title: 'Street Address',
                mapping: 'address1',
                resizable: true
            }, {
                title: 'City',
                mapping: 'city',
                resizable: true
            }, {
                title: 'Country',
                mapping: 'country',
                resizable: true
            }, {
                title: 'Country Code',
                mapping: 'country_code',
                resizable: true
            }],
            rows: []
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
                    rows: JSON.parse(xhr.responseText)
                });
            }
        };

        xhr.send();
    }

    render() {
        return (
            <UITable columns={this.state.columns}
                     rows={this.state.rows} />
        );
    }
}
