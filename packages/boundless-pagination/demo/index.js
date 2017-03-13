/* eslint no-console:0 */

import {createElement, PureComponent} from 'react';
import Pagination from '../';

export default class PaginationDemo extends PureComponent {
    state = {
        items: require('./fixture.json'),
        identifier: 'rolodex1000',
    }

    itemToJSX = (data) => (
        <div
            onFocus={() => console.log('focused id: ' + data.id)}
            onKeyDown={(e) => console.log('pressed ' + e.key + ' on id: ' + data.id)}>
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
    )

    handleItemRequest = (index) => {
        // this might be async if row must be retrieved remotely

        if (index >= 10) {
            return new Promise((resolve) => {
                window.setTimeout((setIndex) => {
                    resolve(this.state.items[setIndex]);
                }, 2000, index);
            });
        }

        return this.state.items[index];
    }

    render() {
        return (
            <Pagination
                className='demo-pagination'
                customControlContent='Your custom content'
                getItem={this.handleItemRequest}
                identifier={this.state.identifier}
                itemToJSXConverter={this.itemToJSX}
                jumpToFirstPageControlContent='⇤'
                jumpToLastPageControlContent='⇥'
                jumpToNextPageControlContent='→'
                jumpToPreviousPageControlContent='←'
                numItemsPerPage={5}
                showPaginationState={true}
                totalItems={this.state.items.length} />
        );
    }
}
