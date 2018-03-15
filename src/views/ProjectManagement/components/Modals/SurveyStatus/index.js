import React, { Component } from 'react';
import { formValueSelector, submit } from 'redux-form';
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
                        <SurveyStatusForm
                            initialValues={{
                                published: this.props.survey.status === 'published',
                                editConfirm: false,
                                accessConfirm: false,
                                usersConfirm: false,
                            }}
                            survey={this.props.survey}
                            vocab={this.props.vocab}
                            published={this.props.published}
                            patchSurvey={this.props.actions.patchSurvey}
                            updateStatusChange={this.props.actions.updateStatusChange}
                            />
                </Modal>
        );
    }
}
const selector = formValueSelector('survey-status-form');

const mapStateToProps = state => ({
    published: selector(state, 'published'),
});

const mapDispatchToProps = dispatch => ({
    onClickToSubmit: () => dispatch(submit('survey-status-form')),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyStatus);
