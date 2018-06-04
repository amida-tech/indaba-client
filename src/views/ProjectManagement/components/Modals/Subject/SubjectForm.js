import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { required } from '../../../../../common/validation';
import ValidatedTextInput from '../../../../../common/components/ValidatedTextInput';

class SubjectForm extends Component {
    render() {
        return (
            <form className='subject-form' onSubmit={this.props.handleSubmit}>
                <div className='subject-form__instructions'>
                    {this.props.vocab.PROJECT.SUBJECT_TITLE_INSTRUCTION}
                </div>
                <Field component={ValidatedTextInput}
                    name='subjects'
                    className='subject-form__input-field'
                    vocab={this.props.vocab.VALIDATE}
                    placeholder={this.props.vocab.PROJECT.SUBJECT_TITLE}
                    validate={[required]} />
            </form>
        );
    }
}

SubjectForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'subject-form' })(SubjectForm);
