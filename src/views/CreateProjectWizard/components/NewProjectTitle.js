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
        if (evt.target.name === 'projectTitle') {
            this.setState({ projectFlag: evt.target.value === '' });
        } else {
            this.setState({ surveyFlag: evt.target.value === '' });
        }
    }

    handleSubmission() {
        if (this.state.codeName === '' || this.state.name === '') {
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
        if (this.props.allSurveys.find((survey) =>
            survey.name === trimValues.survey.name)) {
                this.setState({
                    surveyFlag: true,
                    uiMessage: this.props.vocab.ERROR.SURVEY_NAME_IN_USED
                });
        } else {
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
    message: PropTypes.string,
    actions: PropTypes.object.isRequired,
};

export default NewProjectTitle;
