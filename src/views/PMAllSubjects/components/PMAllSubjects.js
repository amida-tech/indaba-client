import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { orderBy } from 'lodash';

import { CONFIRM_TYPE } from '../constants';
import apiService from '../../../services/api';
import FilterInput from '../../../common/components/Dashboard/FilterInput';
import SubjectList from '../../../common/components/SubjectList';
import Modal from '../../../common/components/Modal';

class PMAllSubjects extends Component {
    constructor(props) {
        super(props);
        this.attemptSubjectDelete = this.attemptSubjectDelete.bind(this);
    }

    subjectRequestToast() {
        toast(this.props.vocab.ERROR.SUBJECT_REQUEST,
            { autoClose: false, type: 'error' });
    }

    subjectHasData(subjectId) {
        return apiService.tasks.getTasks()
            .then((tasks) => {
                const answerPromises = tasks
                    .filter(task => task.uoaId === subjectId)
                    .map(task => apiService.surveys.getAssessmentAnswersStatus(task.assessmentId));

                return Promise.all(answerPromises)
                    .then(statuses => statuses.some(status => status.status !== 'new'));
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
                        CONFIRM_TYPE.SIMPLE,
                    );
                }
                return this.subjectHasData(subject.id)
                    .then((hasData) => {
                        if (!hasData) {
                            this.props.actions.pmAllSubjectsShowDeleteConfirmModal(
                                subject.id,
                                CONFIRM_TYPE.ASSOCIATED_PROJECT,
                            );
                        } else {
                            toast(this.props.vocab.ERROR.NO_DELETE_SUBJECT_WITH_DATA,
                                { autoClose: false, type: 'error' });
                        }
                    });
            })
            .catch(this.subjectRequestToast);
    }

    orderSubjectsByNameAscending(subjects) {
        return orderBy(subjects, [subject => subject.name.toLowerCase()], ['asc']);
    }

    orderSubjectsByNameDescending(subjects) {
        return orderBy(subjects, [subject => subject.name.toLowerCase()], ['desc']);
    }

    render() {
        return (
            <div className='pm-all-subjects'>
                {
                    this.props.ui.showDeleteConfirmModal
                    && <Modal vocab={this.props.vocab}
                        title={this.props.vocab.MODAL.SUBJECT_DELETE_CONFIRM.TITLE}
                        bodyText={this.props.vocab.MODAL.SUBJECT_DELETE_CONFIRM[
                            this.props.ui.showDeleteConfirmModal.confirmType
                                === CONFIRM_TYPE.SIMPLE
                                ? 'SIMPLE_CONFIRM'
                                : 'ASSOCIATED_PROJECT_CONFIRM'
                        ]}
                        onCancel={() => this.props.actions.pmAllSubjectsHideDeleteConfirmModal()}
                        onSave={() => {
                            apiService.subjects.deleteSubject(
                                this.props.ui.showDeleteConfirmModal.id,
                            )
                                .then(() => this.props.actions.pmAllSubjectsGetSubjects())
                                .catch(() => {
                                    toast(this.props.vocab.ERROR.SUBJECT_REQUEST,
                                        { autoClose: false, type: 'error' });
                                });
                            this.props.actions.pmAllSubjectsHideDeleteConfirmModal();
                        }}
                        saveLabel={this.props.vocab.COMMON.DELETE}/>
                }
                <div className='pm-all-subjects__filter-wrapper'>
                    <FilterInput className='pm-all-subjects__filter'
                        placeholder={this.props.vocab.PROJECT.FILTER_SUBJECTS}
                        onChange={evt => this.props.actions.pmAllSubjectsSetQuery(evt.target.value)} />
                </div>
                <SubjectList
                    isOrderedByNameAscending={this.props.formState.isOrderedByNameAscending}
                    sortNamesAsc={this.props.actions.pmAllSubjectsOrderByNameAscending}
                    sortNamesDesc={this.props.actions.pmAllSubjectsOrderByNameDescending}
                    subjects={this.props.formState.isOrderedByNameAscending
                        ? this.orderSubjectsByNameAscending(this.props.subjects)
                        : this.orderSubjectsByNameDescending(this.props.subjects)}
                    query={this.props.ui.query}
                    onDeleteClick={this.attemptSubjectDelete}
                    vocab={this.props.vocab}/>
            </div>
        );
    }
}

export default PMAllSubjects;
