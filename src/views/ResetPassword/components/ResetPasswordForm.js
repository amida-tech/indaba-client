import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import { required } from '../../../common/validation';
import ValidatedTextInput from '../../../common/components/ValidatedTextInput';

class ResetPasswordForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}
                className='reset-password-form'>
                <div className='reset-password-form__instructions'>
                    {this.props.vocab.RESET_PASSWORD.INSTRUCTIONS}
                </div>
                <Field component={ValidatedTextInput}
                    className='reset-password-form__password'
                    password={true}
                    name='password'
                    placeholder={this.props.vocab.RESET_PASSWORD.NEW_PASSWORD}
                    vocab={this.props.vocab.VALIDATE}
                    validate={[required]}/>
                <button className='reset-password-form__button'
                    type='submit'>
                    {this.props.vocab.RESET_PASSWORD.LINK}
                </button>
            </form>
        );
    }
}

export default reduxForm({ form: 'reset-password-form' })(ResetPasswordForm);
