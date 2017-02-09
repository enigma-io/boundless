/* global VERSION */

import React, {PropTypes} from 'react';
import {browserHistory, Link, Redirect, Router, Route} from 'react-router';
import * as _ from 'lodash';

import * as Boundless from '../exports';
import ComponentDemo from './component-demo';
import LinkedHeaderText from './linked-header-text';
import Markdown from './markdown';
import pascalCase from './pascal-case';

import repositoryREADME from '../README.md';
import GettingStarted from '../GETTING_STARTED.md';

// remove everything up to the first H2
const README = repositoryREADME.replace(/(\n?.*){3}/, '');

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

const utilsReq = require.context('..', true, /(?!node_modules)packages\/boundless\-utils\-[^/]*?\/README\.md$/);
const utilsReqKeys = utilsReq.keys();

const utilsDemoReq = require.context('..', true, /(?!node_modules)packages\/boundless\-utils\-[^/]*?\/demo\/index\.js$/);
const utilsDemoReqKeys = utilsDemoReq.keys();

const utilities = utilsReqKeys.map((path) => {
    const name = path.match(/(boundless\-utils\-.*?)\//)[1];
    const demoPath = `./packages/${name}/demo/index.js`;
    const prettyName = _.camelCase(name.replace('boundless-utils-', ''));

    return {
        name,

        demo: _.includes(utilsDemoReqKeys, demoPath) ? utilsDemoReq(demoPath).default : null,

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

const formatPropType = (type) => {
    switch (type.name) {
    case 'arrayOf':
        if (type.value.name !== 'custom') {
            return `${type.name}(${formatPropType(type.value)})`;
        }

        return 'array';

    case 'element':
        return 'ReactElement';

    case 'enum':
        if (type.computed === true) {
            return _.keys(
                _.get(Boundless, type.value, {})
            ).map((key) => `${type.value}.${key}`).join(' or\n');
        } else if (Array.isArray(type.value)) {
            return _.map(type.value, 'value').join(' or\n');
        }

        return `oneOf(${type.value})`;

    case 'func':
        return 'function';

    case 'instanceOf':
       return type.value;

    case 'node':
        return 'any renderable';

    case 'shape':
        return 'object';

    case 'union':
        return type.value.map((v) => formatPropType(v)).join(' or ');
    }

    return type.name;
};

class ComponentPage extends React.PureComponent {
    static propTypes = {
        demo: PropTypes.any,
        docgenInfo: PropTypes.object,
        packageName: PropTypes.string,
        prettyName: PropTypes.string,
    }

    renderSubPropTableRow = (props, name, depth) => (
        <tr key={name} className={`prop-row prop-depth-${depth}`}>
            <td className='prop-name'>
                <Boundless.FittedText
                    component='strong'
                    name={`prop-${name}`}>
                    <code>{name}</code>
                </Boundless.FittedText>
            </td>
            <td className='prop-implementation'>
                <h5>Expects</h5>
                <pre><code>{formatPropType(props[name])}</code></pre>
            </td>
            <td className='prop-description'>
                <Markdown>{props[name].description}</Markdown>
            </td>
        </tr>
    )

    /**
     * @param  {Object}         allProps
     * @param  {String}         name       the prop's name, may be a subprop (e.g. foo.bar)
     * @param  {Number}         depth      [description]
     * @return {jsx}
     */
    renderPropTableRows(allProps, name, depth = 0) {
        if (!allProps[name].type && !allProps[name].name) { return null; }

        const prop = _.get(allProps, name);

        const rows = [(
            <tr key={name} className={`prop-row prop-depth-${depth}`}>
                <td className='prop-name'>
                    <Boundless.FittedText
                        component='strong'
                        name={`prop-${name}`}>
                        <code>{name}</code>
                    </Boundless.FittedText>
                </td>

                <td className='prop-implementation'>
                    <h5>Expects</h5>
                    <pre>
                        <code>
                            {formatPropType(prop.type || prop)}
                        </code>
                    </pre>

                    {prop.defaultValue ? [
                        <h5 key='val'>Default Value</h5>,
                        <pre key='val-code'>
                            <code className='lang-js'>
                                {prop.defaultValue.value === 'noop' ? '() => {}' : prop.defaultValue.value}
                            </code>
                        </pre>,
                    ] : null}
                </td>

                <td className='prop-description'>
                    <Markdown>{prop.description}</Markdown>
                </td>
            </tr>
        )];

        if (!prop.type) {
            return rows;
        }

        if (_.includes(['enum', 'union', 'instanceOf'], prop.type.name) || !prop.type.value) {
            return rows;
        }

        let target = prop.type;

        if (target.name === 'shape') {
            let resolvedProps;

            if (target.computed && _.isString(target.value)) {
                resolvedProps = _.get(Boundless, `${target.value.split('.')[0]}.__docgenInfo.props`);
            } else {
                resolvedProps = target.value;
            }

            return rows.concat(
                _.map(resolvedProps, (x, subPropName) => {
                    return this.renderPropTableRows(resolvedProps, subPropName, depth + 1);
                })
            );
        }

        if (target.value.value || target.value.raw) {
            let subProps = target.value.name === 'shape' && !target.value.computed
                           ? target.value.value
                           : target.value;

             if (subProps.name === 'shape') {
                const [component] = subProps.value.split('.');

                subProps = _.get(Boundless, `${component}.__docgenInfo.props`);

                return rows.concat(
                    _.map(
                        subProps,
                        (x, subPropName) => this.renderPropTableRows(subProps, subPropName, depth + 1)
                    )
                );
            } else if (subProps.name === 'custom') {
                const [component, , subPropName] = subProps.raw.split('.');

                return rows.concat(
                    this.renderPropTableRows(
                        _.get(Boundless, `${component}.__docgenInfo.props`), subPropName, depth + 1
                    )
                );
            }

            return rows.concat(
                _.map(
                    subProps,
                    (x, subPropName) => this.renderSubPropTableRow(subProps, subPropName, depth + 1)
                )
            );
        }

        return rows;
    }

    renderPropTable(props, required) {
        if (_.size(props) === 0) {
            return (
                <p>
                    There are no {required ? 'required' : 'optional'} props.
                </p>
            );
        }

        return (
            <table>
                <thead>
                    <tr className='prop-row'>
                        <th className='prop-name'>Name</th>
                        <th className='prop-detail'>Implementation</th>
                        <th className='prop-description'>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {_.map(_.sortBy(_.keys(props), [_.identity]), (propName) => this.renderPropTableRows(
                        props, propName
                    ))}
                </tbody>
            </table>
        );
    }

    maybeRenderDemo() {
        if (this.props.demo) {
            return (
                <ComponentDemo
                    demo={this.props.demo}
                    name={this.props.packageName} />
            );
        }
    }

    render({docgenInfo, prettyName} = this.props) {
        const descriptionParts = docgenInfo.description.split(/(\n#{1,}?.*?\n)/);

        // assembles the props from composed components all the way down the chain
        const coalesced = {...docgenInfo};
        const stack = docgenInfo.composes || [];

        while (stack.length) {
            if (stack[0].indexOf('boundless-') !== -1) {
                const component = stack[0].match(/boundless-(\w+)/)[1];
                const componentDocgen = Boundless[pascalCase(component)].__docgenInfo;

                coalesced.props = {
                    ...coalesced.props,
                    ...componentDocgen.props,
                };

                if (componentDocgen.composes) {
                    stack.push.apply(stack, componentDocgen.composes);
                }
            }

            stack.shift();
        }

        return (
            <div>
                <LinkedHeaderText component='h1'>{prettyName}</LinkedHeaderText>
                <Markdown>{descriptionParts[0]}</Markdown>
                {this.maybeRenderDemo()}
                <Markdown>{descriptionParts.slice(1).join('')}</Markdown>

                <LinkedHeaderText component='h2'>Props</LinkedHeaderText>
                <LinkedHeaderText component='h3'>Required Props</LinkedHeaderText>
                {this.renderPropTable(_.pickBy(coalesced.props, {required: true}), true)}

                <LinkedHeaderText component='h3'>Optional Props</LinkedHeaderText>
                {this.renderPropTable(_.pickBy(coalesced.props, {required: false}), false)}
            </div>
        );
    }
}

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
                    href={`${repositoryURL}/blob/master/packages/${route.name}/index.js`}
                    target='_blank'
                    rel='noopener'>
                    Component Source
                </a>
            ), (
                <a
                    key='demo-source'
                    className='demo-implementation-link'
                    href={`${repositoryURL}/blob/master/packages/${route.name}/demo/index.js`}
                    target='_blank'
                    rel='noopener'>
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
                    <p>accessible, battle-tested, infinitely composable react components</p>
                </div>
            </section>
        );
    }

    renderMainContent(route) {
        const sections = [];

        if (route.markdown) {
            sections.push(
                <Markdown key='md'>
                    {route.demo ? route.markdown.split(/(\n#{1,}\sExample Usage.*?\n)/)[0] : route.markdown}
                </Markdown>
            );
        }

        if (route.docgenInfo) {
            sections.push(
                <ComponentPage
                    key='component'
                    demo={route.demo}
                    docgenInfo={route.docgenInfo}
                    packageName={route.name}
                    prettyName={route.path} />
            );
        } else if (route.demo) {
            sections.push(
                <ComponentDemo
                    key='demo'
                    demo={route.demo}
                    name={route.name} />
            );
        }

        if (route.component && route.path !== '/') {
            sections.push(<route.component key='custom' />);
        }

        return sections;
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
                            <a
                                className='release-link'
                                href={`${repositoryURL}/releases`}
                                title='View all Boundless releases'
                                target='_blank'
                                rel='noopener'>
                                v{VERSION}
                            </a>
                        </header>
                        <nav>
                            <section>
                                <Link activeClassName='active' to='/quickstart'>Get Started</Link>
                                <Link activeClassName='active' to='/kitchensink'>Kitchen Sink</Link>
                            </section>

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

                            <h4>Utilities</h4>
                            <section>
                                {utilities.map((component) => (
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

                    <a
                        className='b-button'
                        href='http://enigma.io/careers/'
                        target='_blank'
                        rel='noopener'>
                        See job openings
                    </a>
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
                key={component.name}
                demo={component.demo}
                name={component.name}
                prettyName={component.path} />
        ))}
    </div>
);

const setTabTitle = (routing) => {
    const currentRoute = _.last(routing.routes);
    let title;

    switch (currentRoute.path) {
    case '/':
        title = 'boundless';
        break;

    case 'quickstart':
        title = 'boundless / Get Started';
        break;

    case 'kitchensink':
        title = 'boundless / Kitchen Sink';
        break;

    default:
        title = `boundless / ${currentRoute.path}`;
    }

    document.title = title;
};

const updateTabTitle = (x, routing) => setTabTitle(routing);

export default (
    <Router history={browserHistory}>
        <Route
            path='/'
            component={Container}
            onEnter={setTabTitle}
            onChange={updateTabTitle}
            markdown={README}>
            <Route path='quickstart' markdown={GettingStarted} />
            <Route path='kitchensink' component={KitchenSink} />

            {components.map((component) => (
                <Route
                    {...component}
                    key={component.path}
                    path={component.path} />
            ))}

            {utilities.map((definition) => (
                <Route
                    {...definition}
                    key={definition.path}
                    path={definition.path} />
            ))}

            <Redirect from='*' to='/' />
        </Route>
    </Router>
);
