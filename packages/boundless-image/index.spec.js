/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import Image from './index';
import conformanceChecker from '../boundless-utils-conformance/index';

describe('Image component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const baseProps = {src: 'http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9'};

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Image, baseProps));

    describe('accepts', () => {
        it('arbitrary React-supported HTML attributes via props.imageProps', () => {
            const element = render(<Image {...baseProps} imageProps={{'data-id': 'xr1'}} />);
            const node = element.refs.image;

            expect(node.getAttribute('data-id')).toBe('xr1');
        });

        it('classes via props.imageProps.className', () => {
            const element = render(
                <Image {...baseProps}
                         imageProps={{
                            className: 'foo',
                         }} />
            );

            expect(element.refs.image.classList.contains('foo')).toBe(true);
        });

        it('classes via props.imageProps.className when props.displayAsBackgroundImage is true', () => {
            const element = render(
                <Image {...baseProps}
                         displayAsBackgroundImage={true}
                         imageProps={{
                            className: 'foo',
                         }} />
            );

            expect(element.refs.image.classList.contains('foo')).toBe(true);
        });

        it('inline styles via props.imageProps.style when props.displayAsBackgroundImage is true', () => {
            const element = render(
                <Image {...baseProps}
                         displayAsBackgroundImage={true}
                         imageProps={{
                            style: {
                                textDecoration: 'underline',
                            },
                         }} />
            );

            expect(element.refs.image.style.textDecoration).toBe('underline');
        });

        it('arbitrary React-supported HTML attributes via props.statusProps', () => {
            const element = render(<Image {...baseProps} statusProps={{'data-id': 'xr1'}} />);

            expect(element.refs.status.getAttribute('data-id')).toBe('xr1');
        });

        it('classes via props.statusProps.className', () => {
            const element = render(
                <Image {...baseProps}
                         statusProps={{
                            className: 'foo',
                         }} />
            );

            expect(element.refs.status.classList.contains('foo')).toBe(true);
        });

        it('an additional class as a string without replacing the core hook', () => {
            const element = render(<Image {...baseProps} className='hero-image' />);

            ['ui-image-wrapper', 'hero-image'].forEach((cname) => expect(element.refs.wrapper.classList.contains(cname)).toBe(true));
        });
    });

    describe('CSS hook', () => {
        it('renders .ui-image-wrapper', () => {
            const element = render(<Image {...baseProps} />);

            expect(element.refs.wrapper.classList.contains('ui-image-wrapper')).toBe(true);
        });

        it('renders .ui-image', () => {
            const element = render(<Image {...baseProps} />);

            expect(element.refs.image.classList.contains('ui-image')).toBe(true);
        });

        it('renders .ui-image-status', () => {
            const element = render(<Image {...baseProps} />);

            expect(element.refs.status.classList.contains('ui-image-status')).toBe(true);
        });
    });

    describe('description', () => {
        it('renders the HTML `alt` attribute if `props.displayAsBackgroundImage` is falsy', () => {
            const element = render(<Image {...baseProps} alt='foo' />);
            const node = element.refs.image;

            expect(node.getAttribute('alt')).toBe('foo');
            expect(node.hasAttribute('title')).toBe(false);
        });

        it('renders the HTML `title` attribute if `props.displayAsBackgroundImage` is `true`', () => {
            const element = render(<Image {...baseProps} alt='foo' displayAsBackgroundImage={true} />);
            const node = element.refs.image;

            expect(node.getAttribute('title')).toBe('foo');
            expect(node.hasAttribute('alt')).toBe(false);
        });
    });

    describe('on props.src change (receiving a new image URL)', () => {
        let element;

        beforeEach(() => (element = render(<Image {...baseProps} />)));

        it('resets the preloader element', () => {
            const oldLoader = element.loader;

            element = render(<Image src='http://www.bing.com/az/hprichbg/rb/BlackGrouse_EN-US10927406226_1920x1080.jpg' />);

            expect(element.loader).not.toBe(oldLoader);
        });
    });

    describe('on image status change', () => {
        let element;

        beforeEach(() => {
            element = render(<Image {...baseProps} />);
        });

        it('returns the correct class hook for error', (done) => {
            element.setState({ status: Image.status.ERROR }, () => {
                expect(element.refs.status.classList.contains('ui-image-error')).toBe(true);
                done();
            });
        });

        it('returns the correct class hook for loading', (done) => {
            element.setState({ status: Image.status.LOADING }, () => {
                expect(element.refs.status.classList.contains('ui-image-loading')).toBe(true);
                done();
            });
        });

        it('returns the correct class hook for loaded', (done) => {
            element.setState({ status: Image.status.LOADED }, () => {
                expect(element.refs.status.classList.contains('ui-image-loaded')).toBe(true);
                done();
            });
        });
    });
});
