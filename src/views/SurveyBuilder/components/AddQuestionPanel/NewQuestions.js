import React, { Component } from 'react';
import { keys } from 'lodash';
import IonIcon from 'react-ionicons';

class NewQuestions extends Component {
    render() {
        return (
            <div className='new-questions'>
                {keys(this.props.vocab.SURVEY.QUESTIONS_TYPES).map((type) => {
                    return (
                        <div className='new-questions__types'
                            key={`question-type${type}`}
                            onClick={() => this.props.actions.insertQuestion(
                                this.props.sectionView,
                                { type: type.toLowerCase(), text: '', required: false },
                            )}>
                            {this.props.vocab.SURVEY.QUESTIONS_TYPES[type]}
                        </div>
                    );
                })}
                <div className='new-questions__break'
                    onClick={() =>
                        this.props.actions.insertSection(this.props.vocab.SURVEY.SECTION_)}>
                    {this.props.vocab.SURVEY.SECTION_BREAK}
                    <IonIcon icon='ion-minus'
                        className='new-questions__section-icon'/>
                </div>
            </div>
        );
    }
}

export default NewQuestions;
