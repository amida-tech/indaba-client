import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find, has, merge } from 'lodash';
import { toast } from 'react-toastify';
import { DateTime } from 'grommet';

import Bool from './Bool';
import Text from './Text';
import Choice from './Choice';
import Choices from './Choices';
import Time from '../../../../utils/Time';

class Questions extends Component {
    render() {
        let QuestionType;
        const value = find(this.props.answers, item => item.questionId === this.props.id);
        const upsertAnswer = answer => this.props.actions.upsertAnswer(
            this.props.assessmentId,
            this.props.id,
            answer,
            this.props.required,
            this.props.vocab.ERROR);
        switch (this.props.type) {
        case 'bool':
            QuestionType = (<Bool
                {...this.props}
                upsertAnswer = {upsertAnswer}
                answer={value ? value.answer : false} />);
            break;
        case 'choice':
            QuestionType = (<Choice
                {...this.props}
                upsertAnswer = {upsertAnswer}
                answer={value ? value.answer : undefined} />);
            break;
        case 'choices':
            QuestionType = (<Choices
                {...this.props}
                upsertAnswer = {upsertAnswer}
                answer={value ? value.answer : []} />);
            break;
        default:
            QuestionType = (<Text
                {...this.props}
                upsertAnswer = {upsertAnswer}
                answer={value ? value.answer : ''} />);
        }

        return (
            <div className='questions'>
                <div className='questions__type'>
                    {QuestionType}
                </div>
                {has(this.props, 'meta.file') && value &&
                    <div className='questions__option-panel'>
                        <div className='questions__file-select'
                            onClick={() => toast(this.props.vocab.ERROR.COMING_SOON)}>
                            {this.props.vocab.SURVEY.SELECT_FILE}
                        </div>
                        <span className='questions__label'>
                            {this.props.vocab.SURVEY.NO_FILE}
                        </span>
                    </div>
                }
                {has(this.props, 'meta.publication') && value &&
                    <div className='questions__option-panel'>
                        <div className='questions__link-fields-top'>
                            <span className='questions__add-link'>
                                {this.props.vocab.SURVEY.ADD_LINK}
                            </span>
                            <input className='questions__link-input'
                                type='text'
                                defaultValue={this.props.meta.publication.link || ''}
                                onBlur={event => this.props.actions.upsertMeta(
                                    this.props.assessmentId,
                                    this.props.id,
                                    merge(this.props.meta,
                                        { publication: { link: event.target.value } }),
                                    this.props.vocab.ERROR)} />
                        </div>
                        <div className='questions__link-fields-bottom'>
                            <input className='questions__title-input'
                                type='text'
                                defaultValue={this.props.meta.publication.title || ''}
                                placeholder={this.props.vocab.SURVEY.ENTER_PUBLICATION}
                                onBlur={event => this.props.actions.upsertMeta(
                                    this.props.assessmentId,
                                    this.props.id,
                                    merge(this.props.meta,
                                        { publication: { title: event.target.value } }),
                                    this.props.vocab.ERROR)} />
                            <input className='questions__author-input'
                                type='text'
                                value={this.props.meta.publication.author || ''}
                                placeholder={this.props.vocab.SURVEY.AUTHOR}
                                onBlur={event => this.props.actions.updateMeta(
                                    this.props.assessmentId,
                                    this.props.id,
                                    merge(this.props.meta,
                                        { publication: { author: event.target.value } }),
                                    this.props.vocab.ERROR)} />
                            <DateTime className='questions__date-input'
                                value={this.props.meta.publication.date}
                                format='MM/DD/YYYY'
                                onChange={(event) => {
                                    if (Time.validateTime(event)) {
                                        this.props.actions.updateMeta(
                                            this.props.assessmentId,
                                            this.props.id,
                                            merge(this.props.meta,
                                                { publication: { date: event.target.value } }),
                                            this.props.vocab.ERROR);
                                    }
                                }} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

Questions.propTypes = {
    type: PropTypes.string.isRequired,
    common: PropTypes.bool,
    text: PropTypes.string.isRequired,
    required: PropTypes.bool,
    choices: PropTypes.array,
};

export default Questions;
