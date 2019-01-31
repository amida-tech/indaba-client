import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form';
import cookie from 'react-cookies';

import * as userActions from '../../../common/actions/userActions';
import * as actions from '../actions';
import ProfileForm from './ProfileForm';

// TODO: Change reset password from a single button to a "change password" field.
import ResetPasswordPanel from './ResetPasswordPanel';

class ProfileContainer extends Component {
    constructor(props) {
        super(props);

        this.handleProfileUpdateSubmit = this.handleProfileUpdateSubmit.bind(this);
        this.handlePasswordUpdateSubmit = this.handlePasswordUpdateSubmit.bind(this);
    }

    componentWillMount() {
        this.props.actions.profileUIMessage('', false);
    }

    handleProfileUpdateSubmit(values) {
        this.props.actions.updateProfile(
            values,
            this.props.vocab.ERROR,
        );
    }

    handlePasswordUpdateSubmit(values) {
        if (values.password !== values.passwordConfirm) {
            this.props.actions.profileUIMessage(
                this.props.vocab.PROFILE.PASSWORD.PASSWORD_UNMATCHING,
                true,
            );
            return;
        }
        this.props.actions.updatePassword(
            values.oldPassword.trim(),
            values.password,
            this.props.vocab.PROFILE.PASSWORD,
        );
    }

    render() {
        return (
            <div className='profile'>
                <ProfileForm
                    {...this.props}
                    initialValues={this.props.profile}
                    enableReinitialize={true}
                    onSubmit={this.handleProfileUpdateSubmit} />
                <ResetPasswordPanel
                    {...this.props}
                    onSubmit={this.handlePasswordUpdateSubmit}
                />
            </div>
        );
    }
}

ProfileContainer.propTypes = {
    vocab: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (store) => {
    return {
        vocab: store.settings.language.vocabulary,
        ui: store.profile.ui,
        profile: store.user.profile,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, userActions, actions), dispatch),
    onClickToSubmit: () => dispatch(submit('update-profile-form')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
