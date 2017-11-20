import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SurveyBuilderForm from './SurveyBuilderForm';

// If this doesn't do as much I fear it will, just delete it and move the child layers up.
class Survey extends Component {
    render() {
        const initialValues = {
            authorId: 1,
            name: this.props.survey.name || '',
            status: 'draft',
            sections: [{
                name: `${this.props.survey.name} - Part 1`,
                questions: [{
                    required: false,
                    id: 1,
                }],
            }],
        };
        return (
            <SurveyBuilderForm
                initialValues={initialValues}
                {...this.props}/>
        );
    }
}

Survey.propTypes = {
    project: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object,
};

export default Survey;
