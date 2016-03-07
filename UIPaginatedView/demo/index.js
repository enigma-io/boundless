import React from 'react';
import UIPaginatedView from '../index';
import UIView from '../../UIView';

const json = require('../../UITable/demo/fixture.json');

export default class UIPaginatedViewDemo extends UIView {
    state = {
        items: json,
        identifier: 'rolodex1000',
    }

    handleItemRequest = (index) => {
        // this might be async if row must be retrieved remotely

        if (index >= 30) {
            return new Promise(resolve => {
                window.setTimeout(setIndex => {
                    resolve(this.itemToJsx(this.state.items[setIndex]));
                }, 2000, index);
            });
        }

        return this.itemToJsx(this.state.items[index])
    }

    itemToJsx(data) {
        return (
            <div>
                <div className="card-left">
                    <strong>{data.first_name} {data.last_name}</strong><br/>
                    <em>{data.job_title}</em>
                </div>
                <div className="card-right">
                    {data.address1}<br/>
                    {data.city}, {data.country}<br/>
                    <strong>p:</strong> {data.phone}<br/>
                    <strong>e:</strong> {data.email}
                </div>
            </div>
        );
    }

    render() {
        if (this.state.items.length) {
            return (
                <div>
                    <UIPaginatedView
                        getItem={this.handleItemRequest}
                        identifier={this.state.identifier}
                        numItemsPerPage={5}
                        totalItems={this.state.items.length} />
                </div>
            );
        }

        return null;
    }
}
