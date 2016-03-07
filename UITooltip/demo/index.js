import React from 'react';
import UITooltip from '../index';
import UIView from '../../UIView';

export default class UITooltipDemo extends UIView {
    render() {
        return (
            <div>
                <p><strong>Search Results:</strong></p>
                <div className='ui-spread-even'>
                    <UITooltip text='100% relevance'>Margaret Drabble (8 May 2014). <strong>"Submarine dreams: <mark>Jules Verne's</mark> Twenty Thousand Leagues Under the Seas".</strong> <em>New Statesman.</em> Retrieved 2014-05-09.</UITooltip>
                    <UITooltip text='98% relevance' position={UITooltip.position.AFTER}><strong>"How Lewis Mercier and Eleanor King brought you <mark>Jules Verne</mark>".</strong> <em>Ibiblio.org.</em> Retrieved 2013-11-15.</UITooltip>
                    <UITooltip text='90% relevance' position={UITooltip.position.BEFORE}><strong>"(20000 leagues) ÷ (diameter of earth) - Wolfram|Alpha".</strong> <em>wolframalpha.com.</em> Retrieved 2015-09-17.</UITooltip>
                    <UITooltip text='80% relevance' position={UITooltip.position.BELOW}><strong>"A brief history of diving and decompression illness.".</strong> <em>South Pacific Underwater Medicine Society Journal 29.</em></UITooltip>
                </div>
            </div>
        );
    }
}
