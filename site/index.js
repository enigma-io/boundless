import {render as r} from 'react-dom';
import routes from './routing';

import './style.styl';
import './stars.styl';
import './boundless.styl';

const render = (tree) => r(tree, document.getElementById('root'));

render(routes);

if (module.hot) {
    module.hot.accept('./routing.js', () => render(routes));
}
