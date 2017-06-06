/* eslint no-unused-expressions:0 */

import { createElement } from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import Radio from './index';
import { $, conformanceChecker } from '../boundless-utils-test-helpers/index';

describe('Radio component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const baseProps = { name: 'foo', value: 'bar' };
    const event = { preventDefault: () => {} };

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Radio, baseProps));

    it('renders .b-radio-wrapper', () => {
        render(<Radio {...baseProps} />);
        expect($('.b-radio-wrapper')).not.toBeNull();
    });

    it('renders .b-radio-label', () => {
        render(<Radio {...baseProps} labelContent='foo' />);
        expect($('.b-radio-label')).not.toBeNull();
    });

    it('renders .b-radio', () => {
        render(<Radio {...baseProps} />);
        expect($('.b-radio')).not.toBeNull();
    });

    it('renders .b-radio-selected when `props.selected` is `true`', () => {
        render(<Radio {...baseProps} selected={true} />);
        expect($('.b-radio-selected')).not.toBeNull();
    });

    it('does not render .b-radio-selected when `props.selected` is falsy', () => {
        render(<Radio {...baseProps} />);
        expect($('.b-radio-label-selected')).toBeNull();
    });

    it('accepts a customized component tag', () => {
        render(<Radio {...baseProps} component='figure' />);
        expect($('figure.b-radio-wrapper')).not.toBeNull();
    });

    it('accepts arbitrary HTML attributes via props.inputProps', () => {
        render(<Radio {...baseProps} inputProps={{ 'data-id': 'foo' }} />);
        expect($('.b-radio[data-id="foo"]')).not.toBeNull();
    });

    it('accepts additional classes via props.inputProps.className', () => {
        render(<Radio {...baseProps} inputProps={{ className: 'foo' }} />);
        expect($('.b-radio.foo')).not.toBeNull();
    });

    it('accepts arbitrary HTML attributes via props.labelProps', () => {
        render(<Radio {...baseProps} labelContent='foo' labelProps={{ 'data-id': 'foo' }} />);
        expect($('.b-radio-label[data-id="foo"]')).not.toBeNull();
    });

    it('accepts additional classes via props.labelProps.className', () => {
        render(<Radio {...baseProps} labelContent='foo' labelProps={{ className: 'foo' }} />);
        expect($('.b-radio-label.foo')).not.toBeNull();
    });

    it('accepts a string label', () => {
        render(<Radio {...baseProps} labelContent='foo' />);
        expect($('.b-radio-label').textContent).toBe('foo');
    });

    it('accepts an element label', () => {
        render(<Radio {...baseProps} labelContent={<p>foo</p>} />);
        expect($('.b-radio-label').textContent).toBe('foo');

        render(<Radio {...baseProps} labelContent={[ <p key='1'>foo</p>, <time key='2'>bar</time> ]} />);
        expect($('.b-radio-label').textContent).toBe('foobar');
    });

    describe('change events', () => {
        it('calls `props.onSelected` with the target\'s value if the target is `checked`', () => {
            const stub = sandbox.stub();
            const element = render(<Radio {...baseProps} onSelected={stub} />);

            element.handleChange({ ...event, target: { checked: true, value: 'x' } });

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch('x')).toBe(true);
        });

        it('proxies to `props.inputProps.onChange` if provided', () => {
            const stub = sandbox.stub();
            const element = render(<Radio {...baseProps} inputProps={{ onChange: stub }} />);

            element.handleChange({ ...event, target: $('.b-radio') });

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(event)).toBe(true);
        });
    });

    /*
        Needs this issue to be resolved in JSDOM to work:
        https://github.com/tmpvar/jsdom/issues/1079#issuecomment-159754855
     */
    describe('onSelected', () => {
        it('is called with the proper value', () => {
            const stub = sandbox.stub();

            render(<Radio {...baseProps} onSelected={stub} />);

            $('.b-radio').click();
            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWith('bar')).toBe(true);
        });
    });

    /*
        Needs this issue to be resolved in JSDOM to work:
        https://github.com/tmpvar/jsdom/issues/1079#issuecomment-159754855
     */
    describe('clicking on the label', () => {
        it('triggers `onSelected` if `props.selected` is falsy', () => {
            const stub = sandbox.stub();

            render(<Radio {...baseProps} labelContent='test' onSelected={stub} />);

            $('.b-radio-label').click();
            expect(stub.calledOnce).toBe(true);
        });
    });
});
