import {createElement, PropTypes} from 'react';

import Async from '../packages/boundless-async/index.js';
import ProgressiveDisclosure from '../packages/boundless-progressive-disclosure/index.js';

function getPackageIndexURI(name) {
    return `https://api.github.com/repos/enigma-io/boundless/contents/packages/${name}/demo/index.js`;
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function fixupDemoCode(snippet, moduleName) {
    let amendedSnippet = snippet;

    // add in the jsx pragma, since most users probably won't have that enabled in their Babel setup
    amendedSnippet = '/** @jsx createElement */\n\n' + amendedSnippet;

    // replace all relative links with what things would look like in real-world usage
    amendedSnippet = amendedSnippet.replace(/from '(?:\.\.?\/){1,}(.*?)'/g, (_, match) => {
        return `from '${match === '' || match === 'index' ? moduleName : match.replace('/index', '')}'`;
    });

    return amendedSnippet.trim();
}

const ComponentDemo = ({name, prettyName = 'Demo'}) => (
    <Async>
        {import(`../packages/${name}/demo/index.js`).then(
            (module) => (
                <div className='demo-section-wrapper'>
                    <h3>
                        {prettyName}
                    </h3>

                    <div className='demo-section-example'>
                        <module.default />
                    </div>

                    <ProgressiveDisclosure
                        className='demo-implementation-disclosure'
                        toggleContent='Show Implementation'
                        toggleExpandedContent='Hide Implementation'>
                        {() => (
                            <Async childrenDidRender={window.Prism.highlightAll}>
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
                                                {fixupDemoCode(b64DecodeUnicode(payload.content), name)}
                                            </code>
                                        </pre>
                                    );
                                })}
                            </Async>
                        )}
                    </ProgressiveDisclosure>
                </div>
            ), () => <span />
        )}
    </Async>
);

ComponentDemo.propTypes = {
    name: PropTypes.string.isRequired,
    prettyName: PropTypes.string,
};

export default ComponentDemo;
