import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, form, reduxForm } from 'redux-form';
import { Button } from 'grommet';

import LoginField from './LoginField';

class LoginForm extends Component {
    render() {
        return (
            <form className='login-form' onSubmit={this.props.handleSubmit}>
                <Field name='username'
                    component={LoginField}
                    placeholder={this.props.vocab.COMMON.USERNAME_OR_EMAIL}
                    type='text' />
                <Field name='password'
                    component={LoginField}
                    placeholder={this.props.vocab.COMMON.PASSWORD}
                    type='password' />
                <Button className='login-form__sign-in-button'
                    type='submit'
                    primary
                    label={this.props.vocab.COMMON.SIGN_IN}
                    onClick={this.props.handleSubmit} />
            </form>
        );
    }
}

LoginForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'login-form' })(LoginForm);
