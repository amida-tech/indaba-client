import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { required } from '../../../common/validation';
import ValidatedTextInput from '../../../common/components/ValidatedTextInput';

class NewProjectTitleForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}
                className='new-project-title-form'>
                <div className='new-project-title-form__field'>
                    <Field component={ValidatedTextInput}
                        name='project.codeName'
                        vocab={this.props.vocab.VALIDATE}
                        placeholder={this.props.vocab.PROJECT.PROJECT_TITLE}
                        validate={[required]} />
                </div>
                <div className='new-project-title-form__field'>
                    <Field component={ValidatedTextInput}
                        name='survey.name'
                        vocab={this.props.vocab.VALIDATE}
                        placeholder={this.props.vocab.PROJECT.SURVEY_TITLE}
                        validate={[required]} />
                </div>
                <div className='new-project-title-form__summary-container'>
                    <Field component='textarea'
                        name='project.description'
                        placeholder={this.props.vocab.PROJECT.SUMMARY}
                        className='new-project-title-form__summary' />
                </div>
                {this.props.errorMessage
                    && <div className='new-project-title-form__error'>
                        {this.props.errorMessage}
                    </div>
                }
            </form>
        );
    }
}

export default reduxForm({ form: 'new-project-title-form' })(NewProjectTitleForm);
