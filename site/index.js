if (module.hot) {
    require('react-hot-loader/patch');
}

import React from 'react';
import {render as r} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Site from './routing';

import './style.styl';

const render = (Component) => r(
    <AppContainer>
        <Component />
    </AppContainer>, document.getElementById('root')
);

render(Site);

if (module.hot) {
    module.hot.accept('./routing', () => render(Site));
}
