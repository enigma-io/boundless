/* global VERSION */

import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import * as _ from 'lodash';
import {Router, Route, Link, browserHistory} from 'react-router';

import * as Boundless from '../exports';
import ComponentPage from './component-page';
import Markdown from './markdown';

import README from '../README.md';
import GettingStarted from '../GETTING_STARTED.md';

import {} from './style.styl';

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

const req = require.context('..', true, /packages\/boundless\-(?!utils)[^/]*?\/(index\.js|demo\/index\.js)$/);
const reqKeys = req.keys();

const components = _.keys(Boundless).map((prettyName) => {
    const name = 'boundless-' + _.kebabCase(prettyName);
    const demoPath = `./packages/${name}/demo/index.js`;

    return {
        demo: _.includes(reqKeys, demoPath) ? req(demoPath).default : null,
        docgenInfo: req(`./packages/${name}/index.js`).default.__docgenInfo,
        name: name,
        path: prettyName,
    };
});

const Starfield = () => (
    <div className='starfield'>
        <div className='starfield-seed-1' />
        <div className='starfield-seed-2' />
        <div className='starfield-seed-3' />
    </div>
);

const svgCaretComponent = (
    <svg width='1792' height='1792' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'>
        <path d='M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z'/>
    </svg>
);

const repositoryURL = 'https://github.com/bibliotech/uikit';

class Container extends React.PureComponent {
    static propTypes = {
        children: PropTypes.any,
        routes: PropTypes.array,
    }

    componentDidMount() {
        window.Prism.highlightAll();
        this.autoscroll();
    }

    componentDidUpdate() {
        window.Prism.highlightAll();
        this.autoscroll(true);
    }

    autoscroll(switchedPage) {
        window.setTimeout(() => {
            if (window.location.hash.length > 1) {
                const node = document.getElementById(window.location.hash.slice(1));

                if (node) {
                    node.scrollIntoView();
                }
            } else if (switchedPage) {
                document.body.scrollTop = 0;
            }
        }, 0);
    }

    maybeRenderGithubLinks(route) {
        if (route.demo) {
            return [(
                <a
                    key='source'
                    className='demo-component-link'
                    href={`${repositoryURL}/blob/master/packages/${route.path}/index.js`}
                    target='_blank'>
                    Component Source
                </a>
            ), (
                <a
                    key='demo-source'
                    className='demo-implementation-link'
                    href={`${repositoryURL}/blob/master/packages/${route.path}/demo/index.js`}
                    target='_blank'>
                    Demo Source
                </a>
            )];
        }
    }

    renderSplash() {
        return (
            <section className='splash'>
                <Starfield />

                <div className='splash-inner'>
                    <h1>boundless</h1>
                    <p>Battle-tested, versatile React components with infinite composability.</p>
                    <div className='splash-indicator'>
                        <span className='splash-nudge'>👇</span>
                    </div>
                </div>
            </section>
        );
    }

    render() {
        const route = _.last(this.props.routes);

        return (
            <div>
                {route.path === '/' ? this.renderSplash() : null}

                <main>
                    <article>
                        {this.maybeRenderGithubLinks(route)}
                        {route.docgenInfo ? (
                            <ComponentPage
                                demo={route.demo}
                                docgenInfo={route.docgenInfo}
                                packageName={route.name} />
                        ) : <Markdown>{route.markdown}</Markdown>}
                    </article>
                    <aside className='boundless-nav'>
                        <header>
                            <Link className='brand' to='/'>boundless</Link>
                            <a className='release-link' href='https://github.com/enigma-io/boundless/releases' title='View all Boundless releases' target='_blank'>v{VERSION}</a>
                        </header>
                        <nav>
                            <Link activeClassName='active' to='/quickstart'>Get Started</Link>

                            <h4>Components</h4>
                            <section>
                                {components.map((component) => (
                                    <Link
                                        activeClassName='active'
                                        className=''
                                        key={component.name}
                                        to={component.path}>
                                        {component.path}
                                    </Link>
                                ))}
                            </section>
                        </nav>
                    </aside>
                </main>

                <footer className='boundless-footer'>
                    <Starfield />

                    <div>
                        <strong>boundless</strong>&nbsp;is developed in partnership with&nbsp;<a href='http://enigma.io'>enigma</a>
                    </div>

                    <a className='b-button' href='http://enigma.io/careers/' target='_blank'>See job openings</a>
                </footer>
            </div>
        );
    }
}

render(
    <Router history={browserHistory}>
        <Route path='/' component={Container} markdown={README.replace(/^#\s+.*?\n/, '')}>
            <Route path='quickstart' markdown={GettingStarted} />
            {components.map((definition) => (
                <Route
                    {...definition}
                    key={definition.path}
                    path={definition.path} />
            ))}
        </Route>
    </Router>, document.getElementById('root')
);
