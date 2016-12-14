import React from 'react';
import {render} from 'react-dom';

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
import DialogDemo from '../packages/boundless-dialog/demo';
import FittedTextDemo from '../packages/boundless-fitted-text/demo';
import ImageDemo from '../packages/boundless-image/demo';
import InputDemo from '../packages/boundless-input/demo';
import ModalDemo from '../packages/boundless-modal/demo';
import PaginationDemo from '../packages/boundless-pagination/demo';
import PopoverDemo from '../packages/boundless-popover/demo';
import ProgressDemo from '../packages/boundless-progress/demo';
import ProgressiveDisclosureDemo from '../packages/boundless-progressive-disclosure/demo';
import SegmentedControlDemo from '../packages/boundless-segmented-control/demo';
import TokenizedInputDemo from '../packages/boundless-tokenized-input/demo';
import TooltipDemo from '../packages/boundless-tooltip/demo';
import TypeaheadDemo from '../packages/boundless-typeahead/demo';

import NotificationDemo from '../packages/boundless-utils-web-notification/demo';

import Typeahead from '../packages/boundless-typeahead/index';

import {
    Router,
    Route,
    Link,
    browserHistory,
} from 'react-router';

const fs = require('fs');
const readme = fs.readFileSync(__dirname + '/../README.md', 'utf8');

// Pages using NullComponent do not render the demo area
const NullComponent = () => <div />;

const LogoComponent = () => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
        <path
            style={{fill: 'currentColor'}}
            d='M80.644 87.982l16.592-41.483c.054-.128.088-.26.108-.394.006-.039.007-.077.011-.116a1.737 1.737 0 0 0-.075-.659c-.012-.034-.019-.069-.031-.103a1.736 1.736 0 0 0-.178-.335l-.01-.018L67.999 3.358c-.01-.013-.003-.026-.013-.04L68 3.315V4h-.037c-.403-1-1.094-1.124-1.752-.976 0 .004-.004-.012-.007-.012-.003.004-.01-.012-.01-.012h-.017-.007c-.003 0-.003-.151-.007-.151L20.495 15.227c-.025.007-.046-.019-.071-.011-.087.028-.172.041-.253.083a1.602 1.602 0 0 0-.152.085c-.051.033-.101.061-.147.099a1.661 1.661 0 0 0-.26.265c-.03.039-.059.076-.085.117a1.7 1.7 0 0 0-.12.223c-.011.023-.027.042-.036.066l-16.46 41.51c-.02.051.089.104.089.156V58.404c0 .074-.002.15.012.223.003.004-.012.004-.012.006V58.657c0 .191-.046.377.06.545 0-.002-.03.004-.03.004 0 .004-.03.004-.03.004v.002l-.045.004c.03.047.036.09.068.133l29.049 37.359c.002.004 0 .006.002.01.002.002 0 .004.002.008.006.008.014.014.021.021.024.029.052.051.078.078.027.029.053.057.082.082.03.027.055.062.086.088.026.02.057.033.084.053.04.027.081.053.123.076.005.004.01.008.016.01.087.051.176.09.269.123.042.014.082.031.125.043.021.006.041.018.062.021.123.027.249.043.375.043.099 0 .202-.012.304-.027l45.669-8.303a1.48 1.48 0 0 0 .163-.037c.014-.005.029.003.042.003h.004c.021 0 .039-.027.06-.035.041-.014.08-.034.12-.052.021-.01.044-.019.064-.03a.17.17 0 0 1 .033-.017c.014-.008.023-.021.037-.028.14-.078.269-.174.38-.285.014-.016.024-.034.038-.048.109-.119.201-.252.271-.398.006-.01.016-.018.021-.029a.203.203 0 0 0 .011-.026l.005-.01.025-.06zm-3.033-3.521L48.805 66.453l32.407-25.202-3.601 43.21zM46.817 63.709L35.863 23.542 79.681 38.15 46.817 63.709zm37.851-23.167l8.926 5.952-11.902 29.75 2.976-35.702zm4.46-1.096L84.53 36.38l-6.129-12.257 10.727 15.323zm-9.252-4.801L37.807 20.622 65.854 6.599l14.022 28.046zM33.268 19.107l-6.485-2.162 23.781-6.487-17.296 8.649zm-11.348-.212l8.67 2.891-20.233 26.012L21.92 18.895zm10.732 5.754l10.845 39.757-36.146-7.228 25.301-32.529zm10.82 43.208L32.969 92.363 8.462 60.855l35.01 7.002zm3.159 1.233l27.826 17.393-38.263 6.959L46.631 69.09z' />
    </svg>
);

/*
    each one needs to be listed out explicitly so brfs will pick it up and inline the readme
 */

const pages = {
    'getting_started': {
        component: NullComponent,
        displayName: 'Getting Started',
        readme: fs.readFileSync(__dirname + '/../GETTING_STARTED.md', 'utf8'),
    },
    'changelog': {
        component: NullComponent,
        displayName: 'Changelog',
        readme: fs.readFileSync(__dirname + '/../CHANGELOG.md', 'utf8'),
    },
    'contributing': {
        component: NullComponent,
        displayName: 'Contributor Policy',
        readme: fs.readFileSync(__dirname + '/../CONTRIBUTING.md', 'utf8'),
    },
};

const components = {
    'ArrowKeyNavigation': {
        component: ArrowKeyNavigationDemo,
        defaultProps: ArrowKeyNavigation.defaultProps,
        propInfo: ArrowKeyNavigation.__docgenInfo.props,
        readme: ArrowKeyNavigation.__docgenInfo.description,
    },
    'Button': {
        component: ButtonDemo,
        defaultProps: Button.defaultProps,
        propInfo: Button.__docgenInfo.props,
        readme: Button.__docgenInfo.description,
    },
    'Checkbox': {
        component: CheckboxDemo,
        defaultProps: Checkbox.defaultProps,
        propInfo: Checkbox.__docgenInfo.props,
        readme: Checkbox.__docgenInfo.description,
    },
    'CheckboxGroup': {
        component: CheckboxGroupDemo,
        defaultProps: CheckboxGroup.defaultProps,
        propInfo: CheckboxGroup.__docgenInfo.props,
        readme: CheckboxGroup.__docgenInfo.description,
    },
    // 'Dialog': {
    //     component: DialogDemo,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-dialog/README.md', 'utf8'),
    // },
    // 'FittedText': {
    //     component: FittedTextDemo,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-fitted-text/README.md', 'utf8'),
    // },
    // 'Image': {
    //     component: ImageDemo,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-image/README.md', 'utf8'),
    // },
    // 'Input': {
    //     component: InputDemo,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-input/README.md', 'utf8'),
    // },
    // 'Modal': {
    //     component: ModalDemo,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-modal/README.md', 'utf8'),
    // },
    // 'Pagination': {
    //     component: PaginationDemo,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-pagination/README.md', 'utf8'),
    // },
    // 'Popover': {
    //     component: PopoverDemo,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-popover/README.md', 'utf8'),
    // },
    // 'Portal': {
    //     component: NullComponent,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-portal/README.md', 'utf8'),
    // },
    // 'Progress': {
    //     component: ProgressDemo,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-progress/README.md', 'utf8'),
    // },
    // 'ProgressiveDisclosure': {
    //     component: ProgressiveDisclosureDemo,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-progressive-disclosure/README.md', 'utf8'),
    // },
    // 'SegmentedControl': {
    //     component: SegmentedControlDemo,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-segmented-control/README.md', 'utf8'),
    // },
    // 'TokenizedInput': {
    //     component: TokenizedInputDemo,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-tokenized-input/README.md', 'utf8'),
    // },
    // 'Tooltip': {
    //     component: TooltipDemo,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-tooltip/README.md', 'utf8'),
    // },
    // 'Typeahead': {
    //     component: TypeaheadDemo,
    //     readme: fs.readFileSync(__dirname + '/../packages/boundless-typeahead/README.md', 'utf8'),
    // },
};

const utilities = {
    'notification': {
        component: NotificationDemo,
        displayName: 'notification',
        readme: fs.readFileSync(__dirname + '/../packages/boundless-utils-web-notification/README.md', 'utf8'),
    },
};

class Sidebar extends React.PureComponent {
    state = {
        entities: [],
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

        Object.keys(pages).forEach((page) => {
            const path = page;
            const name = pages[page].displayName || page;

            entities.push({
                'data-path': path,
                key: path,
                text: name,
            });

            this.createSubEntities(path, name, entities, pages[page].readme);
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

    preventOverScroll(event) {
        const top = event.currentTarget.scrollTop;

        if (   (top === 0 && event.deltaY < 0)
            || (top + window.innerHeight >= event.currentTarget.scrollHeight && event.deltaY > 0)) {
            event.preventDefault();
        }
    }

    renderLink(path, anchorText) {
        return (
            <Link key={path} to={`/${path}`} className='demo-nav-item'>
                {anchorText}
            </Link>
        );
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

    render() {
        return (
            <header
                ref='sidebar'
                className='demo-header'
                onWheel={this.preventOverScroll}>
                <h1 className='demo-header-title'>
                    <Link to='/'><LogoComponent /> UIKit</Link>
                </h1>

                <sub className='demo-header-desc'>All presentational styles are limited to this website &ndash; the React components do not come bundled with CSS.</sub>

                <Typeahead
                    algorithm={Typeahead.mode.FUZZY}
                    className='demo-header-search'
                    entities={this.state.entities}
                    onEntitySelected={this.handleEntitySelected}
                    onComplete={this.handleComplete}
                    inputProps={{
                        autoFocus: true,
                        placeholder: 'Search for a page...',
                    }}
                    hint={true} />

                <nav className='demo-nav'>
                    <div className='demo-nav-section'>
                        {Object.keys(pages).map((page) => {
                            return this.renderLink(page, pages[page].displayName || page);
                        })}
                    </div>
                    <div className='demo-nav-section'>
                        <h5 className='demo-nav-section-title'>Documentation & Demos</h5>
                        {Object.keys(components).map((component) => {
                            return this.renderLink(component, components[component].displayName || component);
                        })}
                    </div>
                    <div className='demo-nav-section'>
                        <h5 className='demo-nav-section-title'>Utilities</h5>
                        {Object.keys(utilities).map((utility) => {
                            return this.renderLink(utility, utilities[utility].displayName || utility);
                        })}
                    </div>
                </nav>
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

        document.body.scrollTop = 0;
    }

    handleClick = (event) => {
        /*
            markdown-created links don't use React Router's <Link /> mechanism, so we have to programmatically
            trigger the route to avoid a page refresh
         */
        if (event.target.tagName.toLowerCase() === 'a') {
            if (   event.target.hostname === window.location.hostname
                && event.target.pathname[0] === '/') {
                if (event.target.getAttribute('href')[0] !== '#') {
                    event.preventDefault();
                    browserHistory.push(event.target.pathname);
                    document.body.scrollTop = 0;
                }
            } else {
                event.preventDefault();
                window.open(event.target.href);
            }
        }
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

    renderPropTableRows(propInfo, name, defaultProps = {}) {
        defaultProps = defaultProps[name];

        const prop = propInfo[name];

        const hasSubProps = !!prop.type.value
                            && prop.type.name !== 'enum'
                            && prop.type.name !== 'union';

        const type = prop.type.name === 'union'
                     ? prop.type.value.map((v) => v.name).join(' | ')
                     : prop.type.name;

        const rows = [
            <tr key={name} className='ui-prop-row'>
                <td><strong>{name}</strong></td>
                <td>{hasSubProps ? 'object' : type}</td>
                <td><Markdown>{prop.description}</Markdown></td>
                <td>{prop.required ? 'Yes' : 'No'}</td>
                <td><pre><code className='lang-js'>{prop.defaultValue.value === 'noop' ? '() => {}' : prop.defaultValue.value}</code></pre></td>
            </tr>
        ];

        if (hasSubProps) {
            const subProps = prop.type.value;

            Object.keys(subProps).forEach((name) => {
                const defaultValue = defaultProps && defaultProps[name] !== undefined
                                     ? defaultProps[name].toString()
                                     : null;

                rows.push(
                    <tr key={name} className='ui-prop-row-sub'>
                        <td><strong>{name}</strong></td>
                        <td>{subProps[name].name}</td>
                        <td><Markdown>{subProps[name].description}</Markdown></td>
                        <td colSpan={2}>{subProps[name].required ? 'Yes' : 'No'}</td>
                    </tr>
                );
            });
        }

        return rows;
    }

    renderPropTable(propInfo) {
        const defaultProps =   this.props.children
                         ? this.props.children.props.route.defaultProps
                         : this.props.route.defaultProps;

        console.log(propInfo)

        return (
            <table>
                <thead>
                    <tr className='ui-prop-row'>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Required</th>
                        <th>Default value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(propInfo).map((name) => this.renderPropTableRows(propInfo, name, defaultProps))}
                </tbody>
            </table>
        );
    }

    maybeRenderPropInfo() {
        const propInfo =   this.props.children
                         ? this.props.children.props.route.propInfo
                         : this.props.route.propInfo;

        if (propInfo) {
            return (
                <div className='ui-props-section'>
                    <h3 id='props'>Props</h3>
                    <p>
                        Any <Link to='https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes'>React-supported attribute</Link> is a valid prop for this element; forwarded to <code>props.component</code>
                    </p>

                    {this.renderPropTable(propInfo)}
                </div>
            );
        }
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <Sidebar />

                <main className='demo-section'>
                    {this.maybeRenderGithubLinks()}

                    <Markdown container='div' options={{html: true}}>
                        {   this.props.children
                          ? this.props.children.props.route.readme
                          : this.props.route.readme
                        }
                    </Markdown>

                    {this.maybeRenderDemo()}

                    {this.maybeRenderPropInfo()}
                </main>
            </div>
        );
    }
}

render(
    <Router history={browserHistory}>
        <Route path='/' component={Container} readme={readme}>
            {Object.keys(pages).map((page) => {
                return <Route {...pages[page]} key={page} path={page} />;
            })}
            {Object.keys(components).map((component) => {
                return <Route {...components[component]} key={component} path={component} />;
            })}
            {Object.keys(utilities).map((utility) => {
                return <Route {...utilities[utility]} key={utility} path={utility} />;
            })}
        </Route>
    </Router>, document.getElementById('root')
);
