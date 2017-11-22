import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { arrayPush } from 'redux-form';

import AddQuestionPanel from './AddQuestionPanel';
import SurveyBuilderForm from './SurveyBuilderForm';

class SurveyBuilder extends Component {
    render() {
        const initialValues = {
            authorId: 1,
            name: this.props.survey.name || '',
            status: 'draft',
            sections: this.props.survey.sections || [{
                name: '',
                questions: this.props.survey.questions || [],
            }],
        };
        return (
            <div className='survey-builder'>
                <AddQuestionPanel
                    sectionIndex={this.props.ui.sectionIndex}
                    formActions={this.props.formActions}
                    vocab={this.props.vocab}/>
                <SurveyBuilderForm
                    initialValues={initialValues}
                    {...this.props}/>
                </div>
        );
    }
}

SurveyBuilder.propTypes = {
    project: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
    formActions: { // Not keen on lumping redux-form calls into actions for reasons.
        questionPush: (sectionIndex, question) =>
            dispatch(arrayPush('survey-builder-form', sectionIndex, question)),
        sectionPush: section => dispatch(arrayPush('survey-builder-form', 'sections', section)),
    },
});

export default connect(null, mapDispatchToProps)(SurveyBuilder);
