const _ = require('lodash');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

const descriptionSuffix = 'a toolkit of React components and helper utilities focused on accessibility, performance, and composition';

const base = path.resolve(__dirname, '..');
const baseREADME = fs.readFileSync(path.resolve(base, 'docs', 'index.html'), 'utf8');

const emittedDirectories = [''];

function emitIndexFile(destinationDir, title, description) {
    const destinationIndexPath = path.join(destinationDir, 'index.html');

    mkdirp.sync(destinationDir);

    let readme;

    readme = baseREADME;
    readme = readme.replace(/<title>.*?<\/title>/, `<title>boundless / ${title}</title>`);
    readme = readme.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${description}">`);
    readme = readme.replace(/src="assets/g, 'src="../assets');

    fs.writeFileSync(destinationIndexPath, readme);

    emittedDirectories.push(path.basename(path.dirname(destinationIndexPath)));
}

const packages = fs.readdirSync(path.join(base, 'packages')).filter((name) => {
    return !require(path.join(base, 'packages', name, 'package.json')).private;
});

packages.forEach((name) => {
    const prettyName = name.indexOf('utils') !== -1
                       ? _.camelCase(name.replace('boundless-utils-', ''))
                       : _.pascalCase(name.replace('boundless-', ''));

    emitIndexFile(
        path.resolve(__dirname, '..', 'docs', prettyName),
        prettyName,
        _.escape(require(path.join(base, 'packages', name, 'package.json')).description) + ` ${prettyName} is part of Boundless, ${descriptionSuffix}.`
    );
});

// at the moment we have a few other other pages that need custom indexes as well

emitIndexFile(
    path.resolve(__dirname, '..', 'docs', 'kitchensink'),
    'Kitchen Sink',
    `See all Boundless component demos in one convenient place. Boundless is ${descriptionSuffix}.`
);

emitIndexFile(
    path.resolve(__dirname, '..', 'docs', 'quickstart'),
    'Getting Started',
    `A guide to creating a Boundless-ready React web app. Boundless is ${descriptionSuffix}.`
);

// generate sitemap

const todayISODateString = new Date().toISOString();

fs.writeFileSync(path.resolve(__dirname, '..', 'docs', 'sitemap.xml'), `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${emittedDirectories.map((dir) => `
<url>
    <loc>https://boundless.js.org/${dir}</loc>
    <lastmod>${todayISODateString}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
</url>
`.trim()).join('\n')}
</urlset>
`.trim());
