import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';
import { find, intersection } from 'lodash';
import { toast } from 'react-toastify';

import systemMessageService from '../../../../../services/api/systemMessages';
import { renderName } from '../../../../../utils/User';
import Modal from '../../../../../common/components/Modal';
import TaskOptionsForm from './TaskOptionsForm';

class TaskOptionsModal extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        const currentUser = find(this.props.users, user => user.id === this.props.task.userIds[0]);
        const userOptions = this.props.users.filter(user => intersection(user.usergroupId, this.props.userGroups).length > 0).map((user) => {
            return user === currentUser
                ? {
                    value: user,
                    label: renderName(user)
                    + this.props.vocab.PROJECT.OPTIONS_MODAL._CURRENTLY_ASSIGNED,
                }
                : { value: user, label: renderName(user) };
        });

        this.state.initialValues = {
            choice: null,
            notify: true,
            message: this.props.vocab.PROJECT.OPTIONS_MODAL.NOTIFY_MESSAGE,
            reassignUser: userOptions[0],
            task: this.props.task,
        };
        this.state.currentUser = currentUser;
        this.state.userOptions = userOptions;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        if (values.choice === 'reassign') {
            if (values.reassignUser.value.id === this.state.currentUser.id) {
                toast(this.props.vocab.ERROR.USER_ALREADY_ASSIGNED);
                return;
            }
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
            systemMessageService.send({
                to: this.state.currentUser.email,
                message: values.message,
            }).catch(() => toast(this.props.vocab.ERROR.NOTIFY_FAILURE));
        }
        this.props.actions.closeTaskOptionsModal();
    }

    render() {
        return (
            <Modal
                title={this.props.vocab.PROJECT.OPTIONS_MODAL.TITLE}
                class='task-options'
                onCancel={this.props.actions.closeTaskOptionsModal}
                onSave={this.props.task.status === 'completed' ? null : this.props.onClickToSubmit}>
                <TaskOptionsForm
                    vocab={this.props.vocab}
                    task={this.props.task}
                    users={this.props.users}
                    projectId={this.props.projectId}
                    currentUser={this.state.currentUser}
                    userOptions={this.state.userOptions}
                    initialValues={this.state.initialValues}
                    onSubmit={this.handleSubmit} />
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
