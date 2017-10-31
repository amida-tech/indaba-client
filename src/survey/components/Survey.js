import React, {Component} from 'react';
import SurveyForm from './SurveyForm';
import SlideInDisplayBox from '../../common/SlideInDisplayBox';

class Survey extends Component {

    saveProgress(ev){
        ev.preventDefault();
        this.props.actions.saveSurveyAnswers(this.props.selectedSurvey.get('id'), this.props.surveyAnswers);
    }

    completeSection(ev) {
        ev.preventDefault();
        // TODO: saveProgress is okay, but the true gating mechanism needs to occur here
        this.props.actions.submitSurveyAnswers(this.props.selectedSurvey.get('id'), this.props.surveyAnswers);
    }

    render() {
        const name = this.props.selectedSurvey.get('name');
        const description = this.props.selectedSurvey.get('description');
        const surveyQuestions = this.props.selectedSurvey.get('questions');
        const surveyAnswers = this.props.surveyAnswers.get('answers');
        const surveyConsent = this.props.surveyConsent.getIn(['consentForms', 0]);
        const modalError = this.props.surveyConsent.get('consentError');
        const modalShow = this.props.surveyConsent.get('consentSigned')
            ? 'survey-consent-modal survey-consent-modal--closed'
            : 'survey-consent-modal survey-consent-modal--opened';
        const modalContent = surveyConsent != undefined ? surveyConsent.get('content') : this.props.vocab.getIn(['COMMON', 'LOADING']);
        const status = this.props.surveyAnswers.get('status');

        return (
            <div className="view-survey">
                    <div className="view-survey__sidebar">
                        <div className="survey-sidebar">
                            <div className="survey-sidebar__title-container">
                                <h1 className="survey-sidebar__context">
                                    {this.props.vocab.getIn(['SURVEY_PAGE', 'QUESTIONNAIRE'])}
                                </h1>
                                <h2 className="survey-sidebar__title">{name}</h2>
                                <span className="survey-sidebar__status-message">
                                    {surveyQuestions && (surveyQuestions.size - surveyAnswers.size)}&nbsp;{this.props.vocab.getIn(['SURVEY_PAGE', 'QUESTION_REMAIN'])}
                                </span>
                                <div className="survey-sidebar__divider"></div>
                            </div>
                            <div className="survey-sidebar__action-container">
                                <p className="survey-sidebar__description">{description}</p>

                                { (status !== 'completed') &&
                                    <button className="survey-sidebar__action-button survey-sidebar__action-button--save-progress"
                                            onClick={(ev) => this.saveProgress(ev)}
                                    >
                                        {this.props.vocab.getIn(['SURVEY_PAGE', 'SAVE_PROGRESS'])}
                                    </button>
                                }
                                { (status !== 'completed') &&
                                    <button className="survey-sidebar__action-button survey-sidebar__action-button--submit"
                                            onClick={(ev) => this.completeSection(ev)}
                                    >
                                        {this.props.vocab.getIn(['SURVEY_PAGE', 'COMPLETE_SURVEY'])}
                                    </button>
                                }
                                { (status === 'completed') &&
                                    <button className="survey-sidebar__action-button survey-sidebar__action-button--submit"
                                            onClick={(ev) => this.completeSection(ev)}
                                    >
                                        {this.props.vocab.getIn(['SURVEY_PAGE', 'UPDATE_SURVEY'])}
                                    </button>
                                }
                                <div className="survey-sidebar__divider"></div>
                            </div>
                                { this.props.data.get('hasErrors') &&
                                    <div className="survey-sidebar__warning-prompt">
                                        {this.props.vocab.getIn(['FORM_VALIDATION', 'SUBMISSION_FAILURE'])}
                                    </div>
                                }
                        </div>
                    </div>
                    <div className="view-survey__main">
                        <SurveyForm
                            selectedSurvey={this.props.selectedSurvey}
                            surveyAnswers={this.props.surveyAnswers}
                            surveyConsent={this.props.surveyConsent}
                            completeSection={this.completeSection}
                            actions={this.props.actions}
                            vocab={this.props.vocab}
                            data={this.props.data}
                            {...this.props}
                        />
                        <div className='view-survey__action-buttons'>
                            { (status !== 'completed') &&
                                <button className="view-survey__action-button view-survey__action-button--save-progress"
                                        onClick={(ev) => this.saveProgress(ev)}
                                >
                                    {this.props.vocab.getIn(['SURVEY_PAGE', 'SAVE_PROGRESS'])}
                                </button>
                            }
                            { (status !== 'completed') &&
                                <button className="view-survey__action-button view-survey__action-button--submit"
                                        onClick={(ev) => this.completeSection(ev)}
                                >
                                    {this.props.vocab.getIn(['SURVEY_PAGE', 'COMPLETE_SURVEY'])}
                                </button>
                            }
                            { (status === 'completed') &&
                                <button className="view-survey__action-button view-survey__action-button--submit"
                                        onClick={(ev) => this.completeSection(ev)}
                                >
                                    {this.props.vocab.getIn(['SURVEY_PAGE', 'UPDATE_SURVEY'])}
                                </button>
                            }
                        </div>
                        <SlideInDisplayBox visible={!!this.props.data.get('message')}>
                            Error: { this.props.data.get('message') }
                        </SlideInDisplayBox>
                    </div>
                    <section id="surveyConsentId" className={modalShow}>
                      <div className='survey-consent-modal__container'>
                        <div className="survey-consent-modal__heading">
                          <div className="survey-consent-modal__heading-action-left">
                            <button
                                className="survey-consent-modal__heading-action-button"
                                onClick={() => this.props.pushToDashboard()}
                            >
                                {this.props.vocab.getIn(['COMMON', 'BACK'])}
                            </button>
                          </div>
                          <div className="survey-consent-modal__heading-action-right">
                            <button
                                className="survey-consent-modal__heading-action-button"
                                onClick={() => document.getElementById("surveyConsentId").className = 'survey-consent-modal survey-consent-modal--closed'}
                            >
                                {this.props.vocab.getIn(['COMMON', 'CLOSE'])}
                            </button>
                          </div>
                          <h1 className='survey-consent-modal__heading-title'>
                              {this.props.vocab.getIn(['SURVEY_PAGE', 'CONSENT_TITLE'])}
                          </h1>
                          <p className="survey-consent-modal__heading-description">
                              {this.props.vocab.getIn(['SURVEY_PAGE', 'CONSENT_DESCRIPTION'])}
                          </p>
                        </div>
                        <div className="survey-consent-modal__content">
                          <div className="survey-consent-modal__content-container">
                            {modalError != null ? this.props.vocab.getIn(['SURVEY_PAGE','CONSENT_ERROR']) : modalContent}
                            <button className="survey_consent-modal__action-button"
                                disabled={modalError != null}
                                onClick={() => this.props.actions.signSurveyConsent(surveyConsent.get('id'), this.props.lang, this.props.surveyConsent)}
                            >
                                {this.props.vocab.getIn(['COMMON', 'ACCEPT'])}
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
        )
    }
}

export default Survey;
