/* eslint no-unused-expressions:0 */

import UIFittedText from './index';
import React from 'react';
import ReactDOM from 'react-dom';

describe('UIFittedText', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes', () => {
            const text = ReactDOM.render(<UIFittedText data-id='foo' />, mountNode);
            const node = ReactDOM.findDOMNode(text);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const text = ReactDOM.render(<UIFittedText className='foo' />, mountNode);

            assert(ReactDOM.findDOMNode(text).classList.contains('ui-text'));
            assert(ReactDOM.findDOMNode(text).classList.contains('foo'));
        });

        it('text to render', () => {
            const text = ReactDOM.render(<UIFittedText>foo</UIFittedText>, mountNode);
            const node = ReactDOM.findDOMNode(text);

            expect(node.textContent).to.equal('foo');
        });

        it('numbers to render', () => {
            const text = ReactDOM.render(<UIFittedText>{1234}</UIFittedText>, mountNode);
            const node = ReactDOM.findDOMNode(text);

            expect(node.textContent).to.equal('1234');
        });
    });

    describe('CSS hooks', () => {
        it('ui-text should render', () => {
            const text = ReactDOM.render(<UIFittedText />, mountNode);

            assert(ReactDOM.findDOMNode(text).classList.contains('ui-text'));
        });
    });

    describe('maximum size constraint', () => {
        // Since the rescale happens after mount, we need to wait for the call stack to finish before we can
        // verify it completed successfully

        it('should work', (done) => {
            const tree = ReactDOM.render(
                <div style={{height: '100px', width: '400px'}}>
                    <UIFittedText maxFontSize={30}>foo</UIFittedText>
                </div>, mountNode
            );

            const node = ReactDOM.findDOMNode(tree).children[0];

            window.setTimeout(function verifier() {
                expect(node.style.fontSize).to.equal('30px');
                done();
            }, 0);
        });

        it('should be ignored if the container size is too small', (done) => {
            const tree = ReactDOM.render(
                <div style={{width: '10px'}}>
                    <UIFittedText maxFontSize={30}>foo</UIFittedText>
                </div>, mountNode
            );

            const node = ReactDOM.findDOMNode(tree).children[0];

            window.setTimeout(function verifier() {
                expect(node.style.fontSize).to.not.equal('30px');
                done();
            }, 0);
        });
    });
});
