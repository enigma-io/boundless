import React, {PropTypes} from 'react';
import * as _ from 'lodash';

import * as Boundless from '../exports';
import LinkedHeaderText from './linked-header-text';
import Markdown from './markdown';

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

const getPackageIndexURI = (name) => `https://api.github.com/repos/enigma-io/boundless/contents/packages/${name}/demo/index.js`;

export default class ComponentPage extends React.PureComponent {
    static propTypes = {
        demo: PropTypes.any,
        docgenInfo: PropTypes.object,
        packageName: PropTypes.string,
    }

    renderSubPropTableRow = (props, name, depth) => (
        <tr key={name} className={`prop-row prop-depth-${depth}`}>
            <td className='prop-name'>
                <Boundless.FittedText
                    component='strong'
                    maxFontSize={16}
                    name={`prop-${name}`}>
                    <code>{name}</code>
                </Boundless.FittedText>
            </td>
            <td className='prop-implementation'>
                <h5>Expects</h5>
                <pre><code>{this.formatPropType(props[name])}</code></pre>
            </td>
            <td className='prop-description'>
                <Markdown>{props[name].description}</Markdown>
            </td>
        </tr>
    )

    formatPropType = (type) => {
        switch (type.name) {
        case 'arrayOf':
            if (type.value.name !== 'custom') {
                return `${type.name}(${this.formatPropType(type.value)})`;
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
            return type.value.map((v) => this.formatPropType(v)).join(' or ');
        }

        return type.name;
    }

    /**
     * @param  {Object}         allProps
     * @param  {String}         name       the prop's name, may be a subprop (e.g. foo.bar)
     * @param  {Number}         depth      [description]
     * @return {jsx}
     */
    renderPropTableRows(allProps, name, depth = 0) {
        if (!allProps[name].type) { return null; }

        const prop = _.get(allProps, name);

        const rows = [(
            <tr key={name} className={`prop-row prop-depth-${depth}`}>
                <td className='prop-name'>
                    <Boundless.FittedText
                        component='strong'
                        maxFontSize={16}
                        name={`prop-${name}`}>
                        <code>{name}</code>
                    </Boundless.FittedText>
                </td>

                <td className='prop-implementation'>
                    <h5>Expects</h5>
                    <pre>
                        <code>{this.formatPropType(prop.type)}</code>
                    </pre>

                    <h5>Default Value</h5>
                    <pre>
                        <code className='lang-js'>
                            {prop.defaultValue.value === 'noop' ? '() => {}' : prop.defaultValue.value}
                        </code>
                    </pre>
                </td>

                <td className='prop-description'>
                    <Markdown>{prop.description}</Markdown>
                </td>
            </tr>
        )];

        if (prop.type.name === 'shape' && prop.type.computed && typeof prop.type.value === 'string') {
            const component = prop.type.value.split('.')[0];
            const resolvedProps = _.get(Boundless, `${component}.__docgenInfo.props`);

            return rows.concat(
                _.map(resolvedProps, (x, subPropName) => {
                    return this.renderPropTableRows(resolvedProps, subPropName, depth + 1);
                })
            );
        }

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

    fetchDemo = () => {
        return new Promise((resolve, reject) => {
            fetch(getPackageIndexURI(this.props.packageName)).then(
                (response) => response.ok ? response.json().then(resolve, reject) : reject(error),
                (error) => reject(error),
            );
        });
    }

    // the implementation won't be fetchable until the repo is made public
    maybeRenderDemo() {
        if (this.props.demo) {
            return (
                <div className='demo-section-wrapper'>
                    <LinkedHeaderText component='h3'>
                        Demo
                    </LinkedHeaderText>

                    <div className='demo-section-example'>
                        <this.props.demo />
                    </div>

                    <Boundless.ProgressiveDisclosure
                        className='demo-implementation-disclosure'
                        teaser='Show Implementation'
                        teaserExpanded='Hide Implementation'>
                        {() => (
                            <Boundless.Async
                                data={this.fetchDemo()}
                                contentRenderedFunc={() => window.Prism.highlightAll()}
                                convertToJSXFunc={(json) => (
                                    <pre className='demo-implementation'>
                                        <code className='language-jsx'>
                                            {atob(json.content)}
                                        </code>
                                    </pre>
                                )}
                                errorContent='There was a network failure retrieving the demo.' />
                        )}
                    </Boundless.ProgressiveDisclosure>
                </div>
            );
        }
    }

    render({docgenInfo} = this.props) {
        const descriptionParts = docgenInfo.description.split(/(\n#{1,}?.*?\n)/);

        // assembles the props from composed components all the way down the chain
        const coalesced = {...docgenInfo};
        const stack = docgenInfo.composes || [];

        while (stack.length) {
            if (stack[0].indexOf('boundless-') !== -1) {
                const component = stack[0].match(/boundless-(\w+)/)[1];
                const componentDocgen = Boundless[_.pascalCase(component)].__docgenInfo;

                coalesced.props = {
                    ...coalesced.props,
                    ...componentDocgen.props,
                };

                if (componentDocgen.composes) {
                    stack.push.apply(stack, componentDocgen.composes);
                }
            }

            stack.shift();
        }

        return (
            <div>
                <Markdown>{descriptionParts[0]}</Markdown>
                {this.maybeRenderDemo()}

                <Markdown>{descriptionParts.slice(1).join('')}</Markdown>

                <LinkedHeaderText component='h2'>Props</LinkedHeaderText>

                <LinkedHeaderText component='h3'>Required Props</LinkedHeaderText>
                {this.renderPropTable(_.pickBy(coalesced.props, {required: true}), true)}

                <LinkedHeaderText component='h3'>Optional Props</LinkedHeaderText>
                {this.renderPropTable(_.pickBy(coalesced.props, {required: false}), false)}
            </div>
        );
    }
}
