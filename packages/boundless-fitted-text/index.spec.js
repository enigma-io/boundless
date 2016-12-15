/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import FittedText from './index';
import conformanceChecker from '../boundless-utils-conformance/index';

describe('fitted text component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, FittedText));

    describe('accepts', () => {
        it('an additional class as a string without replacing the core hook', () => {
            const text = render(<FittedText className='foo' />);

            expect(ReactDOM.findDOMNode(text).classList.contains('b-text')).toBe(true);
            expect(ReactDOM.findDOMNode(text).classList.contains('foo')).toBe(true);
        });

        it('text to render', () => {
            const text = render(<FittedText>foo</FittedText>);
            const node = ReactDOM.findDOMNode(text);

            expect(node.textContent).toBe('foo');
        });

        it('numbers to render', () => {
            const text = render(<FittedText>{1234}</FittedText>);
            const node = ReactDOM.findDOMNode(text);

            expect(node.textContent).toBe('1234');
        });
    });

    describe('CSS hooks', () => {
        it('renders .b-text', () => {
            const text = render(<FittedText />);

            expect(ReactDOM.findDOMNode(text).classList.contains('b-text')).toBe(true);
        });
    });

    xdescribe('maximum size constraint', () => {
        /*
            This won't work in JSDOM because they haven't implemented a layout engine.
            https://github.com/tmpvar/jsdom/issues/135
        */

        it('works', () => {
            const tree = render(
                <div style={{height: '100px', width: '400px'}}>
                    <FittedText maxFontSize={30}>foo</FittedText>
                </div>
            );

            const node = ReactDOM.findDOMNode(tree).children[0];

            expect(node.style.fontSize).toBe('30px');
        });

        it('is ignored if the container size is too small', () => {
            const tree = render(
                <div style={{width: '5px'}}>
                    <FittedText maxFontSize={30}>foo</FittedText>
                </div>
            );

            const node = ReactDOM.findDOMNode(tree).children[0];

            expect(node.style.fontSize).not.toBe('30px');
        });
    });
});
