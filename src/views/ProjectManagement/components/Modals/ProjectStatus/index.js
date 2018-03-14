import React, { Component } from 'react';
import { submit } from 'redux-form';
import { connect } from 'react-redux';

import Modal from '../../../../../common/components/Modal';
import ProjectStatusForm from './ProjectStatusForm';

class ProjectStatus extends Component {
    render() {
        return (
                <Modal
                    class='project-status-change-layer'
                    title={this.props.vocab.MODAL.STATUS_CHANGE_MODAL.PROJECT_TAB.TITLE}
                    onSave={this.props.onClickToSubmit}
                    onCancel={() => this.props.actions.updateStatusChange(false)}>
                        <ProjectStatusForm {...this.props.project}
                            vocab={this.props.vocab}
                            putProject={this.props.actions.putProject}
                            updateStatusChange={this.props.actions.updateStatusChange}
                            showInactiveConfirmModal={this.props.actions.showInactiveConfirmModal}
                            />
                </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onClickToSubmit: () => dispatch(submit('project-status-form')),
});

export default connect(null, mapDispatchToProps)(ProjectStatus);
