import UIView from '../UIView';
import Cell from './cell';
import React from 'react';
import transformProp from '../UIUtils/transform';

class UITableRow extends UIView {
    getClasses() {
        let classes = ['ui-table-row'];

        if (this.props.even) {
            classes.push('ui-table-row-even');
        } else {
            classes.push('ui-table-row-odd');
        }

        return classes.join(' ');
    }

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
            <div className={this.getClasses()}
                 style={{[transformProp]: this.props.y ? `translate3d(0px, ${this.props.y}px, 0px)` : null}}>
                {this.renderCells()}
            </div>
        );
    }
}

UITableRow.propTypes = {
    columns: React.PropTypes.array,
    even: React.PropTypes.bool,
    data: React.PropTypes.object,
    y: React.PropTypes.number
};

export default UITableRow;
