import React, { Component } from 'react';
import Select from 'react-select';

class AddStageSelect extends Component {
    render() {
        return (
            <Select // Using a spread operator doesn't play well.
                value={this.props.input.value}
                onChange={this.props.input.onChange}
                options={this.props.groups}
                placeholder={this.props.assignGroups}
                clearable={true}
                multi />
        );
    }
}

export default AddStageSelect;
