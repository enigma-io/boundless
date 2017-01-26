/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import {noop} from 'lodash';

import Input from './index';
import checker from '../boundless-utils-conformance/index';

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
        checker(render, Input, props);
    });

    describe('accepts', () => {
        it('arbitrary HTML attributes via props.inputProps', () => {
            const element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        'data-id': 'foo',
                    }} />
            );

            expect(element.refs.field.getAttribute('data-id')).toBe('foo');
        });

        it('additional classes via props.inputProps.className', () => {
            const element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        className: 'foo',
                    }} />
            );

            expect(element.refs.field.classList.contains('foo')).toBe(true);
        });
    });

    describe('CSS hook', () => {
        const hasClass = (dom, name) => dom.classList.contains(name);

        it('renders .b-input-wrapper', () => {
            const element = render(<Input {...props} />);

            expect(hasClass(element.refs.wrapper, 'b-input-wrapper')).toBe(true);
        });

        it('renders .b-input', () => {
            const element = render(<Input {...props} />);

            expect(hasClass(element.refs.field, 'b-input')).toBe(true);
        });
    });

    it('renders the placeholder facsimile', () => {
        const element = render(<Input {...props} />);

        expect(element.refs.placeholder).not.toBeUndefined();
        expect(element.refs.placeholder.classList.contains('b-input-placeholder')).toBe(true);
    });

    it('uses the proper placeholder text (via props.inputProps.placeholder)', () => {
        const element = render(
            <Input
                {...props}
                inputProps={{
                    ...props.inputProps,
                    placeholder: 'foo',
                }} />
        );

        expect(element.refs.placeholder.textContent).toBe('foo');
    });

    it('does not empty the placeholder on input focus if `props.hidePlaceholderOnFocus` is false', () => {
        const element = render(
            <Input
                {...props}
                hidePlaceholderOnFocus={false}
                inputProps={{
                    ...props.inputProps,
                    placeholder: 'foo',
                }} />
        );

        expect(element.refs.placeholder).not.toBeUndefined();
        expect(element.refs.placeholder.textContent).toBe('foo');

        element.handleFocus();

        expect(element.refs.placeholder.textContent).toBe('foo');
    });

    it('empties the placeholder on input focus if `props.hidePlaceholderOnFocus` is true', () => {
        const element = render(
            <Input
                {...props}
                hidePlaceholderOnFocus={true}
                inputProps={{
                    ...props.inputProps,
                    placeholder: 'foo',
                }} />
        );

        expect(element.refs.placeholder).not.toBeUndefined();
        expect(element.refs.placeholder.textContent).toBe('foo');

        element.handleFocus();

        expect(element.refs.placeholder.textContent).toBe('');
    });

    it('fills in the placeholder on input blur if the the input is empty and `props.hidePlaceholderOnFocus` is true', () => {
        const element = render(
            <Input
                {...props}
                hidePlaceholderOnFocus={true}
                inputProps={{
                    ...props.inputProps,
                    placeholder: 'foo',
                }} />
        );

        expect(element.refs.placeholder).not.toBeUndefined();
        expect(element.refs.placeholder.textContent).toBe('foo');

        element.handleFocus();
        expect(element.refs.placeholder.textContent).toBe('');

        element.handleBlur();
        expect(element.refs.placeholder.textContent).toBe('foo');
    });

    describe('controlled mode', () => {
        // ignore React dev-time warning about not supplying props.onChange
        beforeEach(() => sandbox.stub(console, 'error'));

        it('causes the placeholder to be filled in when the input is empty', () => {
            const element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        placeholder: 'foo',
                        value: '',
                    }} />
            );

            expect(element.refs.placeholder.textContent).toBe('foo');
        });

        it('causes the placeholder to be empty when the input is non-empty', () => {
            const element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        placeholder: 'foo',
                        value: 'x',
                    }} />
            );

            expect(element.refs.placeholder.textContent).toBe('');
        });

        it('properly manages placeholder visibility across many `props.inputProps.value` changes', () => {
            let element;

            element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        onChange: noop,
                        placeholder: 'foo',
                        value: 'x',
                    }} />
            );
            expect(element.refs.placeholder.textContent).toBe('');

            element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        onChange: noop,
                        placeholder: 'foo',
                        value: '',
                    }} />
            );
            expect(element.refs.placeholder.textContent).toBe('foo');

            element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        onChange: noop,
                        placeholder: 'foo',
                        value: 'x',
                    }} />
            );
            expect(element.refs.placeholder.textContent).toBe('');

            element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        onChange: noop,
                        placeholder: 'foo',
                        value: 'xy',
                    }} />
            );
            expect(element.refs.placeholder.textContent).toBe('');

            element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        onChange: noop,
                        placeholder: 'foo',
                        value: '',
                    }} />
            );
            expect(element.refs.placeholder.textContent).toBe('foo');
        });

        it('changes to the input text result do not result in a setState within the event handler', () => {
            const element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        placeholder: 'foo',
                        value: '',
                    }} />
            );

            sandbox.stub(element, 'setState');

            element.handleChange({target: {value: 'foobar'}});
            expect(element.setState.called).toBe(false);
        });
    });

    describe('uncontrolled mode', () => {
        it('causes the placeholder to be filled in when the input is empty', () => {
            const element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        placeholder: 'foo',
                    }} />
            );

            expect(element.refs.placeholder.textContent).toBe('foo');
        });

        it('causes the placeholder to be empty when given `inputProps.defaultValue`', () => {
            const element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        placeholder: 'foo',
                        defaultValue: 'foo',
                    }} />
            );

            expect(element.refs.placeholder.textContent).toBe('');
        });

        it('causes the placeholder to be empty when the input is non-empty', () => {
            const element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        placeholder: 'foo',
                    }} />
            );

            element.handleChange({target: {value: 'x'}});

            expect(element.refs.placeholder.textContent).toBe('');
        });

        it('properly manages placeholder visibility across many input changes', () => {
            const element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        placeholder: 'foo',
                    }} />
            );

            expect(element.refs.placeholder.textContent).toBe('foo');

            element.handleChange({target: {value: 'x'}});
            expect(element.refs.placeholder.textContent).toBe('');

            element.handleChange({target: {value: 'xy'}});
            expect(element.refs.placeholder.textContent).toBe('');

            element.handleChange({target: {value: ''}});
            expect(element.refs.placeholder.textContent).toBe('foo');
        });
    });

    describe('getValue()', () => {
        it('returns the current value of the input field', () => {
            const element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        defaultValue: 'bar',
                        placeholder: 'foo',
                    }} />
            );

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

            const element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        onChange: changeStub,
                        value: 'ap',
                    }} />
            );

            element.setValue('foo');
            expect(changeStub.calledOnce).toBe(true);
        });

        it('empties the placeholder if set with a non-empty string', () => {
            const element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        placeholder: 'bar',
                    }} />
            );

            expect(element.getValue()).toBe('');
            expect(element.refs.placeholder.textContent).toBe('bar');

            element.setValue('foo');
            expect(element.getValue()).toBe('foo');
            expect(element.refs.placeholder.textContent).toBe('');
        });

        it('restores the placeholder if set with an empty string', () => {
            const element = render(
                <Input
                    {...props}
                    inputProps={{
                        ...props.inputProps,
                        defaultValue: 'foo',
                        placeholder: 'bar',
                    }} />
            );

            expect(element.getValue()).toBe('foo');
            expect(element.refs.placeholder.textContent).toBe('');

            element.setValue('');
            expect(element.getValue()).toBe('');
            expect(element.refs.placeholder.textContent).toBe('bar');
        });
    });

    it('proxies input events to `props.inputProps.onBlur` if provided', () => {
        const stub = sandbox.stub();

        const element = render(
            <Input
                {...props}
                inputProps={{
                    ...props.inputProps,
                    onBlur: stub,
                }} />
        );

        const event = {};

        element.handleBlur(event);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWithMatch(event)).toBe(true);
    });

    it('proxies input events to `props.inputProps.onFocus` if provided', () => {
        const stub = sandbox.stub();

        const element = render(
            <Input
                {...props}
                inputProps={{
                    ...props.inputProps,
                    onFocus: stub,
                }} />
        );

        const event = {};

        element.handleFocus(event);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWithMatch(event)).toBe(true);
    });

    it('proxies input events to `props.inputProps.onChange` if provided', () => {
        const stub = sandbox.stub();

        const element = render(
            <Input
                {...props}
                inputProps={{
                    ...props.inputProps,
                    onChange: stub,
                }} />
        );

        const event = {target: {value: 'x'}};

        element.handleChange(event);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWithMatch(event)).toBe(true);
    });
});
