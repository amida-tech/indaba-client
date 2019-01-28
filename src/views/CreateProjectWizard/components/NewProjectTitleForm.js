import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { required } from '../../../common/validation';
import ValidatedTextInput from '../../../common/components/ValidatedTextInput';

class NewProjectTitleForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}
                className='new-project-title-form'>
                <div className='new-project-title-form__instructions'>
                    {this.props.vocab.PROJECT.TITLE_INSTRUCTIONS}
                </div>
                <div className='new-project-title-form__field'>
                    <Field component={ValidatedTextInput}
                        name='project.codeName'
                        vocab={this.props.vocab.VALIDATE}
                        placeholder={this.props.vocab.PROJECT.PROJECT_TITLE}
                        className='new-project-title-form__input'
                        validate={[required]} />
                </div>
                <div className='new-project-title-form__field'>
                    <Field component={ValidatedTextInput}
                        name='survey.name'
                        vocab={this.props.vocab.VALIDATE}
                        placeholder={this.props.vocab.PROJECT.SURVEY_TITLE}
                        className='new-project-title-form__input'
                        validate={[required]} />
                </div>
                <div className='new-project-title-form__error'>
                    {this.props.errorMessage}
                </div>
            </form>
        );
    }
}

NewProjectTitleForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
};

export default reduxForm({ form: 'new-project-title-form' })(NewProjectTitleForm);
