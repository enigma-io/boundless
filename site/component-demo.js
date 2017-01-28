import React, {PropTypes} from 'react';

import * as Boundless from '../exports';
import LinkedHeaderText from './linked-header-text';

function getPackageIndexURI(name) {
    return `https://api.github.com/repos/enigma-io/boundless/contents/packages/${name}/demo/index.js`;
}

function fetchDemo(packageName) {
    return fetch(getPackageIndexURI(packageName)).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    });
}

const ComponentDemo = ({demo, name, prettyName = 'Demo'}) => (
    <div className='demo-section-wrapper'>
        <LinkedHeaderText component='h3'>
            {prettyName}
        </LinkedHeaderText>

        <div className='demo-section-example'>
            {React.createElement(demo)}
        </div>

        <Boundless.ProgressiveDisclosure
            className='demo-implementation-disclosure'
            teaser='Show Implementation'
            teaserExpanded='Hide Implementation'>
            {() => (
                <Boundless.Async
                    data={fetchDemo(name)}
                    contentRenderedFunc={() => window.Prism.highlightAll()}
                    convertToJSXFunc={(json) => (
                        <pre className='demo-implementation'>
                            <code className='language-jsx'>
                                {atob(json.content)}
                            </code>
                        </pre>
                    )}
                    errorContent='There was a network failure retrieving the demo source.' />
            )}
        </Boundless.ProgressiveDisclosure>
    </div>
);

ComponentDemo.propTypes = {
    demo: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    prettyName: PropTypes.string.isRequired,
};

export default ComponentDemo;
