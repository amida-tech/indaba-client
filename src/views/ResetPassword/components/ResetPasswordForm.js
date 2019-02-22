import React, { Component } from 'react';

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            confirmPassword: '',
            passwordFlag: false,
            confirmPasswordFlag: false,
        };

        this.handlePassword = this.handlePassword.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePassword(evt) {
        if (evt.target.name === 'password') {
            this.setState({ password: evt.target.value });
        } else {
            this.setState({ confirmPassword: evt.target.value });
        }
    }

    handleValidate(evt) {
        if (!evt) { // User hit enter. Check everything because evt is synth.
            const passwordMismatch = this.state.password !== this.state.confirmPassword;
            const passwordFlag = this.state.password === '';
            const confirmPasswordFlag = this.state.confirmPassword === '';
            this.setState({
                passwordFlag,
                confirmPasswordFlag,
            });
            if (passwordMismatch) {
                this.props.actions.resetPasswordUIMessage(
                    this.props.vocab.RESET_PASSWORD.PASSWORD_MATCH,
                    true,
                );
            }
            return passwordFlag || confirmPasswordFlag || passwordMismatch;
        }
        if (evt.target.name === 'password') {
            this.setState({ passwordFlag: evt.target.value === '' });
        } else {
            this.setState({ confirmPasswordFlag: evt.target.value === '' });
        }
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (this.handleValidate()) {
            return;
        }
        this.props.onSubmit(this.state.password);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}
                className='reset-password-form'>
                <div className='reset-password-form__instructions'>
                    {this.props.vocab.RESET_PASSWORD.INSTRUCTIONS}
                </div>
                <input className={`reset-password-form__input ${this.state.passwordFlag
                    ? 'reset-password-form__input--flag' : ''}`}
                name='password'
                placeholder={this.state.passwordFlag
                    ? this.props.vocab.RESET_PASSWORD.NEW_PASSWORD_REQUIRED
                    : this.props.vocab.RESET_PASSWORD.NEW_PASSWORD}
                onBlur={this.handleValidate}
                onChange={this.handlePassword}/>
                <input className={`reset-password-form__input ${this.state.confirmPasswordFlag
                    ? 'reset-password-form__input--flag' : ''}`}
                name='confirmPassword'
                placeholder={this.state.confirmPasswordFlag
                    ? this.props.vocab.RESET_PASSWORD.CONFIRM_PASSWORD_REQUIRED
                    : this.props.vocab.RESET_PASSWORD.CONFIRM_PASSWORD}
                onBlur={this.handleValidate}
                onChange={this.handlePassword}/>
                <button className='reset-password-form__button'
                    type='submit'>
                    {this.props.vocab.RESET_PASSWORD.LINK}
                </button>
            </form>
        );
    }
}

export default ResetPasswordForm;
