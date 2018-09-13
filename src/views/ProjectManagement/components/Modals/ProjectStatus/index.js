import React, { Component } from 'react';
import { formValueSelector, submit } from 'redux-form';
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
                <ProjectStatusForm
                    initialValues={{
                        active: this.props.project.status,
                        draftConfirm: false,
                        accessConfirm: false,
                        usersConfirm: false,
                    }}
                    project={this.props.project}
                    vocab={this.props.vocab}
                    active={this.props.active}
                    putProject={this.props.actions.putProject}
                    updateStatusChange={this.props.actions.updateStatusChange}
                    showInactiveConfirmModal={this.props.actions.showInactiveConfirmModal}
                />
            </Modal>
        );
    }
}

const selector = formValueSelector('project-status-form');

const mapStateToProps = state => ({
    active: selector(state, 'active'),
});

const mapDispatchToProps = dispatch => ({
    onClickToSubmit: () => dispatch(submit('project-status-form')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStatus);
