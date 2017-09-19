import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form';

import * as actions from '../../../common/actions/userActions';
import ProfileForm from './ProfileForm';
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
                        const parsedValues = Object.assign({},
                            values,
                            { notifyLevel: values.notifyLevel.value },
                            { isActive: values.isActive.value });
                        this.props.actions.updateProfile(
                            parsedValues,
                            this.props.vocab.ERROR);
                    }} />
                <ResetPasswordPanel {...this.props} />
            </div>
        );
    }
}

ProfileContainer.propTypes = {
    vocab: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        vocab: state.settings.language.vocabulary,
        ui: state.user.ui,
        profile: state.user.profile,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
    onClickToSubmit: () => dispatch(submit('update-profile-form')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
