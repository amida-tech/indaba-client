import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';

class AddUserForm extends Component {
    render() {
        return (
            <form className='add-user-form'
                onSubmit={this.props.handleSubmit}>
                <label className='add-user-form__label'>
                    {this.props.vocab.COMMON.FIRST_NAME}
                    <Field className='add-user-form__label--input' name='firstName' component='input' type='text'/>
                </label>
                <label className='add-user-form__label'>
                    {this.props.vocab.COMMON.LAST_NAME}
                    <Field className='add-user-form__label--input' name='lastName' component='input' type='text'/>
                </label>
                <label className='add-user-form__label'>
                    {this.props.vocab.COMMON.EMAIL}
                    <Field className='add-user-form__label--input' name='email' component='input' type='text'/>
                </label>
                <label className='add-user-form__label'>
                    {this.props.vocab.PROJECT.TITLE_OPTIONAL}
                    <Field className='add-user-form__label--input' name='title' component='input' type='text'/>
                </label>
            </form>
        );
    }
}

AddUserForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'add-user-form' })(AddUserForm);
