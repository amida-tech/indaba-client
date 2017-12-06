import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

class Export extends Component {
    render() {
        return (
            <form className='export'>
                <div className='export__instructions'>
                    {this.props.vocab.EXPORT.INSTRUCTIONS}
                </div>
                <div className='export__interactions'>
                    <div className='export__configuration'>
                        <div className='export__type-section'>
                            <label className='export__type-label'>
                                <Field name='export-type'
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
                        <div className='export__type-section'>
                            <label className='export__type-label'>
                                <Field name='export-type'
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
                                        type='checkbox' />
                                    {this.props.vocab.EXPORT.CUSTOM_SUBJECTS}
                                </label>
                                <label className='export__custom-choice'>
                                    <Field name='files'
                                        component='input'
                                        type='checkbox' />
                                    {this.props.vocab.EXPORT.INCLUDE_FILES_LINKS}
                                </label>
                                <label className='export__custom-choice'>
                                    <Field name='comments'
                                        component='input'
                                        type='checkbox' />
                                    {this.props.vocab.EXPORT.INCLUDE_COMMENTS}
                                </label>
                                <label className='export__custom-choice'>
                                    <Field name='questions'
                                        component='input'
                                        type='checkbox' />
                                    {this.props.vocab.EXPORT.CUSTOM_QUESTIONS}
                                </label>
                                <label className='export__custom-choice'>
                                    <Field name='flags'
                                        component='input'
                                        type='checkbox' />
                                    {this.props.vocab.EXPORT.INCLUDE_FLAGS}
                                </label>
                            </div>
                        </div>
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
};

export default reduxForm({ form: 'export' })(Export);
