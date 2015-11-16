/* eslint no-unused-expressions:0 */

import UISegmentedControl from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../UIUtils/conform';

describe('UISegmentedControl', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const eventBase = {preventDefault: () => {}};
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
        it('ui-segmented-control should be rendered', () => {
            const element = render(<UISegmentedControl />);
            const node = ReactDOM.findDOMNode(element);

            assert(node.classList.contains('ui-segmented-control'));
        });

        it('ui-segmented-control-option should be rendered for child node', () => {
            const element = render(<UISegmentedControl {...baseProps} name='foo' />);
            const node1 = element.refs['option_$0'];
            const node2 = element.refs['option_$1'];

            assert(node1.classList.contains('ui-segmented-control-option'));
            assert(node2.classList.contains('ui-segmented-control-option'));
        });

        it('ui-segmented-control-option-selected should be rendered for child node when `props.selected` is `true`', () => {
            const element = render(<UISegmentedControl {...baseProps} name='foo' />);
            const node = element.refs['option_$0'];

            assert(node.classList.contains('ui-segmented-control-option-selected'));
        });

        it('ui-segmented-control-option-selected should not be rendered for child node when `props.selected` is falsy', () => {
            const element = render(<UISegmentedControl {...baseProps} name='foo' />);
            const node = element.refs['option_$1'];

            assert(node.classList.contains('ui-segmented-control-option-selected') === false);
        });
    });

    describe('Keyboard navigation', () => {
        it('selected option should have tabIndex=0', () => {
            const element = render(<UISegmentedControl {...baseProps} name='foo' />);
            const node = element.refs['option_$0'];

            expect(node.getAttribute('tabIndex')).to.equal('0');
        });

        it('unselected option should have tabIndex=-1', () => {
            const element = render(<UISegmentedControl {...baseProps} name='foo' />);
            const node = element.refs['option_$1'];

            expect(node.getAttribute('tabIndex')).to.equal('-1');
        });

        it('right arrow on last child should send focus to first child', () => {
            const element = render(<UISegmentedControl {...baseProps} name='foo' />);
            const node = element.refs['option_$1'];

            node.focus();
            element.handleKeyDown({...eventBase, key: 'ArrowRight'});
            expect(document.activeElement).to.equal(element.refs['option_$0']);
        });

        it('left arrow on first child should send focus to last child', () => {
            const element = render(<UISegmentedControl {...baseProps} name='foo' />);
            const node = element.refs['option_$0'];

            node.focus();
            element.handleKeyDown({...eventBase, key: 'ArrowLeft'});
            expect(document.activeElement).to.equal(element.refs['option_$1']);
        });
    });

    describe('onOptionSelected', () => {
        it('should be called on a `change` event when `props.selected` is falsy', () => {
            const stub = sandbox.stub();
            const element = render(<UISegmentedControl {...baseProps} name='foo' onOptionSelected={stub} />);
            const node = element.refs['option_$1'];

            node.click();
            expect(stub).to.have.been.calledOnce;
        });
    });

    describe('currentValue', () => {
        it('should return the value of the currently selected option', () => {
            const element = render(<UISegmentedControl {...baseProps} name='foo' />);

            expect(element.currentValue()).to.equal('foo-val');
        });
    });
});
