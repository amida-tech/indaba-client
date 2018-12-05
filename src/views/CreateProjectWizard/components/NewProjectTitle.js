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
        this.props.actions.postProject(
            Object.assign({},
                {
                    user: {
                        realmUserId: this.props.profile.id,
                        organizationId: this.props.profile.organizationId,
                    },
                    langId: 1,
                },
                values.project),
            this.props.vocab.ERROR,
        ).then((project) => {
            this.props.actions.postSurvey(
                Object.assign({}, this.props.survey, values.survey),
                project,
                this.props.vocab.ERROR,
            );
        });
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
                    errorMessage={this.props.errorMessage} />
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
    errorMessage: PropTypes.string,
    actions: PropTypes.object.isRequired,
};

export default NewProjectTitle;
