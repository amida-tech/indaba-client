import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';

class LoginPanel extends Component {
    render() {
        return (
            <div className='login-panel'>
                <div className='login-panel__title'>
                    {this.props.vocab.COMMON.WELCOME}
                </div>
                <LoginForm
                    vocab={this.props.vocab} />
                <div className='login-panel__link'>
                    {this.props.vocab.COMMON.FORGOT_PASSWORD}
                </div>
                <div className='login-panel__link'>
                    {this.props.vocab.COMMON.NO_ACCOUNT}
                </div>
            </div>
        );
    }
}

LoginPanel.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default LoginPanel;
