import React, {PropTypes} from 'react';

import * as Boundless from '../exports';

function getPackageIndexURI(name) {
    return `https://api.github.com/repos/enigma-io/boundless/contents/packages/${name}/demo/index.js`;
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

const ComponentDemo = ({demo, name, prettyName = 'Demo'}) => (
    <div className='demo-section-wrapper'>
        <h3>
            {prettyName}
        </h3>

        <div className='demo-section-example'>
            {React.createElement(demo)}
        </div>

        <Boundless.ProgressiveDisclosure
            className='demo-implementation-disclosure'
            toggleContent='Show Implementation'
            toggleExpandedContent='Hide Implementation'>
            {() => (
                <Boundless.Async childrenDidRender={() => window.Prism.highlightAll()}>
                    {fetch(getPackageIndexURI(name)).then(
                        (response) => response.ok ? response.json() : response.statusText,
                        (error) => error.message,
                    ).then((payload) => {
                        if (typeof payload === 'string') {
                            return <p>There was a network failure retrieving the demo source ({payload}).</p>;
                        }

                        return (
                            <pre className='demo-implementation'>
                                <code className='language-jsx'>
                                    {b64DecodeUnicode(payload.content)}
                                </code>
                            </pre>
                        );
                    })}
                </Boundless.Async>
            )}
        </Boundless.ProgressiveDisclosure>
    </div>
);

ComponentDemo.propTypes = {
    demo: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    prettyName: PropTypes.string,
};

export default ComponentDemo;
