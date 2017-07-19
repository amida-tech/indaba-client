import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, form, reduxForm } from 'redux-form';
import { Button } from 'grommet';

class LoginForm extends Component {
    render() {
        return (
            <form className='login-form'>
                <div className='login-form__field'>
                    <Field name='email'
                        component={email =>
                            <div className='login-form__field'>
                                <input type='email'
                                    className='login-form__input'
                                    {...email}
                                    placeholder={this.props.vocab.COMMON.EMAIL} />
                                    {email.touched && email.error
                                        && <span>{email.error}</span>}
                            </div>
                        }/>
                </div>
                <div className='login-form__field'>
                    <Field name='password'
                        component={password =>
                            <div className='login-form__field'>
                                <input type='password'
                                    className='login-form__input'
                                    {...password}
                                    placeholder={this.props.vocab.COMMON.PASSWORD} />
                                    {password.touched && password.error
                                        && <span>{password.error}</span>}
                            </div>
                        }/>
                </div>
                <Button className='login-form__sign-in-button'
                    primary
                    label={this.props.vocab.COMMON.SIGN_IN} />
            </form>
        );
    }
}

LoginForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'login-form' })(LoginForm);
