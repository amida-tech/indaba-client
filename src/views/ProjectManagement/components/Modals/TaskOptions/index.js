import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { renderName } from '../../../../../utils/User';
import Modal from '../../../../../common/Modal';
import TaskOptionsForm from './TaskOptionsForm';

class TaskOptionsModal extends Component {
    render() {
        const currentUser = _.find(this.props.users, user =>
            user.id === this.props.task.userId);
        const userOptions = this.props.users.map(user => (
                user === currentUser ?
                { value: user, label: renderName(user) + this.props.vocab._CURRENTLY_ASSIGNED } :
                { value: user, label: renderName(user) }
            ));
        const initialValues = {
            choice: null,
            notify: true,
            message: this.props.vocab.NOTIFY_MESSAGE,
            reassignUser: userOptions[0],
            task: this.props.task,
        };

        return (
            <Modal
                title={this.props.vocab.TITLE}
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
                            this.props.taskActions.reassignTask(
                                values.reassignUser.value.id,
                                this.props.task.id,
                                this.props.projectId,
                            );
                        } else if (values.choice === 'force') {
                            this.props.discussActions.forceTaskCompletion(
                                this.props.task.id,
                            );
                        }
                        if (values.notify) {
                            this.props.userActions.notifyUser(
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
    discussActions: PropTypes.objectOf(PropTypes.func).isRequired,
    taskActions: PropTypes.objectOf(PropTypes.func).isRequired,
    userActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapDispatchToProps = dispatch => ({
    onClickToSubmit: () => dispatch(submit('task-options-form')),
});

export default connect(null, mapDispatchToProps)(TaskOptionsModal);
