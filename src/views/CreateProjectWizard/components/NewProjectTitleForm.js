import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewProjectTitleForm extends Component {
    render() {
        return (
            <form className='new-project-title-form'
                onSubmit={this.props.handleSubmit}>
                <div className='new-project-title-form__instructions'>
                    {this.props.vocab.PROJECT.TITLE_INSTRUCTIONS}
                </div>
                <input className={`new-project-title-form__field ${this.props.data.projectFlag
                    ? 'new-project-title-form__field--flag' : ''}`}
                name='projectTitle'
                value={this.props.data.codeName}
                placeholder={this.props.data.projectFlag
                    ? this.props.vocab.PROJECT.PROJECT_TITLE_REQUIRED
                    : this.props.vocab.PROJECT.PROJECT_TITLE}
                onBlur={this.props.handleValidate}
                onChange={this.props.handleProjectTitle} />
                <input className={`new-project-title-form__field ${this.props.data.surveyFlag
                    ? 'new-project-title-form__field--flag' : ''}`}
                name='surveyTitle'
                value={this.props.data.name}
                placeholder={this.props.data.surveyFlag
                    ? this.props.vocab.PROJECT.SURVEY_TITLE_REQUIRED
                    : this.props.vocab.PROJECT.SURVEY_TITLE}
                onBlur={this.props.handleValidate}
                onChange={this.props.handleSurveyTitle} />
                <div className='new-project-title-form__error'>
                    {this.props.data.uiMessage}
                </div>
                <button className='new-project-title-form__hidden-button' />
            </form>
        );
    }
}

NewProjectTitleForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    handleProjectTitle: PropTypes.func.isRequired,
    handleSurveyTitle: PropTypes.func.isRequired,
    handleValidate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default NewProjectTitleForm;
