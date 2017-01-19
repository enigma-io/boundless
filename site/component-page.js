import React, {PropTypes} from 'react';
import {get, keys} from 'lodash';

import * as Boundless from '../exports';
import LinkedHeaderText from './linked-header-text';
import Markdown from './markdown';

export default class ComponentPage extends React.PureComponent {
    static propTypes = {
        demo: PropTypes.any,
        docgenInfo: PropTypes.object,
    }

    renderSubPropTableRow = (props, name, depth) => (
        <tr key={name} className={`prop-row prop-depth-${depth}`}>
            <td className='prop-name'>
                <h5>Name</h5>
                <strong>{name}</strong>

                <h5>Type</h5>
                <pre><code>{props[name].name}</code></pre>
            </td>
            <td className='prop-required'>{props[name].required ? 'Yes' : 'No'}</td>
            <td className='prop-description'>
                <Markdown>{props[name].description}</Markdown>
            </td>
        </tr>
    )

    formatPropType = (type) => {
        switch (type.name) {
        case 'arrayOf':
            if (type.value.name !== 'custom') {
                return `${type.name}(${type.value.name})`;
            }

            break;

        case 'instanceOf':
           return type.value;

        case 'enum':
            if (type.computed === true) {
                const prefix = type.value.split(/[()]+/)[1];

                return keys(
                    get(Boundless, prefix, {})
                ).map((key) => `${prefix}.${key}`).join(' or\n');
            }

            return `oneOf(${type.value})`;

        case 'union':
            return type.value.map((v) => v.name.trim()).join(' or ');
        }

        return type.name;
    }

    /**
     * @param  {Object}         docgenData
     * @param  {String}         name       the prop's name, may be a subprop (e.g. foo.bar)
     * @param  {Number}         depth      [description]
     * @return {jsx}
     */
    renderPropTableRows(docgenData, name, depth = 0) {
        if (!docgenData.props[name].type) { return null; }

        const prop = get(docgenData.props, name);

        const rows = [(
            <tr key={name} className={`prop-row prop-depth-${depth}`}>
                <td className='prop-name'>
                    <h5>Name</h5>
                    <strong>{name}</strong>

                    <h5>Type</h5>
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

                <td className='prop-required'>
                    {prop.required ? 'Yes' : 'No'}
                </td>

                <td className='prop-description'>
                    <Markdown>{prop.description}</Markdown>
                </td>
            </tr>
        )];

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
                        get(Boundless, `${component}.__docgenInfo`), subPropName, depth + 1
                    )
                );
            }

            return rows.concat(
                Object.keys(subProps).map(
                    (subPropName) => this.renderSubPropTableRow(subProps, subPropName, depth + 1)
                )
            );
        }

        return rows;
    }

    renderPropTable(docgenData) {
        return (
            <table>
                <thead>
                    <tr className='prop-row'>
                        <th className='prop-name'>Implementation</th>
                        <th className='prop-required'>Required</th>
                        <th className='prop-description'>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(docgenData.props).map((propName) => {
                        return this.renderPropTableRows(docgenData, propName);
                    })}
                </tbody>
            </table>
        );
    }

    maybeRenderDemo() {
        if (this.props.demo) {
            return (
                <div className='demo-section-wrapper'>
                    <h3>Demo</h3>
                    <article className='demo-section-example'>
                        <this.props.demo />
                    </article>
                </div>
            );
        }
    }

    render({docgenInfo} = this.props) {
        return (
            <div>
                <Markdown>{docgenInfo.description}</Markdown>
                {this.maybeRenderDemo()}

                <LinkedHeaderText component='h3'>
                    Props
                </LinkedHeaderText>

                {this.renderPropTable(docgenInfo)}
            </div>
        );
    }
}
