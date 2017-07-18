import React, { Component } from 'react';
import Select from 'react-select';

class AddStageSelect extends Component {
    render() {
        return (
            <Select
                {...this.props.input}
                options={this.props.groups}
                clearable={true}
                multi />
        );
    }
}

export default AddStageSelect;
