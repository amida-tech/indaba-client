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
            user.id === this.props.taskOptions.task.userId);
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
            task: this.props.taskOptions.task,
        };

        return (
            <Modal
                title={this.props.vocab.TITLE}
                class='task-options'
                onCancel={this.props.actions.closeTaskOptionsModal}
                onSave={this.props.onClickToSubmit}>
                <TaskOptionsForm
                    vocab={this.props.vocab}
                    taskOptions={this.props.taskOptions}
                    users={this.props.users}
                    projectId={this.props.projectId}
                    currentUser={currentUser}
                    userOptions={userOptions}
                    initialValues={initialValues}
                    onSubmit={ (values) => {
                        console.log(values);
                        this.props.taskActions.setTaskOptions({
                            choice: values.choice,
                            reassignUser: values.reassignUser.value.id,
                            notify: values.notify,
                            message: values.message,
                            task: this.props.taskOptions.task,
                        });
                        this.props.actions.closeTaskOptionsModal();
                    }
                    } />
            </Modal>
        );
    }
}

TaskOptionsModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    projectId: PropTypes.number.isRequired,
};

const mapDispatchToProps = dispatch => ({
    onClickToSubmit: () => dispatch(submit('task-options-form')),
});

export default connect(null, mapDispatchToProps)(TaskOptionsModal);
