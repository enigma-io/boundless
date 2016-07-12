/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UITextualInput from '../../UITextualInput';
import checker from '../../UIUtils/conform';
import noop from '../../UIUtils/noop';

import sinon from 'sinon';

describe('UITextualInput', () => {
    const mount_node = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mount_node);

    const base_props = {
        inputProps: {
            name: 'foo',
        }
    };

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mount_node);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => {
        checker(render, UITextualInput, base_props);
    });

    describe('accepts', () => {
        it('arbitrary HTML attributes via props.inputProps', () => {
            const element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        'data-id': 'foo',
                    }} />
            );

            expect(element.refs.field.getAttribute('data-id')).toBe('foo');
        });

        it('additional classes via props.inputProps.className', () => {
            const element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        className: 'foo',
                    }} />
            );

            expect(element.refs.field.classList.contains('foo')).toBe(true);
        });
    });

    describe('CSS hook', () => {
        const has_class = (dom, name) => dom.classList.contains(name);

        it('ui-textual-input-wrapper should be rendered', () => {
            const element = render(<UITextualInput {...base_props} />);

            expect(has_class(element.refs.wrapper, 'ui-textual-input-wrapper')).toBe(true);
        });

        it('ui-textual-input should be rendered', () => {
            const element = render(<UITextualInput {...base_props} />);

            expect(has_class(element.refs.field, 'ui-textual-input')).toBe(true);
        });
    });

    it('renders the placeholder facsimile', () => {
        const element = render(<UITextualInput {...base_props} />);

        expect(element.refs.placeholder).not.toBeUndefined();
        expect(element.refs.placeholder.classList.contains('ui-textual-input-placeholder')).toBe(true);
    });

    it('uses the proper placeholder text (via props.inputProps.placeholder)', () => {
        const element = render(
            <UITextualInput
                {...base_props}
                inputProps={{
                    ...base_props.inputProps,
                    placeholder: 'foo',
                }} />
        );

        expect(element.refs.placeholder.textContent).toBe('foo');
    });

    it('does not empty the placeholder on input focus if `props.hidePlaceholderOnFocus` is false', () => {
        const element = render(
            <UITextualInput
                {...base_props}
                hidePlaceholderOnFocus={false}
                inputProps={{
                    ...base_props.inputProps,
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
            <UITextualInput
                {...base_props}
                hidePlaceholderOnFocus={true}
                inputProps={{
                    ...base_props.inputProps,
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
            <UITextualInput
                {...base_props}
                hidePlaceholderOnFocus={true}
                inputProps={{
                    ...base_props.inputProps,
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
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        placeholder: 'foo',
                        value: '',
                    }} />
            );

            expect(element.refs.placeholder.textContent).toBe('foo');
        });

        it('causes the placeholder to be empty when the input is non-empty', () => {
            const element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        placeholder: 'foo',
                        value: 'x',
                    }} />
            );

            expect(element.refs.placeholder.textContent).toBe('');
        });

        it('properly manages placeholder visibility across many `props.inputProps.value` changes', () => {
            let element;

            element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        onChange: noop,
                        placeholder: 'foo',
                        value: 'x',
                    }} />
            );
            expect(element.refs.placeholder.textContent).toBe('');

            element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        onChange: noop,
                        placeholder: 'foo',
                        value: '',
                    }} />
            );
            expect(element.refs.placeholder.textContent).toBe('foo');

            element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        onChange: noop,
                        placeholder: 'foo',
                        value: 'x',
                    }} />
            );
            expect(element.refs.placeholder.textContent).toBe('');

            element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        onChange: noop,
                        placeholder: 'foo',
                        value: 'xy',
                    }} />
            );
            expect(element.refs.placeholder.textContent).toBe('');

            element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        onChange: noop,
                        placeholder: 'foo',
                        value: '',
                    }} />
            );
            expect(element.refs.placeholder.textContent).toBe('foo');
        });

        it('changes to the input text result do not result in a setState within the event handler', () => {
            const element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
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
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        placeholder: 'foo',
                    }} />
            );

            expect(element.refs.placeholder.textContent).toBe('foo');
        });

        it('causes the placeholder to be empty when given `inputProps.defaultValue`', () => {
            const element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        placeholder: 'foo',
                        defaultValue: 'foo',
                    }} />
            );

            expect(element.refs.placeholder.textContent).toBe('');
        });

        it('causes the placeholder to be empty when the input is non-empty', () => {
            const element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        placeholder: 'foo',
                    }} />
            );

            element.handleChange({target: {value: 'x'}});

            expect(element.refs.placeholder.textContent).toBe('');
        });

        it('properly manages placeholder visibility across many input changes', () => {
            const element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
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
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        defaultValue: 'bar',
                        placeholder: 'foo',
                    }} />
            );

            expect(element.getValue()).toBe('bar');
        });
    });

    describe('setValue(value: string)', () => {
        it('changes the input value', () => {
            const element = render(<UITextualInput {...base_props} />);

            expect(element.getValue()).toBe('');

            element.setValue('foo');
            expect(element.getValue()).toBe('foo');
        });

        it('does not change the input value for a controlled component', () => {
            sandbox.stub(console, 'warn');

            const element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        onChange: noop,
                        value: 'ap',
                    }} />
            );

            expect(element.getValue()).toBe('ap');

            element.setValue('foo');
            expect(element.getValue()).toBe('ap');
            expect(console.warn.calledOnce).toBe(true);
        });

        it('empties the placeholder if set with a non-empty string', () => {
            const element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
                        placeholder: 'bar',
                    }} />
            );

            expect(element.getValue()).toBe('');
            expect(element.refs.placeholder.textContent).toBe('bar');

            element.setValue('foo');
            expect(element.getValue()).toBe('foo');
            expect(element.refs.placeholder.textContent).toBe('');
        });

        it('should restore the placeholder if set with an empty string', () => {
            const element = render(
                <UITextualInput
                    {...base_props}
                    inputProps={{
                        ...base_props.inputProps,
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

    it('should proxy input events to `props.inputProps.onBlur` if provided', () => {
        const stub = sandbox.stub();

        const element = render(
            <UITextualInput
                {...base_props}
                inputProps={{
                    ...base_props.inputProps,
                    onBlur: stub,
                }} />
        );

        const faux_event = {persist: noop};

        element.handleBlur(faux_event);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWithMatch(faux_event)).toBe(true);
    });

    it('should proxy input events to `props.inputProps.onFocus` if provided', () => {
        const stub = sandbox.stub();

        const element = render(
            <UITextualInput
                {...base_props}
                inputProps={{
                    ...base_props.inputProps,
                    onFocus: stub,
                }} />
        );

        const faux_event = {persist: noop};

        element.handleFocus(faux_event);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWithMatch(faux_event)).toBe(true);
    });

    it('should proxy input events to `props.inputProps.onChange` if provided', () => {
        const stub = sandbox.stub();

        const element = render(
            <UITextualInput
                {...base_props}
                inputProps={{
                    ...base_props.inputProps,
                    onChange: stub,
                }} />
        );

        const faux_event = {persist: noop, target: {value: 'x'}};

        element.handleChange(faux_event);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWithMatch(faux_event)).toBe(true);
    });
});
