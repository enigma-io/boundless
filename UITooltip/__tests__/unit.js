/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UITooltip from '../../UITooltip';
import conformanceChecker from '../../UIUtils/conform';

describe('UITooltip', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UITooltip));

    it('should pass nested children through', () => {
        const element = render(<UITooltip>Foo</UITooltip>);
        const node = ReactDOM.findDOMNode(element);

        expect(node.textContent).toEqual('Foo');
    });

    it('should pass props.text through to the HTML attribute [data-tooltip]', () => {
        const element = render(<UITooltip text='foo' />);
        const node = ReactDOM.findDOMNode(element);

        expect(node.getAttribute('data-tooltip')).toEqual('foo');
    });

    describe('CSS hook', () => {
        it('ui-tooltip should be rendered', () => {
            const element = render(<UITooltip />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('ui-tooltip')).toBe(true);
        });

        it('ui-tooltip-position-above should be rendered if props.position === UITooltip.position.ABOVE', () => {
            const element = render(<UITooltip position={UITooltip.position.ABOVE} />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('ui-tooltip-position-above')).toBe(true);
        });

        it('ui-tooltip-position-below should be rendered if props.position === UITooltip.position.BELOW', () => {
            const element = render(<UITooltip position={UITooltip.position.BELOW} />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('ui-tooltip-position-below')).toBe(true);
        });

        it('ui-tooltip-position-before should be rendered if props.position === UITooltip.position.BEFORE', () => {
            const element = render(<UITooltip position={UITooltip.position.BEFORE} />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('ui-tooltip-position-before')).toBe(true);
        });

        it('ui-tooltip-position-after should be rendered if props.position === UITooltip.position.AFTER', () => {
            const element = render(<UITooltip position={UITooltip.position.AFTER} />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('ui-tooltip-position-after')).toBe(true);
        });
    });
});
