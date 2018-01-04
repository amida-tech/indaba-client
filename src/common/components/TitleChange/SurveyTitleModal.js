import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import TitleForm from './TitleForm';


class SurveyTitleModal extends Component {
    render() {
        return (
            <Modal title={this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE}
                onCancel={this.props.onCloseModal}
                form='survey-title'>
                <TitleForm form='survey-title'
                    label={this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE_INPUT_LABEL}
                    initialValues={{ title: this.props.survey.id > 0 ? this.props.survey.name : '' }}
                    onSubmit={({ title: name }) => {
                        if (this.props.survey.id > 0) {
                            this.props.actions.patchSurvey(
                                { name, id: this.props.survey.id },
                                this.props.vocab.SURVEY.SUCCESS,
                                this.props.vocab.ERROR);
                        } else {
                            this.props.actions.postSurvey(
                                Object.assign({}, this.props.survey, { name }),
                                this.props.project,
                                this.props.vocab.ERROR);
                        }
                        this.props.onCloseModal();
                    }}/>
            </Modal>
        );
    }
}

SurveyTitleModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    survey: PropTypes.object,
    project: PropTypes.object,
    onCloseModal: PropTypes.func.isRequired,
};

export default SurveyTitleModal;
