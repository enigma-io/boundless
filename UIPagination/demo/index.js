import React from 'react';
import UIPagination from '../index';

export default class UIPaginationDemo extends React.PureComponent {
    state = {
        items: require('./fixture.json'),
        identifier: 'rolodex1000',
    }

    itemToJSX = (data) => {
        return (
            <div>
                <div className='card-left'>
                    <strong>{data.first_name} {data.last_name}</strong><br/>
                    <em>{data.job_title}</em>
                </div>
                <div className='card-right'>
                    {data.address1}<br/>
                    {data.city}, {data.country}<br/>
                    <strong>p:</strong> {data.phone}<br/>
                    <strong>e:</strong> {data.email}
                </div>
            </div>
        );
    }

    handleItemRequest = (index) => {
        // this might be async if row must be retrieved remotely

        if (index >= 30) {
            return new Promise(resolve => {
                window.setTimeout(setIndex => {
                    resolve(this.state.items[setIndex]);
                }, 2000, index);
            });
        }

        return this.state.items[index];
    }

    render() {
        return (
            <UIPagination
                customControlContent='Your custom content'
                getItem={this.handleItemRequest}
                identifier={this.state.identifier}
                itemToJSXConverterFunc={this.itemToJSX}
                numItemsPerPage={5}
                showPaginationState={true}
                totalItems={this.state.items.length} />
        );
    }
}
