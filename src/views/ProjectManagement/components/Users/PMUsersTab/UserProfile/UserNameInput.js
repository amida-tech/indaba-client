import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';

class UserNameInput extends Component {
    render() {
        return (
            <form className='user-name-input'>
                <label className='user-name-input__label'>
                    {this.props.vocab.COMMON.FIRST_NAME}
                    <Field name='firstName'
                        component='input'
                        type='text'
                        className='user-name-input__text-input'/>
                </label>
                <label className='user-name-input__label'>
                    {this.props.vocab.COMMON.LAST_NAME}
                    <Field name='lastName'
                        component='input'
                        type='text'
                        className='user-name-input__text-input'/>
                </label>
            </form>
        );
    }
}

UserNameInput.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }).isRequired,
    vocab: PropTypes.object.isRequired,
};

export default connect((state, ownProps) => ({
    initialValues: {
        firstName: ownProps.user.firstName,
        lastName: ownProps.user.lastName,
    },
}))(reduxForm({ form: 'user-profile', destroyOnUnmount: false })(UserNameInput));
