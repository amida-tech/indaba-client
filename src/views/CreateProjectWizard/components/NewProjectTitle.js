import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../common/components/Modal';
import NewProjectTitleForm from './NewProjectTitleForm';

class NewProjectTitle extends Component {
    constructor(props) {
        super(props);
        this.handleProjectSubmission = this.handleProjectSubmission.bind(this);
    }

    handleProjectSubmission(values) {
        const trimValues = {
            project: {
                codeName: values.project.codeName.trim(),
            },
            survey: {
                name: values.survey.name.trim(),
            }
        };
        if (!this.props.allSurveys.find((survey) =>
            survey.name === trimValues.survey.name)) {
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
            } else {
                this.props.actions.wizardUIReportError(this.props.vocab.ERROR.SURVEY_NAME_IN_USED);
            }
    }

    render() {
        return (
            <Modal title={this.props.vocab.PROJECT.CREATE_TITLES}
                class='new-project-title__layer'
                form='new-project-title-form'
                onCancel={this.props.onCancel}>
                <NewProjectTitleForm
                    onSubmit={this.handleProjectSubmission}
                    vocab={this.props.vocab}
                    message={this.props.message} />
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
