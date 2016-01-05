const through = require('through');

const injectorRegex = /([#]+\s?)(.*?)\n/g;
const githubRemapperRegex = /(\[.*?\])\(((?!http|#).*?)\)/gi;
const shaRemapperRegex = /\(([A-Z0-9]{7,})\)/gi;
const readmeRemapperRegex = /(\[.*?\])\(((?!http|#).*?\/(.*?)\/README\.md(.*?))\)/gi;
const propDescriptorRegex = /((__|\*\*).*?(__|\*\*)\s?`.*?`)/g;

function sanitizeHeaderName(name) {
    name = name || '';

    return name.trim()
               .toLowerCase()
               .replace(/[^\w\s]/gi, '')  // remove all punctuation/non-ASCII
               .replace(/\s/g, '-');      // spaces to dashes
};

function injectHeaderLinks(mkdown) {
    return mkdown.replace(
        injectorRegex, (fullMatch, text, href) => {
            return `${text}${href}<a id="${sanitizeHeaderName(href)}" href="#${sanitizeHeaderName(href)}"></a>\n`;
        }
    );
}

function breakLineAfterPropDescriptor(mkdown) {
    return mkdown.replace(propDescriptorRegex, '$1<br />');
}

function remapRelativeREADMELinks(mkdown) {
    return mkdown.replace(readmeRemapperRegex, '$1(/$3$4)');
}

function remapCommitSHAsToGithub(mkdown) {
    return mkdown.replace(shaRemapperRegex, '([$1](https://github.com/bibliotech/uikit/commit/$1))');
}

function remapRelativeLinksToGithub(mkdown) {
    return mkdown.replace(
        githubRemapperRegex, (fullMatch, anchor, sha) => {
            if (fullMatch.indexOf('README.md') === -1) {
                return `${anchor}(https://github.com/bibliotech/uikit/blob/master/${sha})`
            } // exclude READMEs, those are handled by `remapRelativeREADMELinks`

            return fullMatch;
        }
    );
}

function prepareMarkdown(mkdown) {
    mkdown = mkdown || '';

    return mkdown.split(/(```[^`]*?```)/g).map(block => {
        if (block.indexOf('```') === -1) {
            return [
                injectHeaderLinks,
                breakLineAfterPropDescriptor,
                remapRelativeLinksToGithub,
                remapRelativeREADMELinks,
                remapCommitSHAsToGithub,
            ].reduce((content, transform) => transform(content), block);
        }

        return block;
    }).join(''); // ignore fenced code blocks
}

module.exports = function (filename) {
    function write (markdown) {
        markdown = prepareMarkdown(markdown);

        this.queue(markdown);
    }

    function end () {
        this.queue(null);
    }

    if (/\.md$/.test(filename)) {
        return through(write, end);
    }

    return through();
};
