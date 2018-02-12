import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import ValidatedTextInput from '../../../common/components/ValidatedTextInput';

class NewProjectTitleForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}
                className='new-project-title'>
                <Field component={ValidatedTextInput}
                    name='project.codeName'
                    className='new-project-title__name'
                    placeholder={this.props.vocab.PROJECT.TITLE}
                    validate={value => (!value ?
                        this.props.vocab.VALIDATE.FIELD_REQUIRED :
                        undefined)}/>
                <div className='new-project-title__summary-container'>
                    <textarea className='new-project-title__summary'
                        placeholder={this.props.vocab.PROJECT.SUMMARY}
                        onChange={this.handleSummaryEntry} />
                </div>
                {this.props.errorMessage &&
                    <div className='new-project-title__error'>
                        {this.props.errorMessage}
                    </div>
                }
            </form>
        );
    }
}

export default reduxForm({ form: 'new-project-title-form' })(NewProjectTitleForm);
