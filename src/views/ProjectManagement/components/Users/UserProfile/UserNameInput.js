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
                        onChange={evt => this.props.onFirstNameChanged(evt.target.value)}/>
                </label>
                <label className='user-name-input__label'>
                    {this.props.vocab.COMMON.LAST_NAME}
                    <input type='text'
                        className='user-name-input__text-input'
                        value={this.props.user.lastName}
                        onChange={evt => this.props.onLastNameChanged(evt.target.value)}/>
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
    onFirstNameChanged: PropTypes.func.isRequired,
    onLastNameChanged: PropTypes.func.isRequired,
    vocab: PropTypes.object.isRequired,
};

export default UserNameInput;
