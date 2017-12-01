import React, { Component } from 'react';
import { keys } from 'lodash';
import IonIcon from 'react-ionicons';
import PropTypes from 'prop-types';

import { DYNAMIC } from '../../constants';

class NewQuestions extends Component {
    render() {
        return (
            <div className='new-questions'>
                {keys(this.props.vocab.SURVEY.QUESTIONS_TYPES).map((type) => {
                    return (
                        <div className='new-questions__types'
                            key={`question-type${type}`}
                            onClick={() => {
                                const newQuestion = { type: type.toLowerCase(), text: '', required: false };
                                if (DYNAMIC.contains(newQuestion.type)) {
                                    newQuestion.choices = [{ text: '' }, { text: '' }];
                                }
                                this.props.actions.insertQuestion(
                                this.props.sectionView,
                                newQuestion,
                            );
                            }}>
                            {this.props.vocab.SURVEY.QUESTIONS_TYPES[type]}
                        </div>
                    );
                })}
                <div className='new-questions__break'
                    onClick={() =>
                        this.props.actions.insertSection()}>
                    {this.props.vocab.SURVEY.SECTION_BREAK}
                    <IonIcon icon='ion-minus'
                        className='new-questions__section-icon'/>
                </div>
            </div>
        );
    }
}

NewQuestions.propTypes = {
    sectionView: PropTypes.number.isRequired,
    actions: PropTypes.object,
    vocab: PropTypes.object.isRequired,
};

export default NewQuestions;
