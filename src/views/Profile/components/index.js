import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form';

import * as actions from '../../../common/actions/userActions';
import { checkProtection } from '../../../common/actions/navActions';
import ProfileForm from './ProfileForm';
import ResetPasswordPanel from './ResetPasswordPanel';

class ProfileContainer extends Component {
    componentWillMount() {
        this.props.actions.checkProtection(this.props.profile);
    }

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

const mapStateToProps = (store) => {
    return {
        vocab: store.settings.language.vocabulary,
        ui: store.user.ui,
        profile: store.user.profile,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions, { checkProtection }), dispatch),
    onClickToSubmit: () => dispatch(submit('update-profile-form')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
