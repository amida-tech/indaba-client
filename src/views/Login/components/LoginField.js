import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class LoginForm extends Component {
    render() {
        return (
            <input
                className='login-form__input'
                {...this.props} />
        );
    }
}

export default LoginForm;
