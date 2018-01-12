import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { toast } from 'react-toastify';

import ReduxFormFileInput from '../../../../common/components/ReduxFormFileInput';
import apiService from '../../../../services/api';

class FileForm extends Component {
    render() {
        return (
            <form className='file-form'
                onSubmit={this.props.handleSubmit}>
                <div className='file-form__file-name'>
                    <Field name='filename'
                        className='file-form__file-input'
                        component='input'
                        type='text'/>
                </div>
                <div className='file-form__file-select'>
                    <Field name={'file'}
                        className='file-form__file-input'
                        component={ReduxFormFileInput}/>
                    {this.props.vocab.SURVEY.SELECT_FILE}
                </div>
                <button className='file-form__file-submit'
                    type='submit'>
                </button>
                <div className='file-form__label'>
                    {this.props.vocab.SURVEY.NO_FILE}
                </div>
            </form>
        );
    }
}

FileForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    onFileUploaded: PropTypes.func.isRequired,
};

export default reduxForm({
    onSubmit: (values, dispatch, ownProps) => {
        apiService.surveys.postFile(values.file[0], values.filename)
        .then(({ id }) => ownProps.onFileUploaded(id))
        .catch(() => toast(ownProps.vocab.ERROR.FILE_UPLOAD,
            { type: 'error', autoClose: false }));
    },
})(FileForm);
