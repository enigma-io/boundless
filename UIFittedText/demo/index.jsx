import UIButton from '../../UIButton';
import UIFittedText from '../index.jsx';
import UIView from '../../UIView';
import React from 'react';

export default class UIFittedTextDemo extends UIView {
    render() {
        return (
            <div className='ui-spread-even'>
                <UIButton className='tall-button'>
                    <UIFittedText maxFontSize={24}>Welcome</UIFittedText>
                </UIButton>
                <UIButton className='tall-button'>
                    <UIFittedText maxFontSize={24}>Karibu</UIFittedText>
                </UIButton>
                <UIButton className='tall-button'>
                    <UIFittedText maxFontSize={24}>Willkommen</UIFittedText>
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
