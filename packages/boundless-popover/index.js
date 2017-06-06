import PropTypes from 'prop-types';
import { cloneElement, createElement, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';

import Dialog from 'boundless-dialog';
import Portal from 'boundless-portal';
import omit from 'boundless-utils-omit-keys';
import transformProp from 'boundless-utils-transform-property';

function getOppositeCardinal(direction) {
    switch (direction[0]) {
    case 'N':
        return 'S';
    case 'S':
        return 'N';
    case 'E':
        return 'W';
    }

    return 'E';
}

function without(arr1, arr2) { return arr1.filter((item) => arr2.indexOf(item) === -1); }

const CLASS_REMOVAL_REGEX = /\s?b-popover-(anchor|self)-(start|middle|end)/g;

const DEFAULT_CARET_COMPONENT = (
    <svg viewBox='0 0 14 9.5' xmlns='http://www.w3.org/2000/svg'>
        <g>
            <polygon className='b-popover-caret-border' fill='#000' points='7 0 14 10 0 10' />
            <polygon className='b-popover-caret-fill' fill='#FFF' points='6.98230444 1.75 12.75 10 1.25 10' />
        </g>
    </svg>
);

const START = 0;
const MIDDLE = 1;
const END = 2;

const combinations = [
    { name: 'NNW',   ax: START,     ay: START,      dx: START,   dy: END },
    { name: 'N',     ax: MIDDLE,    ay: START,      dx: MIDDLE,  dy: END },
    { name: 'NNE',   ax: END,       ay: START,      dx: END,     dy: END },
    { name: 'ENE',   ax: END,       ay: START,      dx: START,   dy: START },
    { name: 'E',     ax: END,       ay: MIDDLE,     dx: START,   dy: MIDDLE },
    { name: 'ESE',   ax: END,       ay: END,        dx: START,   dy: END },
    { name: 'SSE',   ax: END,       ay: END,        dx: END,     dy: START },
    { name: 'S',     ax: MIDDLE,    ay: END,        dx: MIDDLE,  dy: START },
    { name: 'SSW',   ax: START,     ay: END,        dx: START,   dy: START },
    { name: 'WSW',   ax: START,     ay: END,        dx: END,     dy: END },
    { name: 'W',     ax: START,     ay: MIDDLE,     dx: END,     dy: MIDDLE },
    { name: 'WNW',   ax: START,     ay: START,      dx: END,     dy: START },
];

/**
A popover is a type of [Dialog](https://github.com/enigma-io/boundless/tree/master/packages/boundless-dialog) that is meant to provide additional context to content (an "anchor") currently on-screen. Typically, a popover is spawned by interacting with the content it enriches and is dismissed by clicking or shifting focus to an alternate location.

Alignment options for the popover are designed to mirror compass directions:

```
       →       ←
      NNW  N  NNE
↓ WNW             ENE ↓
    W   ANCHOR    E
↑ WSW             ESE ↑
      SSW  S  SSE
       →       ←
```

The arrows indicate which way the popover will extend, e.g. → means the popover is aligned to the left edge and extends in that direction. Diagonal corners (NW, NE, SE, SW) are currently not supported.

```jsx
<Popover
    anchor={document.querySelector('.some-anchor-element')}
    preset={Popover.preset.N}>
    My popover content!
</Popover>
```
 */
export default class Popover extends PureComponent {
    // eslint-disable-next-line no-sequences
    static preset = combinations.reduce((map, def) => ((map[def.name] = def), map), {})

    static propTypes = {
        ...Dialog.propTypes,

        /**
         * a DOM element or React reference (ref) to one for positioning purposes
         */
        anchor: PropTypes.oneOfType([
            PropTypes.instanceOf(HTMLElement),
            PropTypes.shape({
                props: PropTypes.object,
            }),
        ]).isRequired,

        /**
         * if the given alignment settings would take the popover out of bounds, change the alignment as necessary to remain in the viewport
         */
        autoReposition: PropTypes.bool,

        /**
         * a DOM element or React reference (ref) to one for positioning purposes, the caret component will
         * be automatically positioned to center on this provided anchor; by default it will center
         * on `props.anchor`
         */
        caretAnchor: PropTypes.oneOfType([
            PropTypes.instanceOf(HTMLElement),
            PropTypes.shape({
                props: PropTypes.object,
            }),
        ]),

        /**
         * the JSX that is rendered and used to point at the middle of the anchor element and indicate the context of the popover
         */
        caretComponent: PropTypes.element,

        portalProps: PropTypes.shape(Portal.PropTypes),

        /**
         * Example:
         * ```jsx
         * <Popover
         *     anchor={document.querySelector('.some-anchor-element')}
         *     preset={Popover.preset.NNE}>
         *     My popover content!
         * </Popover>
         * ```
         */
        preset: PropTypes.oneOf([
            Popover.preset.NNW,
            Popover.preset.N,
            Popover.preset.NNE,
            Popover.preset.ENE,
            Popover.preset.E,
            Popover.preset.ESE,
            Popover.preset.SSE,
            Popover.preset.S,
            Popover.preset.SSW,
            Popover.preset.WSW,
            Popover.preset.W,
            Popover.preset.WNW,
        ]),
    }

    static defaultProps = {
        ...Dialog.defaultProps,
        anchor: undefined,
        autoReposition: true,
        captureFocus: false,
        caretAnchor: undefined,
        caretComponent: DEFAULT_CARET_COMPONENT,
        closeOnEscKey: true,
        closeOnOutsideClick: true,
        closeOnOutsideScroll: true,
        portalProps: {},
        preset: Popover.preset.S,
    }

    static internalKeys = without(Object.keys(Popover.defaultProps), Dialog.internalKeys)

    static getAlignmentClassFragment(constant) {
        switch (constant) {
        case START:
            return 'start';

        case MIDDLE:
            return 'middle';

        case END:
            return 'end';
        }
    }

    cacheViewportCartography(anchor, caretAnchor) {
        const bodyRect = document.body.getBoundingClientRect();

        this.anchorRect = anchor.getBoundingClientRect();
        this.caretAnchorRect = caretAnchor.getBoundingClientRect();

        // normally we'd use scrollTop/scrollLeft, but scroll behavior changes when position: sticky
        // is enabled in Chrome and inverting the negative viewport rect value seems to work more
        // consistently
        this.bodyLeft = bodyRect.left * -1;
        this.bodyTop = bodyRect.top * -1;
    }

    getNextCaretXPosition({ name, ax, dx, ay, dy }, caret = this.$caret) {
        let nextX = 0;

        if (name[0] === 'N' || name[0] === 'S') {
            // popover is above/below, so we need to detect the X position of the caret anchor
            nextX = this.caretAnchorRect.left - this.anchorRect.left + this.caretAnchorRect.width / 2;

            if (dx === MIDDLE) {
                nextX += (this.dialog.$wrapper.clientWidth - this.anchorRect.width) / 2;
            } else if (dx === END) {
                nextX += this.dialog.$wrapper.clientWidth - this.anchorRect.width;
            }
        } else {
            // popover is left/right, so we need to detect the Y position of the caret anchor (caret is rotated via CSS)
            nextX = this.caretAnchorRect.top - this.anchorRect.top + this.caretAnchorRect.height / 2;

            if (dy === MIDDLE) {
                nextX += (this.dialog.$wrapper.clientHeight - this.anchorRect.height) / 2;
            } else if (dy === END) {
                nextX += this.dialog.$wrapper.clientHeight - this.anchorRect.height;
            }
        }

        nextX -= caret.clientWidth / 2;

        return nextX;
    }

    getNextDialogXPosition({ ax, dx }, dialog = this.dialog.$wrapper) {
        let nextX = this.anchorRect.left + this.bodyLeft;

        switch (ax) {
        case MIDDLE:
            nextX += this.anchorRect.width / 2;
            break;

        case END:
            nextX += this.anchorRect.width;
            break;
        }

        switch (dx) {
        case MIDDLE:
            nextX -= dialog.clientWidth / 2;
            break;

        case END:
            nextX -= dialog.clientWidth;
            break;
        }

        return nextX;
    }

    getNextDialogYPosition({ ay, dy }, dialog = this.dialog.$wrapper) {
        let nextY = this.anchorRect.top + this.bodyTop;

        switch (ay) {
        case MIDDLE:
            nextY += this.anchorRect.height / 2;
            break;

        case END:
            nextY += this.anchorRect.height;
            break;
        }

        switch (dy) {
        case MIDDLE:
            nextY -= dialog.clientHeight / 2;
            break;

        case END:
            nextY -= dialog.clientHeight;
            break;
        }

        return nextY;
    }

    /**
     * Given a position combination, will the popover fit into the space without occlusion?
     *
     * @param  {Object}  config
     * @param  {String}  config.ax
     * @param  {String}  config.ay
     * @param  {String}  config.dx
     * @param  {String}  config.dy
     * @param  {Number}  pHeight
     * @param  {Number}  pWidth
     *
     * @return {Boolean}
     */
    isPositionValid({ name, ax, ay, dx, dy }, pHeight, pWidth) {
        const cardinal = name[0];

        if (cardinal === 'N' || cardinal === 'S') {
            if (cardinal === 'N' && this.anchorRect.top - pHeight < 0) {
                return false;   /* would occlude above */
            } else if (cardinal === 'S' && this.anchorRect.bottom + pHeight > window.innerHeight) {
                return false;   /* would occlude below */
            }

            if (ax === START) {
                return !(
                       (this.anchorRect.left + pWidth > window.innerWidth      /* would occlude right */ || this.anchorRect.left < 0)                               /* anchor is partially offscreen to the left */
                );
            } else if (ax === MIDDLE) {
                return !(
                       (this.anchorRect.left - pWidth / 2 < 0                  /* would occlude left */ || this.anchorRect.left + pWidth / 2 > window.innerWidth)  /* would occlude right */
                );
            }

            return !(
                   (this.anchorRect.left - pWidth < 0                  /* would occlude left */ || this.anchorRect.right > window.innerWidth)          /* anchor is partially offscreen to the right */
            );

        } else if (cardinal === 'W' || cardinal === 'E') {
            if (cardinal === 'W' && this.anchorRect.left - pWidth < 0) {
                return false;   /* would occlude left */
            } else if (cardinal === 'E' && this.anchorRect.right + pWidth > window.innerWidth) {
                return false;   /* would occlude right */
            }

            if (ay === START) {
                return !(
                       (this.anchorRect.top + pHeight > window.innerHeight    /* would occlude below */ || this.anchorRect.top < 0)                               /* anchor is partially offscreen above */
                );
            } else if (ay === MIDDLE) {
                return !(
                       (this.anchorRect.top + this.anchorRect.height / 2 - pHeight / 2 < 0                     /* would occlude above */ || this.anchorRect.top + this.anchorRect.height / 2 + pHeight / 2 > window.innerHeight)    /* would occlude below */
                );
            }

            return !(
                   (this.anchorRect.top - pHeight < 0              /* would occlude above */ || this.anchorRect.bottom > window.innerHeight)    /* anchor is partially offscreen below */
            );
        }

        return true;
    }

    getValidAlignmentPreset() {
        const width = this.dialog.$wrapper.clientWidth;
        const height = this.dialog.$wrapper.clientHeight;

        // given the current viewport cartography, where can we stick the popover
        // so it won't be partially occluded?
        const validCombos = combinations.filter((config) => {
            return this.isPositionValid(config, height, width);
        });

        // 1. is the requested preset in the list?
        // 2. does the consumer not want us auto-repositioning?
        // 3. are no combos valid?
        if (validCombos.indexOf(this.props.preset) !== -1 || !this.props.autoReposition || !validCombos.length) {
            return this.props.preset; // just go with the requested preset
        }

        // otherwise... we try to find the best possible fallback option

        // optimize for the requested preset hemisphere
        const bestCombos = validCombos.filter(({ name }) => name[0] === this.props.preset.name[0]);

        if (bestCombos.length) {
            return bestCombos[0];
        }

        // then the opposite (e.g. the element is too low in the viewport so flip up instead of down)
        const oppositeCardinal = getOppositeCardinal(this.props.preset.name);
        const okayCombos = validCombos.filter(({ name }) => name[0] === oppositeCardinal);

        if (okayCombos.length) {
            return okayCombos[0];
        }

        // whatever's left will have to do
        return validCombos[0];
    }

    align = () => {
        const anchor = this.props.anchor instanceof HTMLElement
                       ? this.props.anchor
                       : findDOMNode(this.props.anchor);

        // eslint-disable-next-line no-nested-ternary
        const caretAnchor = this.props.caretAnchor
                            ? this.props.caretAnchor instanceof HTMLElement
                              ? this.props.caretAnchor
                              : findDOMNode(this.props.caretAnchor)
                            : anchor;

        this.cacheViewportCartography(anchor, caretAnchor);

        const preset = this.getValidAlignmentPreset();
        const frag = Popover.getAlignmentClassFragment;

        this.dialog.$wrapper.className = this.dialog.$wrapper.className.replace(CLASS_REMOVAL_REGEX, '')
                                         + ` b-popover-anchor-x-${frag(preset.ax)}`
                                         + ` b-popover-anchor-y-${frag(preset.ay)}`
                                         + ` b-popover-self-x-${frag(preset.dx)}`
                                         + ` b-popover-self-y-${frag(preset.dy)}`;

        const dx = Math.round(this.getNextDialogXPosition(preset));
        const dy = Math.round(this.getNextDialogYPosition(preset));

        this.dialog.$wrapper.style[transformProp] = `translate(${dx}px, ${dy}px)`;

        const cardinal = preset.name[0];
        const longitudinal = cardinal === 'N' || cardinal === 'S';

        // the caret is initially positioned at 0,0 inside the dialog
        // which is already positioned at the anchor, so we just need to
        // make small adjustments as necessary to line up the caret
        // with the visual center of the anchor
        this.$caret.style[longitudinal ? 'left' : 'top'] = Math.round(this.getNextCaretXPosition(preset)) + 'px';
        this.$caret.style[longitudinal ? 'top' : 'left'] = '0px';
    }

    componentDidMount() {
        this.align();
        window.addEventListener('resize', this.align, true);
    }

    componentDidUpdate() {
        this.align();
    }

    componentWillUnmount() { window.removeEventListener('resize', this.align, true); }

    render() {
        const { props } = this;

        return (
            <Portal {...props.portalProps}>
                <Dialog
                    {...omit(props, Popover.internalKeys)}
                    ref={(instance) => (this.dialog = instance)}
                    before={
                        cloneElement(props.caretComponent, {
                            ref: (node) => (this.$caret = node),
                            className: cx('b-popover-caret', props.caretComponent.props.className),
                        })
                    }
                    className={cx('b-popover', props.className)} />
            </Portal>
        );
    }
}
