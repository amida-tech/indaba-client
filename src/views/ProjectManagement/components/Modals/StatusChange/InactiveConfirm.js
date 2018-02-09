import React, { Component } from 'react';
import Modal from '../../../../../common/components/Modal';

class InactiveConfirm extends Component {
    render() {
        return (
            <Modal
                title={this.props.vocab.MODAL.INACTIVE_CONFIRM.TITLE}
                bodyText={this.props.vocab.MODAL.INACTIVE_CONFIRM.WARNING}
                saveLabel={this.props.vocab.COMMON.CONFIRM}
                onSave={ () => {
                    const newProject = Object.assign({}, this.props.project,
                            { status: 0 });
                    this.props.actions.putProject(newProject, this.props.vocab.ERROR);
                    this.props.actions.showInactiveConfirmModal(false);
                    this.props.actions.updateStatusChange(false);
                } }
                onCancel={() => {
                    this.props.actions.showInactiveConfirmModal(false);
                    this.props.actions.updateStatusChange(false);
                }}>
            </Modal>
        );
    }
}

export default InactiveConfirm;
