import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

class TitleForm extends Component {
    render() {
        return (
            <form className='title-form'
                onSubmit={this.props.handleSubmit}>
                <label className={`title-form__title-label ${this.props.titleFlag
                    ? 'title-form__title-label--flag' : ''}`}>
                    {this.props.label}
                    {this.props.titleFlag && this.props.uiMessage}
                    <Field name='title'
                        component='input'
                        type='text'
                        className={`title-form__title-input ${this.props.titleFlag
                            ? 'title-form__title-input--flag' : ''}`} />
                </label>
            </form>
        );
    }
}

TitleForm.propTypes = {
    label: PropTypes.string.isRequired,
    titleFlag: PropTypes.bool,
    uiMessage: PropTypes.string,
};

export default reduxForm({})(TitleForm);
