/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UIFittedText from '../../UIFittedText';
import conformanceChecker from '../../UIUtils/conform';

describe('UIFittedText', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIFittedText));

    describe('accepts', () => {
        it('an additional class as a string without replacing the core hook', () => {
            const text = render(<UIFittedText className='foo' />);

            expect(ReactDOM.findDOMNode(text).classList.contains('ui-text')).toBe(true);
            expect(ReactDOM.findDOMNode(text).classList.contains('foo')).toBe(true);
        });

        it('text to render', () => {
            const text = render(<UIFittedText>foo</UIFittedText>);
            const node = ReactDOM.findDOMNode(text);

            expect(node.textContent).toBe('foo');
        });

        it('numbers to render', () => {
            const text = render(<UIFittedText>{1234}</UIFittedText>);
            const node = ReactDOM.findDOMNode(text);

            expect(node.textContent).toBe('1234');
        });
    });

    describe('CSS hooks', () => {
        it('ui-text should render', () => {
            const text = render(<UIFittedText />);

            expect(ReactDOM.findDOMNode(text).classList.contains('ui-text')).toBe(true);
        });
    });

    /*
        This won't work in JSDOM because they haven't implemented a layout engine.
        https://github.com/tmpvar/jsdom/issues/135
    */

    // describe('maximum size constraint', () => {
    //     it('should work', () => {
    //         const tree = render(
    //             <div style={{height: '100px', width: '400px'}}>
    //                 <UIFittedText maxFontSize={30}>foo</UIFittedText>
    //             </div>
    //         );

    //         const node = ReactDOM.findDOMNode(tree).children[0];

    //         expect(node.style.fontSize).toBe('30px');
    //     });

    //     it('should be ignored if the container size is too small', () => {
    //         const tree = render(
    //             <div style={{width: '5px'}}>
    //                 <UIFittedText maxFontSize={30}>foo</UIFittedText>
    //             </div>
    //         );

    //         const node = ReactDOM.findDOMNode(tree).children[0];

    //         expect(node.style.fontSize).not.toBe('30px');
    //     });
    // });
});
