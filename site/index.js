import React from 'react';
import {render} from 'react-dom';

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
import UIPopoverDemo from '../UIPopover/demo';
import UIProgressDemo from '../UIProgress/demo';
import UIProgressiveDisclosureDemo from '../UIProgressiveDisclosure/demo';
import UIRadioDemo from '../UIRadio/demo';
import UISegmentedControlDemo from '../UISegmentedControl/demo';
import UITableDemo from '../UITable/demo';
import UITokenizedInputDemo from '../UITokenizedInput/demo';
import UITooltipDemo from '../UITooltip/demo';
import UITypeaheadInputDemo from '../UITypeaheadInput/demo';
import UIView from '../UIView';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Router, Route, Link} from 'react-router';

const injectorRegex = /([#]+\s?)(.*?)\n/g;
const readmeRemapperRegex = /(\[.*?\])\(((?!http|#).*?\/(.*?)\/README\.md(.*?))\)/gi;
const githubRemapperRegex = /(\[.*?\])\(((?!http|#).*?)\)/gi;

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

function remapRelativeREADMELinks(mkdown = '') {
    return mkdown.replace(readmeRemapperRegex, '$1(/$3$4)');
}

function remapRelativeLinksToGithub(mkdown = '') {
    return mkdown.replace(
        githubRemapperRegex, (...captures) => {
            if (captures[0].indexOf('README.md') === -1) {
                return `${captures[1]}(https://github.com/enigma-platform/uikit/blob/master/${captures[2]})`
            } // exclude READMEs, those are handled by `remapRelativeREADMELinks`

            return captures[0];
        }
    );
}

function prepareMarkdown(mkdown = '') {
    return remapRelativeREADMELinks(remapRelativeLinksToGithub(injectHeaderLinks(mkdown)));
}

const fs = require('fs');

const readme = prepareMarkdown(
    fs.readFileSync(__dirname + '/../README.md', 'utf8')
);

/*
    each one needs to be listed out explicitly so brfs will pick it up and inline the readme
 */
const pages = {
    UIButton: {
        component: UIButtonDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIButton/README.md', 'utf8')
        )
    },
    UICheckbox: {
        component: UICheckboxDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UICheckbox/README.md', 'utf8')
        )
    },
    UICheckboxGroup: {
        component: UICheckboxGroupDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UICheckboxGroup/README.md', 'utf8')
        )
    },
    UIDialog: {
        component: UIDialogDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIDialog/README.md', 'utf8')
        )
    },
    UIFittedText: {
        component: UIFittedTextDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIFittedText/README.md', 'utf8')
        )
    },
    UIImage: {
        component: UIImageDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIImage/README.md', 'utf8')
        )
    },
    UIList: {
        component: UIListDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIList/README.md', 'utf8')
        )
    },
    UIModal: {
        component: UIModalDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIModal/README.md', 'utf8')
        )
    },
    UINotification: {
        component: UINotificationDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UINotification/README.md', 'utf8')
        )
    },
    UIPopover: {
        component: UIPopoverDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIPopover/README.md', 'utf8')
        )
    },
    UIProgress: {
        component: UIProgressDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIProgress/README.md', 'utf8')
        )
    },
    UIProgressiveDisclosure: {
        component: UIProgressiveDisclosureDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIProgressiveDisclosure/README.md', 'utf8')
        )
    },
    UIRadio: {
        component: UIRadioDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UIRadio/README.md', 'utf8')
        )
    },
    UISegmentedControl: {
        component: UISegmentedControlDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UISegmentedControl/README.md', 'utf8')
        )
    },
    UITable: {
        component: UITableDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UITable/README.md', 'utf8')
        )
    },
    UITokenizedInput: {
        component: UITokenizedInputDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UITokenizedInput/README.md', 'utf8')
        )
    },
    UITooltip: {
        component: UITooltipDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UITooltip/README.md', 'utf8')
        )
    },
    UITypeaheadInput: {
        component: UITypeaheadInputDemo,
        readme: prepareMarkdown(
            fs.readFileSync(__dirname + '/../UITypeaheadInput/README.md', 'utf8')
        )
    },
};

class Container extends UIView {
    componentDidMount() {
        Prism.highlightAll();

        if (window.location.hash.length > 1) {
            const node = document.getElementById(window.location.hash.slice(1));

            if (node) {
                node.scrollIntoView();
            }
        } // autoscroll to the anchor node
    }

    componentDidUpdate() {
        Prism.highlightAll();
    }

    renderHeader() {
        return (
            <header className='ui-demo-header'>
                <h1 className='ui-demo-header-title'>
                    <Link to='/'>UIKit</Link>
                </h1>

                <sub className='ui-demo-header-desc'>All presentational styles are limited to this website &ndash; the React components do not come bundled with CSS.</sub>
                <nav className='ui-demo-nav'>
                    {Object.keys(pages).map(page => <Link key={page} to={`/${page}`} className='ui-demo-nav-item'>{page}</Link>)}
                </nav>
            </header>
        );
    }

    renderDemo() {
        if (this.props.children) {
            return (
                <article className='ui-demo-section-example'>{this.props.children}</article>
            );
        }
    }

    renderMain() {
        return (
            <main className='ui-demo-section'>
                {this.renderDemo()}

                <Markdown container='div' options={{html: true}}>
                    {   this.props.children
                      ? this.props.children.props.route.readme
                      : this.props.route.readme
                    }
                </Markdown>
            </main>
        );
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderMain()}
            </div>
        );
    }
}

render(
    <Router history={createBrowserHistory()}>
        <Route path='/' component={Container} readme={readme}>
            {Object.keys(pages).map(page => {
                return <Route {...pages[page]} key={page} path={page} />;
            })}
        </Route>
    </Router>, document.getElementById('root')
);
