import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TitleForm extends Component {
    render() {
        return (
            <form className='title-form'
                onSubmit={this.props.handleSubmit}>
                <label className={`title-form__title-label ${this.props.titleFlag
                    ? 'title-form__title-label--flag' : ''}`}>
                    {this.props.label}
                    {this.props.titleFlag && this.props.uiMessage}
                    <input className={`title-form__title-input ${this.props.titleFlag ?
                        'title-form__title-input--flag' : ''}`}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        onBlur={this.props.handleValidate}
                        onChange={this.props.handleTitle} />
                </label>
                <button className='title-form__hidden-button' />
            </form>
        );
    }
}

TitleForm.propTypes = {
    label: PropTypes.string.isRequired,
    titleFlag: PropTypes.bool.isRequired,
    uiMessage: PropTypes.string,
    value: PropTypes.string,
    handleTitle: PropTypes.func.isRequired,
    handleValidate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default TitleForm;
