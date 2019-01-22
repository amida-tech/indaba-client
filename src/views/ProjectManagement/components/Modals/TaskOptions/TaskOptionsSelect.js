import React, { Component } from 'react';
import Select from 'react-select';

class TaskOptionsSelect extends Component {
    render() {
        console.log(this.props);
        return (
            <Select
                value={this.props.input.value.option || this.props.input.value}
                onChange={this.props.input.onChange}
                className='task-options-form__header-text-box'
                options={this.props.userOptions}
                disabled={this.props.disabled}
                clearable={false}
            />
        );
    }
}

export default TaskOptionsSelect;
