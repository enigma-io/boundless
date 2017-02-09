import {partialRight} from 'lodash';
import MarkdownToJSX from 'markdown-to-jsx';

import EnhancedLink from './enhanced-link';

const md2jsx = partialRight(MarkdownToJSX, {
    overrides: {
        a: {component: EnhancedLink},
    },
});

/**
 * Takes in a markdown string and returns JSX.
 * @return {jsx}
 */
export default ({children = ''}) => md2jsx(children);
