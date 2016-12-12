import React from 'react';
import Button from '../../boundless-button/index';
import FittedText from '../index';

export default () => (
    <div className='ui-spread-even'>
        <Button className='tall-button'>
            <FittedText maxFontSize={24}>Welcome</FittedText>
        </Button>
        <Button className='tall-button'>
            <FittedText maxFontSize={24}>Добро пожаловать</FittedText>
        </Button>
        <Button className='tall-button'>
            <FittedText maxFontSize={24}>Benvenuto</FittedText>
        </Button>
        <Button className='tall-button'>
            <FittedText maxFontSize={24}>환영합니다</FittedText>
        </Button>
        <Button className='tall-button'>
            <FittedText maxFontSize={24}>സ്വാഗതം</FittedText>
        </Button>
    </div>
);
