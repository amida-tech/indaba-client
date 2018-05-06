import React, { Component } from 'react';
import { toast } from 'react-toastify';

import { CONFIRM_TYPE } from '../constants';
import apiService from '../../../services/api';
import SearchInput from '../../../common/components/Dashboard/SearchInput';
import SubjectList from '../../../common/components/SubjectList';
import Modal from '../../../common/components/Modal';

class PMAllSubjects extends Component {
    constructor(props) {
        super(props);
        this.attemptSubjectDelete = this.attemptSubjectDelete.bind(this);
    }
    subjectRequestToast() {
        toast(this.props.vocab.ERROR.SUBJECT_REQUEST,
            { autoClose: false, type: 'error' },
        );
    }
    subjectHasData(subjectId) {
        return new Promise((resolve, reject) => {
            apiService.tasks.getTasks((tasksErr, tasks) => {
                if (tasksErr) {
                    reject(tasksErr);
                } else {
                    const answerPromises = tasks
                    .filter(task => task.uoaId === subjectId)
                    .map(task => apiService.surveys.getAssessmentAnswersStatus(task.assessmentId));
                    Promise.all(answerPromises)
                    .then(statuses => statuses.some(status => status.status !== 'new'))
                    .then(resolve)
                    .catch(reject);
                }
            });
        });
    }
    attemptSubjectDelete(subject) {
        apiService.projects.getProjects()
        .then((projects) => {
            if (!projects.some(project => project.subjects.some(
                    subjectIter => subjectIter.id === subject.id,
                ))) {
                return this.props.actions.pmAllSubjectsShowDeleteConfirmModal(
                    subject.id,
                    CONFIRM_TYPE.SIMPLE);
            }
            return this.subjectHasData(subject.id)
                .then((hasData) => {
                    if (!hasData) {
                        this.props.actions.pmAllSubjectsShowDeleteConfirmModal(
                            subject.id,
                            CONFIRM_TYPE.ASSOCIATED_PROJECT);
                    } else {
                        toast(this.props.vocab.ERROR.NO_DELETE_SUBJECT_WITH_DATA,
                            { autoClose: false, type: 'error' });
                    }
                });
        })
        .catch(this.subjectRequestToast);
    }
    render() {
        return (
            <div className='pm-all-subjects'>
                {
                    this.props.ui.showDeleteConfirmModal &&
                    <Modal vocab={this.props.vocab}
                        title={this.props.vocab.MODAL.SUBJECT_DELETE_CONFIRM.TITLE}
                        bodyText={this.props.vocab.MODAL.SUBJECT_DELETE_CONFIRM[
                            this.props.ui.showDeleteConfirmModal.confirmType ===
                                CONFIRM_TYPE.SIMPLE ?
                            'SIMPLE_CONFIRM' :
                            'ASSOCIATED_PROJECT_CONFIRM'
                        ]}
                        onCancel={() =>
                            this.props.actions.pmAllSubjectsHideDeleteConfirmModal()}
                        onSave={() => {
                            apiService.subjects.deleteSubject(
                                this.props.ui.showDeleteConfirmModal.id,
                                (subjectErr) => {
                                    if (subjectErr) {
                                        toast(this.props.vocab.ERROR.SUBJECT_REQUEST,
                                            { autoClose: false, type: 'error' });
                                    }
                                    this.props.actions.pmAllSubjectsGetSubjects();
                                },
                            );
                            this.props.actions.pmAllSubjectsHideDeleteConfirmModal();
                        }}
                        saveLabel={this.props.vocab.COMMON.DELETE}/>
                }
                <div className='pm-all-subjects__search-wrapper'>
                    <SearchInput className='pm-all-subjects__search'
                        placeholder={this.props.vocab.PROJECT.SEARCH_FOR_SUBJECTS}
                        onChange={evt =>
                            this.props.actions.pmAllSubjectsSetQuery(evt.target.value)} />
                </div>
                <SubjectList
                    isOrderedByNameAscending={this.props.formState.isOrderedByNameAscending}
                    sortNamesAsc={this.props.actions.pmAllSubjectsOrderByNameAscending}
                    sortNamesDesc={this.props.actions.pmAllSubjectsOrderByNameDescending}
                    subjects={this.props.subjects}
                    query={this.props.ui.query}
                    onDeleteClick={this.attemptSubjectDelete}
                    vocab={this.props.vocab}/>
            </div>
        );
    }
}

export default PMAllSubjects;
