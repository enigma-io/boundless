import UIDialog from '../UIDialog';
import UIView from '../UIView';
import React from 'react';

let transformProp = (function detectTransformProperty() {
    let availableProp;
    let props = [
        'transform',
        'webkitTransform',
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

class UIPopover extends UIView {
    constructor(...args) {
        super(...args);

        this.align = this.align.bind(this);
    }

    initialState() {
        return {
            anchorXAlign: this.props.anchorXAlign,
            anchorYAlign: this.props.anchorYAlign,
            selfXAlign: this.props.selfXAlign,
            selfYAlign: this.props.selfYAlign
        };
    }

    getAnchorNode() {
        return this.props.anchor instanceof HTMLElement ? this.props.anchor : React.findDOMNode(this.props.anchor);
    }

    getClassAlignmentFragment(constant) {
        let constants = UIPopover.Constants;

        switch (constant) {
        case constants.START:
            return 'start';

        case constants.MIDDLE:
            return 'middle';

        case constants.END:
            return 'end';
        }
    }

    getClasses() {
        let classes = ['ui-popover'];
        let state = this.state;

        classes.push(
            'ui-popover-anchor-x-' + this.getClassAlignmentFragment(state.anchorXAlign),
            'ui-popover-anchor-y-' + this.getClassAlignmentFragment(state.anchorYAlign),
            'ui-popover-self-x-' + this.getClassAlignmentFragment(state.selfXAlign),
            'ui-popover-self-y-' + this.getClassAlignmentFragment(state.selfYAlign)
        );

        return classes.concat(this.props.className || []).join(' ');
    }

    componentDidMount() {
        this.container = document.createElement('div');

        document.body.appendChild(this.container);

        this.node = React.findDOMNode(this.renderDialog());

        window.addEventListener('resize', this.align, true);

        this.align();
    }

    componentDidUpdate() {
        this.renderDialog();
        this.align();
    }

    componentWillUnmount() {
        React.unmountComponentAtNode(this.container);
        document.body.removeChild(this.container);
        window.removeEventListener('resize', this.align, true);
    }

    render() {
        return (
            <div />
        );
    }

    renderDialog() {
        return React.render(
            <UIDialog {...this.props}
                      captureFocus={false}
                      className={this.getClasses()}
                      style={{
                          position: 'absolute',
                          top: '0px',
                          left: '0px'
                      }} />
        , this.container);
    }

    getNextXPosition(anchor, dialog) {
        const state = this.state;
        const constants = UIPopover.Constants;

        let nextX = anchor.getBoundingClientRect().left + document.body.scrollLeft;

        switch (state.anchorXAlign) {
        case constants.MIDDLE:
            nextX += anchor.offsetWidth / 2;
            break;

        case constants.END:
            nextX += anchor.offsetWidth;
            break;
        }

        switch (state.selfXAlign) {
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
        const state = this.state;
        const constants = UIPopover.Constants;

        let anchorY = anchor.getBoundingClientRect().top + document.body.scrollTop;
        let anchorHeight = anchor.offsetHeight;
        let nextY = anchorY + anchorHeight;

        switch (state.anchorYAlign) {
        case constants.START:
            nextY = anchorY;
            break;

        case constants.MIDDLE:
            nextY = anchorY + anchorHeight / 2;
            break;
        }

        switch (state.selfYAlign) {
        case constants.MIDDLE:
            nextY -= dialog.clientHeight / 2;
            break;

        case constants.END:
            nextY -= dialog.clientHeight;
            break;
        }

        return nextY;
    }

    getAlignmentCorrectionIfOverflowing(node, x, y) {
        if (!this.props.autoReposition) {
            return false;
        }

        let corrections = {};

        let width = node.clientWidth;
        let height = node.clientHeight;
        let xMax = document.body.scrollWidth;
        let yMax = document.body.scrollHeight;

        if (x + width > xMax) { // overflowing off to the right
            corrections.anchorXAlign = UIPopover.Constants.END;
            corrections.selfXAlign = UIPopover.Constants.END;
        } else if (x < 0) { // overflowing off to the left
            corrections.anchorXAlign = UIPopover.Constants.START;
            corrections.selfXAlign = UIPopover.Constants.START;
        } else if (y + height > yMax) { // overflowing below
            corrections.anchorYAlign = UIPopover.Constants.START;
            corrections.selfYAlign = UIPopover.Constants.END;
        } else if (y < 0) { // overflowing above
            corrections.anchorYAlign = UIPopover.Constants.END;
            corrections.selfYAlign = UIPopover.Constants.START;
        }

        return corrections;
    }

    applyTranslation(node, x, y) {
        if (transformProp) {
            node.style[transformProp] = `translate(${x}px, ${y}px)`;
        } else {
            node.style.left = x + 'px';
            node.style.top = y + 'px';
        }
    }

    align() {
        const anchor = this.getAnchorNode();
        const dialog = this.node;

        let x = this.getNextXPosition(anchor, dialog);
        let y = this.getNextYPosition(anchor, dialog);

        let alignmentCorrection = this.getAlignmentCorrectionIfOverflowing(dialog, x, y);

        if (alignmentCorrection && Object.keys(alignmentCorrection).length) {
            this.setState(alignmentCorrection);
        } else {
            this.applyTranslation(dialog, x, y);
        }
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
        React.PropTypes.shape({
            props: React.PropTypes.object,
            state: React.PropTypes.object
        }) // a react element of some fashion, React.PropTypes.element wasn't working
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
    autoReposition: React.PropTypes.bool,
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
    autoReposition: true,
    selfXAlign: UIPopover.Constants.START,
    selfYAlign: UIPopover.Constants.START
};

export default UIPopover;
