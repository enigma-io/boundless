/* eslint no-unused-expressions:0 */

import UIImage from './index.jsx';
import React from 'react';

describe('UIImage', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes', () => {
            const image = React.render(
                <UIImage
                    src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9'
                    id='button1'
                    data-id='xr1' />, document.body
            );

            image.setState({ status: UIImage.Constants.IMAGE_LOADED });

            const imageNode = React.findDOMNode(image.refs.image);

            expect(imageNode.getAttribute('src')).to.equal('http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9');
            expect(imageNode.getAttribute('id')).to.equal('button1');
            expect(imageNode.getAttribute('data-id')).to.equal('xr1');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const image = React.render(
                <UIImage
                    className='hero-image'
                    src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9' />, document.body
            );

            const imageNode = React.findDOMNode(image);

            expect(imageNode.getAttribute('class')).to.equal('ui-image-wrapper hero-image');
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const image = React.render(
                <UIImage
                    className={['hero-image', 'large-image']}
                    src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9' />, document.body
            );

            const imageNode = React.findDOMNode(image);

            expect(imageNode.getAttribute('class')).to.equal('ui-image-wrapper hero-image large-image');
        });
    });

    describe('on image status change', () => {
        let image;

        beforeEach(() => {
            image = React.render(
                <UIImage src='http://2.gravatar.com/avatar/2cba2365771c1af7aa4f6648e40457b9' />, document.body
            );
        });

        it('should return the correct class hook for error', (done) => {
            image.setState({ status: UIImage.Constants.IMAGE_ERROR }, () => {
                expect(image.getStatusClass()).to.equal('ui-image-error');
                done();
            });
        });

        it('should return the correct class hook for loading', (done) => {
            image.setState({ status: UIImage.Constants.IMAGE_LOADING }, () => {
                expect(image.getStatusClass()).to.equal('ui-image-loading');
                done();
            });
        });

        it('should return the correct class hook for loaded', (done) => {
            image.setState({ status: UIImage.Constants.IMAGE_LOADED }, () => {
                expect(image.getStatusClass()).to.equal('ui-image-loaded');
                done();
            });
        });
    });
});
