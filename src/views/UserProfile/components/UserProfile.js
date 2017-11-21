import React, { Component } from 'react';

import Modal from '../../../common/components/Modal';
import UserProfileForm from './UserProfileForm';

class UserProfile extends Component {
    render() {
        return (
            <Modal title={this.props.vocab.PROJECT.USER_PROFILE}
                onCancel={this.props.onCancel}
                onSave={this.props.onClickToSubmit}
                buttons={[{
                    key: 'reset',
                    label: this.props.vocab.PROFILE.PASSWORD.RESET_PASSWORD,
                    onClick: () => this.props.actions.resetPassword(
                        this.props.vocab.ERROR,
                    ),
                }]}>
                <UserProfileForm
                    userId={this.props.userId}
                    user={this.props.user}
                    project={this.props.project}
                    users={this.props.users}
                    tasks={this.props.tasks}
                    vocab={this.props.vocab}
                    initialValues={this.props.initialValues}
                    onSubmit={ (values) => {
                        this.props.onSave();
                        this.props.onUpdateUser(this.props.userId, {
                            firstName: values.name.firstName,
                            lastName: values.name.lastName,
                            email: values.account.email,
                            title: values.account.title,
                            notifyLevel: values.preferences.notifications,
                            status: values.preferences.status,
                            notes: values.preferences.notes,
                        }, this.props.vocab.ERROR);
                    }}/>
                </Modal>
        );
    }
}

export default UserProfile;
