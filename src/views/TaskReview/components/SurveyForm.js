import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { get, omit, compact } from 'lodash';

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
        const disagreeCheck = [];
        const answers = compact(values.answers.map((answer, index) => {
            if (get(answer, 'comment.reason') === undefined) {
                return null;
            } else if (answer.comment.reason === 'disagree' && !answer.comment.text) {
                disagreeCheck.push(index + 1);
                return null;
            }
            return omit(answer, ['comment.id', 'comment.userId', 'comment.language', 'commentHistory']);
        }));
        if (disagreeCheck.length > 0) {
            toast(`${ownProps.vocab.ERROR.DISAGREE_COMMENTS}${disagreeCheck.join(', ')}`);
        }
        ownProps.actions.postReview(
            values.assessmentId,
            answers,
            ownProps.vocab.ERROR,
        );
    },
})(SurveyForm);
