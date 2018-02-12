import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm, form } from 'redux-form';

class SubjectForm extends Component {
    render() {
        return (
            <form className='subject-form' onSubmit={this.props.handleSubmit}>
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
    permissions: PropTypes.string,
};

export default compose(
    reduxForm({ form: 'subject-form' }),
)(SubjectForm);
