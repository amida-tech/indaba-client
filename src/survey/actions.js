import * as actionTypes from './actionTypes';
import apiService from '../services/api';
import { push } from 'react-router-redux';

/**
 * Side-effect action creator to return
 * the response of a GET HTTP action to /surveys/${surveyId}
 * @param {Integer} surveyId
 * @return {Function}
**/
export function getSurveyById(surveyId, lang) {
  return dispatch => {
    dispatch(_getSurveyById());
    apiService.survey.getSurveyById(surveyId, (err, survey) => {
      if (survey && !err) {
        dispatch(_getSurveyByIdSuccess(survey));
      } else {
        dispatch(_getSurveyByIdFailure());
      }
    });
  }
}

export function getSurveyConsentById(surveyId, lang){
  return dispatch => {
    dispatch(_getSurveyConsentById());
    apiService.survey.getSurveyConsentById(surveyId, lang, (err, surveyConsent) => {
      if (surveyConsent && !err) {
        dispatch(_getSurveyConsentByIdSuccess(surveyConsent));
      } else {
        dispatch(_getSurveyConsentByIdFailure());
      }
    });
  }
}

export function signSurveyConsent(surveyId, lang) {
  return dispatch => {
    dispatch(_signSurveyConsent(surveyId, lang));
  }
}

export function getSurveyAnswerById(surveyId, lang) {
  return dispatch => {
    dispatch(_getSurveyAnswerById());
    apiService.survey.getSurveyAnswerById(surveyId, lang, (err, surveyAnswer) => {
      if (surveyAnswer && !err) {
        dispatch(_getSurveyAnswerByIdSuccess(surveyAnswer));
      } else {
        dispatch(_getSurveyAnswerByIdFailure());
      }
    });
  }
}

export function saveSurveyAnswers(surveyId, surveyAnswers) {
  const answersWithStatus = surveyAnswers.setIn(['status'], 'in-progress').delete('surveyId');
  return dispatch => {
    dispatch(_submitAnswers(surveyId, answersWithStatus));
  }
}

export function submitSurveyAnswers(surveyId, surveyAnswers) {
  const answersWithStatus = surveyAnswers.setIn(['status'], 'completed').delete('surveyId');
  return dispatch => {
    dispatch(_submitAnswers(surveyId, answersWithStatus));
  };
}




//////////////////
// Private Action Creators denoted by `_` prefix.
//////////////////

function _submitAnswers(surveyId, surveyAnswers) {
  return dispatch => {
    dispatch(_postSurveyAnswerById());
    apiService.survey.postSurveyAnswerById(surveyId, surveyAnswers, (err, survey) => {
      if (!err) {
        dispatch(_postSurveyAnswerByIdSuccess(survey));
        dispatch(push('/'));
      } else {
        dispatch(_postSurveyAnswerByIdFailure(err.message));
      }
    });
  }
}

function _signSurveyConsent(id, lang) {
  var requestBody = {
    'consentDocumentId': id,
    'language': lang
  }
  return dispatch => {
    apiService.survey.signSurveyConsent(requestBody, (err) => {
      if(!err){
        dispatch(_signSurveyConsentSuccess());
        document.getElementById("surveyConsentId").className = 'survey-consent-modal survey-consent-modal--closed';
      } else {
        dispatch(_signSurveyConsentFailure(err));
      }
    });
  }
}

function _getSurveyById() {
  return {
    type: actionTypes.GET_SURVEY_BY_ID
  }
}

function _getSurveyByIdSuccess(response) {
  return {
    type: actionTypes.GET_SURVEY_BY_ID_SUCCESS,
    payload: response
  }
}

function _getSurveyByIdFailure() {
  return {
    type: actionTypes.GET_SURVEY_BY_ID_FAILURE
  }
}

function _getSurveyAnswerById() {
  return {
    type: actionTypes.GET_SURVEY_ANSWER_BY_ID
  }
}

function _getSurveyConsentById() {
  return {
    type: actionTypes.GET_SURVEY_CONSENT_BY_ID
  }
}

function _getSurveyConsentByIdSuccess(response) {
  return {
    type: actionTypes.GET_SURVEY_CONSENT_BY_ID_SUCCESS,
    payload: response
  }
}

function _getSurveyConsentByIdFailure() {
  return {
    type: actionTypes.GET_SURVEY_CONSENT_BY_ID_FAILURE
  }
}

function _signSurveyConsentSuccess(){
  return {
    type: actionTypes.SIGN_SURVEY_CONSENT_SUCCESS
  }
}

function _signSurveyConsentFailure(response) {
  return {
    type: actionTypes.SIGN_SURVEY_CONSENT_FAILURE,
    payload: response
  }
}

function _getSurveyAnswerByIdSuccess(response) {
  return {
    type: actionTypes.GET_SURVEY_ANSWER_BY_ID_SUCCESS,
    payload: response
  }
}

function _getSurveyAnswerByIdFailure() {
  return {
    type: actionTypes.GET_SURVEY_ANSWER_BY_ID_FAILURE
  }
}

function _postSurveyAnswerById() {
  return {
    type: actionTypes.SUBMIT_SURVEY
  }
}

function _postSurveyAnswerByIdSuccess(response) {
  return {
    type: actionTypes.SUBMIT_SURVEY_SUCCESS,
    payload: response
  }
}

function _postSurveyAnswerByIdFailure(message) {
  return {
    type: actionTypes.SUBMIT_SURVEY_FAILURE,
    payload: message
  }
}

// Update Answer Methods.

export function updateAnswer(questionAnswer) {
  return {
    type: actionTypes.UPDATE_ANSWER,
    payload: questionAnswer
  }
}
