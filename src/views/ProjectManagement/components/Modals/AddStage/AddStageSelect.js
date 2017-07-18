import React, { Component } from 'react';
import Select from 'react-select';

class AddStageSelect extends Component {
    render() {
        return (
            <Select
                name=''
                value={this.props.userGroups}
                options={this.props.grouos}
                clearable={true}
                multi
                onChange={event => this.props.input.onChange(event.value)} />
        );
    }
}

export default AddStageSelect;
