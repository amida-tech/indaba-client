import React, { Component } from 'react';
import IonIcon from 'react-ionicons';
import { has } from 'lodash';
import { toast } from 'react-toastify';
import { DateTime } from 'grommet';
import PropTypes from 'prop-types';

import StaticQuestion from './StaticQuestion';
import DynamicQuestion from './DynamicQuestion';
import { DYNAMIC, WEIGHTED } from '../constants';
import Time from '../../../utils/Time';

class QuestionPanel extends Component {
    render() {
        return (
            <div className='question-panel'>
                <div className='question-panel__header'>
                    <div className='question-panel__question'>
                        <span className='question-panel__question-number'>
                            {`${this.props.vocab.PROJECT.QUESTION_ + (this.props.questionIndex + 1)}: `}
                        </span>
                        <textarea className='question-panel__question-text'
                            placeholder={this.props.vocab.SURVEY.PHRASE_QUESTION}
                            value={this.props.question.text || ''}
                            onChange={event => this.props.actions.updateQuestion(
                                this.props.sectionIndex,
                                this.props.questionIndex,
                                'text',
                                event.target.value,
                            )} />
                    </div>
                    <button className='question-panel__menu-button'
                        onClick={() => this.props.actions.moveQuestion(
                            this.props.sectionIndex,
                            this.props.questionIndex,
                            -1,
                            this.props.vocab.ERROR)}>
                            <IonIcon icon='ion-arrow-up-c'
                                className='question-panel__menu-icon'/>
                    </button>
                    <button className='question-panel__menu-button'
                        onClick={() => this.props.actions.moveQuestion(
                            this.props.sectionIndex,
                            this.props.questionIndex,
                            1,
                            this.props.vocab.ERROR)}>
                            <IonIcon icon='ion-arrow-down-c'
                                className='question-panel__menu-icon'/>
                    </button>
                    <button className='question-panel__menu-button'
                        onClick={() => this.props.actions.deleteQuestion(
                            this.props.sectionIndex,
                            this.props.questionIndex,
                        )}>
                        <IonIcon icon='ion-trash-b'
                            className='question-panel__menu-icon'/>
                    </button>
                </div>
                {DYNAMIC.includes(this.props.question.type) ?
                    <DynamicQuestion {...this.props} /> :
                    <StaticQuestion
                        type={this.props.question.type}
                        vocab={this.props.vocab}/>
                }
                {has(this.props.question, 'meta.file') &&
                    <div className='question-panel__option-panel'>
                        <div className='question-panel__file-select'
                            onClick={() => toast(this.props.vocab.ERROR.COMING_SOON)}>
                            {this.props.vocab.SURVEY.SELECT_FILE}
                        </div>
                        <span className='question-panel__label'>
                            {this.props.vocab.SURVEY.NO_FILE}
                        </span>
                    </div>
                }
                {has(this.props.question, 'meta.publication') &&
                    <div className='question-panel__option-panel'>
                        <div className='question-panel__link-fields-top'>
                            <span className='question-panel__add-link'>
                                {this.props.vocab.SURVEY.ADD_LINK}
                            </span>
                            <input className='question-panel__link-input'
                                type='text'
                                value={this.props.question.meta.publication.link || ''}
                                onChange={event => this.props.actions.updateMeta(
                                    this.props.sectionIndex,
                                    this.props.questionIndex,
                                    'publication',
                                    { link: event.target.value },
                                )} />
                        </div>
                        <div className='question-panel__link-fields-bottom'>
                            <input className='question-panel__title-input'
                                type='text'
                                value={this.props.question.meta.publication.title || ''}
                                placeholder={this.props.vocab.SURVEY.ENTER_PUBLICATION}
                                onChange={event => this.props.actions.updateMeta(
                                    this.props.sectionIndex,
                                    this.props.questionIndex,
                                    'publication',
                                    { title: event.target.value },
                                )} />
                            <input className='question-panel__author-input'
                                type='text'
                                value={this.props.question.meta.publication.author || ''}
                                placeholder={this.props.vocab.SURVEY.AUTHOR}
                                onChange={event => this.props.actions.updateMeta(
                                    this.props.sectionIndex,
                                    this.props.questionIndex,
                                    'publication',
                                    { author: event.target.value },
                                )} />
                            <DateTime className='question-panel__date-input'
                                value={this.props.question.meta.publication.date}
                                format='MM/DD/YYYY'
                                onChange={(event) => {
                                    if (Time.validateTime(event)) {
                                        this.props.actions.updateMeta(
                                            this.props.sectionIndex,
                                        this.props.questionIndex,
                                        'publication',
                                        { date: event });
                                    }
                                }} />
                        </div>
                    </div>
                }
                <div className='question-panel__optional-controls'>
                    <div className='question-panel__additions'>
                        <div className='question-panel__checkboxes'>
                            <input type='checkbox'
                                value={has(this.props.question, 'meta.file')}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        this.props.actions.updateQuestion(
                                            this.props.sectionIndex,
                                            this.props.questionIndex,
                                            'meta',
                                            { file: true });
                                    } else {
                                        this.props.actions.resetMeta(
                                            this.props.sectionIndex,
                                            this.props.questionIndex,
                                            'file');
                                    }
                                }} />
                            <IonIcon icon='ion-paperclip'
                                className='question-panel__attach-icon' />
                            <span className='question-panel__icon-label'>
                                {this.props.vocab.SURVEY.ATTACH_FILE}
                            </span>
                        </div>
                        <div className='question-panel__checkboxes'>
                        <input type='checkbox'
                            value={has(this.props.question, 'meta.publication')}
                            onChange={(event) => {
                                if (event.target.checked) {
                                    this.props.actions.updateQuestion(
                                        this.props.sectionIndex,
                                        this.props.questionIndex,
                                        'meta',
                                        { publication: {} });
                                } else {
                                    this.props.actions.resetMeta(
                                        this.props.sectionIndex,
                                        this.props.questionIndex,
                                        'publication');
                                }
                            }} />
                            <span className='question-panel__label'>
                                {this.props.vocab.SURVEY.ADD_A_LINK}
                            </span>
                        </div>
                        <div className='question-panel__checkboxes'>
                            <input type='checkbox'
                                value={this.props.question.required}
                                onChange={event => this.props.actions.updateQuestion(
                                    this.props.sectionIndex,
                                    this.props.questionIndex,
                                    'required',
                                    event.target.checked)} />
                            <span className='question-panel__label'>
                                {this.props.vocab.SURVEY.REQUIRED_QUESTION}
                            </span>
                        </div>
                    </div>
                    {WEIGHTED.includes(this.props.question.type) &&
                        <div className='question-panel__checkboxes'>
                            <input type='checkbox'
                                value={has(this.props.question, 'meta.weight')}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        this.props.actions.updateQuestion(
                                            this.props.sectionIndex,
                                            this.props.questionIndex,
                                            'meta',
                                            { weight: true });
                                    } else {
                                        this.props.actions.resetMeta(
                                            this.props.sectionIndex,
                                            this.props.questionIndex,
                                            'weight');
                                    }
                                }}/>
                            <span className='question-panel__label'>
                                {this.props.vocab.SURVEY.WEIGHT}
                            </span>
                            <IonIcon icon='ion-help-circled'
                                className='question-panel__help-icon' />
                        </div>}
                </div>
            </div>
        );
    }
}

QuestionPanel.propTypes = {
    ui: PropTypes.object.isRequired,
    sectionIndex: PropTypes.number.isRequired,
    questionIndex: PropTypes.number.isRequired,
    question: PropTypes.shape({
        id: PropTypes.number,
        type: PropTypes.string.isRequired,
        text: PropTypes.string,
        required: PropTypes.bool,
    }),
    actions: PropTypes.object,
    vocab: PropTypes.object.isRequired,
};

export default QuestionPanel;
