import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../common/components/Modal';

class ForgotModal extends Component {
    render() {
        return (
            <Modal title={this.props.vocab.MODAL.FORGOT_PASSWORD.TITLE}
                bodyText={this.props.vocab.MODAL.FORGOT_PASSWORD.BODY}
                saveLabel={this.props.vocab.MODAL.FORGOT_PASSWORD.BUTTON_LABEL}
                onCancel={() => this.props.actions.showForgotPasswordFor(null)}
                onSave={() => this.props.actions.requestResetToken(
                    this.props.email,
                )} />
        );
    }
}

ForgotModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
};

export default ForgotModal;
