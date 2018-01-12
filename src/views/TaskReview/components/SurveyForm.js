import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { omit, compact } from 'lodash';

class SurveyForm extends Component { // TODO: INBA-450
    render() {
        return (
            <form className='survey-form'
                onSubmit={this.props.handleSubmit}>
                {this.props.children}
            </form>
        );
    }
}

SurveyForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    survey: PropTypes.array.isRequired,
    stage: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    productId: PropTypes.number.isRequired,
    actions: PropTypes.shape({
        moveTask: PropTypes.func.isRequired,
    }).isRequired,
};

const FORM_NAME = 'survey-form';

export default reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    onSubmit: (values, dispatch, ownProps) => {
        const answers = compact(values.answers.map((answer) => {
            if (answer.comment.reason === null ||
                (answer.comment.reason === 'disagree' && answer.comment.text === '')) {
                return null;
            }
            return (Object.assign({}, omit(answer, ['comment']), { comments: [answer.comment] }));
        }));
        ownProps.actions.postReview(
            values.assessmentId,
            answers,
            ownProps.vocab.ERROR,
        );
    },
})(SurveyForm);
