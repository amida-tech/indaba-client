import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { form, Field, reduxForm, reset } from 'redux-form';
import ConfirmationCheckbox from '../ConfirmationCheckbox';

class ProjectStatusForm extends Component {
    render() {
        const vocab = this.props.vocab;
        const projectVocab = this.props.vocab.MODAL.STATUS_CHANGE_MODAL.PROJECT_TAB;
        const confirmVocab = this.props.active ? projectVocab.ACTIVE : projectVocab.INACTIVE;
        return (
            <form className='project-status-form'>
                <div className='project-status-form__top-section'>
                    <Field id='project-status-check'
                        component='input'
                        type='checkbox'
                        className='toggle-native-check'
                        checked={this.props.active}
                        onChange={event => this.props.onCheck('active', event.target.checked)}/>
                    <label htmlFor='project-status-check' className='toggle'></label>
                    <div className='project-status-form__field'>
                        <div className='project-status-form__text'>
                            {this.props.active ?
                              vocab.PROJECT.STATUS_ACTIVE :
                              vocab.PROJECT.STATUS_INACTIVE}
                        </div>
                        <div className='project-status-form__label'>
                            {projectVocab.VALUE_LABEL}
                        </div>
                    </div>
                </div>
                <hr className='divider'/>
                <div className='project-status-form__section'>
                    <div className='project-status-form__description'>
                        <span>{projectVocab.INSTRUCTION_DEACTIVATE}</span>
                        <span>{projectVocab.INSTRUCTION_DRAFT_CONSTRAINT}</span>
                        <span>{projectVocab.INSTRUCTION_REACTIVATE}</span>
                    </div>
                </div>
                <hr className='divider'/>
                <div className='project-status-form__section'>
                    <div className='project-status-form__confirmation'>
                        <p>{confirmVocab.TITLE}</p>
                        <Field
                            component={ConfirmationCheckbox}
                            checked={this.props.draftConfirm}
                            onCheck={this.props.onCheck}
                            name='draftConfirm'
                            label={confirmVocab.CHECKBOX_DRAFT} />
                        <br/>
                        <Field
                            component={ConfirmationCheckbox}
                            checked={this.props.accessConfirm}
                            onCheck={this.props.onCheck}
                            name='accessConfirm'
                            label={confirmVocab.CHECKBOX_ACCESS}/>
                        <br/>
                        <Field
                            component={ConfirmationCheckbox}
                            checked={this.props.usersConfirm}
                            onCheck={this.props.onCheck}
                            name='usersConfirm'
                            label={confirmVocab.CHECKBOX_USERS} />
                    </div>
                </div>
            </form>
        );
    }
}

const FORM_NAME = 'project-status-form';

export default reduxForm({
    form: FORM_NAME,
    onSubmit: (values, dispatch, ownProps) => {
        // Check the checkboxes to ensure they are all true.
        if (ownProps.project.active) {
            const newProject = Object.assign({}, ownProps.project,
                    { status: 1 });
            ownProps.putProject(newProject, ownProps.vocab.ERROR)
            .catch((error) => {
                toast(
                    // greyscale provides readable error messages in 4xx
                    error.body.e >= 400 && error.body.e < 500 ?
                    error.body.message :
                    // fallback to generic error message
                    ownProps.vocab.ERROR.PROJECT_ACTIVATE,
                    { type: 'error', autoClose: false },
                );
            });
            ownProps.updateStatusChange(false);
        } else {
            ownProps.showInactiveConfirmModal(true);
        }
    },
    onSubmitSuccess: (result, dispatch) => dispatch(reset(FORM_NAME)),
})(ProjectStatusForm);
