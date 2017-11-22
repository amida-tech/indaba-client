import React, { Component } from 'react';
import { keys } from 'lodash';

class NewQuestions extends Component {
    render() {
        return (
            <div className='new-questions'>
                {keys(this.props.vocab.SURVEY.QUESTIONS_TYPES).map((type) => {
                    return (
                        <div className='new-questions__types'
                            key={`question-type${type}`}
                            onClick={() => this.props.formActions.questionPush(
                                `sections[${Math.max(this.props.sectionIndex, 0)}].questions`,
                                { type: type.toLowerCase(), text: '', required: false },
                            )}>
                            {this.props.vocab.SURVEY.QUESTIONS_TYPES[type]}
                        </div>
                    );
                })}
                <div className='new-questions__break'
                    onClick={() => this.props.formActions.sectionPush({ name: '', questions: [] })}>
                    {this.props.vocab.SURVEY.SECTION_BREAK}
                </div>
            </div>
        );
    }
}

export default NewQuestions;
