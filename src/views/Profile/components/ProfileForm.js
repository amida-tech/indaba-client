import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, form, reduxForm } from 'redux-form';

import ProfileSelect from './ProfileSelect';
import ProfileCheckBox from './ProfileCheckBox';

class ProfileForm extends Component {
    render() {
        const isProjectManager = ((this.props.profile.roleID === 1)
            || (this.props.profile.roleID === 2));
        const notifyOptions = this.props.vocab.PROFILE.FORM.LEVELS.map((level, index) => ({ value: index, label: level }));
        return (
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
                                className='profile-form__field-input'/>
                        </div>
                        <div className='profile-form__field-spaced'>
                            <label className='profile-form__field-label'>
                                {this.props.vocab.COMMON.LAST_NAME} </label>
                            <Field name='lastName'
                                value={this.props.profile.lastName}
                                component='input'
                                type='text'
                                className='profile-form__field-input'/>
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
                            className='profile-form__field-input'/>
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
                        type='checkbox'/>}
                    <label className='profile-form__field-label'>
                        {this.props.vocab.PROFILE.FORM.NOTES} </label>
                    <Field name='bio'
                        value={this.props.profile.isActive}
                        component='textarea'
                        className='profile-form__textarea'/>
                </div>
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
                                className='profile-form__field-input'/>
            <label className='profile-form__field-label'>
                        {this.props.vocab.PROFILE.PASSWORD.NEW_PASSWORD} </label>
                         <Field name='password'
                                component='input'
                                type='text'
                                className='profile-form__field-input'/>
            <label className='profile-form__field-label'>
                    {this.props.vocab.PROFILE.PASSWORD.CONFIRM_PASSWORD} </label>
                        <Field name='password'
                            component='input'
                            type='text'
                            className='profile-form__field-input'/>
             
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
            </form>
        );
    }
}

ProfileForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'update-profile-form' })(ProfileForm);
