import React, {PropTypes} from 'react';
import {findDOMNode, render} from 'react-dom';
import * as _ from 'lodash';
import Prism from 'prismjs';
import {} from 'prismjs/components/prism-jsx.min.js';
import {Router, Route, Link, browserHistory} from 'react-router';

import * as Boundless from '../exports';
import ComponentPage from './component-page';
import Markdown from './markdown';

import masterREADME from '../README.md';
import {} from './style.styl';

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

const {
    Button,
    Popover,
    Typeahead,
} = Boundless;

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

const svgCaretComponent = (
    <svg width='1792' height='1792' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'>
        <path d='M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z'/>
    </svg>
);

const repositoryURL = 'https://github.com/bibliotech/uikit';

class StickyBar extends React.PureComponent {
    state = {
        entities: [],
        shouldRenderComponentsMenu: false,
        shouldRenderUtilitiesMenu: false,
    }

    componentWillMount() {
        const entities = [];

        components.forEach((definition) => {
            entities.push({
                'data-path': definition.path,
                key: definition.path,
                text: definition.path,
            });
        });

        this.setState({entities});
    }

    componentDidMount() {
        this.mounted = true;

        Stickyfill.add(this.$stickyBar); // polyfill for position: sticky;
    }

    componentWillUnmount() {
        this.mounted = false;

        Stickyfill.remove(this.$stickyBar); // polyfill for position: sticky;
    }

    renderLink({path}) {
        return (<Link key={path} to={`/${path}`}>{path}</Link>);
    }

    handleEntitySelected = (index) => {
        browserHistory.push(this.state.entities[index]['data-path']);
    }

    handleComplete = (value) => {
        if (!value) {
            return browserHistory.push('');
        }

        const found = this.state.entities.find((entity) => entity.text === value);

        if (found) {
            browserHistory.push(found['data-path']);
        }
    }

    maybeRenderStickyBarMenu(anchor, collection, stateAttrName) {
        if (this.mounted && this.state[stateAttrName]) {
            return (
                <Popover
                    anchor={anchor}
                    anchorXAlign={Popover.position.START}
                    className='sticky-bar-menu'
                    onClick={() => this.mounted && this.setState({[stateAttrName]: false})}
                    onClose={() => this.mounted && this.setState({[stateAttrName]: false})}
                    selfXAlign={Popover.position.START}>
                    {collection.map((definition) => this.renderLink(definition))}
                </Popover>
            );
        }
    }

    render() {
        return (
            <header ref={(instance) => (this.$stickyBar = instance)} className='sticky-bar'>
                <div className='star-wrapper'>
                    <div className='stars1' />
                    <div className='stars2' />
                    <div className='stars3' />
                </div>

                <div className='sticky-bar-inner'>
                    <Link className='sticky-bar-brand' to='/'>Boundless</Link>

                    <Button
                        className='sticky-bar-menu-button'
                        onPressed={() => this.setState({
                            shouldRenderComponentsMenu: true,
                        })}
                        onUnpressed={() => this.setState({shouldRenderComponentsMenu: false})}
                        pressed={this.state.shouldRenderComponentsMenu}
                        ref={(instance) => (this.$componentsMenuTrigger = instance)}>
                        <div className='sticky-bar-menu-button-inner'>Components {svgCaretComponent}</div>
                    </Button>

                    {/*<Button
                        className='sticky-bar-menu-button'
                        onPressed={() => this.setState({
                            shouldRenderUtilitiesMenu: true,
                        })}
                        onUnpressed={() => this.setState({shouldRenderUtilitiesMenu: false})}
                        pressed={this.state.shouldRenderUtilitiesMenu}
                        ref={(instance) => (this.$utilitiesMenuTrigger = instance)}>
                        <div className='sticky-bar-menu-button-inner'>Utilities {svgCaretComponent}</div>
                    </Button>*/}

                    {this.maybeRenderStickyBarMenu(this.$componentsMenuTrigger, components, 'shouldRenderComponentsMenu')}

                    <Typeahead
                        algorithm={Typeahead.mode.FUZZY}
                        className='sticky-bar-search'
                        entities={this.state.entities}
                        onEntitySelected={this.handleEntitySelected}
                        onComplete={this.handleComplete}
                        inputProps={{
                            placeholder: 'Search Boundless...',
                        }}
                        hint={true} />
                </div>
            </header>
        );
    }
}

class Container extends React.PureComponent {
    static propTypes = {
        children: PropTypes.any,
        routes: PropTypes.array,
    }

    componentDidMount() {
        Prism.highlightAll();
        this.autoscroll();
    }

    componentDidUpdate() {
        Prism.highlightAll();
        this.autoscroll();
    }

    autoscroll() {
        if (window.location.hash.length > 1) {
            const node = document.getElementById(window.location.hash.slice(1));

            if (node) {
                node.scrollIntoView();
                document.body.scrollTop -= 100;
            }
        } // autoscroll to the anchor node
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
                <div className='stars1' />
                <div className='stars2' />
                <div className='stars3' />

                <div className='splash-overlay'>
                    <div className='splash-tab splash-tab-upper'>
                        an <a href='http://enigma.io/' target='_blank'>Enigma</a> creation
                    </div>

                    <div className='splash-inner'>
                        <h1>Boundless</h1>
                        <p>Battle-tested, versatile React components with infinite composability.</p>
                    </div>

                    <div
                        className='splash-tab splash-tab-lower'
                        onClick={() => this.$sticky.scrollIntoView()}>
                        {svgCaretComponent}
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

                <StickyBar ref={(instance) => (this.$sticky = findDOMNode(instance))} />

                <main className='demo-section'>
                    {this.maybeRenderGithubLinks(route)}
                    {route.docgenInfo ? (
                        <ComponentPage
                            demo={route.demo}
                            docgenInfo={route.docgenInfo}
                            />
                    ) : <Markdown>{route.readme}</Markdown>}
                </main>
            </div>
        );
    }
}

render(
    <Router history={browserHistory}>
        <Route path='/' component={Container} readme={masterREADME}>
            {components.map((definition) => (
                <Route
                    {...definition}
                    key={definition.path}
                    path={definition.path} />
            ))}
        </Route>
    </Router>, document.getElementById('root')
);
