import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form';

import * as actions from '../../../common/actions/userActions';
import ProfileForm from './ProfileForm';

// TODO: Change reset password from a single button to a "change password" field.
// import ResetPasswordPanel from './ResetPasswordPanel';

class ProfileContainer extends Component {
    render() {
        return (
            <div className='profile'>
                <ProfileForm
                    {...this.props}
                    initialValues={this.props.profile}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        this.props.actions.updateProfile(
                            values,
                            this.props.vocab.ERROR,
                        );
                    }} />
                {/* <ResetPasswordPanel {...this.props} /> */}
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
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
    onClickToSubmit: () => dispatch(submit('update-profile-form')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
