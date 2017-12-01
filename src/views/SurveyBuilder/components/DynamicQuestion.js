import React, { Component } from 'react';
import IonIcon from 'react-ionicons';
import PropTypes from 'prop-types';

class DynamicQuestion extends Component {
    render() {
        let QuestionDisplay;
        if (this.props.type === 'scale') {
            QuestionDisplay = (
                <div className='dynamic-question__scale'>
                </div>);
        } else {
            QuestionDisplay = (
                <div className={'dynamic-question__choices'}>
                    {this.props.question.choices.map((choice, index) =>
                        <div className='dynamic-question__choices-entries'
                            key={this.props.sectionIndex + this.props.questionIndex +
                                this.props.question.type + index}>
                            <input className='dynamic-question__choices-input'
                                type='text'
                                placeholder={this.props.vocab.SURVEY.CHOICE_ENTER}
                                value={choice.text} />
                            <button className='dynamic-question__masked-button'
                                onClick={() => console.log('coming soon')}>
                                <IonIcon icon='ion-ios-plus'
                                    className='dynamic-question__icon'/>
                            </button>
                            <button className='dynamic-question__masked-button'
                                onClick={() => console.log('coming soon')}>
                                <IonIcon icon='ion-trash-b'
                                    className='dynamic-question__icon'/>
                            </button>
                        </div>,
                            )}
                </div>);
        }
        return (
            <div className='dynamic-question'>
                <span className='dynamic-question__instructions'>
                    {this.props.vocab.SURVEY.QUESTIONS_EXPLAINED[
                        this.props.question.type.toUpperCase()]}
                </span>
                {QuestionDisplay}
            </div>
        );
    }
}

DynamicQuestion.propTypes = {
    sectionIndex: PropTypes.number.isRequired,
    questionIndex: PropTypes.number.isRequired,
    question: PropTypes.shape({
        type: PropTypes.string.isRequired,
        text: PropTypes.string,
        choices: PropTypes.array.isRequired,
    }).isRequired,
    actions: PropTypes.object,
    vocab: PropTypes.object.isRequired,
};

export default DynamicQuestion;
