if (module.hot) {
    require('react-hot-loader/patch');
}

import {createElement} from 'react';
import {render as r} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import Site from './site';
import './style.styl';

OfflinePluginRuntime.install();

const render = (Component) => r(
    <AppContainer>
        <Component />
    </AppContainer>, document.getElementById('root')
);

render(Site);

if (module.hot) {
    module.hot.accept('./site', () => render(Site));
}
