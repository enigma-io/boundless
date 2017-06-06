/* eslint no-unused-expressions:0 */

import { createElement } from 'react';
import ReactDOM from 'react-dom';

import Portal from './index';
import { $, conformanceChecker } from '../boundless-utils-test-helpers/index';

describe('Portal component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    let id;

    describe('internal variables', () => {
        it('the portal destination is available as $portal', () => {
            const element = render(<Portal>foo</Portal>);
            id = $('[data-portal-id]').getAttribute('data-portal-id');

            expect(element.$portal === $(`#${id}`)).toBe(true);
        });

        it('the portal top-level child is available as $passenger', () => {
            const element = render(<Portal>foo</Portal>);
            id = $('[data-portal-id]').getAttribute('data-portal-id');

            expect(element.$passenger === $(`#${id} > :first-child`)).toBe(true);
        });
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Portal, { children: 'foo' }));

    it('accepts an arbitrary portal ID', () => {
        render(<Portal portalId='foo'>foo</Portal>);
        id = $('[data-portal-id]').getAttribute('data-portal-id');

        expect(id).toBe('foo');
        expect($(`#${id}`)).not.toBeNull();
    });

    it('tags the root element with the ID of the portalled dialog', () => {
        render(<Portal>foo</Portal>);
        id = $('[data-portal-id]').getAttribute('data-portal-id');

        expect(id).not.toBeUndefined();
        expect($(`#${id}`)).not.toBeNull();
    });

    it('renders the child content inside the portal', () => {
        render(<Portal>foo</Portal>);
        id = $('[data-portal-id]').getAttribute('data-portal-id');

        expect($(`#${id}`).textContent).toBe('foo');
    });

    it('updates the portalled component upon re-render of the portal origin', () => {
        render(<Portal><div className='foo'>bar</div></Portal>);
        id = $('[data-portal-id]').getAttribute('data-portal-id');

        expect($(`#${id} .foo`)).not.toBeNull();

        render(<Portal><div className='baz'>bar</div></Portal>);
        expect($(`#${id} .baz`)).not.toBeNull();
    });

    it('removes the portal when the component is unrendered', () => {
        render(<Portal>foo</Portal>);
        id = $('[data-portal-id]').getAttribute('data-portal-id');

        ReactDOM.unmountComponentAtNode(mountNode);
        expect($(`#${id}`)).toBeNull();
    });
});
