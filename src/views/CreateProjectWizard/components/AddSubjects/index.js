import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { toast } from 'react-toastify';

import apiService from '../../../../services/api';
import Modal from '../../../../common/components/Modal';
import { DELETE_TYPE } from '../../constants';
import AddSubjectControl from './AddSubjectControl';
import DeleteIconButton from '../../../../common/components/DeleteIconButton';

class AddSubjects extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleModalSave = this.handleModalSave.bind(this);
    }
    handleDeleteClick(subjectId) {
        // if used in any other project, do DELETE, otherwise, do disassociate
        apiService.projects.getProjects()
        .then((projects) => {
            const deleteType =
                projects.some(project =>
                    project.id !== this.props.project.id &&
                    project.subjects.some(subjectIter => subjectIter.id === subjectId)) ?
                DELETE_TYPE.DISASSOCIATE_FROM_PROJECT :
                DELETE_TYPE.DELETE;
            this.props.actions.wizardShowSubjectDeleteConfirmModal(subjectId, deleteType);
        })
        .catch(() => {
            toast(this.props.vocab.ERROR.SUBJECT_REQUEST, {
                autoClose: false, type: 'error',
            });
        });
    }
    handleModalSave() {
        if (this.props.ui.showSubjectDeleteConfirmModal.deleteType === DELETE_TYPE.DELETE) {
            apiService.subjects.deleteSubject(this.props.ui.showSubjectDeleteConfirmModal.id)
            .catch((subjectErr) => {
                if (subjectErr) {
                    toast(this.props.vocab.ERROR.SUBJECT_REQUEST,
                        { autoClose: false, type: 'error' });
                }
                this.props.actions.getProjectById(
                    this.props.project.id,
                    false,
                    this.props.vocab.ERROR);
            });
            this.props.actions.wizardHideSubjectDeleteConfirmModal();
        } else {
            apiService.projects.deleteUOA(
                this.props.ui.showSubjectDeleteConfirmModal.id,
                {
                    productId: this.props.project.productId,
                    uoaId: this.props.ui.showSubjectDeleteConfirmModal.id,
                })
            .catch(() => {
                toast(this.props.vocab.ERROR.SUBJECT_REQUEST,
                    { autoClose: false, type: 'error' });
            })
            .then(() => this.props.actions.getProjectById(
                this.props.project.id,
                false,
                this.props.vocab.ERROR),
            );
            this.props.actions.wizardHideSubjectDeleteConfirmModal();
        }
    }
    render() {
        return (
            <div className='add-subjects'>
                {
                    this.props.ui.showSubjectDeleteConfirmModal &&
                    <Modal title={this.props.vocab.MODAL.SUBJECT_DELETE_CONFIRM.TITLE}
                        bodyText={this.props.vocab.MODAL.SUBJECT_DELETE_CONFIRM.SIMPLE_CONFIRM}
                        onCancel={() => this.props.actions.wizardHideSubjectDeletConfirmModal()}
                        onSave={this.handleModalSave}/>
                }
                <hr className='divider'/>
                <div className='add-subjects__import-row'>
                    <Button label={this.props.vocab.PROJECT.IMPORT_SUBJECTS} />
                </div>
                <hr className='divider'/>
                <p className='add-subjects__instructions'>
                    {this.props.vocab.PROJECT.ADD_SUBJECT_INSTRUCTION}
                </p>
                <AddSubjectControl
                    project={this.props.project}
                    addSubject={this.props.actions.addSubject}
                    vocab={this.props.vocab} />
                {this.props.project.subjects &&
                    this.props.project.subjects.map(subject =>
                    <div className='add-subjects__table-row'
                        key={`subject${subject.name}${subject.id}`}>
                        {subject.name}
                        <DeleteIconButton onClick={() => this.handleDeleteClick(subject.id)} />
                    </div>,
                )}
            </div>
        );
    }
}

AddSubjects.propTypes = {
    project: PropTypes.shape({
        subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    survey: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    ui: PropTypes.object.isRequired,
};

export default AddSubjects;
