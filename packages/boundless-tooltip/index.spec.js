/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import Tooltip from './index';
import conformanceChecker from '../boundless-utils-conformance/index';

describe('Tooltip', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Tooltip));

    it('passes nested children through', () => {
        const element = render(<Tooltip>Foo</Tooltip>);
        const node = ReactDOM.findDOMNode(element);

        expect(node.textContent).toEqual('Foo');
    });

    it('passes props.text through to the HTML attribute [data-tooltip]', () => {
        const element = render(<Tooltip text='foo' />);
        const node = ReactDOM.findDOMNode(element);

        expect(node.getAttribute('data-tooltip')).toEqual('foo');
    });

    describe('CSS hook', () => {
        it('renders .b-tooltip', () => {
            const element = render(<Tooltip />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('b-tooltip')).toBe(true);
        });

        it('renders .b-tooltip-position-above if props.position === Tooltip.position.ABOVE', () => {
            const element = render(<Tooltip position={Tooltip.position.ABOVE} />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('b-tooltip-position-above')).toBe(true);
        });

        it('renders .b-tooltip-position-below if props.position === Tooltip.position.BELOW', () => {
            const element = render(<Tooltip position={Tooltip.position.BELOW} />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('b-tooltip-position-below')).toBe(true);
        });

        it('renders .b-tooltip-position-before if props.position === Tooltip.position.BEFORE', () => {
            const element = render(<Tooltip position={Tooltip.position.BEFORE} />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('b-tooltip-position-before')).toBe(true);
        });

        it('renders .b-tooltip-position-after if props.position === Tooltip.position.AFTER', () => {
            const element = render(<Tooltip position={Tooltip.position.AFTER} />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('b-tooltip-position-after')).toBe(true);
        });
    });
});
