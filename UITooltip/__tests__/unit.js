/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UITooltip from '../../UITooltip';
import conformanceChecker from '../../UIUtils/conform';

import sinon from 'sinon';
import {assert, expect} from 'chai';

describe('UITooltip', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UITooltip));

    it('should pass nested children through', () => {
        const element = render(<UITooltip>Foo</UITooltip>);
        const node = ReactDOM.findDOMNode(element);

        expect(node.textContent).to.equal('Foo');
    });

    it('should pass props.text through to the HTML attribute [data-tooltip]', () => {
        const element = render(<UITooltip text='foo' />);
        const node = ReactDOM.findDOMNode(element);

        expect(node.getAttribute('data-tooltip')).to.equal('foo');
    });

    describe('CSS hook', () => {
        it('ui-tooltip should be rendered', () => {
            const element = render(<UITooltip />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('ui-tooltip')).to.be.true;
        });

        it('ui-tooltip-position-above should be rendered if props.position === UITooltip.position.ABOVE', () => {
            const element = render(<UITooltip position={UITooltip.position.ABOVE} />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('ui-tooltip-position-above')).to.be.true;
        });

        it('ui-tooltip-position-below should be rendered if props.position === UITooltip.position.BELOW', () => {
            const element = render(<UITooltip position={UITooltip.position.BELOW} />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('ui-tooltip-position-below')).to.be.true;
        });

        it('ui-tooltip-position-before should be rendered if props.position === UITooltip.position.BEFORE', () => {
            const element = render(<UITooltip position={UITooltip.position.BEFORE} />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('ui-tooltip-position-before')).to.be.true;
        });

        it('ui-tooltip-position-after should be rendered if props.position === UITooltip.position.AFTER', () => {
            const element = render(<UITooltip position={UITooltip.position.AFTER} />);
            const node = ReactDOM.findDOMNode(element);

            expect(node.classList.contains('ui-tooltip-position-after')).to.be.true;
        });
    });
});
