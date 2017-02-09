module.exports = (content) => {
    if (typeof content !== 'string') { return content; }

    this.cacheable && this.cacheable();

    let editedContent = content;

    // remove H1s
    editedContent = editedContent.replace(/^#\s.*?\n$/gm, '');

    // remove badges
    editedContent = editedContent.replace(/\[\!\[.*?\].*?\]\(.*?\)\s?/g, '');

    // remove doubled up newlines
    editedContent = editedContent.replace(/\n{3,}/g, '\n');

    return 'module.exports = ' + JSON.stringify(editedContent.trim());
};
