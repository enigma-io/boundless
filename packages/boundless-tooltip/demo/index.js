import React from 'react';
import Tooltip from '../index';

export default class TooltipDemo extends React.PureComponent {
    render() {
        return (
            <div>
                <p><strong>Search Results:</strong></p>
                <div className='ui-spread-even'>
                    <Tooltip text='100% relevance'>Margaret Drabble (8 May 2014). <strong>"Submarine dreams: <mark>Jules Verne's</mark> Twenty Thousand Leagues Under the Seas".</strong> <em>New Statesman.</em> Retrieved 2014-05-09.</Tooltip>
                    <Tooltip text='98% relevance' position={Tooltip.position.AFTER}><strong>"How Lewis Mercier and Eleanor King brought you <mark>Jules Verne</mark>".</strong> <em>Ibiblio.org.</em> Retrieved 2013-11-15.</Tooltip>
                    <Tooltip text='90% relevance' position={Tooltip.position.BEFORE}><strong>"(20000 leagues) ÷ (diameter of earth) - Wolfram|Alpha".</strong> <em>wolframalpha.com.</em> Retrieved 2015-09-17.</Tooltip>
                    <Tooltip text='80% relevance' position={Tooltip.position.BELOW}><strong>"A brief history of diving and decompression illness.".</strong> <em>South Pacific Underwater Medicine Society Journal 29.</em></Tooltip>
                </div>
            </div>
        );
    }
}
