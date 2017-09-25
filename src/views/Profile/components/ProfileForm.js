import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, form, reduxForm } from 'redux-form';
import { Button } from 'grommet';

import ProfileSelect from './ProfileSelect';
import ProfileCheckBox from './ProfileCheckBox';

class ProfileForm extends Component {
    render() {
        const notifyOptions = this.props.vocab.PROFILE.FORM.LEVELS.map((level, index) =>
            ({ value: index, label: level }));
        return (
            <form className='profile-form' onSubmit={this.props.handleSubmit}>
                <div className='profile-form__header'>
                    <div className='profile-form__form-title'>
                        {this.props.vocab.PROFILE.FORM.PROFILE_SETTINGS}
                    </div>
                    <Button className='profile-form__button'
                        primary={true}
                        label={this.props.vocab.PROFILE.FORM.SAVE_SETTINGS}
                        onClick={this.props.handleSubmit}/>
                </div>
                <div className='profile-form__user-info'>
                    <div className='profile-form__section-header'>
                        {this.props.vocab.PROFILE.FORM.PERSONAL_INFO}
                    </div>
                    <div className='profile-form__name-row'>
                        <div className='profile-form__field'>
                            <label> {this.props.vocab.COMMON.FIRST_NAME} </label>
                            <Field name='firstName'
                                value={this.props.profile.firstName}
                                component='input'
                                type='text' />
                        </div>
                        <div className='profile-form__field'>
                            <label> {this.props.vocab.COMMON.LAST_NAME} </label>
                            <Field name='lastName'
                                value={this.props.profile.lastName}
                                component='input'
                                type='text' />
                        </div>
                    </div>
                    <div className='profile-form__field'>
                        <label> {this.props.vocab.COMMON.EMAIL} </label>
                        <Field name='email'
                            value={this.props.profile.email}
                            component='input'
                            disabled={true}
                            type='email' />
                    </div>
                </div>
                <div className='profile-form__settings'>
                    <div className='profile-form__section-header'>
                        {this.props.vocab.PROFILE.FORM.NOTIFICATION_AND_STATUS}
                    </div>
                    <label> {this.props.vocab.PROFILE.FORM.NOTIFY_LEVEL} </label>
                    <Field name='notifyLevel'
                        value={this.props.profile.notifyLevel}
                        component={ProfileSelect}
                        options={notifyOptions}
                        type='select' />
                    <label> {this.props.vocab.PROFILE.FORM.ACTIVE_STATUS} </label>
                    <Field name='isActive'
                        value={this.props.profile.isActive}
                        component={ProfileCheckBox}
                        type='checkbox' />
                    <label> {this.props.vocab.PROFILE.FORM.NOTES} </label>
                    <Field name='bio'
                        value={this.props.profile.isActive}
                        component='textarea' />
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
