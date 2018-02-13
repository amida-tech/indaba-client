import React, { Component } from 'react';
import { connect } from 'react-redux';

import ResetPasswordForm from './ResetPasswordForm';

class ResetPasswordContainer extends Component {
    render() {
        return (
            <ResetPasswordForm {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
});

export default connect(mapStateToProps)(ResetPasswordContainer);
