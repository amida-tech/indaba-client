import React, {Component} from 'react';
import * as SurveyFields from '../../common/SurveyFields';
import _ from 'lodash';
import validateInput from '../../utils/validation/validateInput';
import SlideInDisplayBox from '../../common/SlideInDisplayBox';

class SurveyForm extends Component {

    _changeTextAnswer(event) {
        let currentAnswers = this.props.surveyAnswers.toJS();
        currentAnswers.answers = _.unionBy([{questionId: parseInt(event.target.id),
            answer: {textValue: event.target.value}}], currentAnswers.answers, 'questionId')
            .filter(entry => entry.answer.textValue !== '');
        this.props.actions.updateAnswer(currentAnswers);
    }

    _changeIntegerAnswer(event) {
        let currentAnswers = this.props.surveyAnswers.toJS();
        const questionId = parseInt(event.target.id);
        let value = event.target.value;
        if(value === '') {
            value = 0;
        }
        value = (value === '-' || value === '-0' || value === '0-')
            ? '-'
            : parseInt(value);
        if(
            (!isNaN(value) &&
            value < Number.MAX_SAFE_INTEGER &&
            value > Number.MIN_SAFE_INTEGER) ||
            value === '-') {
            currentAnswers.answers = _.unionBy([{
                questionId: questionId,
                answer: {
                    integerValue: value !== ''
                        ? value
                        : 0
                }}], currentAnswers.answers, 'questionId')
                .filter(entry => entry.answer.integerValue !== '');
            this.props.actions.updateAnswer(currentAnswers);
        }
    }

    _changeZipAnswer(event) {
        let currentAnswers = this.props.surveyAnswers.toJS();
        const questionId = parseInt(event.target.id);
        const value = event.target.value.toUpperCase();
        if(validateInput.isAZipOrPostalCode(value)) {
            currentAnswers.answers = _.unionBy([{
                questionId: questionId,
                answer: {
                    textValue: value
                }}], currentAnswers.answers, 'questionId')
                .filter(entry => entry.answer.textValue !== '');
            this.props.actions.updateAnswer(currentAnswers);
        }
    }

    _changeYearAnswer(event) {
        let currentAnswers = this.props.surveyAnswers.toJS();
        const questionId = parseInt(event.target.id);
        let value = event.target.value;
        if(validateInput.isAYear(value) || value === '') {
            currentAnswers.answers = _.unionBy([{
                questionId: questionId,
                answer: {
                    yearValue: value.toString()
                }}], currentAnswers.answers, 'questionId')
                .filter(entry => entry.answer.yearValue !== '');
            this.props.actions.updateAnswer(currentAnswers);
        }
    }

    _changeBoolAnswer(event) {
        let currentAnswers = this.props.surveyAnswers.toJS();
        currentAnswers.answers = _.unionBy([{questionId: parseInt(event.target.name),
              answer: {boolValue: event.target.value=="true"}}], currentAnswers.answers, 'questionId')
        this.props.actions.updateAnswer(currentAnswers);
    }

    _changeChoiceAnswer(event) {
        let currentAnswers = this.props.surveyAnswers.toJS();
        currentAnswers.answers = _.unionBy([{questionId: parseInt(event.target.name),
              answer: {choice: parseInt(event.target.value)}}], currentAnswers.answers, 'questionId')
        this.props.actions.updateAnswer(currentAnswers);
    }

    _changeChoicesAnswer(itype, questionId, answerId, value) {
        let currentAnswers = this.props.surveyAnswers.toJS();
        let currentChoice = _.find(currentAnswers.answers, { questionId: parseInt(questionId)});

        if( currentChoice !== undefined && currentChoice.answer !== undefined && currentChoice.answer.choices !== undefined) {
            currentChoice.answer.choices = _.unionBy([{id: parseInt(answerId),boolValue: value}], currentChoice.answer.choices, 'id');
        }
        else {
            currentChoice = {
                questionId: parseInt(questionId),
                answer: {
                  choices: [{
                    id: parseInt(answerId),
                    boolValue: value
                  }]
                }
            };
        }

        currentAnswers.answers = _.unionBy([currentChoice], currentAnswers.answers, 'questionId')
        this.props.actions.updateAnswer(currentAnswers);
    }

    _processValidationError(errorObject) {
        this.errorObjects = [].push(errorObject);
    }

    makeQuestionsJSX(question, index) {
        // TODO: We need to finish the above _processValidationError() method
        // TODO: Convert to immutable via fromJS() for easy finding of individual
        // errorObject
        // i.e. this.errorObjects.find((_errorObject) => _errorObject.get('elementId') === elementId);
        this.errorObject = {
            type: 'Warning', // Error, Warning, etc
            color: 'warning',
            direction: 'left',
            message: '',
            className: '',
        };

        var surveyAnswers = this.props.surveyAnswers.toJS();
        var answer = _.find(surveyAnswers.answers, {'questionId': question.id});
        switch(question.type) {
            case "text":
                return (
                    <li key={question.id} className="survey-question">
                        <label className="survey-question__question-count">
                            {this.props.vocab.getIn(['SURVEY_PAGE', 'QUESTION'])} {index+1}
                        </label>
                        <SurveyFields.Input
                            id={question.id}
                            changeForm={::this._changeTextAnswer}
                            text={question.text}
                            value={answer!==undefined ? answer.answer.textValue : ""}
                            required={question.required}/>
                    </li>
                );
            case "integer":
                return (
                    <li key={question.id} className="survey-question">
                        <label className="survey-question__question-count">
                            {this.props.vocab.getIn(['SURVEY_PAGE', 'QUESTION'])} {index+1}
                        </label>
                        <SurveyFields.InputInteger
                            id={question.id}
                            changeForm={::this._changeIntegerAnswer}
                            text={question.text}
                            value={answer!==undefined ? answer.answer.integerValue : ""}
                            required={question.required}
                            onBlur={(event) => {
                                if(answer && this.props.validateValidCompleteInteger(answer.answer.integerValue)) {
                                    document.getElementById(event.target.id).className = 'survey-question__response survey-question__response--text';
                                    document.getElementById(`survey-input-validation-slide-in-box-${question.id}`).className = 'slideInDisplayBox slideInDisplayBox--hidden slideInDisplayBox--left warning';
                                }
                                else if(answer && !this.props.validateValidCompleteInteger(answer.answer.integerValue)){
                                    document.getElementById(event.target.id).className = 'survey-question__response survey-question__response--text survey-question__response--invalid-text';
                                    document.getElementById(`survey-input-validation-slide-in-box-${question.id}`).className = 'slideInDisplayBox slideInDisplayBox--visible slideInDisplayBox--left slideInDisplayBox--relative warning';
                                }
                            }}
                        />
                        <SlideInDisplayBox
                            id={`survey-input-validation-slide-in-box-${question.id}`}
                            visible={false}
                            direction={this.errorObject.direction}
                            color={this.errorObject.color}
                        >
                            {this.errorObject.type + ': '}{this.props.vocab.getIn(['FORM_VALIDATION', 'NOT_VALID_INTEGER'])}
                        </SlideInDisplayBox>
                    </li>
                );
            case "zip":
                return (
                    <li key={question.id} className="survey-question">
                        <label className="survey-question__question-count">
                            {this.props.vocab.getIn(['SURVEY_PAGE', 'QUESTION'])} {index+1}
                        </label>
                        <SurveyFields.Input
                            id={question.id}
                            changeForm={::this._changeZipAnswer}
                            text={question.text}
                            value={answer!==undefined ? answer.answer.textValue : ""}
                            required={question.required}
                            onBlur={(event) => {
                                if(answer && this.props.validateValidCompleteZip(answer.answer.textValue)) {
                                    document.getElementById(event.target.id).className = 'survey-question__response survey-question__response--text';
                                    document.getElementById(`survey-input-validation-slide-in-box-${question.id}`).className = 'slideInDisplayBox slideInDisplayBox--hidden slideInDisplayBox--left warning';
                                }
                                else if(answer && !this.props.validateValidCompleteZip(answer.answer.textValue)){
                                    document.getElementById(event.target.id).className = 'survey-question__response survey-question__response--text survey-question__response--invalid-text';
                                    document.getElementById(`survey-input-validation-slide-in-box-${question.id}`).className = 'slideInDisplayBox slideInDisplayBox--visible slideInDisplayBox--left slideInDisplayBox--relative warning';
                                }
                            }}
                        />
                        <SlideInDisplayBox
                            id={`survey-input-validation-slide-in-box-${question.id}`}
                            visible={false}
                            direction={this.errorObject.direction}
                            color={this.errorObject.color}
                        >
                            {this.errorObject.type + ': '}{this.props.vocab.getIn(['FORM_VALIDATION', 'NOT_VALID_ZIP'])}
                        </SlideInDisplayBox>
                    </li>
                );
            case "year":
                return (
                    <li key={question.id} className="survey-question">
                        <label className="survey-question__question-count">
                            {this.props.vocab.getIn(['SURVEY_PAGE', 'QUESTION'])} {index+1}
                        </label>
                        <SurveyFields.Input
                            id={question.id}
                            changeForm={::this._changeYearAnswer}
                            text={question.text}
                            value={answer!==undefined ? answer.answer.yearValue : ""}
                            required={question.required}
                            onBlur={(event) => {
                                if(answer && this.props.validateValidCompleteYear(answer.answer.yearValue)) {
                                    document.getElementById(event.target.id).className = 'survey-question__response survey-question__response--text';
                                    document.getElementById(`survey-input-validation-slide-in-box-${question.id}`).className = 'slideInDisplayBox slideInDisplayBox--hidden slideInDisplayBox--left warning';
                                }
                                else if(answer && !this.props.validateValidCompleteYear(answer.answer.yearValue)){
                                    document.getElementById(event.target.id).className = 'survey-question__response survey-question__response--text survey-question__response--invalid-text';
                                    document.getElementById(`survey-input-validation-slide-in-box-${question.id}`).className = 'slideInDisplayBox slideInDisplayBox--visible slideInDisplayBox--left slideInDisplayBox--relative warning';
                                }
                            }}
                        />
                        <SlideInDisplayBox
                            id={`survey-input-validation-slide-in-box-${question.id}`}
                            visible={false}
                            direction={this.errorObject.direction}
                            color={this.errorObject.color}
                        >
                            {this.errorObject.type + ': '}{this.props.vocab.getIn(['FORM_VALIDATION', 'NOT_VALID_YEAR'])}
                        </SlideInDisplayBox>
                    </li>
                );
            case "bool":
                return (
                    <li key={question.id} className="survey-question">
                        <label className="survey-question__question-count">
                            {this.props.vocab.getIn(['SURVEY_PAGE', 'QUESTION'])} {index+1}
                        </label>
                        <SurveyFields.Bool
                            id={question.id}
                            changeForm={::this._changeBoolAnswer}
                            text={question.text}
                            value={answer!==undefined ? answer.answer.boolValue : ""}
                            vocab={this.props.vocab}
                            required={question.required}/>
                    </li>
                );
            case "choice":
                return (
                    <li key={question.id} className="survey-question">
                        <label className="survey-question__question-count">
                            {this.props.vocab.getIn(['SURVEY_PAGE', 'QUESTION'])} {index+1}
                        </label>
                        <SurveyFields.Choice
                            id={question.id}
                            changeForm={::this._changeChoiceAnswer}
                            text={question.text}
                            value={answer!==undefined ? answer.answer.choice : ""}
                            vocab={this.props.vocab}
                            choices={question.choices} />
                    </li>
                );
            case "choices":
                return (
                    <li key={question.id} className="survey-question">
                        <label className="survey-question__question-count">
                            {this.props.vocab.getIn(['SURVEY_PAGE', 'QUESTION'])} {index+1}
                        </label>
                        <SurveyFields.Choices
                            id={question.id}
                            text={question.text}
                            value={answer!==undefined ? answer.answer.choices : []}
                            vocab={this.props.vocab}
                            choices={question.choices}
                            changeFormChoices={::this._changeChoicesAnswer}
                            required={question.required}/>
                    </li>
                );
        }
    }

    render () {
        const { id, questions } = this.props.selectedSurvey.toJS();
        // need to implement: lastUpdated
        var questionnaireJSX = [];

        if(questions){
            questionnaireJSX = questions.map(::this.makeQuestionsJSX);
        }

        return (
            <ol className="view-survey__question-list">
                {questionnaireJSX}
            </ol>
        )
    }
}

export default SurveyForm;
