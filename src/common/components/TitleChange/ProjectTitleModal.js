import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import TitleForm from './TitleForm';

class ProjectTitleModal extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit({ title }) {
        this.props.actions.putProject({
            id: this.props.project.id,
            name: title,
        });
        this.props.onCloseModal();
    }

    render() {
        return (
            <Modal title={this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE}
                onCancel={this.props.onCloseModal}
                form='project-title'>
                <TitleForm form='project-title'
                    label={this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE_INPUT_LABEL}
                    initialValues={{ title: this.props.project.name }}
                    onSubmit={this.handleSubmit}/>
            </Modal>
        );
    }
}

ProjectTitleModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    onCloseModal: PropTypes.func.isRequired,
};

export default ProjectTitleModal;
