import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import * as actions from './actions';
import ResetPasswordForm from './ResetPasswordForm';

class ResetPasswordContainer extends Component {
    render() {
        return (
            <ResetPasswordForm {...this.props}
                onSubmit={({ password }) =>
                    this.props.actions.resetPassword(this.props.token, password)
                    .then(() => toast(this.props.vocab.RESET_PASSWORD.PASSWORD_RESET_SUCCESS))
                    .catch(err => toast(err.message, { type: 'error', autoClose: false }))
                }/>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    vocab: state.settings.language.vocabulary,
    token: ownProps.params.token,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
