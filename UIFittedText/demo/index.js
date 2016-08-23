import React from 'react';
import UIButton from '../../UIButton';
import UIFittedText from '../index';

export default class UIFittedTextDemo extends React.PureComponent {
    render() {
        return (
            <div className='ui-spread-even'>
                <UIButton className='tall-button'>
                    <UIFittedText maxFontSize={24}>Welcome</UIFittedText>
                </UIButton>
                <UIButton className='tall-button'>
                    <UIFittedText maxFontSize={24}>Добро пожаловать</UIFittedText>
                </UIButton>
                <UIButton className='tall-button'>
                    <UIFittedText maxFontSize={24}>Benvenuto</UIFittedText>
                </UIButton>
                <UIButton className='tall-button'>
                    <UIFittedText maxFontSize={24}>환영합니다</UIFittedText>
                </UIButton>
                <UIButton className='tall-button'>
                    <UIFittedText maxFontSize={24}>സ്വാഗതം</UIFittedText>
                </UIButton>
            </div>
        );
    }
}
