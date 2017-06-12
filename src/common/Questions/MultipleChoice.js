import React, { Component } from 'react';
import Box from 'grommet/components/Box';

export class MultipleChoice extends Component {
    render() {
        return (
            <Box direction='column'>
                {this.props.question}
                <div className='question-panel'>
                {this.props.answers.map((answer, index) =>
                    <label className=''
                        key={'question'+this.props.id+index}>
                        <input type='radio'
                            id=''
                            checked={index === this.props.value}
                            name='question'/>
                        <span>{answer}</span>
                    </label>
                )}
                </div>
            </Box>
        )
    }
}
