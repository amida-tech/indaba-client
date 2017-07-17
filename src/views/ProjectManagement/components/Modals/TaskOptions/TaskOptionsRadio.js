import React, { Component } from 'react';
import RadioButton from 'grommet/components/RadioButton';

class TaskOptionsRadio extends Component {
    render() {
        return (
            <RadioButton id={this.props.input.value}
                {...this.props.input}
                className='task-options-form__header'
                label={this.props.label} />
        );
    }
}

export default TaskOptionsRadio;
