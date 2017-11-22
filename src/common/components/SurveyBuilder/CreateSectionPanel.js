import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';

import QuestionBuilder from './QuestionBuilder';

class CreateSurveyPanel extends Component {

    render() {
        return (
            <div className='create-section-panel'>
                <Field
                    name='name'
                    component='input' />
                <FieldArray
                    name='questions'
                    component={QuestionBuilder}
                    vocab={this.props.vocab} />
            </div>
        );
    }
}

export default CreateSurveyPanel;
