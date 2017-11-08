import React, { Component } from 'react';
import Accordion from 'grommet/components/Accordion';
import PropTypes from 'prop-types';
import { form, reduxForm } from 'redux-form';

import QuestionContainer from './QuestionContainer';

class SurveyForm extends Component {
    render() {
        return (
            <form className='survey-form'>
                <Accordion
                    active={this.props.ui.showQuestions}
                    openMulti={true}>
                    {this.props.survey.map((question, index) =>
                    <QuestionContainer
                        key={`questionpanel${index}`}
                        index={index}
                        question={question}
                        {...this.props} />,
                    )}
                </Accordion>
            </form>
        );
    }
}

SurveyForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'survey-form' })(SurveyForm);
