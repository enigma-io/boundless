import UIList from '../UIList';
import UIPopover from './index';
import UIView from '../UIView';
import React from 'react';

export default class UIPopoverDemo extends UIView {
    constructor(...args) {
        super(...args);
    }

    initialState() {
        return {
            words: [{
                word: 'transcendental',
                syllabicRepresentation: 'tran·scen·den·tal',
                type: 'adjective',
                primaryDefinition: '',
                secondaryDefinitions: [
                    'of or relating to a spiritual or nonphysical realm',
                    '(of a number, e.g., e or π) real but not a root of an algebraic equation with rational roots'
                ]
            }, {
                word: 'obstetrics',
                syllabicRepresentation: 'ob·stet·rics',
                type: 'noun',
                primaryDefinition: 'the branch of medicine and surgery concerned with childbirth and the care of women giving birth',
                secondaryDefinitions: [],
                anchorXAlign: UIPopover.Constants.MIDDLE,
                selfXAlign: UIPopover.Constants.MIDDLE
            }, {
                word: 'olio',
                syllabicRepresentation: 'o·li·o',
                type: 'noun',
                primaryDefinition: [
                    <span>another term for</span>,
                    <a href='https://www.google.com/search?safe=active&espv=2&biw=1440&bih=74&q=define+olla+podrida&sa=X&ved=0CB8QgCswAGoVChMIlbiutZmDxwIVQx0-Ch1f-g9t'>olla podrida</a>
                ],
                secondaryDefinitions: [
                    'a miscellaneous collection of things',
                    'a variety act or show'
                ],
                anchorXAlign: UIPopover.Constants.END,
                anchorYAlign: UIPopover.Constants.MIDDLE,
                selfXAlign: UIPopover.Constants.START,
                selfYAlign: UIPopover.Constants.MIDDLE
            }, {
                word: 'anastrophe',
                syllabicRepresentation: 'a·nas·tro·phe',
                type: 'noun',
                primaryDefinition: 'the inversion of the usual order of words or clauses',
                secondaryDefinitions: [],
                anchorXAlign: UIPopover.Constants.START,
                anchorYAlign: UIPopover.Constants.MIDDLE,
                selfXAlign: UIPopover.Constants.END,
                selfYAlign: UIPopover.Constants.MIDDLE
            }, {
                word: 'octothorp',
                syllabicRepresentation: 'oc·to·thorp',
                type: 'noun',
                primaryDefinition: 'another term for the pound sign (#)',
                secondaryDefinitions: [],
                anchorXAlign: UIPopover.Constants.MIDDLE,
                anchorYAlign: UIPopover.Constants.START,
                selfXAlign: UIPopover.Constants.MIDDLE,
                selfYAlign: UIPopover.Constants.END
            }]
        };
    }

    render() {
        return (
            <div>
                <p>Words of the day for {(new Date()).toLocaleDateString()}</p>
                <div className='ui-spread-even'>
                    {this.state.words.map((definition, index) => {
                        return (
                            <div key={definition.word}>
                                <abbr ref={'word' + index}
                                      className='show-help-popover'
                                      onClick={this.togglePopover.bind(this, index)}>
                                    {definition.word}
                                </abbr>
                            </div>
                        );
                    })}
                </div>
                {this.renderPopovers()}
            </div>
        );
    }

    renderBody(definition) {
        let bodyParts = [
            <strong>{definition.syllabicRepresentation}</strong>,
            <br />,
            <em>{definition.type}</em>
        ];

        if (definition.primaryDefinition) {
            bodyParts.push(<p>{definition.primaryDefinition}</p>);
        }

        if (definition.secondaryDefinitions) {
            bodyParts.push(<UIList type='number' items={definition.secondaryDefinitions} />);
        }

        return bodyParts;
    }

    renderPopovers() {
        return this.state.words.map((definition, index) => {
            return this.state['showPopover' + index] ? (
                <UIPopover key={definition.word}
                           anchor={this.refs['word' + index]}
                           anchorXAlign={definition.anchorXAlign}
                           anchorYAlign={definition.anchorYAlign}
                           body={this.renderBody(definition)}
                           closeOnEscKey={true}
                           closeOnOutsideClick={true}
                           onClose={this.togglePopover.bind(this, index)}
                           selfXAlign={definition.selfXAlign}
                           selfYAlign={definition.selfYAlign} />
            ) : null;
        });
    }

    togglePopover(index) {
        this.setState({ ['showPopover' + index]: !this.state['showPopover' + index] });
    }
}
