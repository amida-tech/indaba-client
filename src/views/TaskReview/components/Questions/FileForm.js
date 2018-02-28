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
                    this.props.file === undefined &&
                    <div className='file-form__add-form'>
                        <Field name={'file'}
                            className='file-form__file-input'
                            disabled={this.props.disabled}
                            component={ReduxFormFileInput}/>
                        <button className='file-form__submit file-form__submit--add'
                            type='submit'
                            disabled={this.props.disabled}>
                            {this.props.vocab.SURVEY.ADD_FILE}
                        </button>
                    </div>
                }
                {
                    this.props.file !== undefined &&
                    <div className='file-form__remove-form'>
                        <div className='file-form__current-file-name'>
                            {this.props.file.filename}
                        </div>
                        {
                            !this.props.disabled &&
                            <button className='file-form__submit file-form__submit--remove'>
                                {this.props.vocab.SURVEY.REMOVE_FILE}
                            </button>
                        }
                    </div>
                }
            </form>
        );
    }
}

FileForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    file: PropTypes.object,
    onFileUploaded: PropTypes.func.isRequired,
};

export default reduxForm({
    onSubmit: (values, dispatch, ownProps) => {
        if (ownProps.file === undefined) {
            if (values.file) {
                // Upload File to AWS and File name to survey service
                apiService.projects.postFileToAws(values.file[0]);
                // TODO: Only store the file name on survey service, not to actual file
                apiService.surveys.postFile(values.file[0], values.file[0].name)
                .then(({ id }) => ownProps.onFileUploaded({ filename: values.file[0].name, id }))
                .catch(() => toast(ownProps.vocab.ERROR.FILE_UPLOAD, { type: 'error', autoClose: false }));
            } else {
                toast(ownProps.vocab.ERROR.FILE_WARNING);
            }
        } else {
            ownProps.onFileRemoved();
        }
    },
})(FileForm);
