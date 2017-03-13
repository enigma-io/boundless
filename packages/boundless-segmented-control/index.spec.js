/* eslint no-unused-expressions:0 */

import {createElement} from 'react';
import ReactDOM from 'react-dom';
import {Simulate} from 'react-addons-test-utils';
import sinon from 'sinon';

import SegmentedControl from './index';
import {$, $$, conformanceChecker} from '../boundless-utils-test-helpers/index';

describe('SegmentedControl component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);
    const sandbox = sinon.sandbox.create();

    const baseProps = {
        options: [{
            className: 'foo',
            children: 'foo',
        }, {
            className: 'bar',
            children: 'bar',
        }, {
            className: 'baz',
            children: 'baz',
        }],
    };

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, SegmentedControl, baseProps));

    it('renders .b-segmented-control', () => {
        render(<SegmentedControl {...baseProps} />);
        expect($('.b-segmented-control')).not.toBeNull();
    });

    it('renders .b-segmented-control-option for each option', () => {
        render(<SegmentedControl {...baseProps} />);
        expect($$('.b-segmented-control-option').length).toBe(baseProps.options.length);
    });

    it('renders .b-segmented-control-option-selected only for the active option', () => {
        render(<SegmentedControl {...baseProps} />);
        expect($$('.b-segmented-control-option-selected').length).toBe(1);
    });

    describe('onOptionSelected(option: object)', () => {
        it('is called with the option when an option becomes selected', () => {
            const stub = sandbox.stub();

            render(<SegmentedControl {...baseProps} onOptionSelected={stub} />);
            Simulate.click($('.b-segmented-control-option:nth-child(2)'));

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch({children: 'bar'})).toBe(true);
        });

        it('is not called if the option is already selected', () => {
            const stub = sandbox.stub();

            render(<SegmentedControl {...baseProps} onOptionSelected={stub} />);
            expect($('.b-segmented-control-option-selected.b-segmented-control-option:nth-child(1)')).not.toBeNull();

            Simulate.click($('.b-segmented-control-option:nth-child(1)'));
            expect(stub.called).toBe(false);
        });
    });

    describe('keyboard navigation', () => {
        it('selected option is tabIndex=0', () => {
            render(<SegmentedControl {...baseProps} />);
            expect($$('.b-segmented-control-option-selected[tabIndex="0"]').length).toBe(1);
        });

        it('unselected option is tabIndex=-1', () => {
            render(<SegmentedControl {...baseProps} />);
            expect($$('.b-segmented-control-option[tabIndex="-1"]').length).toBe(baseProps.options.length - 1);
        });

        it('right arrow moves focus to the next child', () => {
            render(<SegmentedControl {...baseProps} />);

            const node = $('.b-segmented-control-option:nth-child(1)');

            Simulate.focus(node);
            Simulate.keyDown(node, {key: 'ArrowRight'});

            expect(document.activeElement).toBe($('.b-segmented-control-option:nth-child(2)'));
        });

        it('right arrow on last child sends focus to first child', () => {
            render(<SegmentedControl {...baseProps} />);

            const node = $('.b-segmented-control-option:nth-child(3)');

            Simulate.focus(node);
            Simulate.keyDown(node, {key: 'ArrowRight'});

            expect(document.activeElement).toBe($('.b-segmented-control-option:nth-child(1)'));
        });

        it('left arrow moves focus to the previous child', () => {
            render(<SegmentedControl {...baseProps} />);

            const node = $('.b-segmented-control-option:nth-child(2)');

            Simulate.focus(node);
            Simulate.keyDown(node, {key: 'ArrowLeft'});

            expect(document.activeElement).toBe($('.b-segmented-control-option:nth-child(1)'));
        });

        it('left arrow on first child sends focus to last child', () => {
            render(<SegmentedControl {...baseProps} />);

            const node = $('.b-segmented-control-option:nth-child(1)');

            Simulate.focus(node);
            Simulate.keyDown(node, {key: 'ArrowLeft'});

            expect(document.activeElement).toBe($('.b-segmented-control-option:nth-child(3)'));
        });

        it('enter triggers `props.onOptionSelected`', () => {
            const stub = sandbox.stub();

            render(<SegmentedControl {...baseProps} onOptionSelected={stub} />);
            expect($('.b-segmented-control-option-selected')).toBe($('.b-segmented-control-option:nth-child(1)'));

            const node = $('.b-segmented-control-option:nth-child(2)');

            Simulate.focus(node);
            Simulate.keyDown(node, {key: 'Enter'});

            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('getSelectedOption()', () => {
        it('returns the currently selected option', () => {
            const element = render(<SegmentedControl {...baseProps} />);

            expect($('.b-segmented-control-option-selected')).toBe($('.b-segmented-control-option:nth-child(1)'));
            expect(element.getSelectedOption()).toBe(baseProps.options[0]);
        });
    });

    describe('getSelectedOptionIndex()', () => {
        it('returns the index of the currently selected option', () => {
            const element = render(<SegmentedControl {...baseProps} />);

            expect($('.b-segmented-control-option-selected')).toBe($('.b-segmented-control-option:nth-child(1)'));
            expect(element.getSelectedOptionIndex()).toBe(0);
        });
    });

    describe('selectOption(option: object)', () => {
        it('programmatically selects a particular option', () => {
            const element = render(<SegmentedControl {...baseProps} />);

            expect($('.b-segmented-control-option-selected')).toBe($('.b-segmented-control-option:nth-child(1)'));

            element.selectOption(baseProps.options[1]);
            expect($('.b-segmented-control-option-selected')).toBe($('.b-segmented-control-option:nth-child(2)'));
        });
    });

    describe('selectOptionByKey(key: string, value: any)', () => {
        it('programmatically selects a particular option by index', () => {
            const element = render(<SegmentedControl {...baseProps} />);

            expect($('.b-segmented-control-option-selected')).toBe($('.b-segmented-control-option:nth-child(1)'));

            element.selectOptionByKey('children', 'bar');
            expect($('.b-segmented-control-option-selected')).toBe($('.b-segmented-control-option:nth-child(2)'));
        });
    });

    describe('selectOptionIndex(index: number)', () => {
        it('programmatically selects a particular option by index', () => {
            const element = render(<SegmentedControl {...baseProps} />);

            expect($('.b-segmented-control-option-selected')).toBe($('.b-segmented-control-option:nth-child(1)'));

            element.selectOptionIndex(1);
            expect($('.b-segmented-control-option-selected')).toBe($('.b-segmented-control-option:nth-child(2)'));
        });
    });
});
