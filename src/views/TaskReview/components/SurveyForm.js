import React, { Component } from 'react';
import { Link } from 'react-router';
import Accordion from 'grommet/components/Accordion';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { get, omit, compact } from 'lodash';
import { toast } from 'react-toastify';

import QuestionContainer from './QuestionContainer';

class SurveyForm extends Component { // TODO: INBA-450
    render() {
        return (
            <form className='survey-form'
                onSubmit={this.props.handleSubmit}>
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
                {!this.props.taskDisabled &&
                    <div className='survey-form__submit'>
                        <div className='survey-form__submit-instructions'>
                            {this.props.vocab.SURVEY.SUBMIT_INSTRUCTIONS}
                            <br></br>
                            {(this.props.stage.allowEdit ||
                                this.props.stage.discussionParticipation) &&
                                this.props.vocab.SURVEY.REVIEW_INSTRUCTIONS }
                            {!this.props.stage.discussionParticipation &&
                                <div className='survey-form__additional-instructions'>
                                    {this.props.vocab.SURVEY.SUBMIT_INSTRUCTIONS_2}
                                    <Link className='survey-form__link' to='/task'>
                                        {this.props.vocab.COMMON.MY_TASKS}
                                    </Link>
                                    {this.props.vocab.SURVEY.SUBMIT_INSTRUCTIONS_3}
                                </div>}
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
                        {(this.props.stage.allowEdit || this.props.stage.discussionParticipation) &&
                            <button className='survey-form__submit-button'
                                type='submit'>
                                {this.props.vocab.SURVEY.SAVE_REVIEW}
                            </button>}
                    </div>
                }
            </form>
        );
    }
}

SurveyForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    survey: PropTypes.array.isRequired,
    stage: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    productId: PropTypes.number.isRequired,
    actions: PropTypes.shape({
        moveTask: PropTypes.func.isRequired,
    }).isRequired,
};

const FORM_NAME = 'survey-form';

export default reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    onSubmit: (values, dispatch, ownProps) => {
        const answers = compact(values.answers.map((answer) => {
            if (get(answer, 'comment.reason') === undefined) {
                return null;
            } else if (answer.comment.reason === 'disagree' && answer.comment.text === '') {
                return null;
            }
            return omit(answer, ['comment.id', 'comment.userId', 'comment.language']);
        }));
        ownProps.actions.postReview(
            values.assessmentId,
            answers,
            ownProps.vocab.ERROR,
        );
    },
})(SurveyForm);
