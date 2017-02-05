import React from 'react';
import Input from '../index';

export default class InputDemo extends React.PureComponent {
    state = {
        input: '',
    }

    handleChange = (e) => this.setState({input: e.target.value})

    render() {
        return (
            <div className='spread'>
                <div>
                    <h5>hidePlaceholderOnFocus="false"</h5>
                    <Input
                        hidePlaceholderOnFocus={false}
                        inputProps={{
                            placeholder: 'Start typing and I disappear!',
                        }} />
                </div>

                <div style={{marginLeft: '1em'}}>
                    <h5>hidePlaceholderOnFocus="true"</h5>
                    <Input
                        hidePlaceholderOnFocus={true}
                        inputProps={{
                            placeholder: 'Focus on me and I disappear!',
                        }} />
                </div>

                <div style={{marginLeft: '1em'}}>
                    <h5>"controlled" input</h5>
                    <Input
                        hidePlaceholderOnFocus={true}
                        inputProps={{
                            placeholder: 'Focus on me and I disappear!',
                            onChange: this.handleChange,
                            value: this.state.input,
                        }} />
                </div>
            </div>
        );
    }
}
