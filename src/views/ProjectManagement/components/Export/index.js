import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';

import DeleteList from './DeleteList';
import QuestionSelectionList from './QuestionSelectionList';

class Export extends Component {
    constructor(props) {
        super(props);

        this.addAllSubjects = this.addAllSubjects.bind(this);
        this.handleSubjectsChange = this.handleSubjectsChange.bind(this);
    }
    addAllSubjects() {
        this.props.setValue('subjectsList', [...this.props.subjects]);
    }
    handleSubjectsChange(event, newValue) {
        if (newValue) {
            this.addAllSubjects();
        }
    }
    render() {
        const quickType = this.props.selectedType === 'quick';
        const customType = this.props.selectedType === 'custom';
        return (
            <form className='export'>
                <div className='export__instructions'>
                    {this.props.vocab.EXPORT.INSTRUCTIONS}
                </div>
                <div className='export__interactions'>
                    <div className='export__configuration'>
                        <div className={`export__type-section ${!quickType ? 'export__type-section--inactive' : ''}`}>
                            <label className='export__type-label'>
                                <Field name='exportType'
                                    component='input'
                                    type='radio'
                                    value='quick'
                                    className='export__type-input' />
                                {this.props.vocab.EXPORT.QUICK_EXPORT}
                            </label>
                            <div className='export__explanation'>
                                {this.props.vocab.EXPORT.QUICK_EXPORT_EXPLANATION}
                            </div>
                        </div>
                        <div className={`export__type-section ${!customType ? 'export__type-section--inactive' : ''}`}>
                            <label className='export__type-label'>
                                <Field name='exportType'
                                    component='input'
                                    type='radio'
                                    value='custom'
                                    className='export__type-input' />
                                {this.props.vocab.EXPORT.CUSTOM_EXPORT}
                            </label>
                            <div className='export__explanation'>
                                {this.props.vocab.EXPORT.CUSTOM_EXPORT_EXPLANATION}
                            </div>
                            <div className='export__custom-choices'>
                                <label className='export__custom-choice'>
                                    <Field name='subjects'
                                        component='input'
                                        disabled={!customType}
                                        onChange={this.handleSubjectsChange}
                                        type='checkbox' />
                                    {this.props.vocab.EXPORT.CUSTOM_SUBJECTS}
                                </label>
                                <label className='export__custom-choice'>
                                    <Field name='files'
                                        component='input'
                                        disabled={!customType}
                                        type='checkbox' />
                                    {this.props.vocab.EXPORT.INCLUDE_FILES_LINKS}
                                </label>
                                <label className='export__custom-choice'>
                                    <Field name='comments'
                                        component='input'
                                        disabled={!customType}
                                        type='checkbox' />
                                    {this.props.vocab.EXPORT.INCLUDE_COMMENTS}
                                </label>
                                <label className='export__custom-choice'>
                                    <Field name='questions'
                                        component='input'
                                        disabled={!customType}
                                        type='checkbox' />
                                    {this.props.vocab.EXPORT.CUSTOM_QUESTIONS}
                                </label>
                                <label className='export__custom-choice'>
                                    <Field name='flags'
                                        component='input'
                                        disabled={!customType}
                                        type='checkbox' />
                                    {this.props.vocab.EXPORT.INCLUDE_FLAGS}
                                </label>
                            </div>
                        </div>
                        {
                            this.props.showSubjectsList &&
                            <Field name='subjectsList' disabled={!customType}
                                vocab={this.props.vocab}
                                component={props => (
                                    <div className={`export__custom-section ${!customType ? 'export__custom-section--inactive' : ''}`}>
                                        <div className='export__custom-title'>
                                            {this.props.vocab.EXPORT.ENTER_SUBJECTS}
                                        </div>
                                        <div className='export__custom-actions'>
                                            <div className='export__custom-action'
                                                onClick={customType && (() =>
                                                    props.input.onChange(this.props.subjects))}>
                                                {this.props.vocab.EXPORT.ADD_ALL_SUBJECTS}
                                            </div>
                                            <div className='export__custom-action'
                                                onClick={customType && (() =>
                                                    props.input.onChange([]))}>
                                                {this.props.vocab.EXPORT.REMOVE_ALL_SUBJECTS}
                                            </div>
                                        </div>
                                        <DeleteList {...props} />
                                    </div>
                                )} />
                        }
                        {
                            this.props.showQuestionsList &&
                            <Field name='questionsList' disabled={!customType}
                                format={value => value.map(({ text, id }) => ({ name: text, id }))}
                                vocab={this.props.vocab}
                                component={props => (
                                    <div className={`export__custom-section ${!customType ? 'export__custom-section--inactive' : ''}`}>
                                        <div className='export__custom-title'>
                                            {this.props.vocab.EXPORT.SELECT_QUESTIONS}
                                        </div>
                                        <div className='export__custom-actions'>
                                            <div className='export__custom-action'
                                                onClick={customType &&
                                                    (() => props.input.onChange(
                                                        this.props.survey.questions))}>
                                                {this.props.vocab.EXPORT.ADD_ALL_QUESTIONS}
                                            </div>
                                            <div className='export__custom-action'
                                                onClick={customType &&
                                                    (() => props.input.onChange([]))}>
                                                {this.props.vocab.EXPORT.REMOVE_ALL_QUESTIONS}
                                            </div>
                                        </div>
                                        <DeleteList {...props} />
                                        <QuestionSelectionList
                                            questions={this.props.survey.questions}
                                            onClick={() => null}
                                            vocab={this.props.vocab}/>
                                    </div>
                                )} />
                        }
                    </div>
                    <div className='export__download'>
                        <div className='export__download-instruction'>
                            {this.props.vocab.EXPORT.DOWNLOAD_YOUR_DATA}
                        </div>
                        <button type='submit'>
                            {this.props.vocab.EXPORT.EXPORT_CSV}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

Export.propTypes = {
    vocab: PropTypes.object.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

const selector = formValueSelector('export');

export default connect(state => ({
    selectedType: selector(state, 'exportType'),
    showSubjectsList: selector(state, 'subjects'),
    showQuestionsList: selector(state, 'questions'),
}), dispatch => ({
    setValue: (field, value) => dispatch(change('export', field, value)),
}))(
    reduxForm({
        form: 'export',
        initialValues:
        {
            exportType: 'quick',
            subjectsList: [],
            questionsList: [],
        },
    })(Export),
);
