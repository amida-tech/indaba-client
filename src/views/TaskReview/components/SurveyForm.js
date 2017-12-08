import React, { Component } from 'react';
import Accordion from 'grommet/components/Accordion';
import PropTypes from 'prop-types';

import QuestionContainer from './QuestionContainer';

class SurveyForm extends Component { // TODO: INBA-450
    render() {
        return (
            <div className='survey-form'>
                <Accordion
                    active={this.props.ui.showQuestions}
                    openMulti={true}>
                    {this.props.survey.map((question, index) =>
                    <QuestionContainer
                        key={`questionpanel${index}`}
                        index={index}
                        assessmentId={this.props.assessmentId}
                        answers={this.props.answers}
                        actions={this.props.actions}
                        question={question}
                        {...this.props} />,
                    )}
                </Accordion>
                <div className='survey-form__submit'>
                    <div className='survey-form__submit-instructions'>
                    {this.props.vocab.SURVEY.SUBMIT_INSTRUCTIONS}
                    <br></br>
                    {this.props.vocab.SURVEY.SUBMIT_INSTRUCTIONS_2}
                    </div>
                    <button className='survey-form__submit-button'
                    onClick=''>
                    {this.props.vocab.SURVEY.SUBMIT_SURVEY}</button>
                </div>
            </div>
        );
    }
}

SurveyForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default SurveyForm;
