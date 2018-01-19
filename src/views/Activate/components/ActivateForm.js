import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

class ActivateForm extends Component {
    render() {
        return (
            <form className='activate-form'
                onSubmit={this.props.handleSubmit}>
                <label className='activate-form__label'>
                    {this.props.vocab.COMMON.FIRST_NAME}
                    <Field component='input'
                        type='text'
                        name='firstName'
                        className='activate-form__field'/>
                </label>
                <label className='activate-form__label'>
                    {this.props.vocab.COMMON.LAST_NAME}
                    <Field component='input'
                        type='text'
                        name='lastName'
                        className='activate-form__field'/>
                </label>
                <label className='activate-form__label'>
                    {this.props.vocab.COMMON.PASSWORD}
                    <Field component='input'
                        type='password'
                        name='password'
                        className='activate-form__field'/>
                </label>
                <button type='submit'
                    className='activate-form__submit'>
                    {this.props.vocab.USER.ACTIVATE}
                </button>
            </form>
        );
    }
}

ActivateForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'activate-form' })(ActivateForm);
