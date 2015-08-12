import UIView from '../UIView';
import Cell from './cell';
import React from 'react';
import transformProp from '../UIUtils/transform';

class UITableRow extends UIView {
    renderCells() {
        return this.props.columns.map((definition, index) => {
            return (
                <Cell key={index}
                      content={this.props.data[definition.mapping]}
                      width={definition.width} />
            );
        });
    }

    render() {
        return (
            <div className='ui-table-row'
                 style={{[transformProp]: this.props.y ? `translate3d(0px, ${this.props.y}px, 0px)` : null}}>
                {this.renderCells()}
            </div>
        );
    }
}

UITableRow.propTypes = {
    columns: React.PropTypes.array,
    data: React.PropTypes.object,
    y: React.PropTypes.number
};

export default UITableRow;
