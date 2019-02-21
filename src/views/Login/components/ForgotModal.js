import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Modal from '../../../common/components/Modal';

class ForgotModal extends Component {
    constructor(props) {
        super(props);

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleCancel() {
        this.props.actions.showForgotPasswordModal(false);
    }

    handleSave() {
        this.props.actions.requestResetToken(
            this.props.email,
        ).then(() => {
            toast(this.props.vocab.MODAL.FORGOT_PASSWORD.EMAIL_SENT);
            this.props.actions.showForgotPasswordModal(false);
        })
    }

    render() {
        return (
            <Modal title={this.props.vocab.MODAL.FORGOT_PASSWORD.TITLE}
                bodyText={`${this.props.vocab.MODAL.FORGOT_PASSWORD.BODY} ${this.props.email}`}
                saveLabel={this.props.vocab.MODAL.FORGOT_PASSWORD.BUTTON_LABEL}
                onCancel={this.handleCancel}
                onSave={this.handleSave} />
        );
    }
}

ForgotModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
};

export default ForgotModal;
