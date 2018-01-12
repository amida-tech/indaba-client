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
                {
                    this.props.fileId === undefined &&
                    <div className='file-form__add-form'>
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
                        <button className='file-form__submit'
                            type='submit'>
                            {this.props.vocab.SURVEY.ADD_FILE}
                        </button>
                    </div>
                }
                {
                    this.props.fileId !== undefined &&
                    <div className='file-form__remove-form'>
                        <button className='file-form__submit'>
                            {this.props.vocab.SURVEY.REMOVE_FILE}
                        </button>
                    </div>
                }
            </form>
        );
    }
}

FileForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    fileId: PropTypes.number,
    onFileUploaded: PropTypes.func.isRequired,
};

export default reduxForm({
    onSubmit: (values, dispatch, ownProps) => {
        if (ownProps.fileId === undefined) {
            apiService.surveys.postFile(values.file[0], values.filename)
            .then(({ id }) => ownProps.onFileUploaded(id))
            .catch(() => toast(ownProps.vocab.ERROR.FILE_UPLOAD,
                { type: 'error', autoClose: false }));
        } else {
            ownProps.onFileRemoved();
        }
    },
})(FileForm);
