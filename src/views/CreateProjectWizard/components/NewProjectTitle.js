import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../common/components/Modal';
import NewProjectTitleForm from './NewProjectTitleForm';

class NewProjectTitle extends Component {
    constructor(props) {
        super(props);
        this.handleTitleEntry = this.handleTitleEntry.bind(this);
        this.handleSummaryEntry = this.handleSummaryEntry.bind(this);
    }

    handleTitleEntry(event) {
        this.props.updateTitle(event.target.value);
    }

    handleSummaryEntry(event) {
        this.props.updateSummary(event.target.value);
    }

    render() {
        return <Modal
            title={this.props.vocab.PROJECT.PROJECT_TITLE}
            class='new-project-title__layer'
            form='new-project-title-form'
            onCancel={this.props.onCancel}>
            <NewProjectTitleForm onSubmit={
                (values) => {
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
                    )
                        .then((project) => {
                            this.props.actions.postSurvey(
                                Object.assign({}, this.props.survey, values.survey),
                                project,
                                this.props.vocab.ERROR,
                            );
                        });
                } }
            vocab={this.props.vocab} />
        </Modal>;
    }
}

NewProjectTitle.propTypes = {
    vocab: PropTypes.object.isRequired,
    profile: PropTypes.shape({
        id: PropTypes.number.isRequired,
        organizationId: PropTypes.number.isRequired,
    }),
    actions: PropTypes.object.isRequired,
};

export default NewProjectTitle;
