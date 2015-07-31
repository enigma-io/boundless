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
        let props = this.props;

        classes.push(
            'ui-popover-anchor-x-' + this.getClassAlignmentFragment(props.anchorXAlign),
            'ui-popover-anchor-y-' + this.getClassAlignmentFragment(props.anchorYAlign),
            'ui-popover-self-x-' + this.getClassAlignmentFragment(props.selfXAlign),
            'ui-popover-self-y-' + this.getClassAlignmentFragment(props.selfYAlign)
        );

        return classes.concat(this.props.className || []).join(' ');
    }

    componentDidMount() {
        this.container = document.createElement('div');

        document.body.appendChild(this.container);

        this.node = React.findDOMNode(
            React.render(
                <UIDialog {...this.props}
                          captureFocus={false}
                          className={this.getClasses()}
                          style={{
                              position: 'absolute',
                              top: '0px',
                              left: '0px'
                          }} />
            , this.container)
        );

        window.addEventListener('resize', this.align, true);

        this.align();
    }

    componentDidUpdate() {
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

    getNextXPosition(anchor, dialog) {
        const props = this.props;
        const constants = UIPopover.Constants;

        let nextX = anchor.offsetLeft;

        switch (props.anchorXAlign) {
        case constants.MIDDLE:
            nextX += anchor.offsetWidth / 2;
            break;

        case constants.END:
            nextX += anchor.offsetWidth;
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

        let nextX = this.getNextXPosition(anchor, dialog);
        let nextY = this.getNextYPosition(anchor, dialog);

        // Will we overflow? If so, adjust to prevent that.

        let dialogWidth = dialog.clientWidth;
        let dialogHeight = dialog.clientHeight;
        let xMax = document.body.scrollWidth;
        let yMax = document.body.scrollHeight;

        if (nextX + dialogWidth > xMax) {
            nextX = xMax - dialogWidth;
        } else if (nextY + dialogHeight > yMax) {
            nextY = yMax - dialogHeight;
        }

        this.applyTranslation(dialog, nextX, nextY);
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
