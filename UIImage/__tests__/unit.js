/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UIImage from '../../UIImage';
import conformanceChecker from '../../UIUtils/conform';

describe('UIImage', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const baseProps = {src: 'http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9'};

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIImage, baseProps));

    describe('accepts', () => {
        it('arbitrary React-supported HTML attributes via props.imageProps', () => {
            const element = render(<UIImage {...baseProps} imageProps={{'data-id': 'xr1'}} />);
            const node = element.refs.image;

            expect(node.getAttribute('data-id')).toBe('xr1');
        });

        it('classes via props.imageProps.className', () => {
            const element = render(
                <UIImage {...baseProps}
                         imageProps={{
                            className: 'foo'
                         }} />
            );

            expect(element.refs.image.classList.contains('foo')).toBe(true);
        });

        it('classes via props.imageProps.className when props.displayAsBackgroundImage is true', () => {
            const element = render(
                <UIImage {...baseProps}
                         displayAsBackgroundImage={true}
                         imageProps={{
                            className: 'foo'
                         }} />
            );

            expect(element.refs.image.classList.contains('foo')).toBe(true);
        });

        it('inline styles via props.imageProps.style when props.displayAsBackgroundImage is true', () => {
            const element = render(
                <UIImage {...baseProps}
                         displayAsBackgroundImage={true}
                         imageProps={{
                            style: {
                                textDecoration: 'underline'
                            }
                         }} />
            );

            expect(element.refs.image.style.textDecoration).toBe('underline');
        });

        it('arbitrary React-supported HTML attributes via props.statusProps', () => {
            const element = render(<UIImage {...baseProps} statusProps={{'data-id': 'xr1'}} />);

            expect(element.refs.status.getAttribute('data-id')).toBe('xr1');
        });

        it('classes via props.statusProps.className', () => {
            const element = render(
                <UIImage {...baseProps}
                         statusProps={{
                            className: 'foo'
                         }} />
            );

            expect(element.refs.status.classList.contains('foo')).toBe(true);
        });

        it('an additional class as a string without replacing the core hook', () => {
            const element = render(<UIImage {...baseProps} className='hero-image' />);

            ['ui-image-wrapper', 'hero-image'].forEach(cname => expect(element.refs.wrapper.classList.contains(cname)).toBe(true));
        });
    });

    describe('CSS hook', () => {
        it('ui-image-wrapper should be rendered', () => {
            const element = render(<UIImage {...baseProps} />);

            expect(element.refs.wrapper.classList.contains('ui-image-wrapper')).toBe(true);
        });

        it('ui-image should be rendered', () => {
            const element = render(<UIImage {...baseProps} />);

            expect(element.refs.image.classList.contains('ui-image')).toBe(true);
        });

        it('ui-image-status should be rendered', () => {
            const element = render(<UIImage {...baseProps} />);

            expect(element.refs.status.classList.contains('ui-image-status')).toBe(true);
        });
    });

    describe('description', () => {
        it('should be rendered as the HTML `alt` attribute if `props.displayAsBackgroundImage` is falsy', () => {
            const element = render(<UIImage {...baseProps} alt='foo' />);
            const node = element.refs.image;

            expect(node.getAttribute('alt')).toBe('foo');
            expect(node.hasAttribute('title')).toBe(false);
        });

        it('should be rendered as the HTML `title` attribute if `props.displayAsBackgroundImage` is `true`', () => {
            const element = render(<UIImage {...baseProps} alt='foo' displayAsBackgroundImage={true} />);
            const node = element.refs.image;

            expect(node.getAttribute('title')).toBe('foo');
            expect(node.hasAttribute('alt')).toBe(false);
        });
    });

    describe('on props.src change (receiving a new image URL)', () => {
        let element;

        beforeEach(() => element = render(<UIImage {...baseProps} />));

        it('should reset the preloader element', () => {
            const oldLoader = element.loader;

            element = render(<UIImage src='http://www.bing.com/az/hprichbg/rb/BlackGrouse_EN-US10927406226_1920x1080.jpg' />)

            expect(element.loader).not.toBe(oldLoader);
        });
    });

    describe('on image status change', () => {
        let element;

        beforeEach(() => {
            element = render(<UIImage {...baseProps} />);
        });

        it('should return the correct class hook for error', (done) => {
            element.setState({ status: UIImage.status.ERROR }, () => {
                expect(element.refs.status.classList.contains('ui-image-error')).toBe(true);
                done();
            });
        });

        it('should return the correct class hook for loading', (done) => {
            element.setState({ status: UIImage.status.LOADING }, () => {
                expect(element.refs.status.classList.contains('ui-image-loading')).toBe(true);
                done();
            });
        });

        it('should return the correct class hook for loaded', (done) => {
            element.setState({ status: UIImage.status.LOADED }, () => {
                expect(element.refs.status.classList.contains('ui-image-loaded')).toBe(true);
                done();
            });
        });
    });
});
