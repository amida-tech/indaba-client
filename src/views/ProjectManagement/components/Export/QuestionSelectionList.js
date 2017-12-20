import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { questionListFromSurvey } from '../../../../utils/Survey';

class QuestionSelectionList extends Component {
    render() {
        return (
            <div className='question-selection-list'>
                {
                    questionListFromSurvey(this.props.survey)
                    .map((question, index) =>
                    <div key={question.id}
                        className='question-selection-list__entry'
                        onClick={!this.props.disabled && (() => this.props.onClick(
                            Object.assign({}, question, { displayIndex: index + 1 })))}>
                        <div className='question-selection-list__header'>
                            {`${this.props.vocab.PROJECT.QUESTION_} ${index + 1}`}
                        </div>
                        <div className='question-selection-list__text'>
                            {question.text}
                        </div>
                    </div>)
                }
            </div>
        );
    }
}

QuestionSelectionList.propTypes = {
    survey: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default QuestionSelectionList;
