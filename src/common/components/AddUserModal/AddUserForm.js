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
                    <Field name='firstName' component='input' type='text'/>
                </label>
                <label className='add-user-form__label'>
                    {this.props.vocab.COMMON.LAST_NAME}
                    <Field name='lastName' component='input' type='text'/>
                </label>
                <label className='add-user-form__label'>
                    {this.props.vocab.COMMON.EMAIL}
                    <Field name='email' component='input' type='text'/>
                </label>
                <label className='add-user-form__label'>
                    {this.props.vocab.PROJECT.TITLE_OPTIONAL}
                    <Field name='title' component='input' type='text'/>
                </label>
            </form>
        );
    }
}

AddUserForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'add-user-form' })(AddUserForm);
