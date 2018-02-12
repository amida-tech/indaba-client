import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import ValidatedTextInput from '../../../common/components/ValidatedTextInput';

class NewProjectTitleForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}
                className='new-project-title-form'>
                <Field component={ValidatedTextInput}
                    name='project.codeName'
                    className='new-project-title-form__name'
                    placeholder={this.props.vocab.PROJECT.TITLE}
                    validate={value => (!value ?
                        this.props.vocab.VALIDATE.FIELD_REQUIRED :
                        undefined)}/>
                <div className='new-project-title-form__summary-container'>
                    <Field component='textarea'
                        name='project.description'
                        placeholder={this.props.vocab.PROJECT.SUMMARY}
                        className='new-project-title-form__summary' />
                </div>
                {this.props.errorMessage &&
                    <div className='new-project-title-form__error'>
                        {this.props.errorMessage}
                    </div>
                }
            </form>
        );
    }
}

export default reduxForm({ form: 'new-project-title-form' })(NewProjectTitleForm);
