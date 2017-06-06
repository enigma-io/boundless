/* eslint no-unused-expressions:0 */

import { createElement } from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import Input from './index';
import { $, conformanceChecker } from '../boundless-utils-test-helpers/index';

describe('Input component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const props = {
        inputProps: {
            name: 'foo',
        },
    };

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => {
        conformanceChecker(render, Input, props);
    });

    it('renders .b-input-wrapper', () => {
        render(<Input {...props} />);
        expect($('.b-input-wrapper')).not.toBeNull();
    });

    it('renders .b-input', () => {
        render(<Input {...props} />);
        expect($('.b-input')).not.toBeNull();
    });

    it('renders .b-input-placeholder', () => {
        render(<Input {...props} inputProps={{ placeholder: 'foo' }} />);
        expect($('.b-input-placeholder')).not.toBeNull();
    });

    it('accepts a different wrapper component', () => {
        render(<Input {...props} component='article' />);
        expect($('article.b-input-wrapper')).not.toBeNull();
    });

    it('accepts arbitrary HTML attributes via props.inputProps', () => {
        render(<Input {...props} inputProps={{ 'data-id': 'foo' }} />);
        expect($('.b-input[data-id="foo"]')).not.toBeNull();
    });

    it('accepts CSS classes via props.inputProps', () => {
        render(<Input {...props} inputProps={{ className: 'foo' }} />);
        expect($('.b-input.foo')).not.toBeNull();
    });

    it('uses the proper placeholder text (via props.inputProps.placeholder)', () => {
        render(<Input {...props} inputProps={{ placeholder: 'foo' }} />);
        expect($('.b-input-placeholder').textContent).toBe('foo');
    });

    it('does not empty the placeholder on input focus if `props.hidePlaceholderOnFocus` is false', () => {
        const element = render(<Input {...props} hidePlaceholderOnFocus={false} inputProps={{ placeholder: 'foo' }} />);
        expect($('.b-input-placeholder').textContent).toBe('foo');

        element.handleFocus();
        expect($('.b-input-placeholder').textContent).toBe('foo');
    });

    it('empties the placeholder on input focus if `props.hidePlaceholderOnFocus` is true', () => {
        const element = render(<Input {...props} hidePlaceholderOnFocus={true} inputProps={{ placeholder: 'foo' }} />);
        expect($('.b-input-placeholder').textContent).toBe('foo');

        element.handleFocus();
        expect($('.b-input-placeholder').textContent).toBe('');
    });

    it('fills in the placeholder on input blur if the the input is empty and `props.hidePlaceholderOnFocus` is true', () => {
        const element = render(<Input {...props} hidePlaceholderOnFocus={true} inputProps={{ placeholder: 'foo' }} />);
        expect($('.b-input-placeholder').textContent).toBe('foo');

        element.handleFocus();
        expect($('.b-input-placeholder').textContent).toBe('');

        element.handleBlur();
        expect($('.b-input-placeholder').textContent).toBe('foo');
    });

    describe('controlled mode', () => {
        // ignore React dev-time warning about not supplying props.onChange
        beforeEach(() => sandbox.stub(console, 'error'));

        it('causes the placeholder to be filled in when the input is empty', () => {
            render(<Input {...props} hidePlaceholderOnFocus={false} inputProps={{ placeholder: 'foo', value: '' }} />);
            expect($('.b-input-placeholder').textContent).toBe('foo');
        });

        it('causes the placeholder to be emptied when the input has a value', () => {
            render(<Input {...props} hidePlaceholderOnFocus={false} inputProps={{ placeholder: 'foo', value: 'x' }} />);
            expect($('.b-input-placeholder').textContent).toBe('');
        });

        it('properly manages placeholder visibility across many `props.inputProps.value` changes', () => {
            render(<Input {...props} hidePlaceholderOnFocus={false} inputProps={{ placeholder: 'foo', value: 'x' }} />);
            expect($('.b-input-placeholder').textContent).toBe('');

            render(<Input {...props} hidePlaceholderOnFocus={false} inputProps={{ placeholder: 'foo', value: '' }} />);
            expect($('.b-input-placeholder').textContent).toBe('foo');

            render(<Input {...props} hidePlaceholderOnFocus={false} inputProps={{ placeholder: 'foo', value: 'x' }} />);
            expect($('.b-input-placeholder').textContent).toBe('');

            render(<Input {...props} hidePlaceholderOnFocus={false} inputProps={{ placeholder: 'foo', value: 'xy' }} />);
            expect($('.b-input-placeholder').textContent).toBe('');

            render(<Input {...props} hidePlaceholderOnFocus={false} inputProps={{ placeholder: 'foo', value: '' }} />);
            expect($('.b-input-placeholder').textContent).toBe('foo');
        });

        it('change events on the input are ignored and proxied to the composer', () => {
            const changeStub = sandbox.stub();
            const element = render(<Input {...props} inputProps={{ onChange: changeStub, placeholder: 'foo', value: '' }} />);

            sandbox.spy(element, 'setState');

            element.handleChange({ target: { value: 'foobar' } });
            expect(element.setState.called).toBe(false);
            expect(changeStub.calledOnce).toBe(true);
        });
    });

    describe('uncontrolled mode', () => {
        it('causes the placeholder to be filled in when the input is empty', () => {
            render(<Input {...props} hidePlaceholderOnFocus={false} inputProps={{ placeholder: 'foo' }} />);
            expect($('.b-input-placeholder').textContent).toBe('foo');
        });

        it('causes the placeholder to be empty when given `inputProps.defaultValue`', () => {
            render(<Input {...props} hidePlaceholderOnFocus={false} inputProps={{ defaultValue: 'foo', placeholder: 'foo' }} />);
            expect($('.b-input-placeholder').textContent).toBe('');
        });

        it('causes the placeholder to be empty when the input is non-empty', () => {
            const element = render(<Input {...props} hidePlaceholderOnFocus={false} inputProps={{ placeholder: 'foo' }} />);

            element.handleChange({ target: { value: 'x' } });
            expect($('.b-input-placeholder').textContent).toBe('');
        });

        it('properly manages placeholder visibility across many input changes', () => {
            const element = render(<Input {...props} hidePlaceholderOnFocus={false} inputProps={{ placeholder: 'foo' }} />);

            expect($('.b-input-placeholder').textContent).toBe('foo');

            element.handleChange({ target: { value: 'x' } });
            expect($('.b-input-placeholder').textContent).toBe('');

            element.handleChange({ target: { value: 'xy' } });
            expect($('.b-input-placeholder').textContent).toBe('');

            element.handleChange({ target: { value: '' } });
            expect($('.b-input-placeholder').textContent).toBe('foo');
        });
    });

    describe('getValue()', () => {
        it('returns the current value of the input field', () => {
            const element = render(<Input {...props} inputProps={{ defaultValue: 'bar' }} />);

            expect(element.getValue()).toBe('bar');
        });
    });

    describe('setValue(value: string)', () => {
        it('changes the input value', () => {
            const element = render(<Input {...props} />);

            expect(element.getValue()).toBe('');

            element.setValue('foo');
            expect(element.getValue()).toBe('foo');
        });

        it('triggers the inputProps.onChange flow before the value is reset by React for a controlled component', () => {
            const changeStub = sandbox.stub();
            const element = render(<Input {...props} inputProps={{ onChange: changeStub, value: 'ap' }} />);

            element.setValue('foo');
            expect(changeStub.calledOnce).toBe(true);
        });

        it('empties the placeholder if set with a non-empty string', () => {
            const element = render(<Input {...props} inputProps={{ placeholder: 'bar' }} />);

            expect(element.getValue()).toBe('');
            expect($('.b-input-placeholder').textContent).toBe('bar');

            element.setValue('foo');
            expect(element.getValue()).toBe('foo');
            expect($('.b-input-placeholder').textContent).toBe('');
        });

        it('restores the placeholder if set with an empty string', () => {
            const element = render(<Input {...props} inputProps={{ defaultValue: 'foo', placeholder: 'bar' }} />);

            expect(element.getValue()).toBe('foo');
            expect($('.b-input-placeholder').textContent).toBe('');

            element.setValue('');
            expect(element.getValue()).toBe('');
            expect($('.b-input-placeholder').textContent).toBe('bar');
        });
    });

    it('proxies input events to `props.inputProps.onBlur` if provided', () => {
        const stub = sandbox.stub();
        const element = render(<Input {...props} inputProps={{ onBlur: stub }} />);
        const event = {};

        element.handleBlur(event);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWithMatch(event)).toBe(true);
    });

    it('proxies input events to `props.inputProps.onFocus` if provided', () => {
        const stub = sandbox.stub();
        const element = render(<Input {...props} inputProps={{ onFocus: stub }} />);
        const event = {};

        element.handleFocus(event);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWithMatch(event)).toBe(true);
    });

    it('proxies input events to `props.inputProps.onChange` if provided', () => {
        const stub = sandbox.stub();
        const element = render(<Input {...props} inputProps={{ onChange: stub }} />);
        const event = { target: { value: 'x' } };

        element.handleChange(event);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWithMatch(event)).toBe(true);
    });
});
