import * as actionTypes from './actionTypes';

export default function SurveyReducer(state, action) {
  switch (action.type) {
    case actionTypes.GET_SURVEY_BY_ID_SUCCESS:
      return state.merge(state, {
        selectedSurvey: action.payload
      });
    case actionTypes.GET_SURVEY_ANSWER_BY_ID_SUCCESS:
      return state.merge(state, {
        surveyAnswers: action.payload
      });
    case actionTypes.UPDATE_ANSWER:
      return state.merge(state, {
        surveyAnswers: action.payload,
        message: '',
      });
    case actionTypes.GET_SURVEY_CONSENT_BY_ID_SUCCESS:
      return state.mergeDeep(state, {
        surveyConsent : {
          consentSigned: action.payload.length === 0,
          consentForms: action.payload
        }
      });
      case actionTypes.SIGN_SURVEY_CONSENT_SUCCESS:
        return state.mergeDeep(state,
          {surveyConsent :
            {consentSigned: true}
        });
    case actionTypes.SIGN_SURVEY_CONSENT_FAILURE:
      return state.mergeDeep(state,
        {surveyConsent : {consentError: action.payload}
      });
    case actionTypes.SUBMIT_SURVEY_FAILURE:
      return state.merge(state, {
        message: action.payload
      });
    case actionTypes.SUBMIT_SURVEY_SUCCESS:
      return state.merge(state, {
          message: ''
      });
    default:
      return state;
  }
}
