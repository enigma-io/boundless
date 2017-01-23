/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {identity} from 'lodash';
import sinon from 'sinon';

import Async from './index';
import conformanceChecker from '../boundless-utils-conformance/index';

describe('Async higher-order component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Async));

    it('accepts normal renderable content', () => {
        render(<Async data={<span className='bar'>foo</span>} />);
        expect(document.querySelector('.bar')).not.toBeNull();
    });

    describe('promise support', () => {
        it('accepts a promise as props.data', () => {
            const promise = Promise.resolve(<span className='bar'>foo</span>);

            render(<Async data={promise} />);

            return Promise.resolve().then(() => {
                expect(document.querySelector('.bar')).not.toBeNull();
            });
        });

        it('displays loading content while the promise is pending', () => {
            render(<Async data={new Promise(() => {})} loadingContent='⏲' />);

            return Promise.resolve().then(() => {
                expect(document.querySelector('.b-async-loading')).not.toBeNull();
                expect(document.querySelector('.b-async-loading').textContent).toBe('⏲');
            });
        });

        it('displays error content if the promise rejects', () => {
            let rejector;
            const promise = new Promise((_, reject) => (rejector = reject));

            render(<Async data={promise} errorContent='😞' />);
            rejector();

            return Promise.resolve().then(() => {
                expect(document.querySelector('.b-async-error')).not.toBeNull();
                expect(document.querySelector('.b-async-error').textContent).toBe('😞');
            });
        });

        it('calls convertToJSXFunc when the promise resolves', () => {
            const promise = Promise.resolve({children: 'foo', className: 'bar'});
            const converter = sandbox.spy((data) => <span {...data} />);

            render(<Async convertToJSXFunc={converter} data={promise} />);

            return Promise.resolve().then(() => {
                expect(converter.calledOnce).toBe(true);
                expect(document.querySelector('.bar')).not.toBeNull();
            });
        });

        it('ignores the original promise if the component is rendered with a new one', () => {
            let resolver1;
            let resolver2;
            const promise1 = new Promise((resolve) => (resolver1 = resolve));
            const promise2 = new Promise((resolve) => (resolver2 = resolve));
            const converter = sandbox.spy(identity);

            render(<Async data={promise1} convertToJSXFunc={converter} />);
            render(<Async data={promise2} convertToJSXFunc={converter} />);

            resolver2(<span className='bar'>foo</span>);
            resolver1(<span className='fizz'>buzz</span>);

            return Promise.resolve().then(() => {
                expect(converter.calledOnce).toBe(true);
                expect(document.querySelector('.bar')).not.toBeNull();
                expect(document.querySelector('.fizz')).toBeNull();
            });
        });
    });
});
