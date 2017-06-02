import React, { Component } from 'react';
import ConfirmationCheckbox from './ConfirmationCheckbox';

class SurveyStatusBody extends Component {
  render() {
    const vocab = this.props.vocab;
    const surveyVocab = this.props.vocab.MODAL.STATUS_CHANGE_MODAL.SURVEY_TAB;
    const confirmVocab = this.props.published ? surveyVocab.PUBLISHED : surveyVocab.DRAFT;
    return (
      <div>
        <div className='project-status-section project-status-value'>
          <input
            id='survey-status-check'
            type='checkbox'
            className='toggle-native-check'
            checked={this.props.published}
            onChange={event => this.props.onCheck('published', event.target.checked)}/>
          <label htmlFor='survey-status-check' className='toggle'></label>
          <div className='project-status-field'>
            <div className='project-status-text'>
              {this.props.published ? vocab.SURVEY.STATUS_PUBLISHED : vocab.SURVEY.STATUS_DRAFT}
            </div>
            <div className='project-status-label'>{surveyVocab.VALUE_LABEL}</div>
          </div>
        </div>
        <hr className='divider'/>
        <div className='project-status-section'>
          <div className='project-status-description'>
            <p>{surveyVocab.INSTRUCTION_PUBLISH}</p>
            <p>{surveyVocab.INSTRUCTION_DRAFT_CONSTRAINT}</p>
            <p>{surveyVocab.INSTRUCTION_PROJECT_STATUS}</p>
          </div>
        </div>
        <hr className='divider'/>
        <div className='project-status-section'>
          <div className='project-status-confirmation'>
            <p>{confirmVocab.TITLE}</p>
            <ConfirmationCheckbox
              checked={this.props.accessConfirm}
              onCheck={this.props.onCheck}
              name='accessConfirm'
              label={confirmVocab.CHECKBOX_ACCESS}
              />
            <br/>
            <ConfirmationCheckbox
              checked={this.props.usersConfirm}
              onCheck={this.props.onCheck}
              name='usersConfirm'
              label={confirmVocab.CHECKBOX_USERS}/>
            <br/>
            <ConfirmationCheckbox
              checked={this.props.editConfirm}
              onCheck={this.props.onCheck}
              name='editConfirm'
              label={confirmVocab.CHECKBOX_EDIT} />
          </div>
        </div>
      </div>
    );
  }
}

export default SurveyStatusBody;
