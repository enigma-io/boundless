import React from 'react';
import {render} from 'react-dom';

import {get} from 'lodash';
import Markdown from 'react-remarkable';

import Prism from 'prismjs';
import {} from 'prismjs/components/prism-jsx.min.js';

import ArrowKeyNavigation from '../packages/boundless-arrow-key-navigation';
import ArrowKeyNavigationDemo from '../packages/boundless-arrow-key-navigation/demo';
import Button from '../packages/boundless-button';
import ButtonDemo from '../packages/boundless-button/demo';
import Checkbox from '../packages/boundless-checkbox';
import CheckboxDemo from '../packages/boundless-checkbox/demo';
import CheckboxGroup from '../packages/boundless-checkbox-group';
import CheckboxGroupDemo from '../packages/boundless-checkbox-group/demo';
import Dialog from '../packages/boundless-dialog';
import DialogDemo from '../packages/boundless-dialog/demo';
import FittedText from '../packages/boundless-fitted-text';
import FittedTextDemo from '../packages/boundless-fitted-text/demo';
import Image from '../packages/boundless-image';
import ImageDemo from '../packages/boundless-image/demo';
import Input from '../packages/boundless-input';
import InputDemo from '../packages/boundless-input/demo';
import Modal from '../packages/boundless-modal';
import ModalDemo from '../packages/boundless-modal/demo';
import Pagination from '../packages/boundless-pagination';
import PaginationDemo from '../packages/boundless-pagination/demo';
import Popover from '../packages/boundless-popover';
import PopoverDemo from '../packages/boundless-popover/demo';
import Portal from '../packages/boundless-portal';
import Progress from '../packages/boundless-progress';
import ProgressDemo from '../packages/boundless-progress/demo';
import ProgressiveDisclosure from '../packages/boundless-progressive-disclosure';
import ProgressiveDisclosureDemo from '../packages/boundless-progressive-disclosure/demo';
import Radio from '../packages/boundless-radio';
import RadioDemo from '../packages/boundless-radio/demo';
import SegmentedControl from '../packages/boundless-segmented-control';
import SegmentedControlDemo from '../packages/boundless-segmented-control/demo';
import TokenizedInput from '../packages/boundless-tokenized-input';
import TokenizedInputDemo from '../packages/boundless-tokenized-input/demo';
import Tooltip from '../packages/boundless-tooltip';
import TooltipDemo from '../packages/boundless-tooltip/demo';
import Typeahead from '../packages/boundless-typeahead';
import TypeaheadDemo from '../packages/boundless-typeahead/demo';

import NotificationDemo from '../packages/boundless-utils-web-notification/demo';

import {
    Router,
    Route,
    Link,
    browserHistory,
} from 'react-router';

const fs = require('fs');
const readme = fs.readFileSync(__dirname + '/../README.md', 'utf8');

// Pages using NullComponent do not render the demo area
const NullComponent = () => (<div />);
const SvgCaret = (<svg width='1792' height='1792' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'><path d='M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z'/></svg>);

/*
    each one needs to be listed out explicitly so brfs will pick it up and inline the readme
 */

const components = {
    'ArrowKeyNavigation': {
        ...ArrowKeyNavigation,
        component: ArrowKeyNavigationDemo,
        docgenInfo: ArrowKeyNavigation.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-arrow-key-navigation/README.md', 'utf8'),
    },
    'Button': {
        ...Button,
        component: ButtonDemo,
        docgenInfo: Button.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-button/README.md', 'utf8'),
    },
    'Checkbox': {
        ...Checkbox,
        component: CheckboxDemo,
        docgenInfo: Checkbox.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-checkbox/README.md', 'utf8'),
    },
    'CheckboxGroup': {
        ...CheckboxGroup,
        component: CheckboxGroupDemo,
        docgenInfo: CheckboxGroup.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-checkbox-group/README.md', 'utf8'),
    },
    'Dialog': {
        ...Dialog,
        component: DialogDemo,
        docgenInfo: Dialog.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-dialog/README.md', 'utf8'),
    },
    'FittedText': {
        ...FittedText,
        component: FittedTextDemo,
        docgenInfo: FittedText.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-fitted-text/README.md', 'utf8'),
    },
    'Image': {
        ...Image,
        component: ImageDemo,
        docgenInfo: Image.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-image/README.md', 'utf8'),
    },
    'Input': {
        ...Input,
        component: InputDemo,
        docgenInfo: Input.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-input/README.md', 'utf8'),
    },
    'Modal': {
        ...Modal,
        component: ModalDemo,
        docgenInfo: Modal.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-modal/README.md', 'utf8'),
    },
    'Pagination': {
        ...Pagination,
        component: PaginationDemo,
        docgenInfo: Pagination.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-pagination/README.md', 'utf8'),
    },
    'Popover': {
        ...Popover,
        component: PopoverDemo,
        docgenInfo: Popover.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-popover/README.md', 'utf8'),
    },
    'Portal': {
        ...Portal,
        component: NullComponent,
        docgenInfo: Portal.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-portal/README.md', 'utf8'),
    },
    'Progress': {
        ...Progress,
        component: ProgressDemo,
        docgenInfo: Progress.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-progress/README.md', 'utf8'),
    },
    'ProgressiveDisclosure': {
        ...ProgressiveDisclosure,
        component: ProgressiveDisclosureDemo,
        docgenInfo: ProgressiveDisclosure.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-progressive-disclosure/README.md', 'utf8'),
    },
    'Radio': {
        ...Radio,
        component: RadioDemo,
        docgenInfo: Radio.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-radio/README.md', 'utf8'),
    },
    'SegmentedControl': {
        ...SegmentedControl,
        component: SegmentedControlDemo,
        docgenInfo: SegmentedControl.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-segmented-control/README.md', 'utf8'),
    },
    'TokenizedInput': {
        ...TokenizedInput,
        component: TokenizedInputDemo,
        docgenInfo: TokenizedInput.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-tokenized-input/README.md', 'utf8'),
    },
    'Tooltip': {
        ...Tooltip,
        component: TooltipDemo,
        docgenInfo: Tooltip.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-tooltip/README.md', 'utf8'),
    },
    'Typeahead': {
        ...Typeahead,
        component: TypeaheadDemo,
        docgenInfo: Typeahead.__docgenInfo,
        readme: fs.readFileSync(__dirname + '/../packages/boundless-typeahead/README.md', 'utf8'),
    },
};

const utilities = {
    'notification': {
        component: NotificationDemo,
        displayName: 'notification',
        readme: fs.readFileSync(__dirname + '/../packages/boundless-utils-web-notification/README.md', 'utf8'),
    },
};

/*
    markdown-created links don't use React Router's <Link /> mechanism
    so we have to programmatically trigger the route to avoid a page refresh
 */
const handleNormalLinkClick = (event, history) => {
    if (event.target.tagName.toLowerCase() === 'a') {
        if (   event.target.hostname === window.location.hostname
            && event.target.pathname[0] === '/') {
            if (event.target.getAttribute('href')[0] !== '#') {
                event.preventDefault();
                history.push(event.target.pathname);
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        } else {
            event.preventDefault();
            window.open(event.target.href);
        }
    }
};

class StickyBar extends React.PureComponent {
    state = {
        entities: [],
        shouldRenderComponentsMenu: false,
        shouldRenderUtilitiesMenu: false,
    }

    componentWillMount() {
        const entities = [];

        Object.keys(components).forEach((path) => {
            const name = components[path].displayName || path;

            entities.push({
                'data-path': path,
                key: path,
                text: name,
            });

            this.createSubEntities(path, name, entities, components[path].readme);
        });

        Object.keys(utilities).forEach((utility) => {
            const path = utility;
            const name = utilities[utility].displayName || utility;

            entities.push({
                'data-path': path,
                key: path,
                text: name,
            });

            this.createSubEntities(path, name, entities, utilities[utility].readme);
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

    createSubEntities(path, text, entities, markdown) {
        const headerTextRegex = /#+\s?([^<]+)/;
        const headerHashRegex = /#+\s?.*?href="(.*?)"/;

        markdown.split('\n').filter((line) => line.indexOf('### ') === 0).forEach((line) => {
            if (line.match(headerHashRegex)) {
                const formedPath = `${path}${line.match(headerHashRegex)[1]}`;

                entities.push({
                    'data-path': formedPath,
                    key: formedPath,
                    text: `${text} - ${line.match(headerTextRegex)[1]}`,
                });
            }
        });
    }

    renderLink(path) {
        return (<a key={path} href={`/${path}`}>{path}</a>);
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
                    onClick={(e) => handleNormalLinkClick(e, browserHistory)}
                    onClose={() => {
                        if (this.mounted) { this.setState({[stateAttrName]: false}); }
                    }}
                    selfXAlign={Popover.position.START}>
                    {Object.keys(collection).map((item) => {
                        return this.renderLink(item);
                    })}
                </Popover>
            );
        }
    }

    render() {
        return (
            <header ref={(instance) => (this.$stickyBar = instance)} className='sticky-bar'>
                <div className='stars1' />
                <div className='stars2' />
                <div className='stars3' />

                <div className='sticky-bar-inner'>
                    <a className='sticky-bar-brand' href='/'>Boundless</a>

                    <Button
                        className='sticky-bar-menu-button'
                        onPressed={() => this.setState({
                            shouldRenderComponentsMenu: true,
                            shouldRenderUtilitiesMenu: false,
                        })}
                        onUnpressed={() => this.setState({shouldRenderComponentsMenu: false})}
                        pressed={this.state.shouldRenderComponentsMenu}
                        ref={(instance) => (this.$componentsMenuTrigger = instance)}>
                        <div className='sticky-bar-menu-button-inner'>Components {SvgCaret}</div>
                    </Button>

                    <Button
                        className='sticky-bar-menu-button'
                        onPressed={() => this.setState({
                            shouldRenderComponentsMenu: false,
                            shouldRenderUtilitiesMenu: true,
                        })}
                        onUnpressed={() => this.setState({shouldRenderUtilitiesMenu: false})}
                        pressed={this.state.shouldRenderUtilitiesMenu}
                        ref={(instance) => (this.$utilitiesMenuTrigger = instance)}>
                        <div className='sticky-bar-menu-button-inner'>Utilities {SvgCaret}</div>
                    </Button>

                    {this.maybeRenderStickyBarMenu(this.$componentsMenuTrigger, components, 'shouldRenderComponentsMenu')}
                    {this.maybeRenderStickyBarMenu(this.$utilitiesMenuTrigger, utilities, 'shouldRenderUtilitiesMenu')}

                    <Typeahead
                        algorithm={Typeahead.mode.FUZZY}
                        className='sticky-bar-search'
                        entities={this.state.entities}
                        onEntitySelected={this.handleEntitySelected}
                        onComplete={this.handleComplete}
                        inputProps={{
                            autoFocus: true,
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
                return node.scrollIntoView();
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
                    href={`https://github.com/bibliotech/uikit/blob/master/${this.props.routes[1].displayName || this.props.routes[1].path}/index.js`}
                    target='_blank'>
                    Component Source
                </a>
            ), (
                <a
                    key='demo-source'
                    className='demo-implementation-link'
                    href={`https://github.com/bibliotech/uikit/blob/master/${this.props.routes[1].displayName || this.props.routes[1].path}/demo/index.js`}
                    target='_blank'>
                    Demo Source
                </a>
            )];
        }
    }

    renderSubPropTableRow = (props, name, depth) => (
        <tr key={name} className={`prop-row prop-depth-${depth}`}>
            <td><strong>{name}</strong></td>
            <td>
                <pre><code>{props[name].name}</code></pre>
            </td>
            <td><Markdown>{props[name].description}</Markdown></td>
            <td colSpan={2}>{props[name].required ? 'Yes' : 'No'}</td>
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

                return 'enum([\n  ' + Object.keys(
                    get(components, prefix, {})
                ).map((key) => `${prefix}.${key}`).join('\n  ') + '\n])';
            }

            return `enum(${type.value})`;

        case 'union':
            return type.value.map((v) => v.name).join('|');
        }

        return type.name;
    }

    renderPropTableRows(propInfo, name, depth = 0) {
        const prop = propInfo[name];

        if (!prop.type) { return null; }

        const rows = [
            <tr key={name} className={`prop-row prop-depth-${depth}`}>
                <td><strong>{name}</strong></td>
                <td>
                    <pre><code>{this.formatPropType(prop.type)}</code></pre>
                </td>
                <td><Markdown>{prop.description}</Markdown></td>
                <td>{prop.required ? 'Yes' : 'No'}</td>
                <td>
                    <pre>
                        <code className='lang-js'>
                            {prop.defaultValue.value === 'noop' ? '() => {}' : prop.defaultValue.value}
                        </code>
                    </pre>
                </td>
            </tr>,
        ];

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

                return rows.concat(this.renderPropTableRows(
                    { [subPropName]: get(components[component], `docgenInfo.props[${subPropName}]`, {}) },
                    subPropName,
                    depth + 1,
                ));
            }

            return rows.concat(
                Object.keys(subProps).map((subPropName) => this.renderSubPropTableRow(subProps, subPropName, depth + 1))
            );
        }

        return rows;
    }

    renderPropTable(propInfo) {
        return (
            <table>
                <thead>
                    <tr className='prop-row'>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Required</th>
                        <th>Default value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(propInfo).map((name) => this.renderPropTableRows(propInfo, name))}
                </tbody>
            </table>
        );
    }

    maybeRenderPropInfo(docgenInfo) {
        if (docgenInfo && docgenInfo.props) {
            return (
                <div className='props-section'>
                    <h3>Props</h3>
                    <p>
                        Any <Link to='https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes'>React-supported attribute</Link> is a valid prop for this element; forwarded to <code>props.component</code>
                    </p>
                    {docgenInfo.description ? <p><Markdown>{docgenInfo.description}</Markdown></p> : null}
                    {this.renderPropTable(docgenInfo.props)}
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
                        onClick={() => (document.body.scrollTop = window.innerHeight)}>
                        {SvgCaret}
                    </div>
                </div>
            </section>
        );
    }

    render() {
        return (
            <div onClick={(e) => handleNormalLinkClick(e, browserHistory)}>
                {this.props.children ? null : this.renderSplash()}

                <StickyBar />

                <main className='demo-section'>
                    {this.props.children ? this.maybeRenderGithubLinks() : null}

                    <Markdown container='div' options={{html: true}}>
                        {
                            this.props.children
                            ? this.props.children.props.route.readme
                            : this.props.route.readme
                        }
                    </Markdown>

                    {this.props.children ? this.maybeRenderDemo() : null}

                    {
                        this.props.children
                        ? this.maybeRenderPropInfo(this.props.children.props.route.docgenInfo)
                        : null
                    }
                </main>
            </div>
        );
    }
}

render(
    <Router history={browserHistory}>
        <Route path='/' component={Container} readme={readme}>
            {Object.keys(components).map((component) => {
                return <Route {...components[component]} key={component} path={component} />;
            })}
            {Object.keys(utilities).map((utility) => {
                return <Route {...utilities[utility]} key={utility} path={utility} />;
            })}
        </Route>
    </Router>, document.getElementById('root')
);
