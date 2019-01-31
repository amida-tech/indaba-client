import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from '../../../../../common/components/Modal';
import StageForm from './StageForm';

class StageModal extends Component {
    constructor(props) {
        super(props);
        this.groups = this.props.userGroups.map((group, key) =>
            ({ value: group.id, label: group.title, key }));
        if (this.props.stageId && this.props.project) {
            this.state = Object.assign({}, this.props.project.stages.find(
                stage => stage.id === this.props.stageId));
            if (this.state.blindReview) {
                this.state.permissions = '1';
            } else if (this.state.discussionParticipation) {
                this.state.permissions = '2';
            } else if (this.state.allowEdit) {
                this.state.permissions = '3';
            } else {
                this.state.permissions = '0';
            }
        } else {
            this.state = {
                title: '',
                userGroups: [],
                position: this.props.project.stages.length,
                permissions: '0',
                startDate: new Date(),
                endDate: new Date(),
            };
        }

        this.handleTitle = this.handleTitle.bind(this);
        this.handlePermissions = this.handlePermissions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitle(evt) {
        this.setState({ title: evt.target.value });
    }

    handlePermissions(evt) {
        this.setState({ permissions: evt.target.value });
    }

    handleSubmit() {
        this.props.onAddStage(stageMapping(this.state), this.props.project.id);
    }

    render() {
        return (
            <Modal
                title={this.props.vocab.PROJECT.STAGE_SETTINGS}
                class='add-stage-layer'
                onCancel={this.props.onCancel}
                onSave={this.handleSubmit}
                buttons={(this.props.stageId !== undefined && this.props.stageId !== null)
                    ? [{
                        key: 'delete-button',
                        label: this.props.vocab.PROJECT.DELETE_STAGE,
                        onClick: this.props.onDeleteClick,
                    }] : null}>
                <StageForm
                    vocab={this.props.vocab}
                    title={this.state.title}
                    groups={this.groups}
                    userGroups={this.state.userGroups}
                    permissions={this.state.permissions}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    handleTitle={this.handleTitle}
                    handlePermissions={this.handlePermissions} />
            </Modal>
        );
    }
}

StageModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    userGroups: PropTypes.array.isRequired,
    stageId: PropTypes.number,
    project: PropTypes.object.isRequired,
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
        position: values.position,
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

export default StageModal;
