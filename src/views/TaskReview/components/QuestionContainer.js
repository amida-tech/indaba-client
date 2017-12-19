import React, { Component } from 'react';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Element from 'react-scroll/modules/components/Element';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import ReviewPane from './ReviewPane';
import Questions from './Questions';

// For review pane expsure, check src\views\ProjectManagement\components\Modals\Stage\index.js
class QuestionContainer extends Component {
    render() {
        return (
            <Element name={`question${this.props.questionIndex}`}
                className='question-container'>
                <AccordionPanel className='question-container__heading'
                    heading={this.props.vocab.PROJECT.QUESTION_ + (this.props.questionIndex + 1)
                        + (this.props.question.required ? ' *' : '')}
                    {...this.props}>
                    <Questions className='question-container__questions'
                        {...this.props.question}
                        assessmentId={this.props.assessmentId}
                        answers={this.props.answers}
                        displayMode={this.props.taskDisabled || this.props.stage.blindReview
                            || this.props.stage.discussionParticipation}
                        actions={this.props.actions}
                        vocab={this.props.vocab} />
                    {(this.props.stage.allowEdit || this.props.stage.discussionParticipation) &&
                        <ReviewPane
                            users={this.props.users}
                            profile={this.props.profile}
                            questionIndex={this.props.questionIndex}
                            question={this.props.question}
                            users={this.props.users}
                            comments={find(this.props.answers, answer =>
                                answer.questionId === this.props.question.id).comments || []}
                            displayMode={this.props.taskDisabled}
                            vocab={this.props.vocab }
                            onSubmit={(values) => {
                                console.log('James look here.');
                                console.log(values);
                                // this.props.actions.updateProfile(
                                //     values,
                                //     this.props.vocab.ERROR);
                            }}/>
                    }
                </AccordionPanel>
            </Element>
        );
    }
}

QuestionContainer.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default QuestionContainer;
