import React, { Component } from 'react';
import IonIcon from 'react-ionicons';
import PropTypes from 'prop-types';
import { get, has } from 'lodash';
import { toast } from 'react-toastify';

class DynamicQuestion extends Component {
    render() {
        let QuestionDisplay;
        if (this.props.question.type === 'scale') {
            QuestionDisplay = (
                <div className='dynamic-question__scale'>
                    <div className='dynamic-question__scale-field'>
                        <span className='dynamic-question__scale-label'>
                            {this.props.vocab.SURVEY.SCALE_VALUES.MAX}
                        </span>
                        <input className='dynamic-question__scale-input'
                            type='number'
                            placeholder={10}
                            min={get(this.props.question, 'scaleLimits.min', 1) + 1}
                            value={get(this.props.question, 'scaleLimits.max', '')}
                            onChange={(event) => {
                                this.props.actions.upsertScale(this.props.sectionIndex,
                                    this.props.questionIndex,
                                    true,
                                    parseInt(event.target.value, 10));
                            }}
                            onBlur={(event) => {
                                let value = parseInt(event.target.value, 10);
                                const minValue = get(this.props.question, 'scaleLimits.min', 1);
                                if (value < minValue) {
                                    toast(this.props.vocab.ERROR.MIN_MAX_INVALID);
                                    value = minValue + 1;
                                }
                                this.props.actions.upsertScale(this.props.sectionIndex,
                                    this.props.questionIndex, true, value);
                            }} />
                    </div>
                    <div className='dynamic-question__scale-field'>
                        <span className='dynamic-question__scale-label'>
                            {this.props.vocab.SURVEY.SCALE_VALUES.MIN}
                        </span>
                        <input className='dynamic-question__scale-input'
                            type='number'
                            placeholder={0}
                            max={get(this.props.question, 'scaleLimits.max', 10) - 1}
                            value={get(this.props.question, 'scaleLimits.min', '')}
                            onChange={(event) => {
                                this.props.actions.upsertScale(this.props.sectionIndex,
                                    this.props.questionIndex,
                                    false,
                                    parseInt(event.target.value, 10));
                            }}
                            onBlur={(event) => {
                                let value = parseInt(event.target.value, 10);
                                const maxValue = get(this.props.question, 'scaleLimits.max', 10);
                                if (value > maxValue) {
                                    toast(this.props.vocab.ERROR.MIN_MAX_INVALID);
                                    value = maxValue - 1;
                                }
                                this.props.actions.upsertScale(this.props.sectionIndex,
                                    this.props.questionIndex, false, value);
                            }} />
                    </div>
                </div>);
        } else {
            QuestionDisplay = (
                <div className={'dynamic-question__choices'}>
                    {this.props.question.choices.map((choice, index) => <div className='dynamic-question__choices-fields'
                        key={this.props.sectionIndex + this.props.questionIndex
                                + this.props.question.type + index}>
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
                        {has(this.props.question, 'meta.weight')
                                && <input className='dynamic-question__weight-input'
                                    placeholder={0}
                                    defaultValue={get(this.props.question, `choices[${index}].weight`, undefined)}
                                    onBlur={event => this.props.actions.upsertWeight(
                                        this.props.sectionIndex,
                                        this.props.questionIndex,
                                        index,
                                        event.target.value,
                                    )} />
                        }
                    </div>)}
                </div>);
        }
        return (
            <div className='dynamic-question'>
                <div className='dynamic-question__instructions'>
                    {get(this.props.question, 'meta.subType') === 'dropdown'
                        ? this.props.vocab.SURVEY.QUESTIONS_EXPLAINED.DROPDOWN
                        : this.props.vocab.SURVEY.QUESTIONS_EXPLAINED[
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
        choices: PropTypes.array,
        scaleLimits: PropTypes.shape({
            min: PropTypes.number,
            max: PropTypes.number,
        }),
    }).isRequired,
    actions: PropTypes.object,
    vocab: PropTypes.object.isRequired,
};

export default DynamicQuestion;
