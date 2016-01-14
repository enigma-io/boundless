/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate} from 'react-addons-test-utils';

import UISegmentedControl from '../../UISegmentedControl';
import conformanceChecker from '../../UIUtils/conform';
import noop from '../../UIUtils/noop';

import sinon from 'sinon';

describe('UISegmentedControl', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const fakeEvent = {preventDefault: noop, persist: noop};
    const sandbox = sinon.sandbox.create();

    const baseProps = {
        options: [{
            selected: true,
            value: 'foo-val',
            content: 'foo'
        }, {
            selected: false,
            value: 'bar-val',
            content: 'bar'
        }]
    };

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UISegmentedControl, baseProps));

    describe('CSS hook', () => {
        const hasClass = (dom, name) => dom.classList.contains(name);
        let element;

        beforeEach(() => element = render(<UISegmentedControl {...baseProps} />));

        it('ui-segmented-control should be rendered', () => {
            expect(element.refs.wrapper.className).toContain('ui-segmented-control');
        });

        it('ui-segmented-control-option should be rendered for child node', () => {
            expect(element.refs['option_$0'].props.className).toContain('ui-segmented-control-option');
        });

        it('ui-segmented-control-option-selected should be rendered for child node when `props.selected` is `true`', () => {
            expect(element.refs['option_$0'].props.className).toContain('ui-segmented-control-option');
        });

        it('ui-segmented-control-option-selected should not be rendered for child node when `props.selected` is falsy', () => {
            expect(element.refs['option_$1'].props.className).not.toContain('ui-segmented-control-option-selected');
        });
    });

    describe('keyboard navigation', () => {
        it('selected option should have tabIndex=0', () => {
            const element = render(<UISegmentedControl {...baseProps} />);
            const node = ReactDOM.findDOMNode(element.refs['option_$0']);

            expect(node.getAttribute('tabIndex')).toBe('0');
        });

        it('unselected option should have tabIndex=-1', () => {
            const element = render(<UISegmentedControl {...baseProps} />);
            const node = ReactDOM.findDOMNode(element.refs['option_$1']);

            expect(node.getAttribute('tabIndex')).toBe('-1');
        });

        it('right arrow should move focus to the next child', () => {
            const element = render(<UISegmentedControl {...baseProps} />);

            Simulate.focus(ReactDOM.findDOMNode(element.refs['option_$0']));

            element.handleKeyDown({...fakeEvent, key: 'ArrowRight'});
            expect(document.activeElement).toBe(ReactDOM.findDOMNode(element.refs['option_$1']));
        });

        it('right arrow on last child should send focus to first child', () => {
            const element = render(<UISegmentedControl {...baseProps} />);

            Simulate.focus(ReactDOM.findDOMNode(element.refs['option_$1']));

            element.handleKeyDown({...fakeEvent, key: 'ArrowRight'});
            expect(document.activeElement).toBe(ReactDOM.findDOMNode(element.refs['option_$0']));
        });

        it('left arrow should move focus to the previous child', () => {
            const element = render(<UISegmentedControl {...baseProps} />);

            Simulate.focus(ReactDOM.findDOMNode(element.refs['option_$1']));

            element.handleKeyDown({...fakeEvent, key: 'ArrowLeft'});
            expect(document.activeElement).toBe(ReactDOM.findDOMNode(element.refs['option_$0']));
        });

        it('left arrow on first child should send focus to last child', () => {
            const element = render(<UISegmentedControl {...baseProps} />);

            Simulate.focus(ReactDOM.findDOMNode(element.refs['option_$0']));

            element.handleKeyDown({...fakeEvent, key: 'ArrowLeft'});
            expect(document.activeElement).toBe(ReactDOM.findDOMNode(element.refs['option_$1']));
        });

        it('enter should trigger `props.onOptionSelected`', () => {
            const stub = sandbox.stub();
            const element = render(<UISegmentedControl {...baseProps} onOptionSelected={stub} />);

            Simulate.focus(ReactDOM.findDOMNode(element.refs['option_$0']));

            element.handleKeyDown({...fakeEvent, key: 'Enter'});
            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('onOptionSelected', () => {
        it('should be called on a `change` event when `props.selected` is falsy', () => {
            const stub = sandbox.stub();
            const element = render(<UISegmentedControl {...baseProps} onOptionSelected={stub} />);
            const node = ReactDOM.findDOMNode(element.refs['option_$1']);

            Simulate.click(node);

            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('currentValue', () => {
        it('should return the value of the currently selected option', () => {
            const element = render(<UISegmentedControl {...baseProps} />);

            expect(element.currentValue()).toBe('foo-val');
        });
    });

    describe('blur events', () => {
        const modifiedBaseProps = {
            options: [{
                selected: true,
                value: 'foo-val',
                content: 'foo'
            }, {
                selected: false,
                value: 'bar-val',
                content: 'bar'
            }]
        };

        it('should clear out the internal cache of the option in focus if the target is the focused option', () => {
            modifiedBaseProps.options[1].onBlur = sandbox.stub();

            const element = render(<UISegmentedControl {...modifiedBaseProps} name='foo' />);

            element.handleFocus(modifiedBaseProps.options[1], fakeEvent);
            expect(element.state.indexOfOptionInFocus).toBe(1);

            element.handleBlur(modifiedBaseProps.options[1], fakeEvent);
            expect(element.state.indexOfOptionInFocus).toBe(null);
        });

        it('should be proxied if `props.onBlur` is passed', () => {
            modifiedBaseProps.options[1].onBlur = sandbox.stub();

            const element = render(<UISegmentedControl {...modifiedBaseProps} name='foo' />);

            element.handleBlur(modifiedBaseProps.options[1], fakeEvent);

            expect(modifiedBaseProps.options[1].onBlur.calledOnce).toBe(true);
        });
    });

    describe('click events', () => {
        const modifiedBaseProps = {
            options: [{
                selected: true,
                value: 'foo-val',
                content: 'foo'
            }, {
                selected: false,
                value: 'bar-val',
                content: 'bar'
            }]
        };

        it('should be proxied if `props.onClick` is passed', () => {
            modifiedBaseProps.options[1].onClick = sandbox.stub();

            const element = render(<UISegmentedControl {...modifiedBaseProps} name='foo' />);

            element.handleClick(modifiedBaseProps.options[1], fakeEvent);

            expect(modifiedBaseProps.options[1].onClick.calledOnce).toBe(true);
        });
    });

    describe('focus events', () => {
        const modifiedBaseProps = {
            options: [{
                selected: true,
                value: 'foo-val',
                content: 'foo'
            }, {
                selected: false,
                value: 'bar-val',
                content: 'bar'
            }]
        };

        it('should set the internal focused option cache', () => {
            modifiedBaseProps.options[1].onFocus = sandbox.stub();

            const element = render(<UISegmentedControl {...modifiedBaseProps} name='foo' />);

            expect(element.state.indexOfOptionInFocus).toBe(null);

            element.handleFocus(modifiedBaseProps.options[1], fakeEvent);
            expect(element.state.indexOfOptionInFocus).toBe(1);
        });

        it('should be proxied if `props.onFocus` is passed', () => {
            modifiedBaseProps.options[1].onFocus = sandbox.stub();

            const element = render(<UISegmentedControl {...modifiedBaseProps} name='foo' />);

            element.handleFocus(modifiedBaseProps.options[1], fakeEvent);

            expect(modifiedBaseProps.options[1].onFocus.calledOnce).toBe(true);
        });
    });

    describe('keydown events', () => {
        it('should be proxied if `props.onKeyDown` is passed', () => {
            const stub = sandbox.stub();
            const element = render(<UISegmentedControl {...baseProps} onKeyDown={stub} />);

            element.handleKeyDown(fakeEvent);

            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('prop validation', () => {
        const validator = UISegmentedControl.propTypes.options;

        it('should throw if less than two options are passed', () => {
            expect(validator.bind(null, {options: []})).toThrow();
        });

        it('should throw if no options have `selected: true`', () => {
            expect(validator.bind(null, {options: [{}, {}]})).toThrow();
        });

        it('should throw if an option doesn\'t have a `selected` property', () => {
            expect(validator.bind(null, {options: [{selected: false}, {}]})).toThrow();
        });

        it('should throw if an option is missing a `value` property', () => {
            expect(validator.bind(null, {options: [{selected: false}, {selected: false}]})).toThrow();
        });

        it('should throw if multiple options are selected', () => {
            expect(validator.bind(null, {options: [{selected: true, value: 'x'}, {selected: true, value: 'y'}]})).toThrow();
        });
    });
});
