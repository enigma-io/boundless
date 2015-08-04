import UIButton from '../../UIButton';
import UIText from '../index.jsx';
import UIView from '../../UIView';
import React from 'react';

export default class UITextDemo extends UIView {
    render() {
        return (
            <div className='ui-spread-even'>
                <UIButton className='tall-button'>
                    <UIText maxFontSize={24}>Welcome</UIText>
                </UIButton>
                <UIButton className='tall-button'>
                    <UIText maxFontSize={24}>Karibu</UIText>
                </UIButton>
                <UIButton className='tall-button'>
                    <UIText maxFontSize={24}>Willkommen</UIText>
                </UIButton>
                <UIButton className='tall-button'>
                    <UIText maxFontSize={24}>Добро пожаловать</UIText>
                </UIButton>
                <UIButton className='tall-button'>
                    <UIText maxFontSize={24}>Benvenuto</UIText>
                </UIButton>
                <UIButton className='tall-button'>
                    <UIText maxFontSize={24}>환영합니다</UIText>
                </UIButton>
                <UIButton className='tall-button'>
                    <UIText maxFontSize={24}>സ്വാഗതം</UIText>
                </UIButton>
            </div>
        );
    }
}
