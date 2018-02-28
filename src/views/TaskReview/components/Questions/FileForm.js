import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { toast } from 'react-toastify';

import FilePane from './FilePane';
import apiService from '../../../../services/api';

class FileForm extends Component {
    render() {
        return (
            <form className='file-form'
                onSubmit={this.props.handleSubmit}>
                <FilePane
                    vocab={this.props.vocab}
                    disabled={this.props.displayMode}
                    file={this.props.file} />
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
