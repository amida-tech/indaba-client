import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';

import { required } from '../../../common/validation';

import ProfileSelect from './ProfileSelect';
import ProfileCheckBox from './ProfileCheckBox';
import ResetPasswordPanel from './ResetPasswordPanel';
import ValidatedTextInput from '../../../common/components/ValidatedTextInput';

class ProfileForm extends Component {
    render() {
        const isProjectManager = ((this.props.profile.roleID === 1)
            || (this.props.profile.roleID === 2));
        const notifyOptions = this.props.vocab.PROFILE.FORM.LEVELS.map((level, index) => ({ value: index, label: level }));
        return (
            <div>
                <form className='profile-form' onSubmit={this.props.handleSubmit}>
                    <div className='profile-form__header'>
                        <div className='profile-form__form-title'>
                            {this.props.vocab.PROFILE.FORM.PROFILE_SETTINGS}
                        </div>
                        <button className='profile-form__button'
                            onClick={this.props.handleSubmit}>
                            <span>{this.props.vocab.PROFILE.FORM.SAVE_SETTINGS}</span>
                        </button>
                    </div>
                    <div className='profile-form__user-info'>
                        <div className='profile-form__section-header'>
                            {this.props.vocab.PROFILE.FORM.PERSONAL_INFO}
                        </div>
                        <div className='profile-form__name-row'>
                            <div className='profile-form__field'>
                                <label className='profile-form__field-label'>
                                    {this.props.vocab.COMMON.FIRST_NAME} </label>
                                <Field name='firstName'
                                    value={this.props.profile.firstName}
                                    component='input'
                                    type='text'
                                    className='profile-form__field-input' />
                            </div>
                            <div className='profile-form__field-spaced'>
                                <label className='profile-form__field-label'>
                                    {this.props.vocab.COMMON.LAST_NAME} </label>
                                <Field name='lastName'
                                    value={this.props.profile.lastName}
                                    component='input'
                                    type='text'
                                    className='profile-form__field-input' />
                            </div>
                        </div>
                        <div className='profile-form__field'>
                            <label className='profile-form__field-label'>
                                {this.props.vocab.COMMON.EMAIL} </label>
                            <Field name='email'
                                value={this.props.profile.email}
                                component='input'
                                disabled={true}
                                type='email'
                                className='profile-form__field-input' />
                        </div>
                    </div>
                    <div className='profile-form__settings'>
                        <div className='profile-form__section-header'>
                            {this.props.vocab.PROFILE.FORM.NOTIFICATION_AND_STATUS}
                        </div>
                        <label className='profile-form__field-label'>
                            {this.props.vocab.PROFILE.FORM.NOTIFY_LEVEL} </label>
                        <Field name='notifyLevel'
                            value={this.props.profile.notifyLevel}
                            component={ProfileSelect}
                            options={notifyOptions}
                            type='select' />
                        {isProjectManager
                            && <label className='profile-form__field-label'>
                                {this.props.vocab.PROFILE.FORM.ACTIVE_STATUS} </label>}
                        {isProjectManager
                            && <Field name='isActive'
                                value={this.props.profile.isActive}
                                component={ProfileCheckBox}
                                type='checkbox' />}
                        <label className='profile-form__field-label'>
                            {this.props.vocab.PROFILE.FORM.NOTES} </label>
                        <Field name='bio'
                            value={this.props.profile.isActive}
                            component='textarea'
                            className='profile-form__textarea' />
                    </div>
                </form>
                {/* <ResetPasswordPanel {...this.props}
                onSubmit={ () =>{
                    console.log(cookie.load('indaba-auth'))
                    // ({ passwordNew }) => this.props.actions.resetPassword(cookie.load('indaba-refresh'), passwordNew)
                    // .then(() => toast(this.props.vocab.RESET_PASSWORD.PASSWORD_RESET_SUCCESS))
                    // .catch(err => toast(err.message, { type: 'error', autoClose: false }))
                }
                }/> */}
            </div>
        );
    }
}

ProfileForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'update-profile-form' })(ProfileForm);
