/* eslint no-unused-expressions:0 */

import { createElement } from 'react';
import ReactDOM from 'react-dom';

import Image from './index';
import { $, conformanceChecker } from '../boundless-utils-test-helpers/index';

describe('Image component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const baseProps = { src: 'http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9' };

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Image, baseProps));

    it('accepts component customization', () => {
        render(<Image {...baseProps} component='figure' />);
        expect($('figure.b-image')).not.toBeNull();
    });

    it('renders a single space as its child (needed for Safari)', () => {
        render(<Image {...baseProps} alt='foo' />);
        expect($('.b-image').textContent).toBe('\u00A0');
    });

    it('renders the HTML `title` attribute', () => {
        render(<Image {...baseProps} alt='foo' />);
        expect($('.b-image[title="foo"]')).not.toBeNull();
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
                expect($('.b-image.b-image-error')).not.toBeNull();
                done();
            });
        });

        it('returns the correct class hook for loading', (done) => {
            element.setState({ status: Image.status.LOADING }, () => {
                expect($('.b-image.b-image-loading')).not.toBeNull();
                done();
            });
        });

        it('returns the correct class hook for loaded', (done) => {
            element.setState({ status: Image.status.LOADED }, () => {
                expect($('.b-image.b-image-loaded')).not.toBeNull();
                done();
            });
        });
    });
});
