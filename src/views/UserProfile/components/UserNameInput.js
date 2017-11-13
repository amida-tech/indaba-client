import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';
import EditableTextInput from '../../../common/components/EditableTextInput';

class UserNameInput extends Component {
    render() {
        return (
            <div className='user-name-input'>
                <label className='user-name-input__label'>
                    {this.props.vocab.COMMON.FIRST_NAME}
                    <Field name='firstName'
                        component={EditableTextInput}/>
                </label>
                <label className='user-name-input__label'>
                    {this.props.vocab.COMMON.LAST_NAME}
                    <Field name='lastName'
                        component={EditableTextInput}/>
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
