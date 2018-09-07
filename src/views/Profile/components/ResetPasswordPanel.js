import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'grommet/components/Button';

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
                <Button className='reset-password-panel__button'
                    secondary={true} label={this.props.vocab.PROFILE.PASSWORD.RESET_PASSWORD}
                    onClick={() => this.props.actions.resetPassword(this.props.vocab.ERROR)}/>
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
