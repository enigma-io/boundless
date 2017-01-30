/* global VERSION */

import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {browserHistory, Link, Redirect, Router, Route} from 'react-router';
import _ from 'lodash';

import * as Boundless from '../exports';
import ComponentDemo from './component-demo';
import ComponentPage from './component-page';
import LinkedHeaderText from './linked-header-text';
import Markdown from './markdown';

import README from '../README.md';
import GettingStarted from '../GETTING_STARTED.md';

import './style.styl';

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

const demoReq = require.context('..', true, /(?!node_modules)packages\/boundless\-(?!utils)[^/]*?\/demo\/index\.js$/);
const demoReqKeys = demoReq.keys();

const components = _.keys(Boundless).map((prettyName) => {
    const name = 'boundless-' + _.kebabCase(prettyName);
    const demoPath = `./packages/${name}/demo/index.js`;

    return {
        demo: _.includes(demoReqKeys, demoPath) ? demoReq(demoPath).default : null,
        docgenInfo: Boundless[prettyName].__docgenInfo,
        name: name,
        path: prettyName,
    };
});

const utilsReq = require.context('..', true, /(?!node_modules)packages\/boundless-utils-[^/]*?\/README\.md$/);
const utilsReqKeys = utilsReq.keys();

const utils = utilsReqKeys.map((path) => {
    const name = path.match(/(boundless\-utils\-.*?)\//)[1];
    const prettyName = _.camelCase(name.replace('boundless-utils-', ''));

    return {
        name,

        // drop the comment added to the top by build-packages.js
        markdown: utilsReq(path).split(/\n/).slice(3).join('\n'),
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

const repositoryURL = 'https://github.com/enigma-io/boundless';

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

    renderMainContent(route) {
        if (route.markdown) {
            return (
                <Markdown>
                    {route.markdown}
                </Markdown>
            );
        } else if (route.docgenInfo) {
            return (
                <ComponentPage
                    demo={route.demo}
                    docgenInfo={route.docgenInfo}
                    packageName={route.name} />
            );
        } else if (route.component) {
            return (<route.component />);
        }
    }

    render() {
        const route = _.last(this.props.routes);

        return (
            <div>
                {route.path === '/' ? this.renderSplash() : null}

                <main ref={(node) => (this.main = node)}>
                    <article>
                        {this.maybeRenderGithubLinks(route)}
                        {this.renderMainContent(route)}
                    </article>
                    <aside className='boundless-nav'>
                        <header>
                            <Link className='brand' to='/'>boundless</Link>
                            <a className='release-link' href='https://github.com/enigma-io/boundless/releases' title='View all Boundless releases' target='_blank'>v{VERSION}</a>
                        </header>
                        <nav>
                            <Link activeClassName='active' to='/quickstart'>Get Started</Link>

                            <Link activeClassName='active' to='/kitchensink'>Kitchen Sink</Link>

                            <h4>Components</h4>
                            <section>
                                {components.map((component) => (
                                    <Link
                                        activeClassName='active'
                                        key={component.name}
                                        to={component.path}>
                                        {component.path}
                                    </Link>
                                ))}
                            </section>

                            <h4>Utils</h4>
                            <section>
                                {utils.map((component) => (
                                    <Link
                                        activeClassName='active'
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

const KitchenSink = () => (
    <div className='kitchensink'>
        <LinkedHeaderText component='h1'>
            Kitchen Sink
        </LinkedHeaderText>

        <p>The demos of every component are shown here for convenience.</p>

        {components.filter((component) => !!component.demo).map((component) => (
            <ComponentDemo
                demo={component.demo}
                name={component.name}
                prettyName={component.path} />
        ))}
    </div>
);

render(
    <Router history={browserHistory}>
        <Route path='/' component={Container} markdown={README.replace(/^#\s+.*?\n/, '')}>
            <Route path='quickstart' markdown={GettingStarted} />
            <Route path='kitchensink' component={KitchenSink} />

            {components.map((component) => (
                <Route
                    {...component}
                    key={component.path}
                    path={component.path} />
            ))}

            {utils.map((definition) => (
                <Route
                    {...definition}
                    key={definition.path}
                    path={definition.path} />
            ))}

            <Redirect from='*' to='/' />
        </Route>
    </Router>, document.getElementById('root')
);
