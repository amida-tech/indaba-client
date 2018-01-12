import React, { Component } from 'react';
import { Link } from 'react-router';
import Accordion from 'grommet/components/Accordion';
import { toast } from 'react-toastify';
import QuestionContainer from './QuestionContainer';

class SurveyPresentation extends Component {
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
            </div>
        );
    }
}

export default SurveyPresentation;
