import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, form, reduxForm } from 'redux-form';
import { required } from '../../../common/validation';
import ValidatedTextInput from '../../../common/components/ValidatedTextInput';

class ResetPasswordPanel extends Component {
    render() {
        return (
            <div className='profile-form__password'>
                <form>
                    <div className='profile-form__section-header'>
                        {this.props.vocab.PROFILE.PASSWORD.CHANGE_PASSWORD}
                    </div>
                    <div className='profile-form__password-instruction'>
                        {this.props.vocab.PROFILE.PASSWORD.INSTRUCTIONS}
                    </div>
                    <label className='profile-form__field-label'>
                        {this.props.vocab.PROFILE.PASSWORD.CURRENT_PASSWORD} </label>
                    <Field component={ValidatedTextInput}
                        className='profile-form__field-input'
                        password={true}
                        name='oldPassword'
                        placeholder={this.props.vocab.PROFILE.PASSWORD.CURRENT_PASSWORD}
                        vocab={this.props.vocab.VALIDATE}
                        validate={[required]}
                    />
                    <label className='profile-form__field-label'>
                        {this.props.vocab.PROFILE.PASSWORD.NEW_PASSWORD} </label>
                    <Field component={ValidatedTextInput}
                        className='profile-form__field-input'
                        password={true}
                        name='password'
                        placeholder={this.props.vocab.PROFILE.PASSWORD.NEW_PASSWORD}
                        vocab={this.props.vocab.VALIDATE}
                        validate={[required]}
                    />
                    <label className='profile-form__field-label'>
                        {this.props.vocab.PROFILE.PASSWORD.CONFIRM_PASSWORD} </label>
                    <Field component={ValidatedTextInput}
                        className='profile-form__field-input'
                        password={true}
                        name='passwordConfirm'
                        placeholder={this.props.vocab.PROFILE.PASSWORD.CONFIRM_PASSWORD}
                        vocab={this.props.vocab.VALIDATE}
                        validate={[required]}
                    />
                    <button className='profile-form__button-pw'
                        type='button'
                        onClick={this.props.handleSubmit}>
                        {this.props.vocab.PROFILE.PASSWORD.CHANGE_PASSWORD}
                    </button>
                    <span className={`profile-form__ui-message ${this.props.ui.isError
                        ? 'profile-form__ui-message--error' : ''}`}>
                        {this.props.ui.message}
                    </span>
                </form>
            </div>
        );
    }
}

ResetPasswordPanel.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'reset-password-panel' })(ResetPasswordPanel);
