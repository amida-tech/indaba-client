import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class ProjectTitleForm extends Component {
    render() {
        return (
            <form className='project-title-form'
              onSubmit={this.props.handleSubmit}>
                <label className='project-title-form__title-label'>
                  {this.props.vocab.PROJECT.TITLE}
                    <Field name='title'
                      component='input'
                      type='text'
                      className='project-title-form__title-input' />
                </label>
            </form>
        );
    }
}

export default reduxForm({ form: 'project-title' })(ProjectTitleForm);
