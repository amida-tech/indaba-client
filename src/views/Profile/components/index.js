import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form';
import cookie from 'react-cookies';

import * as userActions from '../../../common/actions/userActions';
import * as resetPasswordActions from './actions';
import ProfileForm from './ProfileForm';

// TODO: Change reset password from a single button to a "change password" field.
import ResetPasswordPanel from './ResetPasswordPanel';

class ProfileContainer extends Component {
    render() {
        return (
            <div className='profile'>
                <ProfileForm
                    {...this.props}
                    initialValues={this.props.profile}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        this.props.userActions.updateProfile(
                            values,
                            this.props.vocab.ERROR,
                        );
                    }} />
                <ResetPasswordPanel
                    onSubmit={(values) => {
                        console.log('>>>>> onSubmit > values: ', values);
                        const password = values.passwordConfirm;
                        const jwtToken = cookie.load('indaba-auth');
                        const tokenSplit = jwtToken.split(" ");
                        const token = encodeURI(tokenSplit[1]);
                        console.log(">>>>> TOKENSPLIT:", tokenSplit);
                        console.log(">>>>> TOKEN:", token);
                        // const token = cookie.load('indaba-auth');
                        this.props.resetPasswordActions.resetPassword(
                            token,
                            password,
                        );
                    }}
                    {...this.props}
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
        ui: store.user.ui,
        profile: store.user.profile,
    };
};

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(Object.assign({}, userActions), dispatch),
    resetPasswordActions: bindActionCreators(Object.assign({}, resetPasswordActions), dispatch),
    onClickToSubmit: () => dispatch(submit('update-profile-form')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
