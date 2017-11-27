import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../../common/components/Modal';

class SubjectDeleteConfirmModal extends Component {
    render() {
        return (
            <Modal title={this.props.vocab.MODAL.SUBJECT_DELETE_CONFIRM.TITLE}
                onCancel={this.props.onCancel}
                onSave={this.props.onSave}
                vocab={this.props.vocab}>
                <div className='subject-delete-confirm-modal'>
                    {this.props.vocab.MODAL.SUBJECT_DELETE_CONFIRM.CONTENT}
                </div>
            </Modal>
        );
    }
}

SubjectDeleteConfirmModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default SubjectDeleteConfirmModal;
