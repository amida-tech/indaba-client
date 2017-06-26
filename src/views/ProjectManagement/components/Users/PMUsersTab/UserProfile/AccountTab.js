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
                        value={this.props.user.email}
                        onChange={evt => this.props.onEmailChange(evt.target.value)} />
                </label>
                <label className='account-tab__label'>
                    {this.props.vocab.PROJECT.USER_TITLE}
                    ({this.props.vocab.PROJECT.OPTIONAL_MESSAGE})
                    <input type='text'
                        className='account-tab__text-input'
                        value={this.props.user.title}
                        onChange={evt => this.props.onTitleChange(evt.target.value)}/>
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
    onEmailChange: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
};

export default AccountTab;
