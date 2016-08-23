import React from 'react';
import {render} from 'react-dom';

import Markdown from 'react-remarkable';

import Prism from 'prismjs';
import {} from 'prismjs/components/prism-jsx.min.js';

import UIArrowKeyNavigationDemo from '../UIArrowKeyNavigation/demo';
import UIButtonDemo from '../UIButton/demo';
import UICheckboxDemo from '../UICheckbox/demo';
import UICheckboxGroupDemo from '../UICheckboxGroup/demo';
import UIDialogDemo from '../UIDialog/demo';
import UIFittedTextDemo from '../UIFittedText/demo';
import UIImageDemo from '../UIImage/demo';
import UIModalDemo from '../UIModal/demo';
import UIPaginationDemo from '../UIPagination/demo';
import UIPopoverDemo from '../UIPopover/demo';
import UIProgressDemo from '../UIProgress/demo';
import UIProgressiveDisclosureDemo from '../UIProgressiveDisclosure/demo';
import UIRadioDemo from '../UIRadio/demo';
import UISegmentedControlDemo from '../UISegmentedControl/demo';
import UITableDemo from '../UITable/demo';
import UITextualInputDemo from '../UITextualInput/demo';
import UITokenizedInputDemo from '../UITokenizedInput/demo';
import UITooltipDemo from '../UITooltip/demo';
import UITypeaheadInputDemo from '../UITypeaheadInput/demo';

import NotifyDemo from '../UIUtils/notify/demo';

import UITypeaheadInput from '../UITypeaheadInput';

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
    'changelog_policy': {
        component: NullComponent,
        displayName: 'Changelog Policy',
        readme: fs.readFileSync(__dirname + '/../CHANGELOG_policy.md', 'utf8'),
    },
    'contributing': {
        component: NullComponent,
        displayName: 'Contributor Policy',
        readme: fs.readFileSync(__dirname + '/../CONTRIBUTING.md', 'utf8'),
    },
};

const components = {
    'UIArrowKeyNavigation': {
        component: UIArrowKeyNavigationDemo,
        readme: fs.readFileSync(__dirname + '/../UIArrowKeyNavigation/README.md', 'utf8'),
    },
    'UIButton': {
        component: UIButtonDemo,
        readme: fs.readFileSync(__dirname + '/../UIButton/README.md', 'utf8'),
    },
    'UICheckbox': {
        component: UICheckboxDemo,
        readme: fs.readFileSync(__dirname + '/../UICheckbox/README.md', 'utf8'),
    },
    'UICheckboxGroup': {
        component: UICheckboxGroupDemo,
        readme: fs.readFileSync(__dirname + '/../UICheckboxGroup/README.md', 'utf8'),
    },
    'UIDialog': {
        component: UIDialogDemo,
        readme: fs.readFileSync(__dirname + '/../UIDialog/README.md', 'utf8'),
    },
    'UIFittedText': {
        component: UIFittedTextDemo,
        readme: fs.readFileSync(__dirname + '/../UIFittedText/README.md', 'utf8'),
    },
    'UIImage': {
        component: UIImageDemo,
        readme: fs.readFileSync(__dirname + '/../UIImage/README.md', 'utf8'),
    },
    'UIModal': {
        component: UIModalDemo,
        readme: fs.readFileSync(__dirname + '/../UIModal/README.md', 'utf8'),
    },
    'UIPagination': {
        component: UIPaginationDemo,
        readme: fs.readFileSync(__dirname + '/../UIPagination/README.md', 'utf8'),
    },
    'UIPopover': {
        component: UIPopoverDemo,
        readme: fs.readFileSync(__dirname + '/../UIPopover/README.md', 'utf8'),
    },
    'UIProgress': {
        component: UIProgressDemo,
        readme: fs.readFileSync(__dirname + '/../UIProgress/README.md', 'utf8'),
    },
    'UIProgressiveDisclosure': {
        component: UIProgressiveDisclosureDemo,
        readme: fs.readFileSync(__dirname + '/../UIProgressiveDisclosure/README.md', 'utf8'),
    },
    'UIRadio': {
        component: UIRadioDemo,
        readme: fs.readFileSync(__dirname + '/../UIRadio/README.md', 'utf8'),
    },
    'UISegmentedControl': {
        component: UISegmentedControlDemo,
        readme: fs.readFileSync(__dirname + '/../UISegmentedControl/README.md', 'utf8'),
    },
    'UITable': {
        component: UITableDemo,
        readme: fs.readFileSync(__dirname + '/../UITable/README.md', 'utf8'),
    },
    'UITextualInput': {
        component: UITextualInputDemo,
        readme: fs.readFileSync(__dirname + '/../UITextualInput/README.md', 'utf8'),
    },
    'UITokenizedInput': {
        component: UITokenizedInputDemo,
        readme: fs.readFileSync(__dirname + '/../UITokenizedInput/README.md', 'utf8'),
    },
    'UITooltip': {
        component: UITooltipDemo,
        readme: fs.readFileSync(__dirname + '/../UITooltip/README.md', 'utf8'),
    },
    'UITypeaheadInput': {
        component: UITypeaheadInputDemo,
        readme: fs.readFileSync(__dirname + '/../UITypeaheadInput/README.md', 'utf8'),
    },
};

const utilities = {
    'notify': {
        component: NotifyDemo,
        displayName: 'UIUtils/notify',
        readme: fs.readFileSync(__dirname + '/../UIUtils/notify/README.md', 'utf8'),
    },
};

class Sidebar extends React.PureComponent {
    state = {
        entities: [],
    }

    componentWillMount() {
        const entities = [];

        Object.keys(components).forEach(path => {
            const name = components[path].displayName || path;

            entities.push({
                'data-path': path,
                key: path,
                text: name,
            });

            this.createSubEntities(path, name, entities, components[path].readme);
        });

        Object.keys(pages).forEach(page => {
            const path = page;
            const name = pages[page].displayName || page;

            entities.push({
                'data-path': path,
                key: path,
                text: name,
            });

            this.createSubEntities(path, name, entities, pages[page].readme);
        });

        Object.keys(utilities).forEach(utility => {
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

        markdown.split('\n').filter(line => line.indexOf('### ') === 0).forEach(line => {
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
            <Link key={path} to={`/${path}`} className='ui-demo-nav-item'>
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

        const found = this.state.entities.find(entity => entity.text === value);

        if (found) {
            browserHistory.push(found['data-path']);
        }
    }

    render() {
        return (
            <header ref='sidebar'
                    className='ui-demo-header'
                    onWheel={this.preventOverScroll}>
                <h1 className='ui-demo-header-title'>
                    <Link to='/'>UIKit</Link>
                </h1>

                <sub className='ui-demo-header-desc'>All presentational styles are limited to this website &ndash; the React components do not come bundled with CSS.</sub>

                <UITypeaheadInput
                    algorithm={UITypeaheadInput.mode.FUZZY}
                    className='ui-demo-header-search'
                    entities={this.state.entities}
                    onEntitySelected={this.handleEntitySelected}
                    onComplete={this.handleComplete}
                    inputProps={{
                        autoFocus: true,
                        placeholder: 'Search for a page...',
                    }}
                    hint={true} />

                <nav className='ui-demo-nav'>
                    <div className='ui-demo-nav-section'>
                        {Object.keys(pages).map(page => {
                            return this.renderLink(page, pages[page].displayName || page);
                        })}
                    </div>
                    <div className='ui-demo-nav-section'>
                        <h5 className='ui-demo-nav-section-title'>Documentation & Demos</h5>
                        {Object.keys(components).map(component => {
                            return this.renderLink(component, components[component].displayName || component);
                        })}
                    </div>
                    <div className='ui-demo-nav-section'>
                        <h5 className='ui-demo-nav-section-title'>Utilities</h5>
                        {Object.keys(utilities).map(utility => {
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

    renderDemo() {
        if (this.props.children && this.props.children.type !== NullComponent) {
            return (
                <article className='ui-demo-section-example'>
                    {this.props.children}
                </article>
            );
        } // don't render if not a composite
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <Sidebar />

                <main className='ui-demo-section'>
                    {this.renderDemo()}

                    <Markdown container='div' options={{html: true}}>
                        {   this.props.children
                          ? this.props.children.props.route.readme
                          : this.props.route.readme
                        }
                    </Markdown>
                </main>
            </div>
        );
    }
}

render(
    <Router history={browserHistory}>
        <Route path='/' component={Container} readme={readme}>
            {Object.keys(pages).map(page => {
                return <Route {...pages[page]} key={page} path={page} />;
            })}
            {Object.keys(components).map(component => {
                return <Route {...components[component]} key={component} path={component} />;
            })}
            {Object.keys(utilities).map(utility => {
                return <Route {...utilities[utility]} key={utility} path={utility} />;
            })}
        </Route>
    </Router>, document.getElementById('root')
);
