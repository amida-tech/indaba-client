import React, { Component} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { fromJS } from 'immutable';
import * as actions from '../actions';
import Survey from './Survey';
import { validationActions, validateInput, resolveErrorMessage } from '../../utils/validation';

export class SurveyContainer extends Component {

  render() {
    return <Survey {...this.props}/>
  }

  componentWillMount() {
    // Map these in mapDispatchToProps().
    this.props.dispatch(actions.getSurveyConsentById(this.props.params.id, this.props.lang));
    this.props.dispatch(actions.getSurveyById(this.props.params.id, this.props.lang));
    this.props.dispatch(actions.getSurveyAnswerById(this.props.params.id, this.props.lang));
  }

}

const mapStateToProps = function(state, ownProps) {
    return {
        data: state.get('survey'),
        selectedSurvey: state.getIn(['survey', 'selectedSurvey']),
        surveyAnswers: state.getIn(['survey', 'surveyAnswers']),
        surveyConsent: state.getIn(['survey', 'surveyConsent']),
        vocab: state.getIn(['settings', 'language', 'vocabulary']),
        lang: state.getIn(['settings', 'language', 'choice']),
        ...ownProps
    };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
    pushToDashboard: () => {
      dispatch(push('/'));
    },
    // TODO: Various input validations occur here: See how it's done on other components
    // Intercept values before sending them as parameters in dispatched actions
    // If false, dispatch error message?

    // NOTE: We will eventually need these for "hard" validations that prevent the user
    // from submitting a Survey as Complete with erroneous values in the inputs...
    // ... for now, we are using "soft" validations.

    /* --- Common validation methods */
    addErrorMsgs: (newErrorMsgs) => {
        newErrorMsgs = fromJS(newErrorMsgs);
        const idList = newErrorMsgs.map((entry) => entry.get('elementId'));
        newErrorMsgs = newErrorMsgs.filter((entry, position) => {
            return idList.indexOf(entry.get('elementId')) === position;
        });
        dispatch(validationActions.addErrorMsgs(newErrorMsgs));
    },

    findErrorMsg: (elementId, errorMsgs) => {
      // Note that this is a util method and not a dispatched action
      return resolveErrorMessage.findErrorMsg(elementId, errorMsgs);
    },

    clearErrorMsg: (elementId, errorMsgs) => {
      errorMsgs = errorMsgs.filter((entry) => entry.get('elementId') !== elementId);
      dispatch(validationActions.clearErrorMsg(errorMsgs));
    },

    clearAllErrorMsgs: () => {
      dispatch(validationActions.clearAllErrorMsgs());
    },

    validateFieldRequired: (value) => {
      return dispatch(validationActions.validateFieldRequired(value));
    },

    validateMinNumVal: (value, minNumMustSatisfy) => {
      return dispatch(validationActions.validateMinNumVal(value, minNumMustSatisfy));
    },

    validateValidCompleteInteger: (value) => {
        return validateInput.isAValidIntegerForSubmission(value);
    },

    validateValidCompleteZip: (value) => {
        return validateInput.isAValidZipForSubmission(value);
    },

    validateValidCompleteYear: (value) => {
        return validateInput.isAValidYearForSubmission(value);
    },
    /* --- End of common validation methods */

  }
}

SurveyContainer.propTypes = {
    selectedSurvey: React.PropTypes.object.isRequired,
    surveyAnswers: React.PropTypes.object.isRequired,
    surveyConsent: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
