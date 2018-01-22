import React, { Component } from 'react';
import IonIcon from 'react-ionicons';
import PropTypes from 'prop-types';
import { get, has, keys } from 'lodash';

class DynamicQuestion extends Component {
    render() {
        let QuestionDisplay;
        if (this.props.question.type === 'scale') {
            const scaleValues = keys(this.props.vocab.SURVEY.SCALE_VALUES);
            QuestionDisplay = (
                <div className='dynamic-question__scale'>
                    {scaleValues.map(value =>
                        <div className='dynamic-question__scale-field'
                            key={this.props.sectionIndex + this.props.questionIndex +
                                this.props.question.type + value}>
                            <span className='dynamic-question__scale-label'>
                                {this.props.vocab.SURVEY.SCALE_VALUES[value]}
                            </span>
                            <input className='dynamic-question__scale-input'
                                type='number'
                                placeholder={0}
                                value={get(this.props.question, 'scaleLimits[value.toLowerCase()]', '')}
                                onBlur={event => this.props.actions.upsertScale(
                                    this.props.sectionIndex,
                                    this.props.questionIndex,
                                    value === 'MAX',
                                    event.target.value,
                                )} />
                        </div>,
                    )}
                </div>);
        } else {
            QuestionDisplay = (
                <div className={'dynamic-question__choices'}>
                    {this.props.question.choices.map((choice, index) =>
                        <div className='dynamic-question__choices-fields'
                            key={this.props.sectionIndex + this.props.questionIndex +
                                this.props.question.type + index}>
                            <div className='dynamic-question__choices-group'>
                                <input className='dynamic-question__choices__input'
                                    type='text'
                                    placeholder={this.props.vocab.SURVEY.CHOICE_ENTER}
                                    value={choice.text || ''}
                                    onChange={event => this.props.actions.upsertChoice(
                                        this.props.sectionIndex,
                                        this.props.questionIndex,
                                        index,
                                        event.target.value,
                                    )} />
                                <button className='dynamic-question__masked-button'
                                    onClick={() => this.props.actions.upsertChoice(
                                        this.props.sectionIndex,
                                        this.props.questionIndex,
                                        index,
                                        )}>
                                    <IonIcon icon='ion-ios-plus'
                                        className='dynamic-question__icon'/>
                                </button>
                                <button className='dynamic-question__masked-button'
                                    onClick={() => this.props.actions.deleteChoice(
                                        this.props.sectionIndex,
                                        this.props.questionIndex,
                                        index,
                                        )}>
                                    <IonIcon icon='ion-trash-b'
                                        className='dynamic-question__icon'/>
                                </button>
                            </div>
                            {has(this.props.question, 'meta.weight') &&
                                <input className='dynamic-question__weight-input'
                                    placeholder={0}
                                    defaultValue={get(this.props.question, `choices[${index}].weight`, undefined)}
                                    onBlur={event => this.props.actions.upsertWeight(
                                        this.props.sectionIndex,
                                        this.props.questionIndex,
                                        index,
                                        event.target.value,
                                        )} />
                            }
                        </div>,
                            )}
                </div>);
        }
        return (
            <div className='dynamic-question'>
                <div className='dynamic-question__instructions'>
                    {get(this.props.question, 'meta.subType') === 'dropdown' ?
                        this.props.vocab.SURVEY.QUESTIONS_EXPLAINED.DROPDOWN :
                        this.props.vocab.SURVEY.QUESTIONS_EXPLAINED[
                            this.props.question.type.toUpperCase()]}
                </div>
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
