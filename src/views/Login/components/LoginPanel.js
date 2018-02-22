import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import LoginForm from './LoginForm';
import ForgotModal from './ForgotModal';

class LoginPanel extends Component {
    render() {
        return (
            <div className='login-panel'>
                {
                    this.props.ui.showForgotPasswordFor &&
                    <ForgotModal {...this.props}
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
                            this.props.vocab.ERROR);
                    }}/>
                {(this.props.ui.error || this.props.ui.timeout) &&
                    <div className='login-panel__error-message'>
                        {this.props.ui.timeout ?
                            this.props.vocab.COMMON.TIMEOUT : this.props.ui.error}
                    </div>
                }
                <div className='login-panel__link'
                    onClick={() => (
                        this.props.currentEmail ?
                        this.props.actions.showForgotPasswordFor(this.props.currentEmail) :
                        toast(this.props.vocab.RESET_PASSWORD.EMAIL_REQUIRED)
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
