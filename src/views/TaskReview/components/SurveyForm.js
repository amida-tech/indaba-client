import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Accordion from 'grommet/components/Accordion';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';

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
                        questionIndex={index}
                        question={question}
                        {...this.props} />,
                    )}
                </Accordion>
                <div className='survey-form__submit'>
                    <div className='survey-form__submit-instructions'>
                        {this.props.vocab.SURVEY.SUBMIT_INSTRUCTIONS}
                        <br></br>
                        {this.props.vocab.SURVEY.SUBMIT_INSTRUCTIONS_2}
                        <Link className='survey-form__link' to='/task'>
                            {this.props.vocab.COMMON.MY_TASKS}
                        </Link>
                        {this.props.vocab.SURVEY.SUBMIT_INSTRUCTIONS_3}
                    </div>
                    <button className='survey-form__submit-button'
                        onClick={() => {
                            toast(this.props.vocab.PROJECT.TASK_COMPLETED);
                            this.props.actions.moveTask(
                                this.props.productId,
                                this.props.task.uoaId,
                                this.props.vocab.ERROR,
                            );
                        }}>
                        {this.props.vocab.SURVEY.SUBMIT_TASK}
                    </button>
                </div>
            </div>
        );
    }
}

SurveyForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

const FORM_NAME = 'survey-form';

const selector = formValueSelector(FORM_NAME);

const mapStateToProps = state => ({
    formAnswers: selector(state, 'answers'),
});

export default compose(
    connect(mapStateToProps),
    reduxForm({
        form: FORM_NAME,
        enableReinitialize: true,
        onSubmit: () => { // values, dispatch, ownProps
            console.log('FIRED');
            // ownProps.actions.postDiscussion(
            //     values,
            //     ownProps.vocab.ERROR,
            // );
        },
    }),
)(SurveyForm);
