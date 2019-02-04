import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../common/components/Modal';
import NewProjectTitleForm from './NewProjectTitleForm';

class NewProjectTitle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectFlag: false,
            surveyFlag : false,
            uiMessage: '',
            codeName: '',
            name: '',
        };

        this.handleProjectTitle = this.handleProjectTitle.bind(this);
        this.handleSurveyTitle = this.handleSurveyTitle.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    handleProjectTitle(evt) {
        this.setState({ codeName: evt.target.value});
    }

    handleSurveyTitle(evt) {
        this.setState({ name: evt.target.value});
    }

    handleValidate(evt) {
        const checkProjectName = this.props.allProjects.some((project) =>
            project.name.toLowerCase() === this.state.codeName.trim().toLowerCase());
        const checkSurveyName = this.props.allSurveys.some((survey) =>
            survey.name.toLowerCase() === this.state.name.trim().toLowerCase());
        let uiMessage = '';
        if (checkProjectName && checkSurveyName) {
            uiMessage = this.props.vocab.MODAL.PROJECT_TITLE_MODAL.BOTH_USED;
        } else if (checkProjectName) {
            uiMessage = this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE_USED;
        } else if (checkSurveyName) {
            uiMessage = this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE_USED;
        }
        if (evt.target.name === 'projectTitle') {
            this.setState({
                projectFlag: checkProjectName || evt.target.value === '',
                uiMessage,
            });
        } else {
            this.setState({
                surveyFlag: checkSurveyName || evt.target.value === '',
                uiMessage,
            });
        }
    }

    handleSubmission() {
        if (this.state.codeName === '' || this.state.name === '' ||
            this.state.projectFlag || this.state.surveyFlag) {
            return;
        }
        this.setState({
            productFlag: false,
            surveyFlag : false,
            uiMessage: '',
        });
        const trimValues = {
            project: { codeName: this.state.codeName.trim() },
            survey: { name: this.state.name.trim() },
        };
        if(!this.state.projectFlag && !this.state.surveyFlag) {
            this.props.actions.postProject(
                Object.assign({},
                    {
                        user: {
                            realmUserId: this.props.profile.id,
                            organizationId: this.props.profile.organizationId,
                        },
                        langId: 1,
                    },
                    trimValues.project),
                this.props.vocab.ERROR,
            ).then((project) => {
                this.props.actions.postSurvey(
                    Object.assign({}, this.props.survey, trimValues.survey),
                    project,
                    this.props.vocab.ERROR,
                );
            });
        }
    }

    render() {
        return (
            <Modal title={this.props.vocab.PROJECT.CREATE_TITLES}
                class='new-project-title__layer'
                onCancel={this.props.onCancel}
                onSave={this.handleSubmission}>
                <NewProjectTitleForm
                    vocab={this.props.vocab}
                    data={this.state}
                    handleProjectTitle={this.handleProjectTitle}
                    handleSurveyTitle={this.handleSurveyTitle}
                    handleValidate={this.handleValidate} />
            </Modal>
        );
    }
}

NewProjectTitle.propTypes = {
    vocab: PropTypes.object.isRequired,
    profile: PropTypes.shape({
        id: PropTypes.number.isRequired,
        organizationId: PropTypes.number.isRequired,
    }),
    survey: PropTypes.object,
    allSurveys: PropTypes.arrayOf(PropTypes.object).isRequired,
    allProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    message: PropTypes.string,
    actions: PropTypes.object.isRequired,
};

export default NewProjectTitle;
