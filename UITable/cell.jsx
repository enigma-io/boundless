import UIView from '../UIView';
import React from 'react';

class UITableCell extends UIView {
    renderContent() {
        if (typeof this.props.width === 'number') {
            return (
                <div className='ui-table-cell-inner'>
                    <span className='ui-table-cell-inner-text'>{this.props.content}</span>
                </div>
            );
        }

        return this.props.content;
    }

    render() {
        let addTitle = typeof this.props.content === 'string';

        return (
            <div className='ui-table-cell'
                 title={addTitle ? this.props.content : null}
                 style={{width: this.props.width ? this.props.width + 'px' : null}}>
                {this.renderContent()}
            </div>
        );
    }
}

UITableCell.propTypes = {
    content: React.PropTypes.node,
    width: React.PropTypes.number
};

export default UITableCell;
