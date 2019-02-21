import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';

import LoginForm from './LoginForm';
import ForgotModal from './ForgotModal';

class LoginPanel extends Component {
    constructor(props) {
        super(props);

        this.handleRemember = this.handleRemember.bind(this);
        this.handlePasswordForgot = this.handlePasswordForgot.bind(this);
    }

    handleRemember(evt) {
        if (evt.target.checked) {
            cookie.save('indaba-refresh', true, { path: '/' });
        } else {
            cookie.remove('indaba-refresh', { path: '/' });
        }
    }

    handlePasswordForgot() {
        if (this.props.ui.username === '') {
            this.props.actions.loginUIMessage(this.props.vocab.RESET_PASSWORD.EMAIL_REQUIRED);
        } else {
            this.props.actions.showForgotPasswordModal(true);
        }
    }

    render() {
        return (
            <div className='login-panel'>
                {
                    this.props.ui.showForgotPassword
                    && <ForgotModal {...this.props}
                        email={this.props.ui.username}/>
                }
                <div className='login-panel__title'>
                    {this.props.vocab.COMMON.WELCOME}
                </div>
                <LoginForm
                    vocab={this.props.vocab}
                    ui={this.props.ui}
                    realm={this.props.realm}
                    actions={this.props.actions} />
                {(this.props.ui.error || this.props.ui.timeout)
                    && <div className='login-panel__error-message'>
                        {this.props.ui.timeout
                            ? this.props.vocab.COMMON.TIMEOUT : this.props.ui.error}
                    </div>
                }
                <div className='login-panel__remember-me'>
                    <input type='checkbox'
                        className='login-panel__remember-checkbox'
                        onClick={this.handleRemember} />
                    <span className='login-panel__remember-text'>
                        {this.props.vocab.COMMON.STAY_LOGGED_IN}
                    </span>
                </div>
                <div className='login-panel__link'
                    onClick={this.handlePasswordForgot} >
                    {this.props.vocab.COMMON.FORGOT_PASSWORD}
                </div>
            </div>
        );
    }
}

LoginPanel.propTypes = {
    vocab: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    realm: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    loginEmail: PropTypes.string,
};

export default LoginPanel;
