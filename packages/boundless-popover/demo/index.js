import React from 'react';

import ArrowKeyNavigation from '../../boundless-arrow-key-navigation/index';
import Popover from '../index';

export default class PopoverDemo extends React.PureComponent {
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
            preset: Popover.preset.N,
            primaryDefinition: 'the branch of medicine and surgery concerned with childbirth and the care of women giving birth',
            secondaryDefinitions: [],
        }, {
            word: 'olio',
            syllabicRepresentation: 'o·li·o',
            type: 'noun',
            preset: Popover.preset.E,
            primaryDefinition: [
                <span key='1'>another term for </span>,
                <a key='2' href='https://www.google.com/search?safe=active&espv=2&biw=1440&bih=74&q=define+olla+podrida&sa=X&ved=0CB8QgCswAGoVChMIlbiutZmDxwIVQx0-Ch1f-g9t'>olla podrida</a>,
            ],
            secondaryDefinitions: [
                'a miscellaneous collection of things',
                'a variety act or show',
            ],
        }, {
            word: 'anastrophe',
            syllabicRepresentation: 'a·nas·tro·phe',
            type: 'noun',
            preset: Popover.preset.W,
            primaryDefinition: 'the inversion of the usual order of words or clauses',
            secondaryDefinitions: [],
        }, {
            word: 'octothorp',
            syllabicRepresentation: 'oc·to·thorp',
            type: 'noun',
            preset: Popover.preset.WNW,
            primaryDefinition: 'another term for the pound sign (#)',
            secondaryDefinitions: [],
        }],
    }

    handleKeyDown(index, event) {
        if (event.key === 'Enter') {
            this[this.state['showPopover' + index] ? 'showPopover' : 'hidePopover'](index, event);
        }
    }

    openPopover(index) {
        this.setState({ ['showPopover' + index]: true });
    }

    closePopover(index) {
        this.setState({ ['showPopover' + index]: false });
    }

    renderSecondaryDefinitions(definitions = []) {
        return definitions.length ? (
            <ArrowKeyNavigation component='ol'>
                {definitions.map((definition, index) => <li key={index}>{definition}</li>)}
            </ArrowKeyNavigation>
        ) : null;
    }

    renderPrimaryDefinition(definition) {
        return definition ? (<p>{definition}</p>) : null;
    }

    renderBody(definition) {
        return (
            <div>
                <strong>{definition.syllabicRepresentation}</strong>
                <br />
                <em>{definition.type}</em>
                {this.renderPrimaryDefinition(definition.primaryDefinition)}
                {this.renderSecondaryDefinitions(definition.secondaryDefinitions)}
            </div>
        );
    }

    renderPopovers() {
        return this.state.words.map((definition, index) => {
            return this.state['showPopover' + index] ? (
                <Popover
                    key={definition.word}
                    anchor={this.refs['word' + index]}
                    className='demo-popover'
                    closeOnOutsideFocus={true}
                    preset={definition.preset}
                    onClose={this.closePopover.bind(this, index)}>
                    {this.renderBody(definition)}
                </Popover>
            ) : undefined;
        });
    }

    render() {
        return (
            <div>
                <p>Words of the day for {(new Date()).toLocaleDateString()}</p>

                <div className='spread'>
                    {this.state.words.map((definition, index) => {
                        return (
                            <div key={definition.word}>
                                <abbr
                                    ref={'word' + index}
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
