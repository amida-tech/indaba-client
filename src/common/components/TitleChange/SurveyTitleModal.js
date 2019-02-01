import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import TitleForm from './TitleForm';


class SurveyTitleModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titleFlag: false,
            uiMessage: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit({ title: name }) {
        this.setState({
            titleFlag: false,
            uiMessage: '',
        });
        if (name === '') {
            this.setState({
                titleFlag: true,
                uiMessage: this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE_REQUIRED,
            });
        } else if (this.props.allSurveys.find((survey) =>
            survey.name === name.trim())) {
                this.setState({
                    titleFlag: true,
                    uiMessage: this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE_USED,
                });
        } else {
            if (this.props.survey.id > 0) {
                console.log('k?');
                this.props.actions.patchSurvey(
                    { name: name.trim(), id: this.props.survey.id },
                    this.props.vocab.SURVEY.SUCCESS,
                    this.props.vocab.ERROR,
                );
            } else {
                this.props.actions.postSurvey(
                    Object.assign({}, this.props.survey, { name: name.trim() }),
                    this.props.project,
                    this.props.vocab.ERROR,
                );
            }
            this.props.onCloseModal();
        }
    }

    render() {
        return (
            <Modal title={this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE}
                onCancel={this.props.onCloseModal}
                form='survey-title'>
                <TitleForm form='survey-title'
                    label={this.props.vocab.MODAL.SURVEY_TITLE_MODAL.TITLE_INPUT_LABEL_}
                    initialValues={{ title: this.props.survey.id > 0 ? this.props.survey.name : '' }}
                    titleFlag={this.state.titleFlag}
                    uiMessage={this.state.uiMessage}
                    onSubmit={this.handleSubmit}/>
            </Modal>
        );
    }
}

SurveyTitleModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    survey: PropTypes.object,
    allSurveys: PropTypes.array,
    project: PropTypes.object,
    onCloseModal: PropTypes.func.isRequired,
};

export default SurveyTitleModal;
