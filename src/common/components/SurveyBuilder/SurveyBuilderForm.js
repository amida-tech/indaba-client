import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import CreateQuestionPanel from './CreateQuestionPanel';
import CreateSurveyPanel from './CreateSurveyPanel';

class SurveyBuilderForm extends Component {
    render() {
        return (
            <div className='survey-builder-form'>
                <div className='survey-builder-form__pane'>
                    <CreateQuestionPanel
                        actions={this.props.actions}
                        vocab={this.props.vocab}/>
                    <CreateSurveyPanel {...this.props} />
                </div>
            </div>
        );
    }
}

SurveyBuilderForm.propTypes = {
    project: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object,
};

export default reduxForm({
    form: 'survey-builder-form',
    enableReinitialize: true,
})(SurveyBuilderForm);
