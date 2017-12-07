import React, { Component } from 'react';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Element from 'react-scroll/modules/components/Element';
import PropTypes from 'prop-types';

// import ReviewPane from './ReviewPane'; // TODO: INBA-436.
import Questions from '../../../common/components/Questions';

class QuestionContainer extends Component {
    render() {
        return (
            <Element name={`question${this.props.index}`}
                className='question-container'>
                <AccordionPanel className='question-container__heading'
                    heading={this.props.vocab.PROJECT.QUESTION_ + (this.props.index + 1)
                        + (this.props.question.required ? ' *' : '')}
                    {...this.props}>
                    <Questions className='question-container__questions'
                        {...this.props.question}
                        assessmentId={this.props.assessmentId}
                        answers={this.props.answers}
                        actions={this.props.actions}
                        vocab={this.props.vocab} />
                </AccordionPanel>
            </Element>
        );
    }
}

QuestionContainer.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default QuestionContainer;
