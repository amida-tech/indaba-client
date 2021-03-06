import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    find, get, has, merge, omit,
} from 'lodash';
import FileForm from './FileForm';
import FilePane from './FilePane';
import Bullet from './Bullet';
import Choice from './Choice';
import Choices from './Choices';
import Date from './Date';
import Dropdown from './Dropdown';
import Integer from './Integer';
import Scale from './Scale';
import Text from './Text';
import Time from '../../../../utils/Time';
import SingleDatePicker from '../../../../common/components/Dates/SingleDateInput';

class Questions extends Component {
    render() {
        let QuestionType;
        const value = find(this.props.answers, item => item.questionId === this.props.id);
        const upsertAnswer = newAnswer => this.props.actions.upsertAnswer(
            this.props.assessmentId,
            this.props.id,
            newAnswer,
            get(value, 'meta', undefined),
            this.props.vocab.ERROR,
        );
        switch (this.props.type) {
        case 'bullet':
            QuestionType = (<Bullet
                {...this.props}
                holdAnswer={this.props.actions.holdAnswer}
                upsertAnswer = {upsertAnswer}
                answer={value ? value.answer : ''} />);
            break;
        case 'date':
            QuestionType = (<Date
                {...this.props}
                upsertAnswer={upsertAnswer}
                id={this.props.id}
                answer={value ? value.answer : undefined} />);
            break;
        case 'choice':
            QuestionType = (get(this.props, 'meta.subType') === 'dropdown')
                ? (<Dropdown
                    {...this.props}
                    upsertAnswer = {upsertAnswer}
                    answer={value ? value.answer : undefined} />)
                : (<Choice
                    {...this.props}
                    upsertAnswer = {upsertAnswer}
                    answer={value ? value.answer : undefined} />);
            break;
        case 'choices':
            QuestionType = (<Choices
                {...this.props}
                upsertAnswer = {upsertAnswer}
                answer={value ? value.answer : {}} />);
            break;
        case 'integer':
            QuestionType = (<Integer
                {...this.props}
                upsertAnswer = {upsertAnswer}
                answer={value ? value.answer : ''} />);
            break;
        case 'scale':
            QuestionType = (<Scale
                {...this.props}
                holdAnswer={this.props.actions.holdAnswer}
                upsertAnswer = {upsertAnswer}
                answer={value ? value.answer : ''} />);
            break;
        default:
            QuestionType = (<Text
                {...this.props}
                upsertAnswer={upsertAnswer}
                answer={value ? value.answer : ''} />);
        }
        const noValue = !has(value, 'answer');
        return (
            <div className='questions'>
                <div className='questions__type'>
                    {QuestionType}
                </div>
                {has(this.props, 'meta.file')
                    && <div className='questions__option-panel'>
                        {this.props.fileEntryMode
                            ? <FileForm
                                form={`file-form-${this.props.id}`}
                                vocab={this.props.vocab}
                                disabled={noValue || this.props.displayMode}
                                file={get(value, 'meta.file')}
                                onFileUploaded={(file) => {
                                    this.props.actions.upsertAnswer(
                                        this.props.assessmentId,
                                        this.props.id,
                                        value.answer,
                                        merge(value.meta, { file }),
                                        this.props.vocab.ERROR,
                                    );
                                }}
                                onFileRemoved={() => {
                                    this.props.actions.upsertAnswer(
                                        this.props.assessmentId,
                                        this.props.id,
                                        value.answer,
                                        omit(value.meta, 'file'),
                                        this.props.vocab.ERROR,
                                    );
                                }}/>
                            : <FilePane
                                vocab={this.props.vocab}
                                disabled={noValue || this.props.displayMode}
                                file={get(value, 'meta.file')} />}
                    </div>
                }
                {has(this.props, 'meta.publication')
                    && <div className='questions__option-panel'>
                        <div className='questions__link-fields-top'>
                            <span className='questions__add-link'>
                                {this.props.vocab.SURVEY.ADD_LINK}
                            </span>
                            <input className='questions__link-input'
                                type='text'
                                disabled={noValue || this.props.displayMode}
                                defaultValue={get(value, 'meta.publication.link', '')}
                                onBlur={event => this.props.actions.upsertAnswer(
                                    this.props.assessmentId,
                                    this.props.id,
                                    value.answer,
                                    merge(value.meta,
                                        { publication: { link: event.target.value } }),
                                    this.props.vocab.ERROR,
                                )} />
                        </div>
                        <div className='questions__link-fields-bottom'>
                            <input className='questions__title-input'
                                type='text'
                                disabled={noValue || this.props.displayMode}
                                defaultValue={get(value, 'meta.publication.title', '')}
                                placeholder={this.props.vocab.SURVEY.ENTER_PUBLICATION}
                                onBlur={event => this.props.actions.upsertAnswer(
                                    this.props.assessmentId,
                                    this.props.id,
                                    value.answer,
                                    merge(value.meta,
                                        { publication: { title: event.target.value } }),
                                    this.props.vocab.ERROR,
                                )} />
                            <input className='questions__author-input'
                                type='text'
                                disabled={noValue || this.props.displayMode}
                                defaultValue={get(value, 'meta.publication.author', '')}
                                placeholder={this.props.vocab.SURVEY.AUTHOR}
                                onBlur={event => this.props.actions.upsertAnswer(
                                    this.props.assessmentId,
                                    this.props.id,
                                    value.answer,
                                    merge(value.meta,
                                        { publication: { author: event.target.value } }),
                                    this.props.vocab.ERROR,
                                )} />
                            <SingleDatePicker className='questions__date-input'
                                value={get(value, 'meta.publication.date')}
                                align='right'
                                placeholder={this.props.vocab.COMMON.ENTER_DATE}
                                disabled={(noValue || this.props.displayMode)}
                                onDateChange={(event) => {
                                    if (Time.validateTime(event)) {
                                        this.props.actions.upsertAnswer(
                                            this.props.assessmentId,
                                            this.props.id,
                                            value.answer,
                                            merge(value.meta,
                                                { publication: { date: event } }),
                                            this.props.vocab.ERROR,
                                        );
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
    vocab: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    common: PropTypes.bool,
    text: PropTypes.string.isRequired,
    choices: PropTypes.array,
    questionIndex: PropTypes.number,
};

export default Questions;
