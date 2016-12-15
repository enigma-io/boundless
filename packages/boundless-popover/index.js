import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';

import Dialog from '../boundless-dialog/index';
import Portal from '../boundless-portal/index';
import omit from '../boundless-utils-omit-keys/index';
import transformProp from '../boundless-utils-transform-property/index';

function without(arr1, arr2) { return arr1.filter((item) => arr2.indexOf(item) === -1); }
function values(obj)         { return Object.keys(obj).map((key) => obj[key]); }

const DEFAULT_CARET_COMPONENT = (
    <svg viewBox='0 0 14 9.5' xmlns='http://www.w3.org/2000/svg'>
        <g>
            <polygon className='b-popover-caret-border' fill='#000' points='7 0 14 10 0 10' />
            <polygon className='b-popover-caret-fill' fill='#FFF' points='6.98230444 1.75 12.75 10 1.25 10' />
        </g>
    </svg>
);

/**
 * A non-blocking container positioned to a specific anchor element.
 */
export default class Popover extends React.PureComponent {
    static position = {
        START: 'START',
        MIDDLE: 'MIDDLE',
        END: 'END',
    }

    static positionValues = values(Popover.position)

    static preset = {
        'ABOVE': {
            anchorXAlign: Popover.position.MIDDLE,
            anchorYAlign: Popover.position.START,
            selfXAlign: Popover.position.MIDDLE,
            selfYAlign: Popover.position.END,
        },
        'BELOW': {
            anchorXAlign: Popover.position.MIDDLE,
            anchorYAlign: Popover.position.END,
            selfXAlign: Popover.position.MIDDLE,
            selfYAlign: Popover.position.START,
        },
        'LEFT': {
            anchorXAlign: Popover.position.START,
            anchorYAlign: Popover.position.MIDDLE,
            selfXAlign: Popover.position.END,
            selfYAlign: Popover.position.MIDDLE,
        },
        'RIGHT': {
            anchorXAlign: Popover.position.END,
            anchorYAlign: Popover.position.MIDDLE,
            selfXAlign: Popover.position.START,
            selfYAlign: Popover.position.MIDDLE,
        },
    }

    static presetValues = values(Popover.preset)

    static propTypes = {
        ...Dialog.propTypes,
        anchor: PropTypes.oneOfType([
            PropTypes.instanceOf(HTMLElement),
            PropTypes.shape({
                props: PropTypes.object,
                state: PropTypes.object,
            }), // a react element of some fashion, PropTypes.element wasn't working
        ]).isRequired,
        anchorXAlign: PropTypes.oneOf(Popover.positionValues),
        anchorYAlign: PropTypes.oneOf(Popover.positionValues),
        autoReposition: PropTypes.bool,
        caretComponent: PropTypes.element,
        portalProps: PropTypes.object,
        preset: PropTypes.oneOf(Popover.presetValues),
        selfXAlign: PropTypes.oneOf(Popover.positionValues),
        selfYAlign: PropTypes.oneOf(Popover.positionValues),
        wrapperProps: PropTypes.object,
    }

    static defaultProps = {
        ...Dialog.defaultProps,
        anchor: document.body,
        anchorXAlign: undefined,
        anchorYAlign: undefined,
        autoReposition: true,
        captureFocus: false,
        caretComponent: DEFAULT_CARET_COMPONENT,
        closeOnEscKey: true,
        closeOnOutsideClick: true,
        closeOnOutsideScroll: true,
        portalProps: {},
        preset: Popover.preset.BELOW,
        selfXAlign: undefined,
        selfYAlign: undefined,
        wrapperProps: {},
    }

    static internalKeys = without(Object.keys(Popover.defaultProps), Dialog.internalKeys)

    constructor(props) {
        super();

        this.state = {
            anchorXAlign: props.anchorXAlign || props.preset.anchorXAlign,
            anchorYAlign: props.anchorYAlign || props.preset.anchorYAlign,
            selfXAlign: props.selfXAlign     || props.preset.selfXAlign,
            selfYAlign: props.selfYAlign     || props.preset.selfYAlign,
        };
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
        const position = Popover.position;

        let nextX = 0;

        // we only want to change the X position when we're
        // fully above or below the anchor and selfXAlign isn't MIDDLE

        if (   selfXAlign !== position.MIDDLE
            && (   anchorYAlign === position.START && selfYAlign === position.END
                || anchorYAlign === position.END && selfYAlign === position.START)) {

            if (anchorXAlign === position.START) {
                nextX += this.anchorWidth / 2 - caret.clientWidth / 2;
            } else if (anchorXAlign === position.END) {
                nextX += this.dialog.$wrapper.clientWidth - this.anchorWidth / 2 - caret.clientWidth / 2;
            }
        }

        return nextX;
    }

    getNextCaretYPosition(anchor, caret = this.$caret) {
        const {anchorXAlign, selfXAlign, anchorYAlign, selfYAlign} = this.state;
        const position = Popover.position;

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
                nextY += this.dialog.$wrapper.clientHeight - this.anchorWidth / 2 - caret.clientWidth / 2;
            }
        }

        return nextY;
    }

    getNextDialogXPosition(anchor, dialog = this.dialog.$wrapper) {
        const {anchorXAlign, selfXAlign} = this.state;
        const position = Popover.position;

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

    getNextDialogYPosition(anchor, dialog = this.dialog.$wrapper) {
        const state = this.state;
        const position = Popover.position;
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
        const position = Popover.position;

        const width = this.dialog.$wrapper.clientWidth;
        const height = this.dialog.$wrapper.clientHeight;
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
                       : findDOMNode(this.props.anchor);

        this.cacheViewportCartography(anchor);

        const dx = Math.round(this.getNextDialogXPosition(anchor));
        const dy = Math.round(this.getNextDialogYPosition(anchor));

        const alignmentCorrection = this.getAlignmentCorrectionIfOverflowing(dx, dy);

        if (alignmentCorrection && this.didAlignmentChange(alignmentCorrection)) {
            return this.setState(alignmentCorrection);
        }

        // the caret is initially positioned at 0,0 inside the dialog
        // which is already positioned at the anchor, so we just need to
        // make small adjustments as necessary to line up the caret
        // with the visual center of the anchor

        this.$caret.style.left = Math.round(this.getNextCaretXPosition(anchor)) + 'px';
        this.$caret.style.top = Math.round(this.getNextCaretYPosition(anchor)) + 'px';

        this.applyTranslation(this.$caret, cx, 0);
        this.applyTranslation(this.dialog.$wrapper, dx, dy);
    }

    componentDidMount() {
        this.align();
        window.addEventListener('resize', this.align, true);
    }

    componentDidUpdate() { this.align(); }
    componentWillUnmount() { window.removeEventListener('resize', this.align, true); }

    getClassAlignmentFragment(constant) {
        const position = Popover.position;

        switch (constant) {
        case position.START:
            return 'start';

        case position.MIDDLE:
            return 'middle';

        case position.END:
            return 'end';
        }
    }

    render() {
        const {getClassAlignmentFragment: getFrag, props, state} = this;

        return (
            <Portal {...props.portalProps}>
                <Dialog
                    {...omit(props, Popover.internalKeys)}
                    ref={(instance) => (this.dialog = instance)}
                    before={
                        React.cloneElement(props.caretComponent, {
                            ref: (node) => (this.$caret = node),
                            className: cx('b-popover-caret', props.caretComponent.props.className),
                        })
                    }
                    wrapperProps={{
                        ...props.wrapperProps,
                        className: cx('b-popover', props.wrapperProps.className, {
                            [`b-popover-anchor-x-${getFrag(state.anchorXAlign)}`]: true,
                            [`b-popover-anchor-y-${getFrag(state.anchorYAlign)}`]: true,
                            [`b-popover-self-x-${getFrag(state.selfXAlign)}`]: true,
                            [`b-popover-self-y-${getFrag(state.selfYAlign)}`]: true,
                        }),
                    }} />
            </Portal>
        );
    }
}
