/* eslint no-unused-expressions:0 */

import { createElement, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { noop } from 'lodash';

import Dialog from './index';
import Button from '../boundless-button/index';
import Popover from '../boundless-popover/index';
import { $, $$, conformanceChecker } from '../boundless-utils-test-helpers/index';

describe('Dialog component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create({ useFakeTimers: true });

    beforeEach(() => sandbox.useFakeTimers());
    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.reset();
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Dialog, {}));

    it('renders .b-dialog', () => {
        render(<Dialog />);
        expect($('.b-dialog')).not.toBe(null);
    });

    it('accepts component customization', () => {
        render(<Dialog component='figure' />);
        expect($('figure.b-dialog-wrapper')).not.toBe(null);
    });

    it('accepts dialog component customization', () => {
        render(<Dialog dialogComponent='article' />);
        expect($('article.b-dialog')).not.toBe(null);
    });

    it('accepts an additional CSS class', () => {
        render(<Dialog className='foo' />);
        expect($('.b-dialog-wrapper.foo')).not.toBe(null);
    });

    it('accepts renderable content as a nested child', () => {
        render(<Dialog>foo</Dialog>);
        expect($('.b-dialog').textContent).toBe('foo');
    });

    it('uses the "alertdialog" aria role if props.captureFocus is true', () => {
        render(<Dialog captureFocus={true} />);
        expect($('.b-dialog[role="alertdialog"]')).not.toBeNull();
    });

    it('uses the "dialog" aria role if props.captureFocus is false', () => {
        render(<Dialog captureFocus={false} />);
        expect($('.b-dialog[role="dialog"]')).not.toBeNull();
    });

    it('renders focus boundary nodes if props.captureFocus is true', () => {
        render(<Dialog captureFocus={true} />);
        expect($$('.b-offscreen[tabindex="0"]').length).toBe(2);
    });

    it('will not render focus boundary nodes if props.captureFocus is false', () => {
        render(<Dialog captureFocus={false} />);
        expect($$('.b-offscreen[tabindex="0"]').length).toBe(0);
    });

    describe('focus', () => {
        it('is applied to the dialog on render if props.captureFocus is true', () => {
            render(<Dialog captureFocus={true} />);
            expect(document.activeElement).toBe($('.b-dialog'));
        });

        it('is not applied to the dialog on render if props.captureFocus is false', () => {
            render(<Dialog captureFocus={false} />);
            expect(document.activeElement).not.toBe($('.b-dialog'));
        });

        it('will not leave the dialog if props.captureFocus is true', () => {
            const element = render(<Dialog captureFocus={true} />);

            element.handleFocus({
                target: mountNode,
                relatedTarget: document.activeElement,
                preventDefault: noop,
            });

            expect(document.activeElement).toBe($('.b-dialog'));
        });
    });

    describe('keydown event', () => {
        it('is forwarded if props.onKeyDown is passed', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog onKeyDown={stub} />);

            element.handleKeyDown({});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch({})).toBe(true);
        });
    });

    describe('closeOnEscKey', () => {
        it('triggers props.onClose if true', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnEscKey={true} onClose={stub} />);

            element.handleKeyDown({ key: 'Escape' });
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('triggers props.onClose if function form returns true', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnEscKey={() => true} onClose={stub} />);

            element.handleKeyDown({ key: 'Escape' });
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger props.onClose if false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnEscKey={false} onClose={stub} />);

            element.handleKeyDown({ key: 'Escape' });
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });

        it('will not trigger props.onClose if function form returns false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnEscKey={() => false} onClose={stub} />);

            element.handleKeyDown({ key: 'Escape' });
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });
    });

    describe('closeOnInsideClick', () => {
        it('triggers props.onClose if true', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnInsideClick={true} onClose={stub} />);

            element.handleInsideClick({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('triggers props.onClose if function form returns true', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnInsideClick={() => true} onClose={stub} />);

            element.handleInsideClick({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger props.onClose if false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnInsideClick={false} onClose={stub} />);

            element.handleInsideClick({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });

        it('will not trigger props.onClose if function form returns false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnInsideClick={() => false} onClose={stub} />);

            element.handleInsideClick({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });
    });

    describe('closeOnOutsideClick', () => {
        it('triggers props.onClose if true', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnOutsideClick={true} onClose={stub} />);

            element.handleOutsideClick({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('triggers props.onClose if function form returns true', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnOutsideClick={() => true} onClose={stub} />);

            element.handleOutsideClick({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger props.onClose if false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnOutsideClick={false} onClose={stub} />);

            element.handleOutsideClick({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });

        it('will not trigger props.onClose if function form returns false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnOutsideClick={() => false} onClose={stub} />);

            element.handleOutsideClick({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });
    });

    describe('closeOnOutsideFocus', () => {
        it('triggers props.onClose if true and props.captureFocus is false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog captureFocus={false} closeOnOutsideFocus={true} onClose={stub} />);

            expect(document.activeElement).not.toBe($('.b-dialog'));

            element.handleFocus({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('triggers props.onClose if function form returns true and props.captureFocus is false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog captureFocus={false} closeOnOutsideFocus={() => true} onClose={stub} />);

            expect(document.activeElement).not.toBe($('.b-dialog'));

            element.handleFocus({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger props.onClose if props.captureFocus is true', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog captureFocus={true} closeOnOutsideFocus={true} onClose={stub} />);

            element.handleFocus({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });

        it('will not trigger props.onClose if false and props.captureFocus is false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog captureFocus={false} closeOnOutsideFocus={false} onClose={stub} />);

            expect(document.activeElement).not.toBe($('.b-dialog'));

            element.handleFocus({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });

        it('will not trigger props.onClose if function form returns false and props.captureFocus is false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog captureFocus={false} closeOnOutsideFocus={() => false} onClose={stub} />);

            expect(document.activeElement).not.toBe($('.b-dialog'));

            element.handleFocus({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });

        it('will not trigger props.onClose if false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnOutsideFocus={false} onClose={stub} />);

            element.handleFocus({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });

        it('will not trigger props.onClose if function form returns false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnOutsideFocus={() => false} onClose={stub} />);

            element.handleFocus({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });
    });

    describe('closeOnOutsideScroll', () => {
        it('triggers props.onClose if true', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnOutsideScroll={true} onClose={stub} />);

            element.handleOutsideScrollWheel({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('triggers props.onClose if function form returns true', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnOutsideScroll={() => true} onClose={stub} />);

            element.handleOutsideScrollWheel({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger props.onClose if false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnOutsideScroll={false} onClose={stub} />);

            element.handleOutsideScrollWheel({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });

        it('will not trigger props.onClose if function form returns false', () => {
            const stub = sandbox.stub();
            const element = render(<Dialog closeOnOutsideScroll={() => false} onClose={stub} />);

            element.handleOutsideScrollWheel({ target: mountNode });
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });
    });

    describe('"outside" elements', () => {
        it('allows rendering of arbitrary content before the dialog', () => {
            render(<Dialog before={<span className='foo' />} />);
            expect(document.body.querySelector('.foo')).not.toBeNull();
        });

        it('allows rendering of arbitrary content after the dialog', () => {
            render(<Dialog after={<span className='foo' />} />);
            expect(document.body.querySelector('.foo')).not.toBeNull();
        });
    });

    describe('nested portal components', () => {
        class NestedPortalDemo extends PureComponent {
            state = {
                outerPopoverRendered: false,
                innerPopoverRendered: false,
            }

            openInnerPopover = () => this.setState({ innerPopoverRendered: true })
            closeInnerPopover = () => this.setState({ innerPopoverRendered: false })

            openOuterPopover = () => this.setState({ outerPopoverRendered: true })
            closeOuterPopover = () => this.setState({ outerPopoverRendered: false })

            maybeRenderInnerPopover() {
                return this.state.innerPopoverRendered ? (
                    <Popover
                        anchor={this.$innerButton}
                        className='bar'
                        onClose={this.closeInnerPopover}
                        preset={Popover.preset.BELOW}>
                        Merp.
                    </Popover>
                ) : null;
            }

            maybeRenderOuterPopover() {
                return this.state.outerPopoverRendered ? (
                    <Popover
                        anchor={this.$outerButton}
                        className='foo'
                        onClose={this.closeOuterPopover}
                        preset={Popover.preset.BELOW}>
                        <Button
                            ref={(instance) => (this.$innerButton = ReactDOM.findDOMNode(instance))}
                            onPressed={this.openInnerPopover}>
                            Bar
                        </Button>

                        {this.maybeRenderInnerPopover()}
                    </Popover>
                ) : null;
            }

            render() {
                return (
                    <div>
                        <Button
                            ref={(instance) => (this.$outerButton = ReactDOM.findDOMNode(instance))}
                            onPressed={this.openOuterPopover}>
                            Foo
                        </Button>

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

            $('.bar').click();

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
