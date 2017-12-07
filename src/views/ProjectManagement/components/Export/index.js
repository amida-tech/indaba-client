import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';

import DeleteList from './DeleteList';

class Export extends Component {
    constructor(props) {
        super(props);

        this.removeAllSubjects = this.removeAllSubjects.bind(this);
        this.addAllSubjects = this.addAllSubjects.bind(this);
        this.handleSubjectsChange = this.handleSubjectsChange.bind(this);
    }
    removeAllSubjects() {
        this.props.setValue('subjectsList', []);
    }
    addAllSubjects() {
        this.props.setValue('subjectsList', this.props.subjects.map(({ name, id }) => ({ name, key: id })));
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
                            <div className={`export__custom-section ${!customType ? 'export__custom-section--inactive' : ''}`}>
                                <div className='export__custom-title'>
                                    {this.props.vocab.EXPORT.ENTER_SUBJECTS}
                                </div>
                                <div className='export__custom-actions'>
                                    <div className='export__custom-action'
                                        onClick={this.addAllSubjects}>
                                        {this.props.vocab.EXPORT.ADD_ALL_SUBJECTS}
                                    </div>
                                    <div className='export__custom-action'
                                        onClick={this.removeAllSubjects}>
                                        {this.props.vocab.EXPORT.REMOVE_ALL_SUBJECTS}
                                    </div>
                                </div>
                                <Field name='subjectsList'
                                    component={DeleteList}
                                    disabled={!customType}/>
                            </div>
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
}), dispatch => ({
    setValue: (field, value) => dispatch(change('export', field, value)),
}))(
    reduxForm({ form: 'export', initialValues: { exportType: 'quick', subjectsList: [] } })(Export),
);
