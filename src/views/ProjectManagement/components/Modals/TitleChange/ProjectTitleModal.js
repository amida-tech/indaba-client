import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../common/components/Modal';
import TitleForm from './TitleForm';


class ProjectTitleModal extends Component {
    render() {
        return (
            <Modal title={this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE}
                onCancel={this.props.onCloseModal}
                form='project-title'>
                <TitleForm form='project-title'
                    label={this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE_INPUT_LABEL}
                    onSubmit={({ title }) => {
                        this.props.actions.putProject({
                            id: this.props.projectId,
                            name: title,
                        });
                        this.props.onCloseModal();
                    }}/>
            </Modal>
        );
    }
}

ProjectTitleModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired,
    onCloseModal: PropTypes.number.isRequired,
};

export default ProjectTitleModal;
