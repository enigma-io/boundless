/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate} from 'react-addons-test-utils';

import SegmentedControl from './index';
import conformanceChecker from '../boundless-utils-conformance/index';
import noop from '../boundless-utils-noop/index';

import sinon from 'sinon';

describe('SegmentedControl component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const event = {preventDefault: noop};
    const sandbox = sinon.sandbox.create();

    const baseProps = {
        options: [{
            selected: false,
            value: 'foo-val',
            content: 'foo',
        }, {
            selected: true,
            value: 'bar-val',
            content: 'bar',
        }, {
            selected: false,
            value: 'baz-val',
            content: 'baz',
        }],
    };

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, SegmentedControl, baseProps));

    describe('CSS hook', () => {
        let element;

        beforeEach(() => (element = render(<SegmentedControl {...baseProps} />)));

        it('renders .b-segmented-control', () => {
            expect(element.refs.wrapper.className).toContain('b-segmented-control');
        });

        it('renders .b-segmented-control-option for child node', () => {
            expect(element.refs.option_$0.props.className).toContain('b-segmented-control-option');
        });

        it('renders .b-segmented-control-option-selected for child node when `props.selected` is `true`', () => {
            expect(element.refs.option_$1.props.className).toContain('b-segmented-control-option');
        });

        it('does not render .b-segmented-control-option-selected for child node when `props.selected` is falsy', () => {
            expect(element.refs.option_$0.props.className).not.toContain('b-segmented-control-option-selected');
        });
    });

    describe('keyboard navigation', () => {
        it('selected option is tabIndex=0', () => {
            const element = render(<SegmentedControl {...baseProps} />);
            const node = ReactDOM.findDOMNode(element.refs.option_$1);

            expect(node.getAttribute('tabIndex')).toBe('0');
        });

        it('unselected option is tabIndex=-1', () => {
            const element = render(<SegmentedControl {...baseProps} />);
            const node = ReactDOM.findDOMNode(element.refs.option_$0);

            expect(node.getAttribute('tabIndex')).toBe('-1');
        });

        it('right arrow moves focus to the next child', () => {
            const element = render(<SegmentedControl {...baseProps} />);

            Simulate.focus(ReactDOM.findDOMNode(element.refs.option_$0));

            element.handleKeyDown({...event, key: 'ArrowRight'});
            expect(document.activeElement).toBe(ReactDOM.findDOMNode(element.refs.option_$1));
        });

        it('right arrow on last child sends focus to first child', () => {
            const element = render(<SegmentedControl {...baseProps} />);

            Simulate.focus(ReactDOM.findDOMNode(element.refs.option_$2));

            element.handleKeyDown({...event, key: 'ArrowRight'});
            expect(document.activeElement).toBe(ReactDOM.findDOMNode(element.refs.option_$0));
        });

        it('left arrow moves focus to the previous child', () => {
            const element = render(<SegmentedControl {...baseProps} />);

            Simulate.focus(ReactDOM.findDOMNode(element.refs.option_$1));

            element.handleKeyDown({...event, key: 'ArrowLeft'});
            expect(document.activeElement).toBe(ReactDOM.findDOMNode(element.refs.option_$0));
        });

        it('left arrow on first child sends focus to last child', () => {
            const element = render(<SegmentedControl {...baseProps} />);

            Simulate.focus(ReactDOM.findDOMNode(element.refs.option_$0));

            element.handleKeyDown({...event, key: 'ArrowLeft'});
            expect(document.activeElement).toBe(ReactDOM.findDOMNode(element.refs.option_$2));
        });

        it('enter triggers `props.onOptionSelected`', () => {
            const stub = sandbox.stub();
            const element = render(<SegmentedControl {...baseProps} onOptionSelected={stub} />);

            Simulate.focus(ReactDOM.findDOMNode(element.refs.option_$0));

            element.handleKeyDown({...event, key: 'Enter'});
            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('onOptionSelected', () => {
        it('is called on a `change` event when `props.selected` is falsy', () => {
            const stub = sandbox.stub();
            const element = render(<SegmentedControl {...baseProps} onOptionSelected={stub} />);
            const node = ReactDOM.findDOMNode(element.refs.option_$0);

            Simulate.click(node);

            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('currentValue', () => {
        it('returns the value of the currently selected option', () => {
            const element = render(<SegmentedControl {...baseProps} />);

            expect(element.currentValue()).toBe('bar-val');
        });
    });

    describe('blur events', () => {
        const modifiedBaseProps = {
            options: [{
                selected: true,
                value: 'foo-val',
                content: 'foo',
            }, {
                selected: false,
                value: 'bar-val',
                content: 'bar',
            }],
        };

        it('clears out the internal cache of the option in focus if the target is the focused option', () => {
            const element = render(<SegmentedControl {...modifiedBaseProps} name='foo' />);

            element.handleOptionFocus(modifiedBaseProps.options[1], event);
            expect(element.state.indexOfOptionInFocus).toBe(1);

            element.handleOptionBlur(modifiedBaseProps.options[1], event);
            expect(element.state.indexOfOptionInFocus).toBe(null);
        });

        it('is proxied if `options[].onBlur` is passed', () => {
            modifiedBaseProps.options[1].onBlur = sandbox.stub();

            const element = render(
                <SegmentedControl {...modifiedBaseProps} name='foo' />
            );

            element.handleOptionBlur(modifiedBaseProps.options[1], event);
            expect(modifiedBaseProps.options[1].onBlur.calledOnce).toBe(true);
        });
    });

    describe('click events', () => {
        const modifiedBaseProps = {
            options: [{
                selected: true,
                value: 'foo-val',
                content: 'foo',
            }, {
                selected: false,
                value: 'bar-val',
                content: 'bar',
            }],
        };

        it('is proxied if `options[].onClick` is passed', () => {
            modifiedBaseProps.options[1].onClick = sandbox.stub();

            const element = render(
                <SegmentedControl {...modifiedBaseProps} name='foo' />
            );

            element.handleOptionClick(modifiedBaseProps.options[1], event);
            expect(modifiedBaseProps.options[1].onClick.calledOnce).toBe(true);
        });
    });

    describe('focus events', () => {
        const modifiedBaseProps = {
            options: [{
                selected: true,
                value: 'foo-val',
                content: 'foo',
            }, {
                selected: false,
                value: 'bar-val',
                content: 'bar',
            }],
        };

        it('sets the internal focused option cache', () => {
            const element = render(<SegmentedControl {...modifiedBaseProps} name='foo' />);

            expect(element.state.indexOfOptionInFocus).toBe(null);

            element.handleOptionFocus(modifiedBaseProps.options[1], event);
            expect(element.state.indexOfOptionInFocus).toBe(1);
        });

        it('is proxied if `options[].onFocus` is passed', () => {
            modifiedBaseProps.options[1].onFocus = sandbox.stub();

            const element = render(
                <SegmentedControl {...modifiedBaseProps} name='foo' />
            );

            element.handleOptionFocus(modifiedBaseProps.options[1], event);
            expect(modifiedBaseProps.options[1].onFocus.calledOnce).toBe(true);
        });
    });

    describe('keydown events', () => {
        it('is proxied if `props.onKeyDown` is passed', () => {
            const stub = sandbox.stub();
            const element = render(
                <SegmentedControl {...baseProps} onKeyDown={stub} />
            );

            element.handleKeyDown(event);
            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('prop validation', () => {
        const validator = SegmentedControl.propTypes.options;

        it('throws if less than two options are passed', () => {
            expect(validator.bind(null, {options: []})).toThrow();
        });

        it('throws if no options have `selected: true`', () => {
            expect(validator.bind(null, {options: [{}, {}]})).toThrow();
        });

        it('throws if an option doesn\'t have a `selected` property', () => {
            expect(validator.bind(null, {options: [{selected: false}, {}]})).toThrow();
        });

        it('throws if an option is missing a `value` property', () => {
            expect(validator.bind(null, {options: [{selected: false}, {selected: false}]})).toThrow();
        });

        it('throws if multiple options are selected', () => {
            expect(validator.bind(null, {options: [{selected: true, value: 'x'}, {selected: true, value: 'y'}]})).toThrow();
        });
    });
});
