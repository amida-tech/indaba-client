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
                        value={this.props.user.firstName}
                        onChange={evt => this.props.onFirstNameChange(evt.target.value)}/>
                </label>
                <label className='user-name-input__label'>
                    {this.props.vocab.COMMON.LAST_NAME}
                    <input type='text'
                        className='user-name-input__text-input'
                        value={this.props.user.lastName}
                        onChange={evt => this.props.onLastNameChange(evt.target.value)}/>
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
    onFirstNameChange: PropTypes.func.isRequired,
    onLastNameChange: PropTypes.func.isRequired,
    vocab: PropTypes.object.isRequired,
};

export default UserNameInput;
