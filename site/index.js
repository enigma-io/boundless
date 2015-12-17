import React from 'react';
import {render} from 'react-dom';

import {findWhere, escapeRegExp} from 'lodash';

import Markdown from 'react-remarkable';
import Prism from 'prismjs';

import UIButtonDemo from '../UIButton/demo';
import UICheckboxDemo from '../UICheckbox/demo';
import UICheckboxGroupDemo from '../UICheckboxGroup/demo';
import UIDialogDemo from '../UIDialog/demo';
import UIFittedTextDemo from '../UIFittedText/demo';
import UIImageDemo from '../UIImage/demo';
import UIListDemo from '../UIList/demo';
import UIModalDemo from '../UIModal/demo';
import UINotificationDemo from '../UINotification/demo';
import UIPaginatedViewDemo from '../UIPaginatedView/demo';
import UIPopoverDemo from '../UIPopover/demo';
import UIProgressDemo from '../UIProgress/demo';
import UIProgressiveDisclosureDemo from '../UIProgressiveDisclosure/demo';
import UIRadioDemo from '../UIRadio/demo';
import UISegmentedControlDemo from '../UISegmentedControl/demo';
import UITableDemo from '../UITable/demo';
import UITokenizedInputDemo from '../UITokenizedInput/demo';
import UITooltipDemo from '../UITooltip/demo';
import UITypeaheadInputDemo from '../UITypeaheadInput/demo';

import UITypeaheadInput from '../UITypeaheadInput';
import UIView from '../UIView';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Router, Route, Link} from 'react-router';

const history = createBrowserHistory();

const injectorRegex = /([#]+\s?)(.*?)\n/g;
const githubRemapperRegex = /(\[.*?\])\(((?!http|#).*?)\)/gi;
const readmeRemapperRegex = /(\[.*?\])\(((?!http|#).*?\/(.*?)\/README\.md(.*?))\)/gi;
const propDescriptorRegex = /((__|\*\*).*?(__|\*\*)\s?`.*?`)/g;

function sanitizeHeaderName(name = '') {
    return name.trim()
               .toLowerCase()
               .replace(/[^\w\s]/gi, '')  // remove all punctuation/non-ASCII
               .replace(/\s/g, '-');      // spaces to dashes
};

function injectHeaderLinks(mkdown = '') {
    return mkdown.replace(
        injectorRegex, (...captures) => {
            // captures[0] is the full match
            return `${captures[1]}${captures[2]}<a id="${sanitizeHeaderName(captures[2])}" href="#${sanitizeHeaderName(captures[2])}"></a>\n`;
        }
    );
}

function breakLineAfterPropDescriptor(mkdown = '') {
    return mkdown.replace(propDescriptorRegex, '$1<br />');
}

function remapRelativeREADMELinks(mkdown = '') {
    return mkdown.replace(readmeRemapperRegex, '$1(/$3$4)');
}

function remapRelativeLinksToGithub(mkdown = '') {
    return mkdown.replace(
        githubRemapperRegex, (...captures) => {
            if (captures[0].indexOf('README.md') === -1) {
                return `${captures[1]}(https://github.com/bibliotech/uikit/blob/master/${captures[2]})`
            } // exclude READMEs, those are handled by `remapRelativeREADMELinks`

            return captures[0];
        }
    );
}

function prepareMarkdown(mkdown = '') {
    return mkdown.split(/(```[^`]*?```)/g).map(block => {
        if (block.indexOf('```') === -1) {
            return [
                injectHeaderLinks,
                breakLineAfterPropDescriptor,
                remapRelativeLinksToGithub,
                remapRelativeREADMELinks,
            ].reduce((content, transform) => transform(content), block);
        }

        return block;
    }).join(''); // ignore fenced code blocks
}

const fs = require('fs');

const readme = prepareMarkdown(
    fs.readFileSync(__dirname + '/../README.md', 'utf8')
);

// Pages using NullComponent do not render the demo area
const NullComponent = () => <div />;

/*
    each one needs to be listed out explicitly so brfs will pick it up and inline the readme
 */

const pages = {
    changelog: {
        component: NullComponent,
        displayName: 'Changelog',
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../CHANGELOG.md', 'utf8')
        ),
    },
    changelog_policy: {
        component: NullComponent,
        displayName: 'Changelog Policy',
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../CHANGELOG_policy.md', 'utf8')
        ),
    },
    contributing: {
        component: NullComponent,
        displayName: 'Contributor Policy',
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../CONTRIBUTING.md', 'utf8')
        ),
    },
};

const components = {
    UIButton: {
        component: UIButtonDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIButton/README.md', 'utf8')
        ),
    },
    UICheckbox: {
        component: UICheckboxDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UICheckbox/README.md', 'utf8')
        ),
    },
    UICheckboxGroup: {
        component: UICheckboxGroupDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UICheckboxGroup/README.md', 'utf8')
        ),
    },
    UIDialog: {
        component: UIDialogDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIDialog/README.md', 'utf8')
        ),
    },
    UIFittedText: {
        component: UIFittedTextDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIFittedText/README.md', 'utf8')
        ),
    },
    UIImage: {
        component: UIImageDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIImage/README.md', 'utf8')
        ),
    },
    UIList: {
        component: UIListDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIList/README.md', 'utf8')
        ),
    },
    UIModal: {
        component: UIModalDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIModal/README.md', 'utf8')
        ),
    },
    UINotification: {
        component: UINotificationDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UINotification/README.md', 'utf8')
        ),
    },
    UIPaginatedView: {
        component: UIPaginatedViewDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIPaginatedView/README.md', 'utf8')
        )
    },
    UIPopover: {
        component: UIPopoverDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIPopover/README.md', 'utf8')
        ),
    },
    UIProgress: {
        component: UIProgressDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIProgress/README.md', 'utf8')
        ),
    },
    UIProgressiveDisclosure: {
        component: UIProgressiveDisclosureDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIProgressiveDisclosure/README.md', 'utf8')
        ),
    },
    UIRadio: {
        component: UIRadioDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIRadio/README.md', 'utf8')
        ),
    },
    UISegmentedControl: {
        component: UISegmentedControlDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UISegmentedControl/README.md', 'utf8')
        ),
    },
    UITable: {
        component: UITableDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UITable/README.md', 'utf8')
        ),
    },
    UITokenizedInput: {
        component: UITokenizedInputDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UITokenizedInput/README.md', 'utf8')
        ),
    },
    UITooltip: {
        component: UITooltipDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UITooltip/README.md', 'utf8')
        ),
    },
    UITypeaheadInput: {
        component: UITypeaheadInputDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UITypeaheadInput/README.md', 'utf8')
        ),
    },
    UIView: {
        component: NullComponent,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIView/README.md', 'utf8')
        ),
    },
};

class Sidebar extends UIView {
    createSubEntities(path, text, entities, readme) {
        const headerTextRegex = /#+\s?([^<]+)/;
        const headerHashRegex = /#+\s?.*?href="(.*?)"/;

        readme.split('\n').filter(line => line.indexOf('### ') === 0).forEach(line => {
            if (line.match(headerHashRegex)) {
                entities.push({
                    path: `${path}${line.match(headerHashRegex)[1]}`,
                    text: `${text} - ${line.match(headerTextRegex)[1]}`,
                });
            }
        });
    }

    initialState() {
        const entities = [];

        Object.keys(components).forEach(path => {
            entities.push({
                path: path,
                text: path,
            });

            this.createSubEntities(path, path, entities, components[path].readme);
        });

        Object.keys(pages).forEach(page => {
            entities.push({
                path: page,
                text: pages[page].displayName,
            });

            this.createSubEntities(page, pages[page].displayName, entities, pages[page].readme);
        });

        return {entities};
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

    handleEntitySelected(index) {
        this.context.history.pushState(null, this.state.entities[index].path);
    }

    handleComplete(value) {
        if (!value) {
            return this.context.history.pushState(null, '/');
        }

        const found = findWhere(this.state.entities, {text: value});

        if (found) {
            this.context.history.pushState(null, found.path);
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

                <UITypeaheadInput algorithm={UITypeaheadInput.mode.FUZZY}
                                  className='ui-demo-header-search'
                                  entities={this.state.entities}
                                  onEntitySelected={this.handleEntitySelected.bind(this)}
                                  onComplete={this.handleComplete.bind(this)}
                                  inputProps={{
                                    autoFocus: true,
                                    placeholder: 'Search for a page...',
                                    type: 'search',
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
                </nav>
            </header>
        );
    }
}

Sidebar.contextTypes = {
    history: React.PropTypes.object
};

class Container extends UIView {
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

    handleClick(event) {
        /*
            markdown-created links don't use React Router's <Link /> mechanism, so we have to programmatically
            trigger the route to avoid a page refresh
         */
        if (event.target.tagName.toLowerCase() === 'a') {
            if (   event.target.hostname === window.location.hostname
                && event.target.pathname[0] === '/') {
                if (event.target.getAttribute('href')[0] !== '#') {
                    event.preventDefault();
                    this.context.history.pushState(null, event.target.pathname);
                    document.body.scrollTop = 0;
                }
            } else {
                event.preventDefault();
                window.open(event.target.href);
            }
        }
    }

    renderDemo() {
        if (   this.props.children
            && this.props.children.type !== NullComponent) {
            return (
                <article className='ui-demo-section-example'>{this.props.children}</article>
            );
        } // don't render if not a composite
    }

    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>
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

Container.contextTypes = {
    history: React.PropTypes.object
};

render(
    <Router history={history}>
        <Route path='/' component={Container} readme={readme}>
            {Object.keys(pages).map(page => {
                return <Route {...pages[page]} key={page} path={page} />;
            })}
            {Object.keys(components).map(component => {
                return <Route {...components[component]} key={component} path={component} />;
            })}
        </Route>
    </Router>, document.getElementById('root')
);
