/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate} from 'react-addons-test-utils';

import UIArrowKeyNavigation from '../../UIArrowKeyNavigation';
import conformanceChecker from '../../UIUtils/conform';

import sinon from 'sinon';

describe('UIArrowKeyNavigation', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const event = {preventDefault: () => {}};
    const base = (
        <UIArrowKeyNavigation>
            <li>apple</li>
            <li>orange</li>
        </UIArrowKeyNavigation>
    );

    let element;
    let node;

    beforeEach(() => {
        element = render(base);
        node = element.refs.wrapper;
    });

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIArrowKeyNavigation));

    it('should accept nested children', () => {
        expect(node.children[0].textContent).toBe('apple');
        expect(node.children[1].textContent).toBe('orange');
    });

    it('should update its internal focus cache on child focus', () => {
        Simulate.focus(node.children[0]);
        expect(element.state.activeChildIndex).toBe(0);
    });

    it('should update its internal focus cache on child blur', () => {
        Simulate.focus(node.children[0]);
        expect(element.state.activeChildIndex).toBe(0);

        Simulate.blur(node.children[0]);
        expect(element.state.activeChildIndex).toBe(null);
    });

    it('should forward child focus events to the appropriate handler, if one is provided', () => {
        const stub = sinon.stub();

        element = render(
            <UIArrowKeyNavigation>
                <li onFocus={stub}>apple</li>
                <li>orange</li>
            </UIArrowKeyNavigation>
        );

        Simulate.focus(node.children[0]);

        expect(stub.called).toBe(true);
    });

    it('should forward child blur events to the appropriate handler, if one is provided', () => {
        const stub = sinon.stub();

        element = render(
            <UIArrowKeyNavigation>
                <li onBlur={stub}>apple</li>
                <li>orange</li>
            </UIArrowKeyNavigation>
        );

        Simulate.blur(node.children[0]);

        expect(stub.called).toBe(true);
    });

    it('should not reset internal focus if handleChildBlur is called out of turn', () => {
        expect(element.state.activeChildIndex).toBe(null);

        element.setState({activeChildIndex: 0});
        expect(element.state.activeChildIndex).toBe(0);

        Simulate.blur(node.children[1]);
        expect(element.state.activeChildIndex).toBe(0);
    });

    describe('setFocus(index)', () => {
        it('should do nothing if given an invalid index', () => {
            expect(document.activeElement).toBe(document.body);

            element.setFocus(10000);
            expect(document.activeElement).toBe(document.body);
        });

        it('should move focus if given a valid child index', () => {
            expect(document.activeElement).toBe(document.body);

            element.setFocus(1);
            expect(document.activeElement.textContent).toBe('orange');
        });

        it('should work if the wrapper is a composite', () => {
            class ExampleComponent extends React.Component {
                render() {
                    return <div>{this.props.children}</div>;
                }
            }

            element = render(
                <UIArrowKeyNavigation component={ExampleComponent}>
                    <span>apple</span>
                    <span>orange</span>
                </UIArrowKeyNavigation>
            );

            expect(document.activeElement).toBe(document.body);

            element.setFocus(1);
            expect(document.activeElement.textContent).toBe('orange');
        });
    });

    describe('when `state.activeChildIndex` changes', () => {
        it('should apply focus to the new active index', () => {
            expect(document.activeElement).toBe(document.body);

            element.setState({activeChildIndex: 0});
            expect(document.activeElement.textContent).toBe('apple');

            element.setState({activeChildIndex: 1});
            expect(document.activeElement.textContent).toBe('orange');
        });
    });

    describe('when `props.children` changes', () => {
        it('should reset internal focus tracking if there are no children', () => {
            Simulate.focus(node.children[0]);
            expect(element.state.activeChildIndex).toBe(0);

            element = render(<UIArrowKeyNavigation />);
            expect(element.state.activeChildIndex).toBe(null);
        });

        it('should move focus to the last child if the previous activeChildIndex is greater than the total number of available children', () => {
            element = render(
                <UIArrowKeyNavigation>
                    <li>apple</li>
                    <li>orange</li>
                    <li>apricot</li>
                </UIArrowKeyNavigation>
            );

            Simulate.focus(node.children[2]);
            expect(element.state.activeChildIndex).toBe(2);

            element = render(
                <UIArrowKeyNavigation>
                    <li>apple</li>
                </UIArrowKeyNavigation>
            );

            expect(element.state.activeChildIndex).toBe(0);
        });
    });

    describe('on keyboard `ArrowLeft`', () => {
        it('should move focus to the previous child', () => {
            Simulate.focus(node.children[1]);
            Simulate.keyDown(node, {...event, key: 'ArrowLeft'});

            expect(document.activeElement).toBe(node.children[0]);
        });

        it('should move focus to the end if on the first child (reverse loop)', () => {
            Simulate.focus(node.children[0]);
            Simulate.keyDown(node, {...event, key: 'ArrowLeft'});

            expect(document.activeElement).toBe(node.children[1]);
        });
    });

    describe('on keyboard `ArrowUp`', () => {
        it('should move focus to the previous child', () => {
            Simulate.focus(node.children[1]);
            Simulate.keyDown(node, {...event, key: 'ArrowUp'});

            expect(document.activeElement).toBe(node.children[0]);
        });

        it('should loop back to the last item if on the first item', () => {
            Simulate.focus(node.children[0]);
            Simulate.keyDown(node, {...event, key: 'ArrowUp'});

            expect(document.activeElement).toBe(node.children[1]);
        });
    });

    describe('on keyboard `ArrowRight`', () => {
        it('should move focus to the next child', () => {
            Simulate.focus(node.children[0]);
            Simulate.keyDown(node, {...event, key: 'ArrowRight'});

            expect(document.activeElement).toBe(node.children[1]);
        });

        it('should move focus to the beginning if on the last child (loop)', () => {
            Simulate.focus(node.children[1]);
            Simulate.keyDown(node, {...event, key: 'ArrowRight'});

            expect(document.activeElement).toBe(node.children[0]);
        });
    });

    describe('on keyboard `ArrowDown`', () => {
        it('should move focus to the next child', () => {
            Simulate.focus(node.children[0]);
            Simulate.keyDown(node, {...event, key: 'ArrowDown'});

            expect(document.activeElement).toBe(node.children[1]);
        });

        it('should loop back to the first item if on the last item', () => {
            Simulate.focus(node.children[1]);
            Simulate.keyDown(node, {...event, key: 'ArrowDown'});

            expect(document.activeElement).toBe(node.children[0]);
        });
    });

    describe('keydown event', () => {
        it('should be proxied if `props.onKeyDown` is provided', () => {
            const stub = sinon.stub();

            element = render(
                <UIArrowKeyNavigation onKeyDown={stub}>
                    <li>apple</li>
                    <li>orange</li>
                </UIArrowKeyNavigation>
            );

            Simulate.keyDown(node, {...event, key: 'ArrowDown'});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch({key: 'ArrowDown'})).toBe(true);
        });
    });
});
