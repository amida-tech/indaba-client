import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import apiService from '../../../services/api';
import { required } from '../../../common/validation';
import ValidatedTextInput from '../../../common/components/ValidatedTextInput';

class ResetPasswordForm extends Component {
    render() {
        return (
            <form className='reset-password-form'>
                <div className='reset-password-form__instructions'>
                    {this.props.vocab.RESET_PASSWORD.INSTRUCTIONS}
                </div>
                <div className='reset-password-form__password'>
                    <Field component={ValidatedTextInput}
                        password={true}
                        name='password'
                        validate={required(this.props.vocab)}/>
                </div>
                <div className='reset-password-form__button'
                    onClick={apiService.auth.resetPassword}>
                    {this.props.vocab.RESET_PASSWORD.LINK}
                </div>
            </form>
        );
    }
}

export default reduxForm({ form: 'reset-password-form' })(ResetPasswordForm);
