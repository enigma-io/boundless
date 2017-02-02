import React, {PropTypes} from 'react';
import * as _ from 'lodash';

import * as Boundless from '../exports';
import ComponentDemo from './component-demo';
import LinkedHeaderText from './linked-header-text';
import Markdown from './markdown';

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

function formatPropType(type) {
    switch (type.name) {
    case 'arrayOf':
        if (type.value.name !== 'custom') {
            return `${type.name}(${formatPropType(type.value)})`;
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
        return type.value.map((v) => formatPropType(v)).join(' or ');
    }

    return type.name;
}

export default class ComponentPage extends React.PureComponent {
    static propTypes = {
        demo: PropTypes.any,
        docgenInfo: PropTypes.object,
        packageName: PropTypes.string,
        prettyName: PropTypes.string,
    }

    renderSubPropTableRow = (props, name, depth) => (
        <tr key={name} className={`prop-row prop-depth-${depth}`}>
            <td className='prop-name'>
                <Boundless.FittedText
                    component='strong'
                    name={`prop-${name}`}>
                    <code>{name}</code>
                </Boundless.FittedText>
            </td>
            <td className='prop-implementation'>
                <h5>Expects</h5>
                <pre><code>{formatPropType(props[name])}</code></pre>
            </td>
            <td className='prop-description'>
                <Markdown>{props[name].description}</Markdown>
            </td>
        </tr>
    )

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
                        name={`prop-${name}`}>
                        <code>{name}</code>
                    </Boundless.FittedText>
                </td>

                <td className='prop-implementation'>
                    <h5>Expects</h5>
                    <pre>
                        <code>
                            {formatPropType(prop.type)}
                        </code>
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

        if (_.includes(['enum', 'union', 'instanceOf'], prop.type.name) || !prop.type.value) {
            return rows;
        }

        let target = prop.type;

        if (target.name === 'shape' && target.computed && _.isString(target.value)) {
            const [component] = target.value.split('.');
            const resolvedProps = _.get(Boundless, `${component}.__docgenInfo.props`);

            return rows.concat(
                _.map(resolvedProps, (x, subPropName) => {
                    return this.renderPropTableRows(resolvedProps, subPropName, depth + 1);
                })
            );
        }

        if (target.value.value || target.value.raw) {
            let subProps = target.value.name === 'shape' && !target.value.computed
                           ? target.value.value
                           : target.value;

             if (subProps.name === 'shape') {
                const [component] = subProps.value.split('.');

                subProps = _.get(Boundless, `${component}.__docgenInfo.props`);

                return rows.concat(
                    _.map(
                        subProps,
                        (x, subPropName) => this.renderPropTableRows(subProps, subPropName, depth + 1)
                    )
                );
            } else if (subProps.name === 'custom') {
                const [component, , subPropName] = subProps.raw.split('.');

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

    maybeRenderDemo() {
        if (this.props.demo) {
            return (
                <ComponentDemo
                    demo={this.props.demo}
                    name={this.props.packageName} />
            );
        }
    }

    render({docgenInfo, prettyName} = this.props) {
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
                <LinkedHeaderText component='h1'>{prettyName}</LinkedHeaderText>
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
