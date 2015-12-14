import React from 'react';
import UIView from '../UIView';

class UITableCell extends UIView {
    constructor(...args) {
        super(...args);

        this.handleClick = this.handleClick.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return    nextProps.content !== this.props.content
               || nextProps.width !== this.props.width
               || nextProps.row !== this.props.row;
    }

    handleClick(event) {
        if (this.props.onInteract) {
            event.persist();
            this.props.onInteract(event, this.props.row, this.props.content);
        }
    }

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
        return (
            <div className='ui-table-cell'
                 title={typeof this.props.content === 'string' ? this.props.content : null}
                 style={{width: this.props.width ? this.props.width + 'px' : null}}
                 onClick={this.handleClick}>
                {this.renderContent()}
            </div>
        );
    }
}

UITableCell.propTypes = {
    content: React.PropTypes.node,
    width: React.PropTypes.number,
    onInteract: React.PropTypes.func,
    row: React.PropTypes.object,
};

export default UITableCell;
