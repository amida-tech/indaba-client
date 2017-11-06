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
        this.props.actions.getAllProfileData(this.props.userId,
            this.props.projectId, this.props.vocab.ERROR);
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
    const user = state.user.users.find(userIter => userIter.id === ownProps.userId);
    const project = state.projects.data.find(projectIter => projectIter.id === ownProps.projectId);
    return {
        vocab: state.settings.language.vocabulary,
        userId: ownProps.userId,
        user,
        users: state.user.users,
        tasks: state.userprofile.tasks,
        project,
        initialValues: user && {
            name: {
                firstName: user.firstName,
                lastName: user.lastName,
            },
            account: {
                email: user.email,
                title: user.title,
            },
            preferences: {
                notifications: user.notifications,
                status: user.status,
                notes: user.notes,
            },
        },
    };
};

const mapDispatchToProps = dispatch => ({
    onUpdateUser: (userId, user) => dispatch(updateUser(userId, user)),
    onClickToSubmit: () => dispatch(submit('user-profile')),
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
