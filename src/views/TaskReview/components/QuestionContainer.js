import React, { Component } from 'react';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Element from 'react-scroll/modules/components/Element';
import PropTypes from 'prop-types';

import ReviewPane from './ReviewPane';
import Questions from './Questions';

// For review pane expsure, check src\views\ProjectManagement\components\Modals\Stage\index.js
class QuestionContainer extends Component {
    render() {
        return (
            <Element name={`question${this.props.index}`}
                className='question-container'>
                <AccordionPanel
                    heading={this.props.vocab.PROJECT.QUESTION_ + (this.props.index + 1)
                        + (this.props.question.required ? ' *' : '')}
                    {...this.props}>
                    <Questions
                        {...this.props.question}
                        assessmentId={this.props.assessmentId}
                        answers={this.props.answers}
                        displayMode={this.props.stage.blindReview ||
                            this.props.stage.discussionParticipation}
                        actions={this.props.actions}
                        vocab={this.props.vocab} />
                    {(this.props.stage.allowEdit || this.props.stage.discussionParticipation) &&
                        <ReviewPane
                            question={this.props.question}
                            assessmentId={this.props.assessmentId}
                            answers={this.props.answers}
                            displayMode={this.props.stage.discussionParticipation}
                            actions={this.props.actions}
                            vocab={this.props.vocab} />}
                </AccordionPanel>
            </Element>
        );
    }
}

QuestionContainer.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default QuestionContainer;
