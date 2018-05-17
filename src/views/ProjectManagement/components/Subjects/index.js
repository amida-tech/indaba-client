import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { toast } from 'react-toastify';
import _ from 'lodash';

import apiService from '../../../../services/api';
import SubjectList from '../../../../common/components/SubjectList';
import SubjectModal from '../Modals/Subject';
import Modal from '../../../../common/components/Modal';
import SearchInput from '../../../../common/components/Dashboard/SearchInput';

class Subjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            showAddSubjectModal: false,
        };
        this.attemptSubjectDelete = this.attemptSubjectDelete.bind(this);
    }
    attemptSubjectDelete(subject) {
        if (!this.props.project.firstActivated) {
            this.props.actions.showSubjectDeleteConfirmModalForId(subject.id);
        } else {
            this.subjectHasData(subject.id).then((hasData) => {
                if (hasData) {
                    toast(this.props.vocab.ERROR.NO_DELETE_SUBJECT_WITH_DATA,
                        { autoClose: false,
                            type: 'error' });
                } else {
                    this.props.actions
                            .showSubjectDeleteConfirmModalForId(subject.id);
                }
            });
        }
    }
    subjectHasData(subjectId) {
        const answerPromises =
        this.props.tasks
        .filter(task => task.uoaId === subjectId)
        .map(task => apiService.surveys.getAssessmentAnswersStatus(task.assessmentId));
        return Promise.all(answerPromises)
        .then(statuses => statuses.some(status => status.status !== 'new'));
    }
    orderSubjectsByNameAscending(subjects) {
        return _.orderBy(subjects, [subject => subject.name.toLowerCase()], ['asc']);
    }
    orderSubjectsByNameDescending(subjects) {
        return _.orderBy(subjects, [subject => subject.name.toLowerCase()], ['desc']);
    }
    render() {
        return (
            <div className='subjects'>
                {this.state.showAddSubjectModal &&
                    <SubjectModal
                        onAddSubject={(subjects) => {
                            this.setState({ showAddSubjectModal: false });
                            this.props.actions.addSubject(
                                this.props.project,
                                subjects,
                                false,
                                this.props.vocab.ERROR);
                        }}
                        onCancel={() => this.setState({ showAddSubjectModal: false })}
                        vocab={this.props.vocab}/>}
                {
                    this.props.ui.showSubjectDeleteConfirmModalForId !== null &&
                    <Modal vocab={this.props.vocab}
                        title={this.props.vocab.MODAL.SUBJECT_DELETE_CONFIRM.TITLE}
                        bodyText={this.props.vocab.MODAL.SUBJECT_DELETE_CONFIRM.SIMPLE_CONFIRM}
                        onCancel={() => this.props.actions.showSubjectDeleteConfirmModalForId(null)}
                        onSave={() => {
                            this.props.actions.deleteSubject(
                                this.props.project,
                                this.props.ui.showSubjectDeleteConfirmModalForId,
                                false,
                                this.props.vocab.ERROR);
                            this.props.actions.showSubjectDeleteConfirmModalForId(null);
                        }}
                        saveLabel={this.props.vocab.COMMON.DELETE} />
                }
                <div className='subjects__action'>
                    <Button className='subjects__action-button'
                        label={this.props.vocab.PROJECT.ADD_SUBJECT}
                        primary
                        onClick={() => this.setState({ showAddSubjectModal: true })}/>
                </div>
                <hr className='divider' />
                <div className='subjects__table'>
                    <div className='subjects__search-wrapper'>
                        <SearchInput className='subjects__search'
                            placeholder={this.props.vocab.PROJECT.SEARCH_FOR_SUBJECTS}
                            onChange={evt => this.setState({ query: evt.target.value })} />
                    </div>
                    <SubjectList
                        isOrderedByNameAscending={this.props.isOrderedByNameAscending}
                        sortNamesAsc={this.props.actions.pmProjectSubjectsOrderByNameAscending}
                        sortNamesDesc={this.props.actions.pmProjectSubjectsOrderByNameDescending}
                        subjects={this.props.isOrderedByNameAscending
                            ? this.orderSubjectsByNameAscending(this.props.subjects)
                            : this.orderSubjectsByNameDescending(this.props.subjects)}
                        vocab={this.props.vocab}
                        query={this.state.query}
                        onDeleteClick={this.attemptSubjectDelete}/>
                </div>
            </div>);
    }
}

Subjects.propTypes = {
    project: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

export default Subjects;
