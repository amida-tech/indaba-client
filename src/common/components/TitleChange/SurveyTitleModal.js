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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSurveyTitle(evt) {
        this.setState({ name: evt.target.value });
    }

    handleValidate() {
        if (this.state.name === '') {
            this.setState({
                surveyFlag: true,
                uiMessage: this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE_REQUIRED,
            });
            return true;
        } else if (this.props.allSurveys.some((survey) =>
            survey.name.toLowerCase() === this.state.name.trim().toLowerCase())) {
            this.setState({
                surveyFlag: true,
                uiMessage: this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE_USED,
            });
            return true;
        }
        this.setState({
            surveyFlag: false,
            uiMessage: '',
        });
        return false;
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (this.handleValidate()) {
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
                onSave={this.handleSubmit}>
                <TitleForm
                    label={this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE_INPUT_LABEL_}
                    titleFlag={this.state.surveyFlag}
                    placeholder={this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE}
                    uiMessage={this.state.uiMessage}
                    value={this.state.name}
                    handleTitle={this.handleSurveyTitle}
                    handleValidate={this.handleValidate}
                    handleSubmit={this.handleSubmit} />
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
