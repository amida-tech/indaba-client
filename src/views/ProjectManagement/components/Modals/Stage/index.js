import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';

import Modal from '../../../../../common/components/Modal';
import StageForm from './StageForm';

class StageModal extends Component {
    render() {
        const groups = this.props.userGroups.map((group, key) =>
            ({ value: group.id, label: group.title, key }),
        );
        const initialValues = {
            title: '',
            userGroups: [],
            permissions: '0',
            startDate: '',
            endDate: '',
        };
        return (
            <Modal
                title={this.props.vocab.PROJECT.STAGE_SETTINGS}
                class='add-stage-layer'
                onCancel={this.props.onCancel}
                onSave={this.props.onClickToSubmit}>
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
};

const stageMapping = (values) => {
    const stage = {
        title: values.title,
        startDate: values.startDate,
        endDate: values.endDate,
        userGroups: values.userGroups.map(group => group.value),
        provideResponses: true,
        discussionParticipation: false,
        blindReview: false,
        seeOthersResponses: false,
        allowTranslate: false,
        writeToAnswers: false,
        allowEdit: false,
    };
    switch (values.permission) {
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
