import React, { Component } from 'react';
import { Field } from 'redux-form';

class LongText extends Component {

    render() {
        return (
            <div className='long-text'>
                <Field
                    name='text'
                    component='input' />
                <Field
                    name='required'
                    component='checkbox' />
            </div>
        );
    }
}

export default LongText;
