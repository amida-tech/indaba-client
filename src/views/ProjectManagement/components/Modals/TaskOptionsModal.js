import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';

import Modal from '../../../../common/Modal';
import TaskOptionsForm from './TaskOptionsForm';

class TaskOptionsModal extends Component {
    render() {
        return (
            <Modal
                title={this.props.vocab.TITLE}
                class='task-options'
                onCancel={this.props.actions.closeTaskOptionsModal}
                onSave={() => this.props.taskActions.setTaskOptions}>
                <TaskOptionsForm
                    vocab={this.props.vocab}
                    taskOptions={this.props.taskOptions}
                    users={this.props.users}
                    projectId={this.props.projectId}
                    actions={this.props.actions}
                    taskActions={this.props.taskActions} />
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
