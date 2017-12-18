import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import Modal from '../../../../common/components/Modal';

class ProjectTitleForm extends Component {
    render() {
        return (
            <form className='project-title-modal'
              onSubmit={this.props.handleSubmit}>
                <label className='project-title-modal__title-label'>
                  {this.props.vocab.PROJECT.TITLE}
                    <Field name='title'
                      component='input'
                      type='text'
                      className='project-title-modal__title-input' />
                </label>
            </form>
        );
    }
}

const ProjectTitleReduxForm = reduxForm({ form: 'project-title' })(ProjectTitleForm);

class ProjectTitleModal extends Component {
    render() {
        return (
            <Modal title={this.props.vocab.MODAL.PROJECT_TITLE_MODAL.TITLE}
                onCancel={this.props.actions.hideProjectTitleModal}
                onSave={this.props.submit}>
                <ProjectTitleReduxForm {...this.props} />
            </Modal>
        );
    }
}

ProjectTitleModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

export default ProjectTitleModal;
