/* eslint no-unused-expressions:0 */

import {createElement} from 'react';
import ReactDOM from 'react-dom';

import FittedText from './index';
import {$, conformanceChecker} from '../boundless-utils-test-helpers/index';

describe('fitted text component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);
    const props = {children: 'foo'};

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, FittedText));

    it('renders .b-text', () => {
        render(<FittedText {...props} />);
        expect($('.b-text')).not.toBeNull();
    });

    it('accepts a different component type', () => {
        render(<FittedText {...props} component='time' />);
        expect($('time.b-text')).not.toBeNull();
    });

    it('accepts an additional CSS class', () => {
        render(<FittedText {...props} className='foo' />);
        expect($('.b-text.foo')).not.toBeNull();
    });

    it('accepts text to render', () => {
        render(<FittedText {...props} />);
        expect($('.b-text').textContent).toBe('foo');
    });

    // TODO make some layout tests by hijacking getComputedStyle, since JSDOM doesn't do layout
});
