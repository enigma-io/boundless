import UIView from '../UIView';
import UITableCell from './cell';
import React from 'react';

let transformProp = (function detectTransformProperty() {
    let availableProp;
    let props = [
        'transform',
        'WebkitTransform',
        'MozTransform',
        'OTransform',
        'msTransform'
    ];

    for (let i = 0, len = props.length; i < len; i++) {
        if (props[i] in document.body.style) {
            availableProp = props[i];
            break;
        }
    }

    return availableProp;
})();

class UITableRow extends UIView {
    render() {
        return (
            <tr className='ui-table-row'
                style={{[transformProp]: this.props.y ? `translateY(${this.props.y}px)` : null}}>
                {this.renderCells()}
            </tr>
        );
    }

    renderCells() {
        return this.props.columns.map((definition, index) => {
            return (
                <UITableCell key={index}
                             content={this.props.data[definition.mapping]}
                             width={definition.width} />
            );
        });
    }
}

UITableRow.propTypes = {
    columns: React.PropTypes.array,
    data: React.PropTypes.object,
    y: React.PropTypes.number
};

export default UITableRow;
