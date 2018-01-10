import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';
import { find, intersection } from 'lodash';

import { renderName } from '../../../../../utils/User';
import Modal from '../../../../../common/components/Modal';
import TaskOptionsForm from './TaskOptionsForm';

class TaskOptionsModal extends Component {
    render() {
        const currentUser = find(this.props.users, user =>
            user.id === this.props.task.userIds[0]);
        const userOptions = this.props.users.filter(user =>
            intersection(user.usergroupId, this.props.userGroups).length > 0,
        ).map((user) => {
            return user === currentUser ?
            { value: user,
                label: renderName(user) +
                    this.props.vocab.PROJECT.OPTIONS_MODAL._CURRENTLY_ASSIGNED } :
                { value: user, label: renderName(user) };
        });
        const initialValues = {
            choice: null,
            notify: true,
            message: this.props.vocab.PROJECT.OPTIONS_MODAL.NOTIFY_MESSAGE,
            reassignUser: userOptions[0],
            task: this.props.task,
        };

        return (
            <Modal
                title={this.props.vocab.PROJECT.OPTIONS_MODAL.TITLE}
                class='task-options'
                onCancel={this.props.actions.closeTaskOptionsModal}
                onSave={this.props.onClickToSubmit}>
                <TaskOptionsForm
                    vocab={this.props.vocab}
                    task={this.props.task}
                    users={this.props.users}
                    projectId={this.props.projectId}
                    currentUser={currentUser}
                    userOptions={userOptions}
                    initialValues={initialValues}
                    onSubmit={ (values) => {
                        if (values.choice === 'reassign') {
                            this.props.actions.updateTask(
                                this.props.task.id,
                                [values.reassignUser.value.id],
                                undefined,
                                this.props.vocab.ERROR,
                            );
                        } else if (values.choice === 'force') {
                            this.props.actions.forceTaskCompletion(
                                this.props.task.productId,
                                this.props.task.uoaId,
                                this.props.vocab.ERROR,
                            );
                        }
                        if (values.notify === true) {
                            this.props.actions.notifyUser(
                                this.props.task.userId,
                                values.message,
                                this.props.profile.id,
                            );
                        }
                        this.props.actions.closeTaskOptionsModal();
                    }
                    } />
            </Modal>
        );
    }
}

TaskOptionsModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    projectId: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapDispatchToProps = dispatch => ({
    onClickToSubmit: () => dispatch(submit('task-options-form')),
});

export default connect(null, mapDispatchToProps)(TaskOptionsModal);
