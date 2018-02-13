import React, { Component } from 'react';
import { connect } from 'react-redux';

import apiService from '../../../services/api';
import ResetPasswordForm from './ResetPasswordForm';

class ResetPasswordContainer extends Component {
    render() {
        return (
            <ResetPasswordForm {...this.props}
                onSubmit={({ password }) => {
                    apiService.auth.resetPassword(this.props.token, password);
                }}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    vocab: state.settings.language.vocabulary,
    token: ownProps.params.token,
});

export default connect(mapStateToProps)(ResetPasswordContainer);
