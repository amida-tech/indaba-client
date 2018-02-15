import React, { Component } from 'react';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Element from 'react-scroll/modules/components/Element';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import ReviewPane from './ReviewPane';
import Questions from './Questions';

class QuestionContainer extends Component {
    render() {
        return (
            <Element name={`question${this.props.questionIndex}`}
                className='question-container'>
                {this.props.question.sectionName &&
                    <div className='question-container__section-name'>
                        {this.props.question.sectionName}
                    </div> }
                <AccordionPanel className='question-container__heading'
                    heading={`${this.props.vocab.PROJECT.QUESTION_ + (this.props.questionIndex + this.props.offset + 1)}: ${
                        this.props.question.text}${this.props.question.required ? ' *' : ''}`}
                    {...this.props}>
                    <Questions className='question-container__questions'
                        {...this.props.question}
                        assessmentId={this.props.task.assessmentId}
                        answers={this.props.answers}
                        displayMode={this.props.taskDisabled || this.props.stage.blindReview
                            || this.props.stage.discussionParticipation}
                        actions={this.props.actions}
                        vocab={this.props.vocab} />
                    {this.props.stage.discussionParticipation &&
                        <ReviewPane
                            users={this.props.users}
                            profile={this.props.profile}
                            questionIndex={this.props.questionIndex}
                            question={this.props.question}
                            answer={find(this.props.answers, answer =>
                                answer.questionId === this.props.question.id) || {}}
                            assessmentId={this.props.task.assessmentId}
                            answers={this.props.answers}
                            displayMode={this.props.taskDisabled}
                            vocab={this.props.vocab } />
                    }
                </AccordionPanel>
            </Element>
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
