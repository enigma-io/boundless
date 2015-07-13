import UIButton from 'UIKit/UIButton';
import UIList from 'UIKit/UIList';
import React from 'react';

// UIButton
let clickFunc = function clickFunc() { alert('HONK!'); };
let doubleClickFunc = function doubleClickFunc() { alert('SCREECH!'); };

React.render(
    <div>
        <UIButton onClick={clickFunc} className='fast-honk-button'>FastHonk</UIButton>
        <UIButton onClick={clickFunc} onDoubleClick={doubleClickFunc} className={['green', 'blue']}>Honk</UIButton>
        <UIButton onClick={clickFunc} disabled>Whomp Whomp</UIButton>
    </div>, document.getElementById('ui-button')
);

// UIList
React.render(
    <div>
        <UIList items={['apple', 'orange', 'banana']} />
        <UIList type='bullet' items={['apple', 'orange', 'banana']} />
        <UIList type='number' items={['apple', 'orange', 'banana']} />
    </div>,
    document.getElementById('ui-list')
);
