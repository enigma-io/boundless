import {createElement} from 'react';
import Button from '../../boundless-button/index';
import FittedText from '../';

export default () => (
    <div className='spread'>
        <Button className='tall-button'>
            <FittedText>Welcome</FittedText>
        </Button>
        <Button className='tall-button'>
            <FittedText>Добро пожаловать</FittedText>
        </Button>
        <Button className='tall-button'>
            <FittedText>Benvenuto</FittedText>
        </Button>
        <Button className='tall-button'>
            <FittedText>환영합니다</FittedText>
        </Button>
        <Button className='tall-button'>
            <FittedText>സ്വാഗതം</FittedText>
        </Button>
    </div>
);
