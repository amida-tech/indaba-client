import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import ReduxFormFileInput from '../../../../common/components/ReduxFormFileInput';

class FilePane extends Component {
    render() {
        return (
            <div className='file-pane'>
                {this.props.file === undefined &&
                    <div className='file-pane__add-form'>
                        <Field name={'file'}
                            className='file-pane__file-input'
                            disabled={this.props.disabled}
                            component={ReduxFormFileInput}/>
                        <button className='file-pane__submit file-pane_submit--add'
                            type='submit'
                            disabled={this.props.disabled}>
                            {this.props.vocab.SURVEY.ADD_FILE}
                        </button>
                    </div>}
                {this.props.file !== undefined &&
                    <div className='file-pane__remove-form'>
                        <div className='file-pane__current-file-name'>
                            {this.props.file.filename}
                        </div>
                        {
                            !this.props.disabled &&
                            <button className='file-pane__submit file-pane__submit--remove'>
                                {this.props.vocab.SURVEY.REMOVE_FILE}
                            </button>
                        }
                    </div>}
            </div>
        );
    }
}

FilePane.propTypes = {
    vocab: PropTypes.object.isRequired,
    file: PropTypes.object,
};

export default FilePane;
