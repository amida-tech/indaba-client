import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';
import Time from '../../../utils/Time';

class AccountTab extends Component {
    render() {
        return (
            <div className='account-tab'>
                <label className='account-tab__label'>
                    {this.props.vocab.COMMON.EMAIL}
                    <Field name='email'
                        component='input'
                        type='text'
                        className='account-tab__field'/>
                </label>
                <label className='account-tab__label'>
                    {this.props.vocab.PROJECT.USER_TITLE}
                    ({this.props.vocab.PROJECT.OPTIONAL_MESSAGE})
                    <Field name='title'
                        component='input'
                        type='text'
                        className='account-tab__field'/>
                </label>
                <div className='account-tab__label'>
                    {this.props.vocab.PROJECT.ACCOUNT_SINCE}
                    <div className='account-tab__date'>
                        {
                            this.props.user.lastActive === null
                                ? this.props.vocab.PROJECT.NOT_ACCEPTED
                                : Time.renderCommon(this.props.user.created)
                        }
                    </div>
                    <div className='account-tab__button-wrapper'>
                        {
                            !this.props.user.isActive
                            && <button
                                onClick={this.props.onResendActivation}
                                className='account-tab__button'>
                                {this.props.vocab.PROJECT.RESEND_INVITATION}
                            </button>
                        }
                    </div>
                </div>
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
