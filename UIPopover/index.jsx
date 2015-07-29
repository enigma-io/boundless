import UIDialog from '../UIDialog';
import UIView from '../UIView';
import React from 'react';

class UIPopover extends UIView {
    constructor(...args) {
        super(...args);

        this.align = this.align.bind(this);
    }

    getClasses() {
        return ['ui-popover'].concat(this.props.className || []).join(' ');
    }

    componentDidMount() {
        this.node = document.createElement('div');

        document.body.appendChild(this.node);

        const anchor = this.getAnchorNode();

        React.render(
            <UIDialog {...this.props}
                      className={this.getClasses()}
                      style={{
                          position: 'absolute',
                          top: anchor.offsetTop + 'px',
                          left: anchor.offsetLeft + 'px'
                      }} />
        , this.node);

        window.addEventListener('resize', this.align, true);

        this.align();
    }

    componentDidUpdate() {
        this.align();
    }

    componentWillUnmount() {
        React.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
        window.removeEventListener('resize', this.align, true);
    }

    render() {
        return (
            <div />
        );
    }

    getAnchorNode() {
        return this.props.anchor instanceof HTMLElement ? this.props.anchor : React.findDOMNode(this.props.anchor);
    }

    getNextXPosition(anchor, dialog) {
        const props = this.props;
        const constants = UIPopover.Constants;

        let nextX = anchor.offsetLeft;

        switch (props.anchorXAlign) {
        case constants.MIDDLE:
            nextX += anchor.clientWidth / 2;
            break;

        case constants.END:
            nextX += anchor.clientWidth;
            break;
        }

        switch (props.selfXAlign) {
        case constants.MIDDLE:
            nextX -= dialog.clientWidth / 2;
            break;

        case constants.END:
            nextX -= dialog.clientWidth;
            break;
        }

        return nextX;
    }

    getNextYPosition(anchor, dialog) {
        const props = this.props;
        const constants = UIPopover.Constants;

        let anchorY = anchor.offsetTop;
        let anchorHeight = anchor.offsetHeight;
        let nextY = anchorY + anchorHeight;

        switch (props.anchorYAlign) {
        case constants.START:
            nextY = anchorY;
            break;

        case constants.MIDDLE:
            nextY = anchorY + anchorHeight / 2;
            break;
        }

        switch (props.selfYAlign) {
        case constants.MIDDLE:
            nextY -= dialog.clientHeight / 2;
            break;

        case constants.END:
            nextY -= dialog.clientHeight;
            break;
        }

        return nextY;
    }

    align() {
        const anchor = this.getAnchorNode();
        const dialog = this.node.children[0];

        let nextX = this.getNextXPosition(anchor, dialog);
        let nextY = this.getNextYPosition(anchor, dialog);

        // Will we overflow? If so, adjust to prevent that.

        let dialogHeight = dialog.clientWidth;
        let dialogWidth = dialog.clientHeight;
        let xMax = document.body.scrollWidth;
        let yMax = document.body.scrollHeight;

        if (nextX + dialogWidth > xMax) {
            nextX = xMax - dialogWidth;
        } else if (nextY + dialogHeight > yMax) {
            nextY = yMax - dialogHeight;
        }

        dialog.style.left = nextX + 'px';
        dialog.style.top = nextY + 'px';
    }
}

UIPopover.Constants = {
    START: 'START',
    MIDDLE: 'MIDDLE',
    END: 'END'
};

UIPopover.propTypes = {
    anchor: React.PropTypes.oneOfType([
        React.PropTypes.instanceOf(HTMLElement),
        React.PropTypes.element
    ]).isRequired,
    anchorXAlign: React.PropTypes.oneOf([
        UIPopover.Constants.START,
        UIPopover.Constants.MIDDLE,
        UIPopover.Constants.END
    ]),
    anchorYAlign: React.PropTypes.oneOf([
        UIPopover.Constants.START,
        UIPopover.Constants.MIDDLE,
        UIPopover.Constants.END
    ]),
    body: React.PropTypes.node,
    bodyAttributes: React.PropTypes.object,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    closeOnEscKey: React.PropTypes.bool,
    closeOnOutsideClick: React.PropTypes.bool,
    footer: React.PropTypes.node,
    footerAttributes: React.PropTypes.object,
    header: React.PropTypes.node,
    headerAttributes: React.PropTypes.object,
    onClose: React.PropTypes.func,
    selfXAlign: React.PropTypes.oneOf([
        UIPopover.Constants.START,
        UIPopover.Constants.MIDDLE,
        UIPopover.Constants.END
    ]),
    selfYAlign: React.PropTypes.oneOf([
        UIPopover.Constants.START,
        UIPopover.Constants.MIDDLE,
        UIPopover.Constants.END
    ])
};

UIPopover.defaultProps = {
    anchorXAlign: UIPopover.Constants.START,
    anchorYAlign: UIPopover.Constants.END,
    selfXAlign: UIPopover.Constants.START,
    selfYAlign: UIPopover.Constants.START
};

export default UIPopover;
