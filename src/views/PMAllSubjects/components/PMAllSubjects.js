import React, { Component } from 'react';
import { toast } from 'react-toastify';

import apiService from '../../../services/api';
import SearchInput from '../../../common/components/Dashboard/SearchInput';
import SubjectList from '../../../common/components/SubjectList';
import SubjectDeleteConfirm from '../../../common/components/SubjectDeleteConfirm';

class PMAllSubjects extends Component {
    constructor(props) {
        super(props);
        this.attemptSubjectDelete = this.attemptSubjectDelete.bind(this);
    }
    attemptSubjectDelete(subject) {
        apiService.projects.getProjects((err, projects) => {
            if (err) {
                toast(this.props.vocab.ERROR.SUBJECT_REQUEST,
                    { autoClose: false, type: 'error' });
            } else if (!projects.some(project => project.subjects.some(
                    subjectIter => subjectIter.id === subject.id,
                ))) {
                this.props.actions.pmAllSubjectsShowDeleteConfirmModalForId(subject.id);
            } else {
                // TODO check if data has been collected on subject
            }
        });
    }
    render() {
        return (
            <div className='pm-all-subjects'>
                {
                    this.props.ui.showDeleteConfirmModalForId !== null &&
                    <SubjectDeleteConfirm vocab={this.props.vocab}
                        onCancel={() =>
                            this.props.actions.pmAllSubjectsShowDeleteConfirmModalForId(null)}
                            onSave={() => {
                                apiService.subjects.deleteSubject(
                                    this.props.ui.showDeleteConfirmModalForId,
                                    (subjectErr) => {
                                        if (subjectErr) {
                                            toast(this.props.vocab.ERROR.SUBJECT_REQUEST,
                                                { autoClose: false, type: 'error' });
                                        }
                                        this.props.actions.pmAllSubjectsGetSubjects();
                                    },
                                );
                                this.props.actions.pmAllSubjectsShowDeleteConfirmModalForId(null);
                            }} />
                }
                <div className='pm-all-subjects__search-wrapper'>
                    <SearchInput className='pm-all-subjects__search'
                        placeholder={this.props.vocab.PROJECT.SEARCH_FOR_SUBJECTS}
                        onChange={evt =>
                            this.props.actions.pmAllSubjectsSetQuery(evt.target.value)} />
                </div>
                <SubjectList subjects={this.props.subjects}
                    query={this.props.ui.query}
                    onDeleteClick={this.attemptSubjectDelete}
                    vocab={this.props.vocab}/>
            </div>
        );
    }
}

export default PMAllSubjects;
