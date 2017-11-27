import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';

import * as actions from '../actions';
import {
    updateProfileById,
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
    userId: PropTypes.number.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onUpdateUser: PropTypes.func.isRequired,

    // Project-specific sections not rendered when not provided
    projectId: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => {
    const user = state.user.users.find(userIter => userIter.id === ownProps.userId);
    const project = state.projects.data.find(projectIter => projectIter.id === ownProps.projectId);
    return {
        vocab: state.settings.language.vocabulary,
        userId: ownProps.userId,
        projectId: ownProps.projectId,

        user,
        project,
        users: state.user.users,
        tasks: state.userprofile.tasks,
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
                notifyLevel: user.notifyLevel,
                isActive: user.isActive,
                notes: user.notes,
            },
        },
    };
};

const mapDispatchToProps = dispatch => ({
    onUpdateUser: (userId, user, errorMessages) =>
        dispatch(updateProfileById(userId, user, errorMessages)),
    onClickToSubmit: () => dispatch(submit('user-profile')),
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
