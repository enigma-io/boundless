import React from 'react';
import {findDOMNode, render} from 'react-dom';
import * as _ from 'lodash';
import MarkdownToJSX from 'markdown-to-jsx';
import Prism from 'prismjs';
import {} from 'prismjs/components/prism-jsx.min.js';
import {Router, Route, Link, browserHistory} from 'react-router';

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

// Pages using NullComponent do not render the demo area
const NullComponent = () => (<div />);

// provided by bulkify, stringify handles the markdown files (must go before bulkify)
const assets = require('bulk-require')(`${__dirname}/..`, [
    'README.md',
    'packages/!(boundless-utils*)/README.md',
    'packages/!(boundless-utils*)/index.js',
    'packages/!(boundless-utils*)/demo/index.js'
]);

const Button = _.get(assets, `packages.boundless-button.index.default`);
const Popover = _.get(assets, `packages.boundless-popover.index.default`);
const Typeahead = _.get(assets, `packages.boundless-typeahead.index.default`);

const components = Object.keys(assets.packages).map((name) => {
    const prettyName = _.pascalCase(name.replace('boundless-', ''));

    return {
        demo: _.get(assets, `packages.${name}.demo.default`, NullComponent),
        docgenInfo: _.get(assets, `packages.${name}.index.default.__docgenInfo`),
        readme: _.get(assets, `packages.${name}.README`),
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

const LinkedHeaderText = ({component = 'h1', children, ...props}) => {
    const normalizedId = _.kebabCase(children);

    return React.createElement(component, {...props, id: normalizedId}, [
        children,
        (<a key='link' href={`#${normalizedId}`}>#</a>)
    ]);
};

/**
 * Attempts to resolve various forms of links to internal resources into appropriate
 * react-router <Link /> tags.
 */
const EnhancedLink = ({children, href, ...props}) => {
    if (href.indexOf('boundless-') !== -1) {
        const frags = href.split('/');
        const component = _.pascalCase(frags[frags.length - 2].replace('boundless-', ''));

        return (
            <Link to={`/${component}`}>{children}</Link>
        );
    } else if (href.indexOf('http') === -1) {
        const [path, hash] = href.split('#');

        return (
            <Link to={path} hash={hash ? `#${hash}` : null}>{children}</Link>
        );
    } else {
        return (
            <a {...props} href={href} target='_blank'>{children}</a>
        );
    }
};

const md2jsx = _.partialRight(MarkdownToJSX, {
    overrides: {
        a: {component: EnhancedLink},
        h1: {component: LinkedHeaderText, props: {component: 'h1'}},
        h2: {component: LinkedHeaderText, props: {component: 'h2'}},
        h3: {component: LinkedHeaderText, props: {component: 'h3'}},
        h4: {component: LinkedHeaderText, props: {component: 'h4'}},
        h5: {component: LinkedHeaderText, props: {component: 'h5'}},
        h6: {component: LinkedHeaderText, props: {component: 'h6'}},
    },
});

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
                    <a className='sticky-bar-brand' href='/'>Boundless</a>

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

    maybeRenderDemo() {
        if (this.props.children && this.props.children.type !== NullComponent) {
            return (
                <div className='demo-section-wrapper'>
                    <h3>Demo</h3>
                    <article className='demo-section-example'>
                        {this.props.children}
                    </article>
                </div>
            );
        } // don't render if not a composite
    }

    maybeRenderGithubLinks() {
        if (this.props.children && this.props.children.type !== NullComponent) {
            return [(
                <a
                    key='source'
                    className='demo-component-link'
                    href={`${repositoryURL}/blob/master/packages/${_.last(this.props.routes).path}/index.js`}
                    target='_blank'>
                    Component Source
                </a>
            ), (
                <a
                    key='demo-source'
                    className='demo-implementation-link'
                    href={`${repositoryURL}/blob/master/packages/${_.last(this.props.routes).path}/demo/index.js`}
                    target='_blank'>
                    Demo Source
                </a>
            )];
        }
    }

    renderSubPropTableRow = (props, name, depth) => (
        <tr key={name} className={`prop-row prop-depth-${depth}`}>
            <td className='prop-name'><strong>{name}</strong></td>
            <td className='prop-type'>
                <pre><code>{props[name].name}</code></pre>
            </td>
            <td className='prop-description'>{md2jsx(props[name].description || '')}</td>
            <td className='prop-required' colSpan={2}>{props[name].required ? 'Yes' : 'No'}</td>
        </tr>
    )

    formatPropType = (type) => {
        switch (type.name) {
        case 'arrayOf':
            if (type.value.name !== 'custom') {
                return `${type.name}(${type.value.name})`;
            }

            break;

        case 'enum':
            if (type.computed === true) {
                const prefix = type.value.split(/[()]+/)[1];

                return 'enum([\n  ' + _.keys(
                    _.get(assets, `packages.boundless-${_.kebabCase(prefix)}`, {})
                ).map((key) => `${prefix}.${key}`).join('\n  ') + '\n])';
            }

            return `enum(${type.value})`;

        case 'union':
            return type.value.map((v) => v.name.trim()).join('|');
        }

        return type.name;
    }

    /**
     * @param  {Object}         docgenData
     * @param  {String}         name       the prop's name, may be a subprop (e.g. foo.bar)
     * @param  {Number}         depth      [description]
     * @return {jsx}
     */
    renderPropTableRows(docgenData, name, depth = 0) {
        if (!docgenData.props[name].type) { return null; }

        const prop = _.get(docgenData.props, name);

        const rows = [(
            <tr key={name} className={`prop-row prop-depth-${depth}`}>
                <td className='prop-name'>
                    <strong>{name}</strong>
                </td>

                <td className='prop-type'>
                    <pre>
                        <code>{this.formatPropType(prop.type)}</code>
                    </pre>
                </td>

                <td className='prop-description'>
                    {prop.description ? md2jsx(prop.description) : ''}
                </td>

                <td className='prop-required'>
                    {prop.required ? 'Yes' : 'No'}
                </td>

                <td className='prop-default'>
                    <pre>
                        <code className='lang-js'>
                            {prop.defaultValue.value === 'noop' ? '() => {}' : prop.defaultValue.value}
                        </code>
                    </pre>
                </td>
            </tr>
        )];

        if (!!prop.type.value
            && (prop.type.value.value || prop.type.value.raw)
            && prop.type.name !== 'enum'
            && prop.type.name !== 'union'
            && prop.type.name !== 'instanceOf') {
            const subProps = prop.type.value.name === 'shape' ? prop.type.value.value : prop.type.value;

            if (subProps.name && subProps.name === 'custom') {
                const subPropsRaw = subProps.raw.split('.');
                const component = subPropsRaw[0];
                const subPropName = subPropsRaw[2];

                return rows.concat(
                    this.renderPropTableRows(
                        _.get(assets, `packages.boundless-${_.kebabCase(component)}.index.default.__docgenInfo`), subPropName, depth + 1
                    )
                );
            }

            return rows.concat(
                Object.keys(subProps).map(
                    (subPropName) => this.renderSubPropTableRow(subProps, subPropName, depth + 1)
                )
            );
        }

        return rows;
    }

    renderPropTable(docgenData) {
        return (
            <table>
                <thead>
                    <tr className='prop-row'>
                        <th className='prop-name'>Name</th>
                        <th className='prop-type'>Type</th>
                        <th className='prop-description'>Description</th>
                        <th className='prop-required'>Required</th>
                        <th className='prop-default'>Default value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(docgenData.props).map((propName) => {
                        return this.renderPropTableRows(docgenData, propName);
                    })}
                </tbody>
            </table>
        );
    }

    maybeRenderPropInfo({docgenInfo}) {
        if (docgenInfo && docgenInfo.props) {
            return (
                <div className='props-section'>
                    <LinkedHeaderText component='h3'>
                        Props
                    </LinkedHeaderText>

                    {docgenInfo.description ? md2jsx(docgenInfo.description) : null}
                    {this.renderPropTable(docgenInfo)}
                </div>
            );
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
        return (
            <div>
                {!this.props.children ? this.renderSplash() : null}

                <StickyBar ref={(instance) => (this.$sticky = findDOMNode(instance))} />

                <main className='demo-section'>
                    {this.maybeRenderGithubLinks()}

                    {md2jsx(_.get(this.props, 'children.props.route.readme', this.props.route.readme))}

                    {this.maybeRenderDemo()}

                    {
                        this.props.children
                        ? this.maybeRenderPropInfo(this.props.children.props.route)
                        : null
                    }
                </main>
            </div>
        );
    }
}

render(
    <Router history={browserHistory}>
        <Route path='/' component={Container} readme={assets.README}>
            {components.map((definition) => (
                <Route
                    {...definition}
                    key={definition.path}
                    path={definition.path}
                    component={definition.demo} />
            ))}
        </Route>
    </Router>, document.getElementById('root')
);
