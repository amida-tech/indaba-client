import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';

import {
    updateUser,
} from '../../../common/actions/userActions';

class UserProfileContainer extends Component {
    render() {
        return (
            <UserProfile {...this.props} />
        );
    }
}

UserProfileContainer.propTypes = {
    onUpdateUser: PropTypes.func.isRequired,
    onClickToSubmit: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCancel: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    vocab: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        vocab: state.settings.language.vocabulary,
        userId: ownProps.userId,
        user: state.userprofile.user,
        tasks: state.userprofile.tasks,
        initialValues: {
            name: {
                firstName: state.userprofile.user.firstName,
                lastName: state.userprofile.user.lastName,
            },
            account: {
                email: state.userprofile.user.email,
                title: state.userprofile.user.title,
            },
            preferences: {
                notifications: state.userprofile.user.notifications,
                status: state.userprofile.user.status,
                notes: state.userprofile.user.notes,
            },
        },
    };
};

const mapDispatchToProps = dispatch => ({
    onUpdateUser: (userId, user) => dispatch(updateUser(userId, user)),
    onClickToSubmit: () => dispatch(submit('user-profile')),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
