import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

class SubjectForm extends Component {
    constructor(props) {
        super(props);
        this.handleValidate = this.handleValidate.bind(this);
    }

    render() {
        return (
            <form className='subject-form' onSubmit={this.props.handleSubmit}>
                <div className='subject-form__instructions'>
                    {this.props.vocab.PROJECT.SUBJECT_TITLE_INSTRUCTION}
                </div>
                <Field
                    name='subjects'
                    component='input'
                    type='text'
                    className='subject-form__input-field'
                    placeholder={this.props.vocab.PROJECT.SUBJECT_TITLE} />
            </form>
        );
    }
}

SubjectForm.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default reduxForm({ form: 'subject-form' })(SubjectForm);
