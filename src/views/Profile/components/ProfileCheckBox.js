import React, { Component } from 'react';
import CheckBox from 'grommet/components/CheckBox';

class ProfileCheckBox extends Component {
    render() {
        return (
            <CheckBox
                checked={this.props.input.value}
                onChange={this.props.input.onChange}
                disabled={true}
                className='update-profile-form__checkbox' />
        );
    }
}

export default ProfileCheckBox;
