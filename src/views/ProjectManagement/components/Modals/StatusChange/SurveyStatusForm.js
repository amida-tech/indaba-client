import React, { Component } from 'react';
import { connect } from 'react-redux';
import { form, Field, reduxForm, reset, submit } from 'redux-form';
import ConfirmationCheckbox from './ConfirmationCheckbox';

class SurveyStatusForm extends Component {
    render() {
        const vocab = this.props.vocab;
        const surveyVocab = this.props.vocab.MODAL.STATUS_CHANGE_MODAL.SURVEY_TAB;
        const confirmVocab = this.props.published ? surveyVocab.PUBLISHED : surveyVocab.DRAFT;
        return (
            <form className='survey-status-form'>
                <div className='survey-status-form__top-section'>
                    <input id='survey-status-check'
                        type='checkbox'
                        className='toggle-native-check'
                        checked={this.props.published}
                        onChange={event => this.props.onCheck('published', event.target.checked)}/>
                    <label htmlFor='survey-status-check' className='toggle'></label>
                    <div className='survey-status-form__field'>
                        <div className='survey-status-form__text'>
                            {this.props.published ? vocab.SURVEY.PUBLISHED : vocab.SURVEY.DRAFT}
                        </div>
                        <div className='survey-status-form__label'>
                            {surveyVocab.VALUE_LABEL}
                        </div>
                    </div>
                </div>
                <hr className='divider'/>
                <div className='survey-status-form__section'>
                    <div className='survey-status-form__description'>
                        <p>{surveyVocab.INSTRUCTION_PUBLISH}</p>
                        <p>{surveyVocab.INSTRUCTION_DRAFT_CONSTRAINT}</p>
                        <p>{surveyVocab.INSTRUCTION_PROJECT_STATUS}</p>
                    </div>
                </div>
                <hr className='divider'/>
                <div className='survey-status-form__section'>
                    <div className='survey-status-form__confirmation'>
                        <p>{confirmVocab.TITLE}</p>
                        <ConfirmationCheckbox
                            checked={this.props.accessConfirm}
                            onCheck={this.props.onCheck}
                            name='accessConfirm'
                            label={confirmVocab.CHECKBOX_ACCESS} />
                        <br/>
                        <ConfirmationCheckbox
                            checked={this.props.editConfirm}
                            onCheck={this.props.onCheck}
                            name='editConfirm'
                            label={confirmVocab.CHECKBOX_EDIT} />
                        <br/>
                        <ConfirmationCheckbox
                            checked={this.props.usersConfirm}
                            onCheck={this.props.onCheck}
                            name='usersConfirm'
                            label={confirmVocab.CHECKBOX_USERS}/>
                    </div>
                </div>
            </form>
        );
    }
}

const FORM_NAME = 'survey-status-form';

export default connect(null, dispatch => ({
    onPlusClick: () => dispatch(submit(FORM_NAME)),
}))(reduxForm({
    form: FORM_NAME,
    onSubmit: (values, dispatch, ownProps) => {
        // Check the checkboxes to ensure they are all true.
        ownProps.patchSurvey(Object.assign({}, this.props.survey,
                { status: this.state.survey.published ? 'published' : 'draft' }),
            ownProps.vocab.SURVEY.SUCCESS,
            ownProps.vocab.ERROR);
    },
    onSubmitSuccess: (result, dispatch) => dispatch(reset(FORM_NAME)),
})(SurveyStatusForm));
