/* eslint no-unused-expressions:0 */

import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import sinon from 'sinon';
import { noop } from 'lodash';

import TokenizedInput from './index';
import { $, conformanceChecker } from '../boundless-utils-test-helpers/index';

describe('TokenizedInput component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const entities = [
        { text: 'apple' },
        { text: 'apricot' },
        { text: 'grape' },
    ];

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the Boundless prop interface standards', () => {
        conformanceChecker(render, TokenizedInput);
    });

    it('accepts arbitrary HTML attributes via props.inputProps', () => {
        const element = render(<TokenizedInput inputProps={{ 'data-id': 'foo' }} />);
        const node = element.refs.typeahead.getInputNode();

        expect(node.getAttribute('data-id')).toBe('foo');
    });

    it('accepts additional classes via props.inputProps.className', () => {
        const element = render(<TokenizedInput inputProps={{ className: 'foo' }} />);
        const node = element.refs.typeahead.getInputNode();

        expect(node.classList.contains('foo')).toBe(true);
    });

    it('accepts an additional class as a string without replacing the core hook', () => {
        const element = render(<TokenizedInput className='foo' />);
        const node = element.refs.wrapper;

        [ 'b-tokenfield-wrapper', 'foo' ].forEach((name) => {
            expect(node.classList.contains(name)).toBe(true);

        });
    });

    it('accepts custom close token JSX', () => {
        render(
            <TokenizedInput
                entities={entities}
                tokens={[ 0 ]}
                tokenCloseComponent={<span>foo</span>} />
        );

        expect($('.b-tokenfield-token-close').textContent).toBe('foo');
    });

    it('renders .b-tokenfield-wrapper', () => {
        render(<TokenizedInput />);
        expect($('.b-tokenfield-wrapper')).not.toBe(null);
    });

    it('renders .b-tokenfield', () => {
        render(<TokenizedInput />);
        expect($('.b-tokenfield')).not.toBe(null);
    });

    it('renders .b-tokenfield-tokens', () => {
        render(<TokenizedInput />);
        expect($('.b-tokenfield-tokens')).not.toBe(null);
    });

    it('renders .b-tokenfield-token', () => {
        render(<TokenizedInput entities={entities} tokens={[ 0 ]} />);
        expect($('.b-tokenfield-token')).not.toBe(null);
    });

    it('renders .b-tokenfield-token-selected', () => {
        render(<TokenizedInput entities={entities} tokens={[ 0 ]} tokensSelected={[ 0 ]} />);
        expect($('.b-tokenfield-token-selected')).not.toBe(null);
    });

    it('renders .b-tokenfield-token-close', () => {
        render(<TokenizedInput entities={entities} tokens={[ 0 ]} tokensSelected={[ 0 ]} />);
        expect($('.b-tokenfield-token-close')).not.toBe(null);
    });

    it('does not render .b-tokenfield-token-close if `tokenCloseVisible` is `false`', () => {
        render(<TokenizedInput entities={entities} tokenCloseVisible={false} tokens={[ 0 ]} tokensSelected={[ 0 ]} />);
        expect($('.b-tokenfield-token-close')).toBe(null);
    });

    describe('props.tokens', () => {
        it('renders to the UI as token children', () => {
            const element = render(<TokenizedInput entities={entities} tokens={[ 0, 1 ]} />);

            expect(element.refs.token_0.textContent).toContain('apple');
            expect(element.refs.token_1.textContent).toContain('apricot');
        });

        it('clears the input when a new token is added', () => {
            let element = render(<TokenizedInput entities={entities} tokens={[ 0, 1 ]} />);

            element.setValue('blue');
            expect(element.getValue()).toBe('blue');

            element = render(<TokenizedInput entities={entities} tokens={[ 0, 1, 2 ]} />);
            expect(element.getValue()).toBe('');
        });

        it('will not clear the input when a token is removed', () => {
            let element = render(<TokenizedInput entities={entities} tokens={[ 0, 1 ]} />);

            element.setValue('blue');
            expect(element.getValue()).toBe('blue');

            element = render(<TokenizedInput entities={entities} tokens={[ 0 ]} />);
            expect(element.getValue()).toBe('blue');
        });
    });

    describe('token creation', () => {
        it('occurs upon entity selection', () => {
            const stub = sinon.stub();
            const element = render(
                <TokenizedInput
                    entities={entities}
                    handleAddToken={stub}
                    inputProps={{ defaultValue: 'ap' }} />
            );

            const typeahead = element.refs.typeahead;

            typeahead.handleKeyDown({
                key: 'Enter',
                nativeEvent: { preventDefault: noop },
                target: typeahead.getInputNode(),
            });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch(0)).toBe(true);
        });
    });

    describe('token removal', () => {
        it('occurs when pressing the Backspace key with a selected token', () => {
            const stub = sinon.stub();
            const element = render(
                <TokenizedInput
                    entities={entities}
                    handleRemoveTokens={stub}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[ 1 ]} />
            );

            element.handleKeyDown({ which: 8, preventDefault: noop });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([ 1 ])).toBe(true);
        });

        it('occurs when pressing the Backspace key on a focused token', () => {
            const stub = sinon.stub();
            const element = render(
                <TokenizedInput
                    entities={entities}
                    handleRemoveTokens={stub}
                    tokens={[ 0, 1 ]} />
            );

            element.handleTokenKeyDown(0, { which: 8, preventDefault: noop });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([ 0 ])).toBe(true);
        });

        it('occurs when clicking a token\'s "close" handle', () => {
            const stub = sinon.stub();
            const element = render(
                <TokenizedInput
                    entities={entities}
                    handleRemoveTokens={stub}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[ 1 ]} />
            );

            element.handleTokenCloseClick(1, { stopPropagation: noop });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([ 1 ])).toBe(true);
        });
    });

    describe('token selection', () => {
        let element;
        let stub;
        let typeahead;

        beforeEach(() => {
            stub = sinon.stub();
            element = render(
                <TokenizedInput
                    entities={entities}
                    handleNewSelection={stub}
                    tokens={[ 0, 1 ]} />
            );

            typeahead = element.refs.typeahead;
        });

        it('occurs when pressing the left arrow key at the start of the input field', () => {
            typeahead.focus();
            element.handleKeyDown({ which: 37 });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([ 1 ])).toBe(true);
        });

        it('occurs if pressing `Enter` on a focused token', () => {
            element.handleTokenKeyDown(0, { which: 13, preventDefault: noop });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([ 0 ])).toBe(true);
        });

        it('occurs if pressing `Space` on a focused token', () => {
            element.handleTokenKeyDown(0, { which: 32, preventDefault: noop });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([ 0 ])).toBe(true);
        });

        it('will not change if pressing the left arrow key with the only token already selected', () => {
            element = render(
                <TokenizedInput
                    entities={entities}
                    handleNewSelection={stub}
                    tokens={[ 0 ]}
                    tokensSelected={[ 0 ]} />
            );

            element.handleKeyDown({ which: 37 });

            expect(stub.called).toBe(false);
        });

        it('deselects if pressing the right arrow key with the only token already selected and focus the input', () => {
            element = render(
                <TokenizedInput
                    entities={entities}
                    handleNewSelection={stub}
                    tokens={[ 0 ]}
                    tokensSelected={[ 0 ]} />
            );

            element.refs.wrapper.querySelector('.b-tokenfield-token').focus();
            element.handleKeyDown({ which: 39 });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([])).toBe(true);
            expect(document.activeElement).toBe(typeahead.getInputNode());
        });

        it('moves rightward if the rightmost token is not selected on right arrow key press', () => {
            element = render(
                <TokenizedInput
                    entities={entities}
                    handleNewSelection={stub}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[ 0 ]} />
            );

            element.refs.wrapper.querySelector('.b-tokenfield-token').focus();
            element.handleKeyDown({ which: 39 });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([ 1 ])).toBe(true);
        });

        it('focuses the token as well', () => {
            element = render(
                <TokenizedInput
                    entities={entities}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[]} />
            );

            const modifySelection = (indexes) => {
                element = render(
                    <TokenizedInput entities={entities}
                                      tokens={[ 0, 1 ]}
                                      tokensSelected={indexes} />
                );
            };

            element.focus();
            expect(document.activeElement).toBe(element.getInputNode());

            modifySelection([ 1 ]);
            expect(document.activeElement).toBe(element.refs.token_1);
        });

        it('will not modify focus if all tokens are removed', () => {
            element = render(
                <TokenizedInput
                    entities={entities}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[ 1 ]} />
            );

            const modifySelection = (indexes) => {
                element = render(
                    <TokenizedInput
                        entities={entities}
                        tokens={[ 0, 1 ]}
                        tokensSelected={indexes} />
                );
            };

            element.focus();
            expect(document.activeElement).toBe(element.getInputNode());

            modifySelection([]);
            expect(document.activeElement).toBe(element.getInputNode());
        });

        it('moves focus to the leftmost token of the selection when mass selecting after shift + left arrow', () => {
            const modifySelection = (indexes) => {
                element = render(
                    <TokenizedInput
                        entities={entities}
                        handleNewSelection={modifySelection}
                        tokens={[ 0, 1 ]}
                        tokensSelected={indexes} />
                );
            };

            element = render(
                <TokenizedInput
                    entities={entities}
                    handleNewSelection={modifySelection}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[ 1 ]} />
            );

            element.refs.token_1.focus();
            element.handleKeyDown({ which: 37, shiftKey: true });

            expect(document.activeElement).toBe(element.refs.token_0);
        });

        it('moves focus to the rightmost token of the selection when mass selecting after shift + right arrow', () => {
            const modifySelection = (indexes) => {
                element = render(
                    <TokenizedInput
                        entities={entities}
                        handleNewSelection={modifySelection}
                        tokens={[ 0, 1 ]}
                        tokensSelected={indexes} />
                );
            };

            element = render(
                <TokenizedInput
                    entities={entities}
                    handleNewSelection={modifySelection}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[ 0 ]} />
            );

            element.refs.token_0.focus();
            element.handleKeyDown({ which: 39, shiftKey: true });

            expect(document.activeElement).toBe(element.refs.token_1);
        });
    });

    describe('multiple token selection', () => {
        it('occurs when pressing the shift and left arrow keys', () => {
            const stub = sinon.stub();
            const element = render(
                <TokenizedInput
                    entities={entities}
                    handleNewSelection={stub}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[ 1 ]} />
            );

            element.focus();
            element.handleKeyDown({
                which: 37,
                shiftKey: true,
            });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([ 0, 1 ])).toBe(true);
        });

        it('occurs when pressing the shift and right arrow keys', () => {
            const stub = sinon.stub();
            const element = render(
                <TokenizedInput
                    entities={entities}
                    handleNewSelection={stub}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[ 0 ]} />
            );

            element.focus();
            element.handleKeyDown({
                which: 39,
                shiftKey: true,
            });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([ 0, 1 ])).toBe(true);
        });

        it('occurs when pressing the cmd + a keys', () => {
            const stub = sinon.stub();
            const element = render(
                <TokenizedInput
                    entities={entities}
                    handleNewSelection={stub}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[ 0 ]} />
            );

            element.focus();
            element.handleKeyDown({
                which: 65,              // letter "a"
                metaKey: true,          // "cmd"
                preventDefault: noop,
            });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([ 0, 1 ])).toBe(true);
        });
    });

    describe('input click', () => {
        it('clears any token selection', () => {
            const stub = sinon.stub();
            const element = render(
                <TokenizedInput
                    entities={entities}
                    handleNewSelection={stub}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[ 1 ]} />
            );

            Simulate.click(element.getInputNode());
            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([])).toBe(true);
        });

        it('proxies up the click event if inputProps.onClick is provided', () => {
            const stub = sinon.stub();
            const element = render(
                <TokenizedInput
                    entities={entities}
                    inputProps={{ onClick: stub }}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[ 1 ]} />
            );

            Simulate.click(element.getInputNode());
            expect(stub.called).toBe(true);
        });
    });

    describe('input focus', () => {
        it('clears any token selection', () => {
            const stub = sinon.stub();
            const element = render(
                <TokenizedInput
                    entities={entities}
                    handleNewSelection={stub}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[ 1 ]} />
            );

            Simulate.focus(element.getInputNode());
            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([])).toBe(true);
        });

        it('proxies up the focus event if inputProps.onFocus is provided', () => {
            const stub = sinon.stub();
            const element = render(
                <TokenizedInput
                    entities={entities}
                    inputProps={{ onFocus: stub }}
                    tokens={[ 0, 1 ]}
                    tokensSelected={[ 1 ]} />
            );

            Simulate.focus(element.getInputNode());
            expect(stub.called).toBe(true);
        });

        it('is returned when a token is removed', () => {
            const element = render(
                <TokenizedInput
                    entities={entities}
                    tokens={[ 0, 1 ]} />
            );

            element.refs.token_0.focus();
            expect(document.activeElement).toBe(element.refs.token_0);

            element.handleTokenKeyDown(0, { which: 8, preventDefault: noop });
            expect(document.activeElement).toBe(element.getInputNode());
        });

        it('is returned after pressing the cmd + a keys', () => {
            /* if you don't do this and the focus is elsewhere, the user may have to
            hit backspace twice to fully clear the typeahead, which is gross. */

            const element = render(
                <TokenizedInput
                    entities={entities}
                    tokens={[ 0, 1 ]} />
            );

            element.refs.token_0.focus();

            element.handleKeyDown({
                which: 65,              // letter "a"
                metaKey: true,          // "cmd"
                preventDefault: noop,
            });

            expect(document.activeElement).toBe(element.getInputNode());
        });
    });

    describe('input keydown', () => {
        it('is forwarded if onKeyDown is provided', () => {
            const stub = sinon.stub();
            const element = render(
                <TokenizedInput
                    entities={entities}
                    onKeyDown={stub} />
            );

            element.handleKeyDown({ which: 13 });
            expect(stub.called).toBe(true);
        });
    });

    describe('instance methods', () => {
        describe('add(index: number)', () => {
            it('calls handleAddToken with a valid index', () => {
                const stub = sinon.stub();
                const element = render(
                    <TokenizedInput
                        entities={entities}
                        handleAddToken={stub} />
                );

                element.add(0);

                expect(stub.called).toBe(true);
                expect(stub.calledWithMatch(0)).toBe(true);
            });

            it('will not call handleAddToken for an already tokenized index', () => {
                const stub = sinon.stub();
                const element = render(
                    <TokenizedInput
                        entities={entities}
                        handleAddToken={stub}
                        tokens={[ 0 ]} />
                );

                element.add(0);

                expect(stub.called).toBe(false);
            });
        });

        describe('focus()', () => {
            it('sets the underlying textual input as the active document element', () => {
                const element = render(<TokenizedInput />);
                const node = element.getInputNode();

                expect(document.activeElement).not.toBe(node);

                element.focus();
                expect(document.activeElement).toBe(node);
            });
        });

        describe('getInputNode()', () => {
            it('returns the raw DOM node of the underlying textual input', () => {
                const element = render(<TokenizedInput />);

                expect(element.getInputNode()).not.toBe(null);
                expect(element.getInputNode().tagName.toLowerCase()).toBe('input');
            });
        });

        describe('getValue()', () => {
            it('returns the current value of the underlying textual input', () => {
                const element = render(
                    <TokenizedInput
                        entities={entities}
                        inputProps={{ defaultValue: 'ap' }} />
                );

                expect(element.getValue()).toBe('ap');
            });
        });

        describe('getSelectedEntityText()', () => {
            it('returns the `text` property of the currently highlighted entity from `props.entities`', () => {
                const element = render(
                    <TokenizedInput
                        entities={entities}
                        inputProps={{ defaultValue: 'ap' }} />
                );

                expect(element.getSelectedEntityText()).toBe('apple');
            });

            it('returns an empty string if no entity is highlighted', () => {
                const element = render(
                    <TokenizedInput
                        entities={entities} />
                );

                expect(element.getSelectedEntityText()).toBe('');
            });
        });

        describe('remove(index: number)', () => {
            let element;
            let stub;

            beforeEach(() => {
                stub = sinon.stub();
                element = render(
                    <TokenizedInput
                        entities={entities}
                        handleRemoveTokens={stub}
                        tokens={[ 0 ]} />
                );
            });

            it('calls handleRemoveTokens() with valid indexes', () => {
                element.remove(0);

                expect(stub.called).toBe(true);
                expect(stub.calledWithMatch([ 0 ])).toBe(true);
            });

            it('will not call handleRemoveTokens() with invalid indexes', () => {
                element.remove(12);

                expect(stub.called).toBe(false);
            });
        });

        describe('select()', () => {
            it('creates a full selection of the input text', () => {
                const element = render(<TokenizedInput inputProps={{ defaultValue: 'ap' }} />);
                const node = element.getInputNode();

                expect(node.selectionStart).toBe(0);
                expect(node.selectionEnd).toBe(0);

                element.select();
                expect(node.selectionStart).toBe(0);
                expect(node.selectionEnd).toBe(2);
            });
        });

        describe('setValue(value: string)', () => {
            it('changes the value of the input', () => {
                const element = render(
                    <TokenizedInput
                        entities={entities}
                        inputProps={{ defaultValue: 'ap' }} />
                );

                expect(element.getValue()).toBe('ap');

                element.setValue('foo');
                expect(element.getValue()).toBe('foo');
            });
        });
    });
});
