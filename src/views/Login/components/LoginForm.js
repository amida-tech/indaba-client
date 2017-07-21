import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, form, reduxForm } from 'redux-form';
import { Button } from 'grommet';

import LoginField from './LoginField';

class LoginForm extends Component {
    render() {
        console.log(this.props);
        return (
            <form className='login-form'>
                <Field name='email'
                    component={LoginField}
                    placeholder={this.props.vocab.COMMON.EMAIL}
                    type='email' />
                <Field name='password'
                    component={LoginField}
                    placeholder={this.props.vocab.COMMON.PASSWORD}
                    type='password' />
                <Button className='login-form__sign-in-button'
                    primary
                    label={this.props.vocab.COMMON.SIGN_IN}
                    onClick={this.props.onClickToSubmit} />
            </form>
        );
    }
}

LoginForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'login-form' })(LoginForm);
