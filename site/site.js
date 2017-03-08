/* global VERSION */

import React, {PropTypes} from 'react';
import {IndexRoute, Link, Redirect, Router, Route, browserHistory} from 'react-router';
import * as _ from 'lodash';

import * as Boundless from '../exports';
import Demo from './demo';
import LinkedHeader from './linked-header-text';
import Markdown from './markdown';
import pascalCase from './pascal-case';

const TYPE = {
    COMPONENT: 1,
    UTILITY: 2,
};

const json = require.context('..', true, /(?!node_modules)packages\/boundless-[^/]*?\/package\.json$/);
const jsonPaths = json.keys();

const components = jsonPaths.filter((path) => path.indexOf('utils') === -1 && !json(path).private).map((path) => {
    const name = path.match(/(boundless\-.*?)\//)[1];
    const prettyName = pascalCase(name.replace('boundless-', ''));

    return {
        json: json(path),
        name,
        path: prettyName,
        type: TYPE.COMPONENT,
    };
});

const utilities = jsonPaths.filter((path) => path.indexOf('utils') !== -1 && !json(path).private).map((path) => {
    const name = path.match(/(boundless\-.*?)\//)[1];
    const prettyName = _.camelCase(name.replace('boundless-utils-', ''));

    return {
        json: json(path),
        name,
        path: prettyName,
        type: TYPE.UTILITY,
    };
});

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

    render({docgenInfo} = this.props) {
        const descriptionParts = docgenInfo.description.split(/(\n#{1,}?.*?\n)/);

        // assembles the props from composed components all the way down the chain
        const coalesced = {...docgenInfo};
        const stack = docgenInfo.composes || [];

        return (
            <Boundless.Async childrenDidRender={window.Prism.highlightAll}>
                {new Promise(async (resolve) => {
                    while (stack.length) {
                        try {
                            const component = await import(`../packages/${stack[0]}/index.js`);
                            const componentDocgen = component.default.__docgenInfo;

                            coalesced.props = {
                                ...coalesced.props,
                                ...componentDocgen.props,
                            };

                            if (componentDocgen.composes) {
                                stack.push.apply(stack, componentDocgen.composes);
                            }
                        } catch (err) { console.error(err); }

                        stack.shift();
                    }

                    resolve();
                }).then(() => (
                    <div>
                        <Markdown>{descriptionParts[0]}</Markdown>

                        <LinkedHeader component='h2'>Installation</LinkedHeader>

                        <pre>
                            <code className='language-bash'>
                               {`npm i --save ${this.props.packageName}`}
                            </code>
                        </pre>

                        <p>{this.props.prettyName} can also just be directly used from the main Boundless library. This is recommended when you're getting started to avoid maintaining the package versions of several components:</p>

                        <pre>
                            <code className='language-bash'>
                                npm i boundless --save
                            </code>
                        </pre>

                        <p>the ES6 `import` statement then becomes like:</p>

                        <pre>
                            <code className='language-bash'>
                                {`import { ${this.props.prettyName} } from 'boundless';`}
                            </code>
                        </pre>

                        <Demo name={this.props.packageName} />

                        <Markdown>{descriptionParts.slice(1).join('')}</Markdown>

                        <LinkedHeader component='h2'>Props</LinkedHeader>
                        <LinkedHeader component='h3'>Required Props</LinkedHeader>
                        {this.renderPropTable(_.pickBy(coalesced.props, {required: true}), true)}

                        <LinkedHeader component='h3'>Optional Props</LinkedHeader>
                        {this.renderPropTable(_.pickBy(coalesced.props, {required: false}), false)}
                    </div>
                ))}
            </Boundless.Async>
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
        const links = [];

        if (route.type) {
            links.push(
                <a
                    key='source'
                    className='demo-component-link'
                    href={`${repositoryURL}/blob/master/packages/${route.name}/index.js`}
                    target='_blank'
                    rel='noopener'>
                    View Source
                </a>
            );
        }

        return links;
    }

    renderMainContent(route) {
        const sections = [];

        if (route.title) {
            sections.push(
                <h1 key='title'>
                    {route.title}
                </h1>
            );
        }

        if (route.json) {
            sections.push(
                <p key='description'>
                    <strong>
                        {route.json.description}
                    </strong>
                </p>
            );
        }

        if (route.type === TYPE.COMPONENT) {
            sections.push(
                <Boundless.Async key='component-page' childrenDidRender={window.Prism.highlightAll}>
                    {import(`../packages/${route.name}/index.js`).then(
                        (module) => (
                            <ComponentPage
                                key='component'
                                docgenInfo={module.default.__docgenInfo}
                                packageName={route.name}
                                prettyName={route.path} />
                        )
                    )}
                </Boundless.Async>
            );
        } else if (route.type === TYPE.UTILITY) {
            const fragment = _.kebabCase(route.path);

            sections.push(
                (<Demo key='utility-demo' name={route.name} />),

                (<Boundless.Async key='utility-page' childrenDidRender={window.Prism.highlightAll}>
                    {import(`../packages/boundless-utils-${fragment}/README.md`).then(
                        // remove the HTML comment and description line
                        (md) => <Markdown>{md.split(/\n/).slice(5).join('\n')}</Markdown>, null
                    )}
                </Boundless.Async>)
            );
        }

        if (route.component) {
            sections.push(<route.component key='custom-page' />);
        }

        return sections;
    }

    render() {
        const route = _.last(this.props.routes);

        return (
            <div>
                <main ref={(node) => (this.main = node)}>
                    <article>
                        {this.maybeRenderGithubLinks(route)}
                        {this.renderMainContent(route)}
                    </article>
                    <aside className='boundless-nav'>
                        <header>
                            <Link className='brand' to='/'>boundless<sup>v{VERSION}</sup></Link>
                        </header>
                        <nav>
                            <section>
                                <Link activeClassName='active' to='/quickstart'>Getting Started</Link>
                                <Link activeClassName='active' to='/kitchensink'>Kitchen Sink</Link>
                                <a
                                    href={repositoryURL}
                                    rel='noopener'
                                    target='_blank'>Github</a>
                                <a
                                    href={`${repositoryURL}/releases`}
                                    title='View all Boundless releases'
                                    target='_blank'
                                    rel='noopener'>
                                    Releases
                                </a>
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
                                {utilities.map((utility) => (
                                    <Link
                                        activeClassName='active'
                                        key={utility.name}
                                        to={utility.path}>
                                        {utility.path}
                                    </Link>
                                ))}
                            </section>
                        </nav>
                    </aside>
                </main>
            </div>
        );
    }
}

const HomePage = () => (
    <Boundless.Async childrenDidRender={window.Prism.highlightAll}>
        {import('../README.md').then((md) => <Markdown>{md}</Markdown>)}
    </Boundless.Async>
);

const GettingStartedPage = () => (
    <Boundless.Async childrenDidRender={window.Prism.highlightAll}>
        {import('../GETTING_STARTED.md').then((md) => <Markdown>{md}</Markdown>)}
    </Boundless.Async>
);

const KitchenSinkPage = () => (
    <div className='kitchensink'>
        <p>The demos of every package are shown here for convenience.</p>

        {components.map((component) => (
            <Demo
                key={component.name}
                name={component.name}
                prettyName={component.path} />
        ))}

        {utilities.map((utility) => (
            <Demo
                key={utility.name}
                name={utility.name}
                prettyName={utility.path} />
        ))}
    </div>
);

const handleRouting = (routing) => {
    document.title = `boundless / ${_.last(routing.routes).title}`;

    if (routing.location.pathname !== '/' && routing.location.pathname !== '/quickstart') {
        import('./boundless.styl');
    }

    if (window.ga) {
        window.ga('send', 'pageview', routing.location.pathname);
    }
};

const handleRoutingChange = (x, routing) => handleRouting(routing);

export default () => (
    <Router history={browserHistory}>
        <Route
            path='/'
            component={Container}
            onEnter={handleRouting}
            onChange={handleRoutingChange}>
            <IndexRoute component={HomePage} title='Welcome!' />

            {/* If adding a non-package page, make sure it's also added to scripts/build-indexes.js */}

            <Route path='quickstart' component={GettingStartedPage} title='Getting Started' />
            <Route path='kitchensink' component={KitchenSinkPage} title='Kitchen Sink'  />

            {components.map((component) => (
                <Route
                    {...component}
                    key={component.path}
                    path={component.path}
                    title={component.path} />
            ))}

            {utilities.map((utility) => (
                <Route
                    {...utility}
                    key={utility.path}
                    path={utility.path}
                    title={utility.path} />
            ))}

            <Redirect from='*' to='/' />
        </Route>
    </Router>
);
