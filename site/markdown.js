import { partialRight } from 'lodash';
import MarkdownToJSX from 'markdown-to-jsx';

import EnhancedLink from './enhanced-link';
import LinkedHeaderText from './linked-header-text';

const md2jsx = partialRight(MarkdownToJSX, {
    overrides: {
        a: { component: EnhancedLink },
        h2: { component: LinkedHeaderText, props: { component: 'h2' } },
        h3: { component: LinkedHeaderText, props: { component: 'h3' } },
        h4: { component: LinkedHeaderText, props: { component: 'h4' } },
        h5: { component: LinkedHeaderText, props: { component: 'h5' } },
        h6: { component: LinkedHeaderText, props: { component: 'h6' } },
    },
});

/**
 * Takes in a markdown string and returns JSX.
 * @return {jsx}
 */
export default ({ children = '' }) => md2jsx(children);
