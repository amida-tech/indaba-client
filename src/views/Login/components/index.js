import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { submit, formValueSelector } from 'redux-form';
import cookie from 'react-cookies';

import { checkRefresh } from '../../../common/actions/navActions';
import * as actions from '../actions';
import config from '../../../config';
import LoginPanel from './LoginPanel';

class LoginContainer extends Component {
    componentDidMount() {
        if (cookie.load('indaba-refresh') !== undefined && cookie.load('indaba-refresh').length > 4) {
            this.props.actions.checkRefresh()
                .then(() => {
                    this.props.onRedirectToHome(cookie.load('indaba-roleID'));
                });
        }
    }

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
    actions: bindActionCreators(Object.assign({}, actions, { checkRefresh }), dispatch),
    onClickToSubmit: () => dispatch(submit(LOGIN_FORM_NAME)),
    onRedirectToHome: roleId => dispatch(push(roleId === '2' ? '/project' : '/task')),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
