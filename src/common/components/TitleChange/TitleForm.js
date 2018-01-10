import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

class TitleForm extends Component {
    render() {
        return (
            <form className='title-form'
              onSubmit={this.props.handleSubmit}>
                <label className='title-form__title-label'>
                    {this.props.label}
                    <Field name='title'
                        component='input'
                        type='text'
                        className='title-form__title-input' />
                </label>
            </form>
        );
    }
}

TitleForm.propTypes = {
    label: PropTypes.string.isRequired,
};

export default reduxForm({})(TitleForm);
