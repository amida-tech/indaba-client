import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Field, reduxForm, formValueSelector, change,
} from 'redux-form';

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
        return (
            <form className='export' onSubmit={this.props.handleSubmit}>
                <div className='export__wrapper'>
                    <div className='export__instructions'>
                        {this.props.vocab.EXPORT.INSTRUCTIONS}
                    </div>
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
                    </div>
                    <div className='export__download'>
                        <div className='export__download-instruction'>
                            {this.props.vocab.EXPORT.DOWNLOAD_YOUR_DATA}
                        </div>
                        <button type='submit'
                            className='export__export-button'>
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
