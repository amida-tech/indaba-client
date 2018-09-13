import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { toast } from 'react-toastify';

import LoginForm from './LoginForm';
import ForgotModal from './ForgotModal';

class LoginPanel extends Component {
    render() {
        return (
            <div className='login-panel'>
                {
                    this.props.ui.showForgotPasswordFor
                    && <ForgotModal {...this.props}
                        email={this.props.currentEmail}/>
                }
                <div className='login-panel__title'>
                    {this.props.vocab.COMMON.WELCOME}
                </div>
                <LoginForm
                    {...this.props}
                    onSubmit={(values) => {
                        this.props.actions.login(
                            values.username,
                            values.password,
                            this.props.realm,
                            this.props.ui.timeoutRef,
                            this.props.vocab.ERROR,
                        );
                    }}/>
                {(this.props.ui.error || this.props.ui.timeout)
                    && <div className='login-panel__error-message'>
                        {this.props.ui.timeout
                            ? this.props.vocab.COMMON.TIMEOUT : this.props.ui.error}
                    </div>
                }
                <div className='login-panel__remember-me'>
                    <input type='checkbox'
                        className='login-panel__remember-checkbox'
                        onClick={(event) => {
                            if (event.target.checked) {
                                cookie.save('indaba-refresh', true, { path: '/' });
                            } else {
                                cookie.remove('indaba-refresh', { path: '/' });
                            }
                        }} />
                    <span className='login-panel__remember-text'>
                        {this.props.vocab.COMMON.STAY_LOGGED_IN}
                    </span>
                </div>
                <div className='login-panel__link'
                    onClick={() => (
                        this.props.currentEmail
                            ? this.props.actions.showForgotPasswordFor(this.props.currentEmail)
                            : toast(this.props.vocab.RESET_PASSWORD.EMAIL_REQUIRED)
                    )} >
                    {this.props.vocab.COMMON.FORGOT_PASSWORD}
                </div>
            </div>
        );
    }
}

LoginPanel.propTypes = {
    vocab: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    currentEmail: PropTypes.string,
};

export default LoginPanel;
