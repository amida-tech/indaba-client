import React, { Component } from 'react';
import { submit } from 'redux-form';
import { connect } from 'react-redux';

import Modal from '../../../../../common/components/Modal';
import SurveyStatusForm from './SurveyStatusForm';

class SurveyStatus extends Component {
    render() {
        return (
                <Modal
                    class='project-status-change-layer'
                    title={this.props.vocab.MODAL.STATUS_CHANGE_MODAL.SURVEY_TAB.TITLE}
                    onSave={this.props.onClickToSubmit}
                    onCancel={() => this.props.actions.updateStatusChange(false)}>
                        <SurveyStatusForm {...this.props.survey}
                            vocab={this.props.vocab}
                            patchSurvey={this.props.actions.patchSurvey}
                            />
                </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onClickToSubmit: () => dispatch(submit('survey-status-form')),
});

export default connect(null, mapDispatchToProps)(SurveyStatus);
