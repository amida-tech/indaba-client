import React, { Component } from 'react';
import { Select } from 'grommet';

class ProfileSelect extends Component {
    render() {
        let value;
        if (!this.props.input.value) {
            value = this.props.options[this.props.options.length - 1];
        } else {
            value = typeof this.props.input.value === 'number' ?
                this.props.options[this.props.input.value] :
                this.props.input.value;
        }

        return (
            <Select
                value={value}
                onChange={(event) => { this.props.input.onChange(event.value); }}
                className='update-profile-form__select-box'
                options={this.props.options} />
        );
    }
}

export default ProfileSelect;
