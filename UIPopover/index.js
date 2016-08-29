/**
 * A non-blocking container positioned to a specific anchor element.
 * @class UIPopover
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import omit from 'lodash.omit';
import without from 'lodash.without';
import values from 'lodash.values';

import UIDialog from '../UIDialog';
import transformProp from '../UIUtils/transformProperty';

export default class UIPopover extends React.PureComponent {
    static position = {
        START: 'START',
        MIDDLE: 'MIDDLE',
        END: 'END',
    }

    static positionValues = values(UIPopover.position)

    static preset = {
        'ABOVE': {
            anchorXAlign: UIPopover.position.MIDDLE,
            anchorYAlign: UIPopover.position.START,
            selfXAlign: UIPopover.position.MIDDLE,
            selfYAlign: UIPopover.position.END,
        },
        'BELOW': {
            anchorXAlign: UIPopover.position.MIDDLE,
            anchorYAlign: UIPopover.position.END,
            selfXAlign: UIPopover.position.MIDDLE,
            selfYAlign: UIPopover.position.START,
        },
        'LEFT': {
            anchorXAlign: UIPopover.position.START,
            anchorYAlign: UIPopover.position.MIDDLE,
            selfXAlign: UIPopover.position.END,
            selfYAlign: UIPopover.position.MIDDLE,
        },
        'RIGHT': {
            anchorXAlign: UIPopover.position.END,
            anchorYAlign: UIPopover.position.MIDDLE,
            selfXAlign: UIPopover.position.START,
            selfYAlign: UIPopover.position.MIDDLE,
        },
    }

    static presetValues = values(UIPopover.preset)

    static propTypes = {
        ...UIDialog.propTypes,
        anchor: PropTypes.oneOfType([
            PropTypes.instanceOf(HTMLElement),
            PropTypes.shape({
                props: PropTypes.object,
                state: PropTypes.object,
            }), // a react element of some fashion, PropTypes.element wasn't working
        ]).isRequired,
        anchorXAlign: PropTypes.oneOf(UIPopover.positionValues),
        anchorYAlign: PropTypes.oneOf(UIPopover.positionValues),
        autoReposition: PropTypes.bool,
        caretComponent: PropTypes.element,
        preset: PropTypes.oneOf(UIPopover.presetValues),
        selfXAlign: PropTypes.oneOf(UIPopover.positionValues),
        selfYAlign: PropTypes.oneOf(UIPopover.positionValues),
    }

    static internalKeys = without(Object.keys(UIPopover.propTypes), ...Object.keys(UIDialog.propTypes))

    static defaultProps = {
        ...UIDialog.defaultProps,
        autoReposition: true,
        captureFocus: false,
        caretComponent: (
            <svg viewBox='0 0 14 9.5' xmlns='http://www.w3.org/2000/svg'>
                <g>
                    <polygon className='ui-popover-caret-border' fill='#000' points='7 0 14 10 0 10'></polygon>
                    <polygon className='ui-popover-caret-fill' fill='#FFF' points='6.98230444 1.75 12.75 10 1.25 10'></polygon>
                </g>
            </svg>
        ),
        closeOnEscKey: true,
        closeOnOutsideClick: true,
        closeOnOutsideScroll: true,
        preset: UIPopover.preset.BELOW,
    }

    constructor(props) {
        super();

        this.state = {
            anchorXAlign:   props.anchorXAlign  || props.preset.anchorXAlign,
            anchorYAlign:   props.anchorYAlign  || props.preset.anchorYAlign,
            selfXAlign:     props.selfXAlign    || props.preset.selfXAlign,
            selfYAlign:     props.selfYAlign    || props.preset.selfYAlign,
        };
    }

    updateDialogInternalCache(instance) {
        this.dialog = instance;
        this.$dialog = instance.$dialog;    // used in testing, not relevant
        this.$wrapper = instance.$wrapper;
    }

    componentWillMount() {
        this.$container = document.createElement('div');
        document.body.appendChild(this.$container);

        this.renderDialog();
        this.align();

        window.addEventListener('resize', this.align, true);
    }

    componentDidUpdate = () => {
        /*
            A nuance about this component: since it only renders a simple <div>, the main render() function
            never changes. Therefore, we need to manually call `componentDidUpdate` after `setState` to trigger
            a full re-render of the child dialog.
         */
        this.renderDialog();
        this.align();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.$container);
        document.body.removeChild(this.$container);

        window.removeEventListener('resize', this.align, true);
    }

    cacheViewportCartography(anchor) {
        const anchorRect = anchor.getBoundingClientRect();

        this.anchorLeft = anchorRect.left;
        this.anchorTop = anchorRect.top;
        this.anchorHeight = anchorRect.height;
        this.anchorWidth = anchorRect.width;

        this.bodyLeft = document.body.scrollLeft;
        this.bodyTop = document.body.scrollTop;
    }

    getNextCaretXPosition(anchor, caret = this.$caret) {
        const {anchorXAlign, selfXAlign, anchorYAlign, selfYAlign} = this.state;
        const position = UIPopover.position;

        let nextX = 0;

        // we only want to change the X position when we're
        // fully above or below the anchor and selfXAlign isn't MIDDLE

        if (   selfXAlign !== position.MIDDLE
            && (   anchorYAlign === position.START && selfYAlign === position.END
                || anchorYAlign === position.END && selfYAlign === position.START)) {

            if (anchorXAlign === position.START) {
                nextX += this.anchorWidth / 2 - caret.clientWidth / 2;
            } else if (anchorXAlign === position.END) {
                nextX += this.$wrapper.clientWidth - this.anchorWidth / 2 - caret.clientWidth / 2;
            }
        }

        return nextX;
    }

    getNextCaretYPosition(anchor, caret = this.$caret) {
        const {anchorXAlign, selfXAlign, anchorYAlign, selfYAlign} = this.state;
        const position = UIPopover.position;

        let nextY = 0;

        // we only want to change the Y position when we're
        // fully to the left or right of the anchor (start,end | end,start)
        // selfYAlign isn't MIDDLE

        if (   selfYAlign !== position.MIDDLE
            && (   anchorXAlign === position.START && selfXAlign === position.END
                || anchorXAlign === position.END && selfXAlign === position.START)) {

            if (anchorYAlign === position.START) {
                nextY += this.anchorHeight / 2 - caret.clientWidth / 2;
            } else if (anchorYAlign === position.END) {
                nextY += this.$wrapper.clientHeight - this.anchorWidth / 2 - caret.clientWidth / 2;
            }
        }

        return nextY;
    }

    getNextDialogXPosition(anchor, dialog = this.$wrapper) {
        const {anchorXAlign, selfXAlign} = this.state;
        const position = UIPopover.position;

        let nextX = this.anchorLeft + this.bodyLeft;

        switch (anchorXAlign) {
        case position.MIDDLE:
            nextX += this.anchorWidth / 2;
            break;

        case position.END:
            nextX += this.anchorWidth;
            break;
        }

        switch (selfXAlign) {
        case position.MIDDLE:
            nextX -= dialog.clientWidth / 2;
            break;

        case position.END:
            nextX -= dialog.clientWidth;
            break;
        }

        return nextX;
    }

    getNextDialogYPosition(anchor, dialog = this.$wrapper) {
        const state = this.state;
        const position = UIPopover.position;
        const anchorY = this.anchorTop + this.bodyTop;

        let nextY = anchorY + this.anchorHeight;

        switch (state.anchorYAlign) {
        case position.START:
            nextY = anchorY;
            break;

        case position.MIDDLE:
            nextY = anchorY + this.anchorHeight / 2;
            break;
        }

        switch (state.selfYAlign) {
        case position.MIDDLE:
            nextY -= dialog.clientHeight / 2;
            break;

        case position.END:
            nextY -= dialog.clientHeight;
            break;
        }

        return nextY;
    }

    getAlignmentCorrectionIfOverflowing(x, y) {
        if (!this.props.autoReposition) {
            return false;
        }

        const corrections = {...this.state};
        const position = UIPopover.position;

        const width = this.$wrapper.clientWidth;
        const height = this.$wrapper.clientHeight;
        const xMax = document.body.scrollWidth;
        const yMax = document.body.scrollHeight;

        if (x + width > xMax) { // overflowing off to the right
            corrections.anchorXAlign = position.START;
            corrections.selfXAlign = position.END;
        }

        if (x < 0) { // overflowing off to the left
            corrections.anchorXAlign = position.END;
            corrections.selfXAlign = position.START;
        }

        if (y + height > yMax) { // overflowing below
            // if left/right
            if (   (corrections.anchorXAlign === position.START && corrections.selfXAlign === position.END)
                || (corrections.anchorXAlign === position.END && corrections.selfXAlign === position.START)) {
                corrections.anchorYAlign = position.END;
            } else {
                corrections.anchorYAlign = position.START;
            }

            corrections.selfYAlign = position.END;
        }

        if (y < 0) { // overflowing above
            // if left/right
            if (   (corrections.anchorXAlign === position.START && corrections.selfXAlign === position.END)
                || (corrections.anchorXAlign === position.END && corrections.selfXAlign === position.START)) {
                corrections.anchorYAlign = position.START;
            } else {
                corrections.anchorYAlign = position.END;
            }

            corrections.selfYAlign = position.START;
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

    didAlignmentChange(nextAlignment, currentAlignment = this.state) {
        return    nextAlignment.anchorXAlign !== currentAlignment.anchorXAlign
               || nextAlignment.anchorYAlign !== currentAlignment.anchorYAlign
               || nextAlignment.selfXAlign !== currentAlignment.selfXAlign
               || nextAlignment.selfYAlign !== currentAlignment.selfYAlign;
    }

    align = () => {
        const anchor =   this.props.anchor instanceof HTMLElement
                       ? this.props.anchor
                       : ReactDOM.findDOMNode(this.props.anchor);

        this.cacheViewportCartography(anchor);

        const dx = Math.round(this.getNextDialogXPosition(anchor));
        const dy = Math.round(this.getNextDialogYPosition(anchor));

        const alignmentCorrection = this.getAlignmentCorrectionIfOverflowing(dx, dy);

        if (alignmentCorrection && this.didAlignmentChange(alignmentCorrection)) {
            return this.setState(alignmentCorrection, this.componentDidUpdate);
        }

        // the caret is initially positioned at 0,0 inside the dialog
        // which is already positioned at the anchor, so we just need to
        // make small adjustments as necessary to line up the caret
        // with the visual center of the anchor

        this.$caret.style.left = Math.round(this.getNextCaretXPosition(anchor)) + 'px';
        this.$caret.style.top = Math.round(this.getNextCaretYPosition(anchor)) + 'px';

        this.applyTranslation(this.$caret, cx, 0);
        this.applyTranslation(this.$wrapper, dx, dy);
    }

    getClassAlignmentFragment(constant) {
        const position = UIPopover.position;

        switch (constant) {
        case position.START:
            return 'start';

        case position.MIDDLE:
            return 'middle';

        case position.END:
            return 'end';
        }
    }

    renderDialog() {
        const state = this.state;
        const getFrag = this.getClassAlignmentFragment;

        this.updateDialogInternalCache(
            ReactDOM.render(
                <UIDialog
                    {...omit(this.props, UIPopover.internalKeys)}
                    before={
                        React.cloneElement(this.props.caretComponent, {
                            ref: (node) => (this.$caret = node),
                            className: cx({
                                'ui-popover-caret': true,
                                [this.props.caretComponent.props.className]: !!this.props.caretComponent.props.className,
                            }),
                        })
                    }
                    wrapperProps={{
                        className: cx({
                            'ui-popover': true,
                            [`ui-popover-anchor-x-${getFrag(state.anchorXAlign)}`]: true,
                            [`ui-popover-anchor-y-${getFrag(state.anchorYAlign)}`]: true,
                            [`ui-popover-self-x-${getFrag(state.selfXAlign)}`]: true,
                            [`ui-popover-self-y-${getFrag(state.selfYAlign)}`]: true,
                            [this.props.className]: !!this.props.className,
                        }),
                    }} />
            , this.$container)
        );
    }

    render() {
        return (<div />);
    }
}
