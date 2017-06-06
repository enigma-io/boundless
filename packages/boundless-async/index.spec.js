/* eslint no-unused-expressions:0 */

import { createElement } from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import Async from './index';
import { $, conformanceChecker } from '../boundless-utils-test-helpers/index';

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
        render(<Async><span className='bar'>foo</span></Async>);
        expect($('.bar')).not.toBeNull();
    });

    describe('promise support', () => {
        it('renders the promise\'s payload on resolution', () => {
            render(
                <Async>
                    {Promise.resolve(<span className='bar'>foo</span>)}
                </Async>
            );

            return Promise.resolve().then(() => {
                expect($('.bar')).not.toBeNull();
            });
        });

        it('renders the promise\'s payload on rejection', () => {
            render(
                <Async>
                    {Promise.reject(<span className='bar'>foo</span>)}
                </Async>
            );

            return Promise.resolve().then(() => {
                expect($('.bar')).not.toBeNull();
            });
        });

        it('renders pending content if provided until the child promise has been fulfilled', () => {
            let resolver;

            render(
                <Async pendingContent={<i className='loading'>⏲</i>}>
                    {new Promise((resolve) => (resolver = resolve))}
                </Async>
            );

            expect($('.loading')).not.toBeNull();
            expect($('.loading').textContent).toBe('⏲');

            resolver(<span className='bar'>foo</span>);

            return Promise.resolve().then(() => {
                expect($('.loading')).toBeNull();
                expect($('.bar')).not.toBeNull();
            });
        });

        it('ignores the original promise if the component is rendered with a new one', () => {
            let resolver1;
            let resolver2;

            render(<Async>{new Promise((resolve) => (resolver1 = resolve))}</Async>);
            render(<Async>{new Promise((resolve) => (resolver2 = resolve))}</Async>);

            resolver2(<span className='bar'>foo</span>);
            resolver1(<span className='fizz'>buzz</span>);

            return Promise.resolve().then(() => {
                expect($('.bar')).not.toBeNull();
                expect($('.fizz')).toBeNull();
            });
        });
    });

    describe('props.childrenDidRender function', () => {
        it('is called when the passed child content is rendered', () => {
            const stub = sandbox.stub();

            render(<Async childrenDidRender={stub}><span className='bar'>foo</span></Async>);
            expect(stub.calledOnce).toBe(true);
            expect($('.bar')).not.toBeNull();
        });

        it('is called when a passed child promise is fulfilled and then rendered', () => {
            const stub = sandbox.stub();
            let resolver;

            render(
                <Async childrenDidRender={stub}>
                    {new Promise((resolve) => (resolver = resolve))}
                </Async>
            );

            expect(stub.called).toBe(false);
            resolver(<span className='bar'>foo</span>);

            return Promise.resolve().then(() => {
                expect(stub.calledOnce).toBe(true);
                expect($('.bar')).not.toBeNull();
            });
        });

        it('is called when a passed child function returns JSX, which is rendered immediately', () => {
            const stub = sandbox.stub();

            render(
                <Async childrenDidRender={stub}>
                    {() => <span className='bar'>foo</span>}
                </Async>
            );

            expect(stub.calledOnce).toBe(true);
            expect($('.bar')).not.toBeNull();
        });

        it('is called when a passed child function returns a promise and that promise is later fulfilled', () => {
            const stub = sandbox.stub();
            let resolver;

            render(
                <Async childrenDidRender={stub}>
                    {() => new Promise((resolve) => (resolver = resolve))}
                </Async>
            );

            expect(stub.called).toBe(false);
            resolver(<span className='bar'>foo</span>);

            return Promise.resolve().then(() => {
                expect(stub.calledOnce).toBe(true);
                expect($('.bar')).not.toBeNull();
            });
        });
    });
});
