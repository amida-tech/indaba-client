import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import TitleForm from './TitleForm';

class SurveyTitleModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            surveyFlag: false,
            uiMessage: '',
            name: this.props.survey.name || '',
        };

        this.handleSurveyTitle = this.handleSurveyTitle.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    handleSurveyTitle(evt) {
        this.setState({ name: evt.target.value });
    }

    handleValidate(evt) {
        if (this.state.name === '') {
            this.setState({
                surveyFlag: true,
                uiMessage: this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE_REQUIRED,
            });
        } else if (this.props.allSurveys.some((survey) =>
            survey.name.toLowerCase() === this.state.name.trim().toLowerCase())) {
            this.setState({
                surveyFlag: true,
                uiMessage: this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE_USED,
            });
        } else {
            this.setState({
                surveyFlag: false,
                uiMessage: '',
            });
        }
    }

    handleSubmission() {
        if (this.state.name === '') { // Unlikely entry state but why risk it.
            this.setState({
                surveyFlag: true,
                uiMessage: this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE_REQUIRED,
            });
            return;
        }
        if  (this.state.surveyFlag) {
            return;
        }
        if (this.props.survey.id > 0) {
            this.props.actions.patchSurvey(
                { name: this.state.name.trim(), id: this.props.survey.id },
                this.props.vocab.SURVEY.SUCCESS,
                this.props.vocab.ERROR,
            );
        } else {
            this.props.actions.postSurvey(
                Object.assign({}, this.props.survey, { name: this.state.name.trim() }),
                this.props.project,
                this.props.vocab.ERROR,
            );
        }
        this.props.onCloseModal();
    }

    render() {
        return (
            <Modal title={this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE}
                onCancel={this.props.onCloseModal}
                onSave={this.handleSubmission}>
                <TitleForm
                    label={this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE_INPUT_LABEL_}
                    titleFlag={this.state.surveyFlag}
                    placeholder={this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE}
                    uiMessage={this.state.uiMessage}
                    value={this.state.name}
                    handleTitle={this.handleSurveyTitle}
                    handleValidate={this.handleValidate} />
            </Modal>
        );
    }
}

SurveyTitleModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    allSurveys: PropTypes.array.isRequired,
    project: PropTypes.object.isRequired,
    onCloseModal: PropTypes.func.isRequired,
};

export default SurveyTitleModal;
