/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UIRadio from '../../UIRadio';
import conformanceChecker from '../../UIUtils/conform';

import sinon from 'sinon';

describe('UIRadio', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const baseProps = {name: 'foo', value: 'bar'};

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIRadio, baseProps));

    describe('accepts', () => {
        it('arbitrary HTML attributes via props.inputProps', () => {
            const element = render(<UIRadio {...baseProps} inputProps={{'data-id': 'foo'}} />);
            const node = element.refs.input;

            expect(node.getAttribute('data-id')).toBe('foo');
        });

        it('additional classes via props.inputProps.className', () => {
            const element = render(<UIRadio {...baseProps} inputProps={{className: 'foo'}} />);
            const node = element.refs.input;

            expect(node.classList.contains('foo')).toBe(true);
        });

        it('arbitrary HTML attributes via props.labelProps', () => {
            const element = render(<UIRadio {...baseProps} label='foo' labelProps={{'data-id': 'foo'}} />);

            expect(element.refs.label.getAttribute('data-id')).toBe('foo');
        });

        it('additional classes via props.labelProps.className', () => {
            const element = render(<UIRadio {...baseProps} label='foo' labelProps={{className: 'foo'}} />);
            const node = element.refs.label;

            expect(node.classList.contains('foo')).toBe(true);
        });

        it('a string label', () => {
            const element = render(<UIRadio {...baseProps} label='foo' />);

            expect(element.refs.label.textContent).toBe('foo');
        });

        it('an element label', () => {
            const element = render(<UIRadio {...baseProps} label={<p>foo</p>} />);

            expect(element.refs.label.textContent).toBe('foo');
        });
    });

    describe('CSS hook', () => {
        const hasClass = (dom, name) => dom.classList.contains(name);

        it('ui-radio-wrapper should be rendered', () => {
            const element = render(<UIRadio {...baseProps} />);
            const node = element.refs.wrapper;

            expect(hasClass(node, 'ui-radio-wrapper')).toBe(true);
        });

        it('ui-radio-label should be rendered', () => {
            const element = render(<UIRadio {...baseProps} label='foo' />);

            expect(hasClass(element.refs.label, 'ui-radio-label')).toBe(true);
        });

        it('ui-radio should be rendered', () => {
            const element = render(<UIRadio {...baseProps} />);

            expect(hasClass(element.refs.input, 'ui-radio')).toBe(true);
        });

        it('ui-radio-selected should be rendered when `props.selected` is `true`', () => {
            const element = render(<UIRadio {...baseProps} selected={true} />);

            expect(hasClass(element.refs.input, 'ui-radio-selected')).toBe(true);
        });

        it('ui-radio-selected should not be rendered when `props.selected` is falsy', () => {
            const element = render(<UIRadio {...baseProps} />);
            const node = element.refs.wrapper;

            expect(hasClass(element.refs.input, 'ui-radio-selected')).toBe(false);
        });
    });

    /*
        Needs this issue to be resolved in JSDOM to work:
        https://github.com/tmpvar/jsdom/issues/1079#issuecomment-159754855
     */
    xdescribe('onSelected', () => {
        it('should be called with the proper value', () => {
            const stub = sandbox.stub();
            const element = render(<UIRadio {...baseProps} onSelected={stub} />);

            element.refs.input.click();

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWith('bar')).toBe(true);
        });
    });

    /*
        Needs this issue to be resolved in JSDOM to work:
        https://github.com/tmpvar/jsdom/issues/1079#issuecomment-159754855
     */
    xdescribe('clicking on the label', () => {
        it('should trigger `onSelected` if `props.selected` is falsy', () => {
            const stub = sandbox.stub();
            const element = render(<UIRadio {...baseProps} label='test' onSelected={stub} />);

            element.refs.label.click();

            expect(stub.calledOnce).toBe(true);
        });
    });
});
