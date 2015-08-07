import UIView from '../UIView';
import React from 'react';

class UITableCell extends UIView {
    render() {
        return (
            <td className='ui-table-cell'
                style={{width: this.props.width ? this.props.width + 'px' : null}}>
                {this.renderContent()}
            </td>
        );
    }

    renderContent() {
        if (!isNaN(this.props.width)) {
            return (
                <div className='ui-table-cell-inner'>
                    <span className='ui-table-cell-inner-text'>{this.props.content}</span>
                </div>
            );
        }

        return this.props.content;
    }
}

UITableCell.propTypes = {
    content: React.PropTypes.node,
    width: React.PropTypes.number
};

export default UITableCell;
