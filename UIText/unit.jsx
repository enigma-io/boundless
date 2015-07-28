/* eslint no-unused-expressions:0 */

import UIText from './index.jsx';
import React from 'react';

describe('UIText', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes', () => {
            const text = React.render(<UIText data-id='foo' />, document.body);
            const node = React.findDOMNode(text);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const text = React.render(<UIText className='foo' />, document.body);

            expect(text.getClasses()).to.equal('ui-text foo');
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const text = React.render(<UIText className={['foo', 'bar']} />, document.body);

            expect(text.getClasses()).to.equal('ui-text foo bar');
        });

        it('text to render', () => {
            const text = React.render(<UIText>foo</UIText>, document.body);
            const node = React.findDOMNode(text);

            expect(node.textContent).to.equal('foo');
        });

        it('numbers to render', () => {
            const text = React.render(<UIText>{1234}</UIText>, document.body);
            const node = React.findDOMNode(text);

            expect(node.textContent).to.equal('1234');
        });
    });

    describe('CSS hooks', () => {
        it('ui-text should render', () => {
            const text = React.render(<UIText />, document.body);

            expect(text.getClasses()).to.equal('ui-text');
        });
    });

    describe('maximum size constraint', () => {
        // Since the rescale happens after mount, we need to wait for the call stack to finish before we can
        // verify it completed successfully

        it('should work', (done) => {
            const tree = React.render(<div style={{height: '100px', width: '400px'}}><UIText maxFontSize={30}>foo</UIText></div>, document.body);
            const node = React.findDOMNode(tree).children[0];

            window.setTimeout(function verifier() {
                expect(node.style.fontSize).to.equal('30px');
                done();
            }, 0);
        });

        it('should be ignored if the container size is too small', (done) => {
            const tree = React.render(<div style={{width: '10px'}}><UIText maxFontSize={30}>foo</UIText></div>, document.body);
            const node = React.findDOMNode(tree).children[0];

            window.setTimeout(function verifier() {
                expect(node.style.fontSize).to.not.equal('30px');
                done();
            }, 0);
        });
    });
});
