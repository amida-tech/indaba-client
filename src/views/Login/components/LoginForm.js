import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameFlag: false,
            passwordFlag: false,
            password: '',
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsername(evt) {
        this.props.actions.updateLoginUsername(evt.target.value);
    }

    handlePassword(evt) {
        this.setState({ password: evt.target.value });
    }

    handleValidate(evt) {
        if (!evt) { // User hit enter. Check everything because evt is synth.
            const usernameFlag = this.props.ui.username === '';
            const passwordFlag = this.state.password === '';
            this.setState({
                usernameFlag,
                passwordFlag,
            });
            return usernameFlag || passwordFlag;
        }
        if (evt.target.name === 'username') {
            this.setState({ usernameFlag: this.props.ui.username === '' });
        } else {
            this.setState({ passwordFlag: evt.target.value === '' });
        }
    }

    handleSubmit(evt) { // Blank checks because initial state is empty.
        evt.preventDefault();
        if (this.handleValidate()) {
            return;
        }
        this.props.actions.login(
            this.props.ui.username,
            this.state.password,
            this.props.realm,
            this.props.ui.timeoutRef,
            this.props.vocab.ERROR,
        );
    }

    render() {
        return ( //login-form__field
            <form className='login-form' onSubmit={this.handleSubmit}>
                <input className={`login-form__input ${this.state.usernameFlag
                    ? 'login-form__input--flag' : ''}`}
                    name='username'
                    type='text'
                    value={this.props.ui.username}
                    placeholder={this.state.usernameFlag ?
                        this.props.vocab.COMMON.USERNAME_REQUIRED :
                        this.props.vocab.COMMON.USERNAME_OR_EMAIL}
                    onChange={this.handleUsername}
                    onBlur={this.handleValidate} />
                <input className={`login-form__input ${this.state.passwordFlag
                    ? 'login-form__input--flag' : ''}`}
                    name='password'
                    type='password'
                    value={this.state.password}
                    placeholder={this.state.passwordFlag ?
                        this.props.vocab.COMMON.PASSWORD_REQUIRED :
                        this.props.vocab.COMMON.PASSWORD}
                    onChange={this.handlePassword}
                    onBlur={this.handleValidate} />
                <button className='login-form__signin-button'
                    onClick={this.handleSubmit}
                    type='submit'>
                    <span>{this.props.vocab.COMMON.SIGN_IN}</span>
                </button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    realm: PropTypes.string.isRequired,
    ui: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

export default LoginForm;
