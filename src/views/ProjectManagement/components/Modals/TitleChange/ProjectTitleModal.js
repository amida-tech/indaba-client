import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';
import Modal from '../../../../../common/components/Modal';
import ProjectTitleForm from './ProjectTitleForm';


class ProjectTitleModal extends Component {
    render() {
        return (
            <Modal title={this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE}
                onCancel={this.props.actions.pmHideProjectTitleModal}
                onSave={() => this.props.dispatch(submit('project-title'))}>
                <ProjectTitleForm {...this.props}
                    onSubmit={({ title }) => this.props.actions.putProject({
                        id: this.props.projectId,
                        name: title,
                    })}/>
            </Modal>
        );
    }
}

ProjectTitleModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired,
};

export default connect()(ProjectTitleModal);
