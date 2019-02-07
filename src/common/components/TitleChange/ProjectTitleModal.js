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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleProjectTitle(evt) {
        this.setState({ codeName: evt.target.value });
    }

    handleValidate() {
        if (this.state.codeName === '') {
            this.setState({
                projectFlag: true,
                uiMessage: this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE_REQUIRED,
            });
            return true;
        } else if (this.props.allProjects.some((project) =>
            project.name.toLowerCase() === this.state.codeName.trim().toLowerCase())) {
            this.setState({
                projectFlag: true,
                uiMessage: this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE_USED,
            });
            return true;
        }
        this.setState({
            projectFlag: false,
            uiMessage: '',
        });
        return false;
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (this.handleValidate()) {
            return;
        }
        this.props.actions.putProject({
            id: this.props.project.id,
            name: this.state.codeName.trim(),
        });
        this.props.onCloseModal();
    }

    render() {
        return (
            <Modal title={this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE}
                onCancel={this.props.onCloseModal}
                onSave={this.handleSubmit}>
                <TitleForm
                    label={this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE_INPUT_LABEL_}
                    titleFlag={this.state.projectFlag}
                    placeholder={this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE}
                    uiMessage={this.state.uiMessage}
                    value={this.state.codeName}
                    handleTitle={this.handleProjectTitle}
                    handleValidate={this.handleValidate}
                    handleSubmit={this.handleSubmit} />
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
