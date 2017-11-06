import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';

import * as actions from '../actions';
import {
    updateUser,
} from '../../../common/actions/userActions';

import UserProfile from './UserProfile';

class UserProfileContainer extends Component {
    componentWillMount() {
        this.props.actions.getUserForProfile(this.props.userId);
    }
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
        initialValues: Object.keys(state.userprofile.user).length !== 0 ? {
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
        } : undefined,
    };
};

const mapDispatchToProps = dispatch => ({
    onUpdateUser: (userId, user) => dispatch(updateUser(userId, user)),
    onClickToSubmit: () => dispatch(submit('user-profile')),
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
