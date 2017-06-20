import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AccountTab extends Component {
    render() {
        return (
            <div className='account-tab'>
                <label className='account-tab__label'>
                    {this.props.vocab.COMMON.EMAIL}
                    <input type='text'
                        className='account-tab__text-input'
                        value={this.props.user.email}/>
                </label>
                <label className='account-tab__label'>
                    {this.props.vocab.PROJECT.USER_TITLE}
                    ({this.props.vocab.PROJECT.OPTIONAL_MESSAGE})
                    <input type='text'
                        className='account-tab__text-input'
                        value={this.props.user.title}/>
                </label>
                <label className='account-tab__label'>
                    {this.props.vocab.PROJECT.ACCOUNT_SINCE}

                    {this.props.user.activationDate ||
                        this.props.vocab.PROJECT.NOT_ACCEPTED}
                    {!this.props.user.activationDate &&
                        <button
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
};

export default AccountTab;
