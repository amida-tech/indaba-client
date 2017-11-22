import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldArray, reduxForm } from 'redux-form';

import CreateSectionPanel from './CreateSectionPanel';

class SurveyBuilderForm extends Component {
    render() {
        return (
            <div className='survey-builder-form'>
                <div className='survey-builder-form__pane'>
                    <FieldArray
                        name='sections'
                        component={CreateSectionPanel}
                        vocab={this.props.vocab} />
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
