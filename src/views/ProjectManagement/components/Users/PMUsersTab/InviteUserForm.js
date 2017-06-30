import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

class InviteUserForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <Field name='firstName'
                    component='input'
                    type='text'
                    className='pm-users-tab__text-input'
                    placeholder={this.props.vocab.PROJECT.NEW_USER_FIRST_NAME}/>
                <Field name='lastName'
                    component='input'
                    type='text'
                    className='pm-users-tab__text-input'
                    placeholder={this.props.vocab.PROJECT.NEW_USER_LAST_NAME}/>
                <Field name='email'
                    component='input'
                    type='text'
                    className='pm-users-tab__text-input'
                    placeholder={this.props.vocab.PROJECT.NEW_USER_EMAIL}/>
                <button type='submit'>{this.props.vocab.COMMON.INVITE}</button>
                <Field name='search'
                    component='input'
                    type='text'
                    className='pm-users-tab__text-input'
                    placeholder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}/>
            </form>
        );
    }
}

InviteUserForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'invite-user-form' })(InviteUserForm);
