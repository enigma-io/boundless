/* eslint no-unused-expressions:0 */

import UITable from './index.jsx';
import React from 'react';

function noop() {}

describe('UITable', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });
});
