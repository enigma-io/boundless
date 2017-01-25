/* global VERSION */

import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {browserHistory, Link, Redirect, Router, Route} from 'react-router';
import _ from 'lodash';

import * as Boundless from '../exports';
import ComponentPage from './component-page';
import Markdown from './markdown';

import README from '../README.md';
import GettingStarted from '../GETTING_STARTED.md';

import './style.styl';

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

const starfield = (
    <div className='starfield'>
        <div className='starfield-seed-1' />
        <div className='starfield-seed-2' />
        <div className='starfield-seed-3' />
    </div>
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
                {starfield}

                <div className='splash-inner'>
                    <h1>boundless</h1>
                    <p>Battle-tested, versatile React components with infinite composability.</p>
                    <div className='splash-indicator'>
                        <span className='splash-nudge' onClick={() => this.main.scrollIntoView({behavior: 'smooth'})}>👇</span>
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

                <main ref={node => (this.main = node)}>
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
                    {starfield}

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

            <Redirect from='*' to='/' />
        </Route>
    </Router>, document.getElementById('root')
);
