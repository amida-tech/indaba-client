//
// app-level reducers
//
import * as i18n from '../i18n';
import Cookies from 'js-cookie';
import { initialState } from '../index';
import * as CommonActionTypes from './actionTypes';

export function AuthReducer(state, action) {
    switch (action.type) {
        case CommonActionTypes.LOGIN_SUCCESS:
            return state.merge(state, {isAuthenticated: true});
        case CommonActionTypes.LOGOUT:
            Cookies.remove('rr-jwt-token');
            return state.merge(state, {isAuthenticated: false});
        default:
            return state
    }
}

export function SettingsReducer(state, action) {
    switch (action.type) {
      case CommonActionTypes.CHANGE_LANGUAGE:
        return state.merge(state, {
          language: {
            choice: action.payload, 
            vocabulary: i18n[action.payload]
          }
        });
      default:
        return state
    }
}
