/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UIDialog from './index';
import UIButton from '../UIButton';
import UIPopover from '../UIPopover';
import conformanceChecker from '../UIUtils/conform';
import noop from '../UIUtils/noop';

import sinon from 'sinon';

describe('UIDialog component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create({useFakeTimers: true});

    let element;

    beforeEach(() => sandbox.useFakeTimers());
    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.reset();
    })

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIDialog, {}, '$dialog'));

    it('renders .ui-dialog', () => {
        render(<UIDialog />);
        expect(document.querySelector('.ui-dialog')).not.toBe(null);
    });

    it('renders .ui-dialog-body', () => {
        render(<UIDialog />);
        expect(document.querySelector('.ui-dialog-body')).not.toBe(null);
    });

    it('renders .ui-dialog-footer', () => {
        render(<UIDialog footer='x' />);
        expect(document.querySelector('.ui-dialog-footer')).not.toBe(null);
    });

    it('renders .ui-dialog-header', () => {
        render(<UIDialog header='x' />);
        expect(document.querySelector('.ui-dialog-header')).not.toBe(null);
    });

    it('accepts arbitrary React-supported HTML attributes via props.bodyProps', () => {
        render(<UIDialog bodyProps={{'data-id': 'foo'}} />);
        expect(document.querySelector('.ui-dialog-body').getAttribute('data-id')).toBe('foo');
    });

    it('accepts arbitrary React-supported HTML attributes via props.footerProps', () => {
        render(<UIDialog footer='x' footerProps={{'data-id': 'foo'}} />);
        expect(document.querySelector('.ui-dialog-footer').getAttribute('data-id')).toBe('foo');
    });

    it('accepts arbitrary React-supported HTML attributes via props.headerProps', () => {
        render(<UIDialog header='x' headerProps={{'data-id': 'foo'}} />);
        expect(document.querySelector('.ui-dialog-header').getAttribute('data-id')).toBe('foo');
    });

    it('accepts an additional class as a string without replacing the core hook', () => {
        render(<UIDialog className='foo' />);
        expect(document.querySelector('.ui-dialog').classList.contains('ui-dialog')).toBe(true);
        expect(document.querySelector('.ui-dialog').classList.contains('foo')).toBe(true);
    });

    it('accepts renderable header content', () => {
        render(<UIDialog header='foo' />);
        expect(document.querySelector('.ui-dialog-header').textContent).toBe('foo');
    });

    it('accepts renderable footer content', () => {
        render(<UIDialog footer='foo' />);
        expect(document.querySelector('.ui-dialog-footer').textContent).toBe('foo');
    });

    it('accepts renderable content as a nested child', () => {
        render(<UIDialog>foo</UIDialog>);
        expect(document.querySelector('.ui-dialog-body').textContent).toBe('foo');
    });

    it('renders focus boundary nodes if `props.captureFocus` is `true`', () => {
        const element = render(<UIDialog captureFocus={true} />);

        expect(document.querySelectorAll('.ui-offscreen[tabindex="0"]').length).toBe(2);
    });

    it('will not render focus boundary nodes if `props.captureFocus` is `false`', () => {
        const element = render(<UIDialog captureFocus={false} />);

        expect(document.querySelectorAll('.ui-offscreen[tabindex="0"]').length).toBe(0);
    });

    describe('focus', () => {
        it('is applied to the dialog on render if `props.captureFocus` is `true`', () => {
            const element = render(<UIDialog captureFocus={true} />);

            expect(document.activeElement).toBe(document.querySelector('.ui-dialog'));
        });

        it('is not applied to the dialog on render if `props.captureFocus` is `false`', () => {
            const element = render(<UIDialog captureFocus={false} />);

            expect(document.activeElement).not.toBe(document.querySelector('.ui-dialog'));
        });

        it('will not leave the dialog if `props.captureFocus` is `true`', () => {
            const element = render(<UIDialog captureFocus={true} />);

            element.handleFocus({
                target: mountNode,
                relatedTarget: document.activeElement,
                preventDefault: noop,
            });

            expect(document.activeElement).toBe(document.querySelector('.ui-dialog'));
        });
    });

    describe('keydown event', () => {
        it('is forwarded if `props.onKeyDown` is passed', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onKeyDown={stub} />);

            element.handleKeyDown({});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch({})).toBe(true);
        });
    });

    describe('closeOnEscKey', () => {
        it('triggers `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog closeOnEscKey={true} onClose={stub} />);

            element.handleKeyDown({key: 'Escape'});
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onClose={stub} />);

            element.handleKeyDown({key: 'Escape'});
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });
    });

    describe('closeOnOutsideClick', () => {
        it('triggers `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog closeOnOutsideClick={true} onClose={stub} />);

            element.handleOutsideClick({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onClose={stub} />);

            element.handleOutsideClick({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });
    });

    describe('closeOnOutsideFocus', () => {
        it('triggers `props.onClose` if truthy and `props.captureFocus` is falsy', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog captureFocus={false} closeOnOutsideFocus={true} onClose={stub} />);

            expect(document.activeElement).not.toBe(document.querySelector('.ui-dialog'));

            element.handleFocus({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger `props.onClose` if `props.captureFocus` is truthy', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog captureFocus={true} closeOnOutsideFocus={true} onClose={stub} />);

            element.handleFocus({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });

        it('will not trigger `props.onClose` if falsy and `props.captureFocus` is falsy', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog captureFocus={false} closeOnOutsideFocus={false} onClose={stub} />);

            expect(document.activeElement).not.toBe(document.querySelector('.ui-dialog'));

            element.handleFocus({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });

        it('will not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onClose={stub} />);

            element.handleFocus({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });
    });

    describe('closeOnOutsideScroll', () => {
        it('triggers `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog closeOnOutsideScroll={true} onClose={stub} />);

            element.handleOutsideScrollWheel({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onClose={stub} />);

            element.handleOutsideScrollWheel({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });
    });

    describe('"outside" elements', () => {
        it('allows rendering of arbitrary content before the dialog', () => {
            const element = render(<UIDialog before={<span className='foo' />} />);

            expect(document.body.querySelector('.foo')).not.toBeNull();
        });

        it('allows rendering of arbitrary content after the dialog', () => {
            const element = render(<UIDialog after={<span className='foo' />} />);

            expect(document.body.querySelector('.foo')).not.toBeNull();
        });
    });

    describe('nested portal components', () => {
        class NestedPortalDemo extends React.PureComponent {
            state = {
                outerPopoverRendered: false,
                innerPopoverRendered: false,
            }

            openInnerPopover = () => this.setState({innerPopoverRendered: true})
            closeInnerPopover = () => this.setState({innerPopoverRendered: false})

            openOuterPopover = () => this.setState({outerPopoverRendered: true})
            closeOuterPopover = () => this.setState({outerPopoverRendered: false})

            maybeRenderInnerPopover() {
                return this.state.innerPopoverRendered ? (
                    <UIPopover
                        anchor={this.$innerButton}
                        className='bar'
                        onClose={this.closeInnerPopover}
                        preset={UIPopover.preset.BELOW}>
                        Merp.
                    </UIPopover>
                ) : null;
            }

            maybeRenderOuterPopover() {
                return this.state.outerPopoverRendered ? (
                    <UIPopover
                        anchor={this.$outerButton}
                        className='foo'
                        onClose={this.closeOuterPopover}
                        preset={UIPopover.preset.BELOW}>
                        <UIButton
                            ref={(instance) => (this.$innerButton = ReactDOM.findDOMNode(instance))}
                            onPressed={this.openInnerPopover}>
                            Bar
                        </UIButton>

                        {this.maybeRenderInnerPopover()}
                    </UIPopover>
                ) : null;
            }

            render() {
                return (
                    <div>
                        <UIButton
                            ref={(instance) => (this.$outerButton = ReactDOM.findDOMNode(instance))}
                            onPressed={this.openOuterPopover}>
                            Foo
                        </UIButton>

                        {this.maybeRenderOuterPopover()}

                        <span tabIndex='0' id='baz' />
                    </div>
                );
            }
        }

        it('treats clicks within nested, but dislocated components as being part of the parent tree', () => {
            const element = render(<NestedPortalDemo />);

            element.openOuterPopover();
            element.openInnerPopover();

            document.querySelector('.bar').click();

            expect(element.state.outerPopoverRendered).toBe(true);
            expect(element.state.innerPopoverRendered).toBe(true);
        });

        it('still closes the inner components if an out-of-scope element is clicked', () => {
            const element = render(<NestedPortalDemo />);

            element.openOuterPopover();
            element.openInnerPopover();

            expect(element.state.outerPopoverRendered).toBe(true);
            expect(element.state.innerPopoverRendered).toBe(true);

            document.getElementById('baz').click();

            sandbox.clock.tick(1);

            expect(element.state.outerPopoverRendered).toBe(false);
            expect(element.state.innerPopoverRendered).toBe(false);
        });
    });
});
