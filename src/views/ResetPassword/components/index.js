import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../actions';
import ResetPasswordForm from './ResetPasswordForm';

class ResetPasswordContainer extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(password) {
        this.props.actions.resetPassword(this.props.token, password)
            .then(() => this.props.actions.resetPasswordUIMessage(
                this.props.vocab.RESET_PASSWORD.PASSWORD_RESET_SUCCESS,
                false,
            ))
            .catch(err => this.props.actions.resetPasswordUIMessage(
                err.message,
                true,
            ));
    }

    render() {
        return (
            <div className='reset-password'>
                <ResetPasswordForm
                    vocab={this.props.vocab}
                    actions={this.props.actions}
                    onSubmit={this.handleSubmit}/>
                <div className={`reset-password__ui-message ${this.props.ui.error
                    ? 'reset-password__ui-message--flag' : ''}`}>
                    {this.props.ui.message}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    vocab: state.settings.language.vocabulary,
    token: ownProps.params.token,
    ui: state.resetpassword.ui,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
