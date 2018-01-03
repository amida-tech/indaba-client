import React, { Component } from 'react';
import Select from 'react-select';

class StageSelect extends Component {
    render() {
        return (
            <Select
                className='add-stage-form__select'
                value={this.props.input.value}
                onChange={this.props.input.onChange}
                options={this.props.groups}
                placeholder={this.props.assignGroups}
                clearable={true}
                multi />
        );
    }
}

export default StageSelect;
