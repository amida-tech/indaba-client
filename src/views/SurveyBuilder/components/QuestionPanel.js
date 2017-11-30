import React, { Component } from 'react';
import IonIcon from 'react-ionicons';
import { has } from 'lodash';
import { toast } from 'react-toastify';
import { DateTime, Menu } from 'grommet';

import Time from '../../../utils/Time';
// import PropTypes from 'prop-types';

class QuestionPanel extends Component {
    render() {
        return (
            <div className='question-panel'>
                <div className='question-panel__header'>
                    <div className='question-panel__question'>
                        <span className='question-panel__question-number'>
                            {`${this.props.vocab.PROJECT.QUESTION_ + (this.props.questionIndex + 1)}: `}
                        </span>
                        <input className='question-panel__question-text'
                            type='text'
                            placeholder={this.props.vocab.SURVEY.PHRASE_QUESTION}
                            value={this.props.question.text || ''}
                            onChange={event => this.props.actions.updateQuestion(
                                this.props.sectionIndex,
                                this.props.questionIndex,
                                'text',
                                event.target.value,
                            )} />
                    </div>
                    <Menu responsive={true}
                        icon={<IonIcon icon='ion-ios-more'
                            className='question-panel__more-icon'/>}>
                        <div className='question-panel__menu'>
                            <div className='question-panel__menu-button'
                                onClick={() => this.props.actions.moveQuestion(
                                    this.props.sectionIndex,
                                    this.props.questionIndex,
                                    -1,
                                    this.props.vocab.ERROR)}>
                                {this.props.vocab.SURVEY.MOVE_UP}
                            </div>
                            <div className='question-panel__menu-button'
                                onClick={() => this.props.actions.moveQuestion(
                                    this.props.sectionIndex,
                                    this.props.questionIndex,
                                    1,
                                    this.props.vocab.ERROR)}>
                                {this.props.vocab.SURVEY.MOVE_DOWN}
                            </div>
                            <div className='question-panel__menu-button'
                                onClick={() => this.props.actions.deleteQuestion(
                                    this.props.sectionIndex,
                                    this.props.questionIndex,
                                )}>
                                {this.props.vocab.SURVEY.DELETE_QUESTION}
                            </div>
                        </div>
                    </Menu>
                </div>
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
                    {this.props.question.type === 'choices' &&
                        <div className='question-panel__checkboxes'>
                            <input type='checkbox'
                                disabled={true} />
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

export default QuestionPanel;
