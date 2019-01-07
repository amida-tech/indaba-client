import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResetPasswordPanel extends Component {
    render() {
        return (
            <div className='reset-password-panel'>
                <div className='reset-password-panel__title'>
                    {this.props.vocab.PROFILE.PASSWORD.RESET_PASSWORD}
                </div>
                <div className='reset-password-panel__instructions'>
                    {this.props.vocab.PROFILE.PASSWORD.INSTRUCTIONS}
                </div>
                <button className='reset-password-panel__button'
                    onClick={() => this.props.actions.resetPassword(this.props.vocab.ERROR)}>
                    <span>{this.props.vocab.PROFILE.PASSWORD.RESET_PASSWORD}</span>
                </button>
            </div>
        );
    }
}

ResetPasswordPanel.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.shape({
        resetPassword: PropTypes.func.isRequired,
    }),
};

export default ResetPasswordPanel;
