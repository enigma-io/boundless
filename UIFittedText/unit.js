/* eslint no-unused-expressions:0 */

import UIFittedText from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../UIUtils/conform';

describe('UIFittedText', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIFittedText));

    describe('accepts', () => {
        it('an additional class as a string without replacing the core hook', () => {
            const text = render(<UIFittedText className='foo' />);

            assert(ReactDOM.findDOMNode(text).classList.contains('ui-text'));
            assert(ReactDOM.findDOMNode(text).classList.contains('foo'));
        });

        it('text to render', () => {
            const text = render(<UIFittedText>foo</UIFittedText>);
            const node = ReactDOM.findDOMNode(text);

            expect(node.textContent).to.equal('foo');
        });

        it('numbers to render', () => {
            const text = render(<UIFittedText>{1234}</UIFittedText>);
            const node = ReactDOM.findDOMNode(text);

            expect(node.textContent).to.equal('1234');
        });
    });

    describe('CSS hooks', () => {
        it('ui-text should render', () => {
            const text = render(<UIFittedText />);

            assert(ReactDOM.findDOMNode(text).classList.contains('ui-text'));
        });
    });

    describe('maximum size constraint', () => {
        // Since the rescale happens after mount, we need to wait for the call stack to finish before we can
        // verify it completed successfully

        it('should work', (done) => {
            const tree = render(
                <div style={{height: '100px', width: '400px'}}>
                    <UIFittedText maxFontSize={30}>foo</UIFittedText>
                </div>
            );

            const node = ReactDOM.findDOMNode(tree).children[0];

            window.setTimeout(function verifier() {
                expect(node.style.fontSize).to.equal('30px');
                done();
            }, 0);
        });

        it('should be ignored if the container size is too small', (done) => {
            const tree = render(
                <div style={{width: '10px'}}>
                    <UIFittedText maxFontSize={30}>foo</UIFittedText>
                </div>
            );

            const node = ReactDOM.findDOMNode(tree).children[0];

            window.setTimeout(function verifier() {
                expect(node.style.fontSize).to.not.equal('30px');
                done();
            }, 0);
        });
    });
});
