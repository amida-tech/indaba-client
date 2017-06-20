import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserNameInput extends Component {
    render() {
        return (
            <div className='user-name-input'>
                <input type='text' className='user-name-input__text-input' value={this.props.name}/>
            </div>
        );
    }
}

UserNameInput.propTypes = {
    name: PropTypes.string.isRequired,
    onNameChange: PropTypes.func.isRequired,
};

export default UserNameInput;
