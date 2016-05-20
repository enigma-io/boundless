/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate} from 'react-addons-test-utils';

import UITokenizedInput from '../../UITokenizedInput';
import conformanceChecker from '../../UIUtils/conform';
import noop from '../../UIUtils/noop';

import sinon from 'sinon';

describe('UITokenizedInput', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const entities = [
        { text: 'apple' },
        { text: 'apricot' },
        { text: 'grape' }
    ];

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UITokenizedInput));

    describe('accepts', () => {
        it('arbitrary HTML attributes via props.inputProps', () => {
            const element = render(<UITokenizedInput inputProps={{'data-id': 'foo'}} />);
            const node = element.refs.typeahead.getInputNode();

            expect(node.getAttribute('data-id')).toBe('foo');
        });

        it('additional classes via props.inputProps.className', () => {
            const element = render(<UITokenizedInput inputProps={{className: 'foo'}} />);
            const node = element.refs.typeahead.getInputNode();

            expect(node.classList.contains('foo')).toBe(true);
        });

        it('an additional class as a string without replacing the core hook', () => {
            const element = render(<UITokenizedInput className='foo' />);
            const node = element.refs.wrapper;

            ['ui-tokenfield-wrapper', 'foo'].forEach(name => expect(node.classList.contains(name)).toBe(true));
        });
    });

    describe('CSS hook', () => {
        it('ui-tokenfield-wrapper should be rendered', () => {
            const element = render(<UITokenizedInput />);
            const node = element.refs.wrapper;

            expect(node.className).toContain('ui-tokenfield-wrapper');
        });

        it('ui-tokenfield should be rendered', () => {
            const element = render(<UITokenizedInput />);
            const node = element.refs.wrapper.querySelector('.ui-tokenfield');

            expect(node).not.toBe(null);
        });

        it('ui-tokenfield-tokens should be rendered', () => {
            const element = render(<UITokenizedInput />);
            const node = element.refs.wrapper.querySelector('.ui-tokenfield-tokens');

            expect(node).not.toBe(null);
        });

        it('ui-tokenfield-token should be rendered', () => {
            const element = render(<UITokenizedInput entities={entities} tokens={[0]} />);
            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token');

            expect(node).not.toBe(null);
        });

        it('ui-tokenfield-token-selected should be rendered', () => {
            const element = render(<UITokenizedInput entities={entities} tokens={[0]} tokensSelected={[0]} />);
            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token-selected');

            expect(node).not.toBe(null);
        });

        it('ui-tokenfield-token-close should be rendered', () => {
            const element = render(<UITokenizedInput entities={entities} tokens={[0]} tokensSelected={[0]} />);
            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token-close');

            expect(node).not.toBe(null);
        });

        it('ui-tokenfield-token-close not should be rendered if `showTokenClose` is `false`', () => {
            const element = render(<UITokenizedInput showTokenClose={false} entities={entities} tokens={[0]} tokensSelected={[0]} />);
            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token-close');

            expect(node).toBe(null);
        });
    });

    describe('add()', () => {
        it('should call handleAddToken with a valid index', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} handleAddToken={stub} />);

            element.add(0);

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch(0)).toBe(true);
        });

        it('should not call handleAddToken for an already tokenized index', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0]} handleAddToken={stub} />);

            element.add(0);

            expect(stub.called).toBe(false);
        });
    });

    describe('remove()', () => {
        it('should call handleRemoveTokens with valid indexes', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0]} handleRemoveTokens={stub} />);

            element.remove(0);

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([0])).toBe(true);
        });

        it('should not call handleRemoveTokens with invalid indexes', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0]} handleRemoveTokens={stub} />);

            element.remove(12);

            expect(stub.called).toBe(false);
        });
    });

    describe('props.tokens', () => {
        it('should be rendered to the UI as token children', () => {
            const element = render(
                <UITokenizedInput entities={entities} tokens={[0, 1]} />
            );

            expect(element.refs['token_0'].textContent).toBe('apple');
            expect(element.refs['token_1'].textContent).toBe('apricot');
        });

        it('should clear the input when a new token is added', () => {
            let element = render(
                <UITokenizedInput entities={entities} tokens={[0, 1]} />
            );

            element.refs.typeahead.value('blue');
            expect(element.refs.typeahead.getInputNode().value).toBe('blue');

            element = render(<UITokenizedInput entities={entities} tokens={[0, 1, 2]} />);

            expect(element.refs.typeahead.getInputNode().value).toBe('');
        });

        it('should not clear the input when a token is removed', () => {
            let element = render(
                <UITokenizedInput entities={entities} tokens={[0, 1]} />
            );

            element.refs.typeahead.value('blue');
            expect(element.refs.typeahead.getInputNode().value).toBe('blue');

            element = render(<UITokenizedInput entities={entities} tokens={[0]} />);

            expect(element.refs.typeahead.getInputNode().value).toBe('blue');
        });
    });

    describe('token creation', () => {
        it('should occur upon entity selection', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput defaultValue='ap' entities={entities} handleAddToken={stub} />);
            const typeahead = element.refs.typeahead;

            typeahead.handleKeyDown({
                key: 'Enter',
                nativeEvent: {preventDefault: noop},
                target: typeahead.getInputNode()
            });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch(0)).toBe(true);
        });
    });

    describe('token removal', () => {
        it('should occur when pressing the Backspace key with a selected token', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0, 1]} tokensSelected={[1]} handleRemoveTokens={stub} />);
            const typeahead = element.refs.typeahead;

            element.handleKeyDown({which: 8, preventDefault: noop});

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([1])).toBe(true);
        });

        it('should occur when pressing the Backspace key on a focused token', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0, 1]} handleRemoveTokens={stub} />);
            const typeahead = element.refs.typeahead;

            element.handleTokenKeyDown(0, {which: 8, preventDefault: noop});

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([0])).toBe(true);
        });

        it('should occur when clicking a token\'s "close" handle', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0, 1]} tokensSelected={[1]} handleRemoveTokens={stub} />);
            const typeahead = element.refs.typeahead;

            element.handleTokenCloseClick(1);

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([1])).toBe(true);
        });
    });

    describe('token selection', () => {
        it('should occur when pressing the left arrow key at the start of the input field', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0, 1]} handleNewSelection={stub} />);
            const typeahead = element.refs.typeahead;

            typeahead.focus();
            element.handleKeyDown({which: 37});

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([1])).toBe(true);
        });

        it('should occur if pressing `Enter` on a focused token', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0, 1]} handleNewSelection={stub} />);
            const typeahead = element.refs.typeahead;

            element.handleTokenKeyDown(0, {which: 13, preventDefault: noop});

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([0])).toBe(true);
        });

        it('should occur if pressing `Space` on a focused token', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0, 1]} handleNewSelection={stub} />);
            const typeahead = element.refs.typeahead;

            element.handleTokenKeyDown(0, {which: 32, preventDefault: noop});

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([0])).toBe(true);
        });

        it('should not change if pressing the left arrow key with the only token already selected', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0]} tokensSelected={[0]} handleNewSelection={stub} />);
            const typeahead = element.refs.typeahead;

            element.handleKeyDown({which: 37});

            expect(stub.called).toBe(false);
        });

        it('should deselect if pressing the right arrow key with the only token already selected and focus the input', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0]} tokensSelected={[0]} handleNewSelection={stub} />);
            const typeahead = element.refs.typeahead;

            element.refs.wrapper.querySelector('.ui-tokenfield-token').focus();
            element.handleKeyDown({which: 39});

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([])).toBe(true);
            expect(document.activeElement).toBe(typeahead.getInputNode());
        });

        it('should move rightward if the rightmost token is not selected on right arrow key press', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0, 1]} tokensSelected={[0]} handleNewSelection={stub} />);
            const typeahead = element.refs.typeahead;

            element.refs.wrapper.querySelector('.ui-tokenfield-token').focus();
            element.handleKeyDown({which: 39});

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([1])).toBe(true);
        });

        it('should focus the token as well', () => {
            let element = render(
                <UITokenizedInput entities={entities}
                                  tokens={[0, 1]}
                                  tokensSelected={[]} />
            );

            const modifySelection = indexes => {
                element = render(
                    <UITokenizedInput entities={entities}
                                      tokens={[0, 1]}
                                      tokensSelected={indexes} />
                );
            };

            const typeahead = element.refs.typeahead;
                  typeahead.focus();

            expect(document.activeElement).toBe(typeahead.getInputNode());

            modifySelection([1]);

            expect(document.activeElement).toBe(element.refs.token_1);
        });

        it('should not modify focus if all tokens are removed', () => {
            let element = render(
                <UITokenizedInput entities={entities}
                                  tokens={[0, 1]}
                                  tokensSelected={[1]} />
            );

            const modifySelection = indexes => {
                element = render(
                    <UITokenizedInput entities={entities}
                                      tokens={[0, 1]}
                                      tokensSelected={indexes} />
                );
            };

            const typeahead = element.refs.typeahead;
                  typeahead.focus();

            expect(document.activeElement).toBe(typeahead.getInputNode());

            modifySelection([]);

            expect(document.activeElement).toBe(typeahead.getInputNode());
        });

        it('should move focus to the leftmost token of the selection when mass selecting after shift + left arrow', () => {
            let element;

            const modifySelection = indexes => {
                element = render(
                    <UITokenizedInput entities={entities}
                                      tokens={[0, 1]}
                                      tokensSelected={indexes}
                                      handleNewSelection={modifySelection} />
                );
            };

            element = render(
                <UITokenizedInput entities={entities}
                                  tokens={[0, 1]}
                                  tokensSelected={[1]}
                                  handleNewSelection={modifySelection} />
            );

            element.refs.token_1.focus();
            element.handleKeyDown({which: 37, shiftKey: true});

            expect(document.activeElement).toBe(element.refs.token_0);
        });

        it('should move focus to the rightmost token of the selection when mass selecting after shift + right arrow', () => {
            let element;

            const modifySelection = indexes => {
                element = render(
                    <UITokenizedInput entities={entities}
                                      tokens={[0, 1]}
                                      tokensSelected={indexes}
                                      handleNewSelection={modifySelection} />
                );
            };

            element = render(
                <UITokenizedInput entities={entities}
                                  tokens={[0, 1]}
                                  tokensSelected={[0]}
                                  handleNewSelection={modifySelection} />
            );

            element.refs.token_0.focus();
            element.handleKeyDown({which: 39, shiftKey: true});

            expect(document.activeElement).toBe(element.refs.token_1);
        });
    });

    describe('multiple token selection', () => {
        it('should occur when pressing the shift and left arrow keys', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0, 1]} tokensSelected={[1]} handleNewSelection={stub} />);
            const typeahead = element.refs.typeahead;

            typeahead.focus();
            element.handleKeyDown({
                which: 37,
                shiftKey: true
            });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([0, 1])).toBe(true);
        });

        it('should occur when pressing the shift and right arrow keys', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0, 1]} tokensSelected={[0]} handleNewSelection={stub} />);
            const typeahead = element.refs.typeahead;

            typeahead.focus();
            element.handleKeyDown({
                which: 39,
                shiftKey: true
            });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([0, 1])).toBe(true);
        });

        it('should occur when pressing the cmd + a keys', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0, 1]} tokensSelected={[0]} handleNewSelection={stub} />);
            const typeahead = element.refs.typeahead;

            typeahead.focus();
            element.handleKeyDown({
                which: 65,              // letter "a"
                metaKey: true,          // "cmd"
                preventDefault: noop
            });

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([0, 1])).toBe(true);
        });
    });

    describe('input focus', () => {
        it('should clear any token selection', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0, 1]} tokensSelected={[1]} handleNewSelection={stub} />);
            const typeahead = element.refs.typeahead;

            Simulate.focus(typeahead.getInputNode());

            expect(stub.called).toBe(true);
            expect(stub.calledWithMatch([])).toBe(true);
        });

        it('should proxy up the focus event if inputProps.onFocus is provided', () => {
            const stub = sinon.stub();
            const element = render(
                <UITokenizedInput entities={entities}
                                  tokens={[0, 1]}
                                  tokensSelected={[1]}
                                  inputProps={{onFocus: stub}} />
            );

            const typeahead = element.refs.typeahead;

            Simulate.focus(typeahead.getInputNode());

            expect(stub.called).toBe(true);
        });

        it('should be returned when a token is removed', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} tokens={[0, 1]} />);
            const typeahead = element.refs.typeahead;

            element.refs.token_0.focus();
            expect(document.activeElement).toBe(element.refs.token_0);

            element.handleTokenKeyDown(0, {which: 8, preventDefault: noop});

            expect(document.activeElement).toBe(typeahead.getInputNode());
        });

        it('should be returned after pressing the cmd + a keys', () => {
            /* if you don't do this and the focus is elsewhere, the user may have to hit backspace twice
               to fully clear the typeahead, which is gross. */

            const element = render(<UITokenizedInput entities={entities} tokens={[0, 1]} />);
            const typeahead = element.refs.typeahead;

            element.refs.token_0.focus();

            element.handleKeyDown({
                which: 65,              // letter "a"
                metaKey: true,          // "cmd"
                preventDefault: noop
            });

            expect(document.activeElement).toBe(typeahead.getInputNode());
        });
    });

    describe('input keydown', () => {
        it('should be forwarded if onKeyDown is provided', () => {
            const stub = sinon.stub();
            const element = render(
                <UITokenizedInput entities={entities}
                                  onKeyDown={stub} />
            );

            element.handleKeyDown({
                which: 13,
                persist: noop,
            });

            expect(stub.called).toBe(true);
        });
    });
});
