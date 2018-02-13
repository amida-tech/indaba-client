import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import ValidatedTextInput from '../../../../../common/components/ValidatedTextInput';

class SubjectForm extends Component {
    constructor(props) {
        super(props);
        this.handleValidate = this.handleValidate.bind(this);
    }

    handleValidate(value) {
        return !value ? this.props.vocab.VALIDATE.FIELD_REQUIRED : undefined;
    }

    render() {
        return (
            <form className='subject-form' onSubmit={this.props.handleSubmit}>
                <div className='subject-form__instructions'>
                    {this.props.vocab.PROJECT.SUBJECT_TITLE_INSTRUCTION}
                </div>
                <Field component={ValidatedTextInput}
                    name='subjects'
                    className='subject-form__input-field'
                    placeholder={this.props.vocab.PROJECT.SUBJECT_TITLE}
                    validate={this.handleValidate} />
            </form>
        );
    }
}

SubjectForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'subject-form' })(SubjectForm);
