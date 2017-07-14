import React, { Component } from 'react';
import Select from 'grommet/components/Select';

class TaskOptionsSelect extends Component {
    render() {
        return (
            <Select
                value={this.props.input.value.option || this.props.input.value}
                onChange={(event) => { this.props.input.onChange(event.value); }}
                className='task-options-form__header-text-box'
                options={this.props.userOptions} />
        );
    }
}

export default TaskOptionsSelect;
