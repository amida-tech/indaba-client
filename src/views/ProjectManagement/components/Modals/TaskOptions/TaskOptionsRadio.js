import React, { Component } from 'react';
import RadioButton from 'grommet/components/RadioButton';

class TaskOptionsRadio extends Component {
    render() {
        return (
            <RadioButton id={this.props.input.value}
                name={this.props.input.name}
                value={this.props.input.value}
                onChange={this.props.input.onChange}
                className='task-options-form__header'
                disabled={this.props.disabled}
                label={this.props.label} />
        );
    }
}

export default TaskOptionsRadio;
