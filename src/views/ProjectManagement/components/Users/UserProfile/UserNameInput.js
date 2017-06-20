import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserNameInput extends Component {
    render() {
        return (
            <div className='user-name-input'>
                <label className='user-name-input__label'>
                    {this.props.vocab.COMMON.FIRST_NAME}
                    <input type='text'
                        className='user-name-input__text-input'
                        value={this.props.user.firstName}/>
                </label>
                <label className='user-name-input__label'>
                    {this.props.vocab.COMMON.LAST_NAME}
                    <input type='text'
                        className='user-name-input__text-input'
                        value={this.props.user.lastName}/>
                </label>
            </div>
        );
    }
}

UserNameInput.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }).isRequired,
    onNameChange: PropTypes.func.isRequired,
    vocab: PropTypes.object.isRequired,
};

export default UserNameInput;
