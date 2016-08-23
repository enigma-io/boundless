import React from 'react';
import UIArrowKeyNavigation from '../../UIArrowKeyNavigation';
import UIPopover from '../index';

export default class UIPopoverDemo extends React.PureComponent {
    state = {
        words: [{
            word: 'transcendental',
            syllabicRepresentation: 'tran·scen·den·tal',
            type: 'adjective',
            primaryDefinition: '',
            secondaryDefinitions: [
                'of or relating to a spiritual or nonphysical realm',
                '(of a number, e.g., e or π) real but not a root of an algebraic equation with rational roots',
            ],
        }, {
            word: 'obstetrics',
            syllabicRepresentation: 'ob·stet·rics',
            type: 'noun',
            primaryDefinition: 'the branch of medicine and surgery concerned with childbirth and the care of women giving birth',
            secondaryDefinitions: [],
            anchorXAlign: UIPopover.position.MIDDLE,
            selfXAlign: UIPopover.position.MIDDLE,
        }, {
            word: 'olio',
            syllabicRepresentation: 'o·li·o',
            type: 'noun',
            primaryDefinition: [
                <span key='1'>another term for </span>,
                <a key='2' href='https://www.google.com/search?safe=active&espv=2&biw=1440&bih=74&q=define+olla+podrida&sa=X&ved=0CB8QgCswAGoVChMIlbiutZmDxwIVQx0-Ch1f-g9t'>olla podrida</a>,
            ],
            secondaryDefinitions: [
                'a miscellaneous collection of things',
                'a variety act or show',
            ],
            anchorXAlign: UIPopover.position.END,
            anchorYAlign: UIPopover.position.MIDDLE,
            selfXAlign: UIPopover.position.START,
            selfYAlign: UIPopover.position.MIDDLE,
        }, {
            word: 'anastrophe',
            syllabicRepresentation: 'a·nas·tro·phe',
            type: 'noun',
            primaryDefinition: 'the inversion of the usual order of words or clauses',
            secondaryDefinitions: [],
            anchorXAlign: UIPopover.position.START,
            anchorYAlign: UIPopover.position.MIDDLE,
            selfXAlign: UIPopover.position.END,
            selfYAlign: UIPopover.position.MIDDLE,
        }, {
            word: 'octothorp',
            syllabicRepresentation: 'oc·to·thorp',
            type: 'noun',
            primaryDefinition: 'another term for the pound sign (#)',
            secondaryDefinitions: [],
            anchorXAlign: UIPopover.position.MIDDLE,
            anchorYAlign: UIPopover.position.START,
            selfXAlign: UIPopover.position.MIDDLE,
            selfYAlign: UIPopover.position.END,
        }],
    }

    handleKeyDown(index, event) {
        if (event.key === 'Enter') {
            this[this.state['showPopover' + index] ? 'showPopover' : 'hidePopover'](index, event);
        }
    }

    openPopover(index, event) {
        this.setState({ ['showPopover' + index]: true });
    }

    closePopover(index, event) {
        this.setState({ ['showPopover' + index]: false });
    }

    renderSecondaryDefinitions(definitions = []) {
        return definitions.length ? (
            <UIArrowKeyNavigation key='secondary' component='ol'>
                {definitions.map((definition, index) => <li key={index}>{definition}</li>)}
            </UIArrowKeyNavigation>
        ) : undefined;
    }

    renderPrimaryDefinition(definition) {
        return definition ?  <p key='primary'>{definition}</p> : undefined;
    }

    renderBody(definition) {
        return [
            <strong key='syllabic'>{definition.syllabicRepresentation}</strong>,
            <br key='break' />,
            <em key='type'>{definition.type}</em>,
            this.renderPrimaryDefinition(definition.primaryDefinition),
            this.renderSecondaryDefinitions(definition.secondaryDefinitions),
        ];
    }

    renderPopovers() {
        return this.state.words.map((definition, index) => {
            return this.state['showPopover' + index] ? (
                <UIPopover key={definition.word}
                           anchor={this.refs['word' + index]}
                           anchorXAlign={definition.anchorXAlign}
                           anchorYAlign={definition.anchorYAlign}
                           closeOnOutsideFocus={true}
                           onClose={this.closePopover.bind(this, index)}
                           selfXAlign={definition.selfXAlign}
                           selfYAlign={definition.selfYAlign}>
                    {this.renderBody(definition)}
                </UIPopover>
            ) : undefined;
        });
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
                                      onClick={this.openPopover.bind(this, index)}
                                      onKeyDown={this.handleKeyDown.bind(this, index)}
                                      tabIndex='0'>
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
}
