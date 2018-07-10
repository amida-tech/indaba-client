import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { submit, formValueSelector } from 'redux-form';

import * as actions from '../actions';
import config from '../../../config';
import LoginPanel from './LoginPanel';

class LoginContainer extends Component {
    render() {
        return (
            <LoginPanel
                {...this.props} />
        );
    }
}

LoginContainer.propTypes = {
    vocab: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

const LOGIN_FORM_NAME = 'login-form';

const selector = formValueSelector(LOGIN_FORM_NAME);

const mapStateToProps = (state, ownProps) => {
    return {
        realm: ownProps.params.realm || config.INDABA_CLIENT_DEFAULT_REALM || 'testorg',
        vocab: state.settings.language.vocabulary,
        ui: state.login.ui,
        currentEmail: selector(state, 'username'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
    onClickToSubmit: () => dispatch(submit(LOGIN_FORM_NAME)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
