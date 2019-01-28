import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, form, reduxForm } from 'redux-form';

class ResetPasswordPanel extends Component {
    render() {
        return (
            // <div className='reset-password-panel'>
            //     <div className='reset-password-panel__title'>
            //         {this.props.vocab.PROFILE.PASSWORD.RESET_PASSWORD}
            //     </div>
            //     <div className='reset-password-panel__instructions'>
            //         {this.props.vocab.PROFILE.PASSWORD.INSTRUCTIONS}
            //     </div>
            //     <button className='reset-password-panel__button'
            //         onClick={() => this.props.actions.resetPassword(this.props.vocab.ERROR)}>
            //         <span>{this.props.vocab.PROFILE.PASSWORD.RESET_PASSWORD}</span>
            //     </button>
            // </div>

            <div className="profile-form__password">
                <div className='profile-form__section-header'>
                    {this.props.vocab.PROFILE.PASSWORD.CHANGE_PASSWORD}
                </div>
                <div className='profile-form__password-instruction'>
                    {this.props.vocab.PROFILE.PASSWORD.INSTRUCTIONS}
                </div>
                <label className='profile-form__field-label'>
                    {this.props.vocab.PROFILE.PASSWORD.CURRENT_PASSWORD} </label>
                <Field name='password'
                    component='input'
                    type='text'
                    className='profile-form__field-input--disabled' 
                    />
                <label className='profile-form__field-label'>
                    {this.props.vocab.PROFILE.PASSWORD.NEW_PASSWORD} </label>
                <Field name='new_password'
                    component='input'
                    type='text'
                    className='profile-form__field-input' />
                <label className='profile-form__field-label'>
                    {this.props.vocab.PROFILE.PASSWORD.CONFIRM_PASSWORD} </label>
                <Field name='confirm_password'
                    component='input'
                    type='text'
                    className='profile-form__field-input' />

                <div className='profile-form__confirm'>
                    <button className='profile-form__button-pw'
                        onClick={this.props.handleSubmit}>
                        <span>{this.props.vocab.PROFILE.PASSWORD.CHANGE_PASSWORD}</span>
                    </button>
                    <label className='profile-form__confirm-label'>
                        {this.props.vocab.PROFILE.PASSWORD.PASSWORD_SUCCESS}
                    </label>
                </div>
            </div>
        );
    }
}

ResetPasswordPanel.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.shape({
        resetPassword: PropTypes.func.isRequired,
    }),
};

export default ResetPasswordPanel;
