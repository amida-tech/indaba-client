import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';

class AccountTab extends Component {
    render() {
        return (
            <div className='account-tab'>
                <label className='account-tab__label'>
                    {this.props.vocab.COMMON.EMAIL}
                    <Field name='email'
                        component='input'
                        type='text'
                        className='account-tab__label--text-input'/>
                </label>
                <label className='account-tab__label'>
                    {this.props.vocab.PROJECT.USER_TITLE}
                    ({this.props.vocab.PROJECT.OPTIONAL_MESSAGE})
                    <Field name='title'
                        component='input'
                        type='text'
                        className='account-tab__label--text-input'/>
                </label>
                <label className='account-tab__label'>
                    {this.props.vocab.PROJECT.ACCOUNT_SINCE}

                    {this.props.user.activationDate ||
                        this.props.vocab.PROJECT.NOT_ACCEPTED}
                    {!this.props.user.activationDate &&

                        <button
                            onClick={this.props.onResendActivation}
                            className='account-tab__button'>
                            {this.props.vocab.PROJECT.RESEND_INVITATION}
                        </button>
                    }
                </label>
            </div>
        );
    }
}

AccountTab.propTypes = {
    vocab: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    onResendActivation: PropTypes.func.isRequired,
};

export default AccountTab;
