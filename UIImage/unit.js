/* eslint no-unused-expressions:0 */

import UIImage from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../UIUtils/conform';

describe('UIImage', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();
    const baseProps = {src: 'http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9'};

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIImage, baseProps));

    describe('accepts', () => {
        it('arbitrary React-supported HTML attributes via props.imageAttrs', () => {
            const element = render(<UIImage {...baseProps} imageAttrs={{'data-id': 'xr1'}} />);
            const node = element.refs.image;

            expect(node.getAttribute('data-id')).to.equal('xr1');
        });

        it('classes via props.imageAttrs.className', () => {
            const element = render(
                <UIImage {...baseProps}
                         imageAttrs={{
                            className: 'foo'
                         }} />
            );

            expect(element.refs.image.classList.contains('foo')).to.be.true;
        });

        it('classes via props.imageAttrs.className when props.displayAsBackgroundImage is true', () => {
            const element = render(
                <UIImage {...baseProps}
                         displayAsBackgroundImage={true}
                         imageAttrs={{
                            className: 'foo'
                         }} />
            );

            expect(element.refs.image.classList.contains('foo')).to.be.true;
        });

        it('inline styles via props.imageAttrs.style when props.displayAsBackgroundImage is true', () => {
            const element = render(
                <UIImage {...baseProps}
                         displayAsBackgroundImage={true}
                         imageAttrs={{
                            style: {
                                textDecoration: 'underline'
                            }
                         }} />
            );

            expect(element.refs.image.style.textDecoration).to.equal('underline');
        });

        it('arbitrary React-supported HTML attributes via props.statusAttrs', () => {
            const element = render(<UIImage {...baseProps} statusAttrs={{'data-id': 'xr1'}} />);

            expect(element.refs.status.getAttribute('data-id')).to.equal('xr1');
        });

        it('classes via props.statusAttrs.className', () => {
            const element = render(
                <UIImage {...baseProps}
                         statusAttrs={{
                            className: 'foo'
                         }} />
            );

            expect(element.refs.status.classList.contains('foo')).to.be.true;
        });

        it('an additional class as a string without replacing the core hook', () => {
            const element = render(<UIImage {...baseProps} className='hero-image' />);

            ['ui-image-wrapper', 'hero-image'].forEach(cname => assert(element.refs.wrapper.classList.contains(cname)));
        });
    });

    describe('CSS hook', () => {
        it('ui-image-wrapper should be rendered', () => {
            const element = render(<UIImage {...baseProps} />);

            assert(element.refs.wrapper.classList.contains('ui-image-wrapper'));
        });

        it('ui-image should be rendered', () => {
            const element = render(<UIImage {...baseProps} />);

            assert(element.refs.image.classList.contains('ui-image'));
        });

        it('ui-image-status should be rendered', () => {
            const element = render(<UIImage {...baseProps} />);

            assert(element.refs.status.classList.contains('ui-image-status'));
        });
    });

    describe('description', () => {
        it('should be rendered as the HTML `alt` attribute if `props.displayAsBackgroundImage` is falsy', () => {
            const element = render(<UIImage {...baseProps} alt='foo' />);
            const node = element.refs.image;

            expect(node.getAttribute('alt')).to.equal('foo');
            expect(node.hasAttribute('title')).to.be.false;
        });

        it('should be rendered as the HTML `title` attribute if `props.displayAsBackgroundImage` is `true`', () => {
            const element = render(<UIImage {...baseProps} alt='foo' displayAsBackgroundImage={true} />);
            const node = element.refs.image;

            expect(node.getAttribute('title')).to.equal('foo');
            expect(node.hasAttribute('alt')).to.be.false;
        });
    });

    describe('on props.src change (receiving a new image URL)', () => {
        let element;

        beforeEach(() => element = render(<UIImage {...baseProps} />);

        it('should reset the preloader element', () => {
            const oldLoader = element.loader;

            element = render(<UIImage src='http://www.bing.com/az/hprichbg/rb/BlackGrouse_EN-US10927406226_1920x1080.jpg' />)

            expect(element.loader).to.not.equal(oldLoader);
        });
    });

    describe('on image status change', () => {
        let element;

        beforeEach(() => {
            element = render(<UIImage {...baseProps} />);
        });

        it('should return the correct class hook for error', (done) => {
            element.setState({ status: UIImage.status.ERROR }, () => {
                assert(element.refs.status.classList.contains('ui-image-error'));
                done();
            });
        });

        it('should return the correct class hook for loading', (done) => {
            element.setState({ status: UIImage.status.LOADING }, () => {
                assert(element.refs.status.classList.contains('ui-image-loading'));
                done();
            });
        });

        it('should return the correct class hook for loaded', (done) => {
            element.setState({ status: UIImage.status.LOADED }, () => {
                assert(element.refs.status.classList.contains('ui-image-loaded'));
                done();
            });
        });
    });
});
