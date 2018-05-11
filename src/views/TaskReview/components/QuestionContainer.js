import React, { Component } from 'react';
// import AccordionPanel from 'grommet/components/AccordionPanel';
// import Element from 'react-scroll/modules/components/Element';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import ReviewPane from './ReviewPane';
import Questions from './Questions';

class QuestionContainer extends Component {
    render() {
        return (
            <details name={`question${this.props.questionIndex}`}
                className='question-container'
                onToggle={() => {
                    let newShowQuestions;
                    if (this.props.ui.showQuestions.includes(this.props.questionIndex)) {
                        newShowQuestions = this.props.ui.showQuestions
                            .filter(index => index !== this.props.questionIndex);
                    } else {
                        newShowQuestions = this.props.ui.showQuestions.slice();
                        newShowQuestions.push(this.props.questionIndex);
                    }
                    this.props.actions.updateQuestionDisplay(newShowQuestions);
                }}
                open={this.props.ui.showQuestions.includes(this.props.questionIndex)}>
                <summary>
                    {`${this.props.vocab.PROJECT.QUESTION_ + (this.props.questionIndex + this.props.offset + 1)}: ${
                    this.props.question.text}${this.props.question.required ? ' *' : ''}`}
                </summary>
                <Questions className='question-container__questions'
                    {...this.props.question}
                    assessmentId={this.props.task.assessmentId}
                    answers={this.props.answers}
                    fileEntryMode={!this.props.stage.discussionParticipation}
                    displayMode={this.props.taskDisabled || this.props.stage.blindReview
                        || this.props.stage.discussionParticipation}
                    actions={this.props.actions}
                    vocab={this.props.vocab} />
                {this.props.showCommentForm &&
                    <ReviewPane
                        users={this.props.users}
                        profile={this.props.profile}
                        questionIndex={this.props.questionIndex + this.props.offset}
                        question={this.props.question}
                        answer={find(this.props.answers, answer =>
                            answer.questionId === this.props.question.id) || {}}
                        assessmentId={this.props.task.assessmentId}
                        answers={this.props.answers}
                        entryMode={this.props.stage.discussionParticipation}
                        displayMode={this.props.taskDisabled || this.props.stage.blindReview
                            || this.props.stage.allowEdit}
                        vocab={this.props.vocab } />
                }
            </details>
        );
    }
}

QuestionContainer.propTypes = {
    profile: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object),
    task: PropTypes.shape({
        assessmentId: PropTypes.number.isRequired,
    }).isRequired,
    actions: PropTypes.shape({
        upsertAnswer: PropTypes.func.isRequired,
        holdAnswer: PropTypes.func.isRequired,
    }).isRequired,
    taskDisabled: PropTypes.bool,
    question: PropTypes.shape({
        text: PropTypes.string.isRequired,
        required: PropTypes.bool,
        id: PropTypes.number.isRequired,
    }).isRequired,
    questionIndex: PropTypes.number.isRequired,
    answer: PropTypes.shape({
        questionId: PropTypes.number,
    }),
    answers: PropTypes.array,
    offset: PropTypes.number,
    vocab: PropTypes.object.isRequired,
};

export default QuestionContainer;
