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
    const user = state.user.users.find(userIter => userIter.id === ownProps.userId);
    return {
        vocab: state.settings.language.vocabulary,
        user,
        tasks: state.tasks.find(task => task.projectId === ownProps.project.id).tasks,
        initialValues: {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
