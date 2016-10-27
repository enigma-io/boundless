/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UIPortal from './index';
import conformanceChecker from '../UIUtils/conform';

describe('UIPortal component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    let id;

    describe('internal variables', () => {
        it('the portal destination is available as $portal', () => {
            const element = render(<UIPortal>foo</UIPortal>);
            id = mountNode.querySelector('[data-portal-id]').getAttribute('data-portal-id');

            expect(element.$portal === document.getElementById(id)).toBe(true);
        });

        it('the portal top-level child is available as $passenger', () => {
            const element = render(<UIPortal>foo</UIPortal>);
            id = mountNode.querySelector('[data-portal-id]').getAttribute('data-portal-id');

            expect(element.$passenger === document.getElementById(id).children[0]).toBe(true);
        });
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIPortal, {children: 'foo'}));

    it('accepts an arbitrary portal ID', () => {
        render(<UIPortal portalId='foo'>foo</UIPortal>);
        id = mountNode.querySelector('[data-portal-id]').getAttribute('data-portal-id');

        expect(id).toBe('foo');
        expect(document.getElementById(id)).not.toBeNull();
    });

    it('tags the root element with the ID of the portalled dialog', () => {
        render(<UIPortal>foo</UIPortal>);
        id = mountNode.querySelector('[data-portal-id]').getAttribute('data-portal-id');

        expect(id).not.toBeUndefined();
        expect(document.getElementById(id)).not.toBeNull();
    });

    it('renders the child content inside the portal', () => {
        render(<UIPortal>foo</UIPortal>);
        id = mountNode.querySelector('[data-portal-id]').getAttribute('data-portal-id');

        expect(document.getElementById(id).textContent).toBe('foo');
    });

    it('updates the portalled component upon re-render of the portal origin', () => {
        render(<UIPortal><div className='foo'>bar</div></UIPortal>);
        id = mountNode.querySelector('[data-portal-id]').getAttribute('data-portal-id');

        expect(document.getElementById(id).querySelector('.foo')).not.toBeNull();

        render(<UIPortal><div className='baz'>bar</div></UIPortal>);
        expect(document.getElementById(id).querySelector('.baz')).not.toBeNull();
    });

    it('removes the portal when the component is unrendered', () => {
        render(<UIPortal>foo</UIPortal>);
        id = mountNode.querySelector('[data-portal-id]').getAttribute('data-portal-id');

        ReactDOM.unmountComponentAtNode(mountNode);
        expect(document.getElementById(id)).toBeNull();
    });
});
