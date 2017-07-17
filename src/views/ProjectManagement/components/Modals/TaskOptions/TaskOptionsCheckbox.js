import React, { Component } from 'react';
import CheckBox from 'grommet/components/CheckBox';

class TaskOptionsCheckbox extends Component {
    render() {
        return (
            <CheckBox
                checked={!!this.props.input.value}
                onChange={this.props.input.onChange}
                className='task-options-form__header'
                label={this.props.label} />
        );
    }
}

export default TaskOptionsCheckbox;
