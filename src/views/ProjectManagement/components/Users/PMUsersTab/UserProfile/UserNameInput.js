import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';

class UserNameInput extends Component {
    render() {
        return (
            <div className='user-name-input'>
                <label className='user-name-input__label'>
                    {this.props.vocab.COMMON.FIRST_NAME}
                    <Field name='firstName'
                        component='input'
                        type='text'
                        className='user-name-input__text-input'/>
                </label>
                <label className='user-name-input__label'>
                    {this.props.vocab.COMMON.LAST_NAME}
                    <Field name='lastName'
                        component='input'
                        type='text'
                        className='user-name-input__text-input'/>
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
    vocab: PropTypes.object.isRequired,
};

export default UserNameInput;
