import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';

import Modal from '../../../../../common/components/Modal';
import Time from '../../../../../utils/Time';
import StageForm from './StageForm';

class StageModal extends Component {
    render() {
        const groups = this.props.userGroups.map((group, key) =>
            ({ value: group.id, label: group.title, key }),
        );

        let initialValues;
        if (this.props.stageId && this.props.project) {
            initialValues = this.props.project.stages.find(stage =>
                stage.id === this.props.stageId);
            if (initialValues.blindReview) {
                initialValues.permissions = '1';
            } else if (initialValues.discussionParticipation) {
                initialValues.permissions = '2';
            } else if (initialValues.allowEdit) {
                initialValues.permissions = '3';
            } else {
                initialValues.permissions = '0';
            }
            initialValues.startDate = Time.renderForTaskReview(new Date(initialValues.startDate));
            initialValues.endDate = Time.renderForTaskReview(new Date(initialValues.endDate));
        } else {
            initialValues = {
                title: '',
                userGroups: [],
                permissions: '0',
                startDate: '',
                endDate: '',
            };
        }

        return (
            <Modal
                title={this.props.vocab.PROJECT.STAGE_SETTINGS}
                class='add-stage-layer'
                onCancel={this.props.onCancel}
                onSave={this.props.onClickToSubmit}
                buttons={this.props.stageId !== undefined ? [{
                    key: 'delete-button',
                    label: this.props.vocab.PROJECT.DELETE_STAGE,
                    onClick: this.props.onDeleteClick,
                }] : null}>
                <StageForm
                    vocab={this.props.vocab}
                    groups={groups}
                    initialValues={initialValues}
                    onSubmit={values =>
                            this.props.onAddStage(stageMapping(values), this.props.projectId)
                        } />
            </Modal>
        );
    }
}

StageModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    userGroups: PropTypes.array.isRequired,
    stageId: PropTypes.number,
    project: PropTypes.object.isRequired,

    onClickToSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onAddStage: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func,
};

const stageMapping = (values) => {
    const stage = {
        title: values.title,
        startDate: values.startDate,
        endDate: values.endDate,
        userGroups: values.userGroups,
        provideResponses: true,
        discussionParticipation: false,
        blindReview: false,
        seeOthersResponses: false,
        allowTranslate: false,
        writeToAnswers: false,
        allowEdit: false,
    };
    if (values.id) {
        stage.id = values.id;
    }
    if (values.workflowId) {
        stage.workflowId = values.workflowId;
    }
    switch (values.permissions) {
    case '1': { // Review
        stage.blindReview = true;
        break;
    }
    case '2': { // Review and Comment
        stage.discussionParticipation = true;
        break;
    }
    case '3': { // Review and Edit
        stage.allowEdit = true;
        break;
    }
    default: { // Complete survey
        break;
    }
    }
    return stage;
};

const mapDispatchToProps = dispatch => ({
    onClickToSubmit: () => dispatch(submit('add-stage-form')),
});

export default connect(null, mapDispatchToProps)(StageModal);
