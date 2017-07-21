import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginField extends Component {
    render() {
        return (
                <div className='login-form__field'>
                    <input className='login-form__input'
                        {...this.props.input}
                        type={this.props.type}
                        placeholder={this.props.placeholder} />
                        {this.props.input.touched && this.props.input.error
                            && <span>{this.props.input.error}</span>}
                </div>
        );
    }
}

LoginField.propTypes = {
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default LoginField;
