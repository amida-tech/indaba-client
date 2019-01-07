import React, { Component } from 'react';
import Select from 'react-select';

class TaskOptionsSelect extends Component {
    render() {
        return (
            <Select
                value={this.props.input.value.option || this.props.input.value}
                onChange={(event) => { this.props.input.onChange(event.value); }}
                className='task-options-form__header-text-box'
                options={this.props.userOptions}
                disabled={this.props.disabled}
            />
        );
    }
}

export default TaskOptionsSelect;
