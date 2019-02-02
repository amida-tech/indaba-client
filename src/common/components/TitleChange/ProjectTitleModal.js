import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import TitleForm from './TitleForm';

class ProjectTitleModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectFlag: false,
            uiMessage: '',
            codeName: this.props.project.name || '',
        };

        this.handleProjectTitle = this.handleProjectTitle.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    handleProjectTitle(evt) {
        this.setState({ codeName: evt.target.value });
    }

    handleValidate(evt) {
        if (this.state.codeName === '') {
            this.setState({
                projectFlag: true,
                uiMessage: this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE_REQUIRED,
            });
        } else {
            this.setState({
                projectFlag: false,
                uiMessage: '',
            });
        }
    }

    handleSubmission() {
        if (this.state.codeName === '') {
            return;
        }
        if (this.props.allProjects.find((project) =>
            project.name === this.state.codeName.trim())) {
                this.setState({
                    projectFlag: true,
                    uiMessage: this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE_USED,
                });
        } else {
            this.props.actions.putProject({
                id: this.props.project.id,
                name: this.state.codeName.trim(),
            });
            this.props.onCloseModal();
        }
    }

    render() {
        return (
            <Modal title={this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE}
                onCancel={this.props.onCloseModal}
                form='project-title'>
                <TitleForm
                    label={this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE_INPUT_LABEL_}
                    titleFlag={this.state.projectFlag}
                    placeholder={this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE}
                    uiMessage={this.state.uiMessage}
                    value={this.state.codeName}
                    handleTitle={this.handleSurveyTitle}
                    handleValidate={this.handleValidate} />
            </Modal>
        );
    }
}

ProjectTitleModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    allProjects: PropTypes.array.isRequired,
    onCloseModal: PropTypes.func.isRequired,
};

export default ProjectTitleModal;
