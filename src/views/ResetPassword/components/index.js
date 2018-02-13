import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import ResetPasswordForm from './ResetPasswordForm';

class ResetPasswordContainer extends Component {
    render() {
        return (
            <ResetPasswordForm {...this.props}
                onSubmit={({ password }) =>
                    this.props.actions.resetPassword(this.props.token, password)
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
