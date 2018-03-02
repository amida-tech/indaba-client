import React, { Component } from 'react';
import { Link } from 'react-router';
import Accordion from 'grommet/components/Accordion';
import PropTypes from 'prop-types';
import QuestionContainer from './QuestionContainer';

class SurveyPresentation extends Component {
    render() {
        return (
            <div className='survey-presentation'>
                <Accordion
                    active={this.props.ui.showQuestions}
                    openMulti={true}
                    animate={false}>
                    {this.props.survey.map((question, index) =>
                        <QuestionContainer
                            key={`questionpanel${index}`}
                            questionIndex={index}
                            question={question}
                            {...this.props} />,
                    )}
                </Accordion>
                {!this.props.taskDisabled &&
                    <div className='survey-presentation__submit'>
                        <div className='survey-presentation__submit-instructions'>
                            {this.props.vocab.SURVEY.SUBMIT_INSTRUCTIONS}
                            <br></br>
                            {(this.props.stage.allowEdit ||
                                this.props.stage.discussionParticipation) &&
                                this.props.vocab.SURVEY.REVIEW_INSTRUCTIONS }
                            {!this.props.stage.discussionParticipation &&
                                <div className='survey-presentation__additional-instructions'>
                                    {this.props.vocab.SURVEY.SUBMIT_INSTRUCTIONS_2}
                                    <Link className='survey-presentation__link' to='/task'>
                                        {this.props.vocab.COMMON.MY_TASKS}
                                    </Link>
                                    {this.props.vocab.SURVEY.SUBMIT_INSTRUCTIONS_3}
                                </div>}
                        </div>
                        <button className={`survey-presentation__submit-button
                            survey-presentation__submit-button${!this.props.preventComplete ? '' : '--disabled'}`}
                            onClick={this.props.onCompleteTask}>
                            {this.props.vocab.SURVEY.SUBMIT_TASK}
                        </button>
                        {this.props.stage.discussionParticipation &&
                            <button className='survey-presentation__submit-button'
                                type='submit'>
                                {this.props.vocab.SURVEY.SAVE_REVIEW}
                            </button>}
                    </div>
                }
            </div>
        );
    }
}

SurveyPresentation.propTypes = {
    profile: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object),
    task: PropTypes.shape({
        uoaId: PropTypes.number.isRequired,
    }).isRequired,
    stage: PropTypes.shape({
        allowEdit: PropTypes.bool,
        discussionParticipation: PropTypes.bool,
    }).isRequired,
    taskDisabled: PropTypes.bool,
    offset: PropTypes.number,
    showCommentForm: PropTypes.bool,
    vocab: PropTypes.object.isRequired,
    preventComplete: PropTypes.bool,
    onCompleteTask: PropTypes.func,
};

export default SurveyPresentation;
