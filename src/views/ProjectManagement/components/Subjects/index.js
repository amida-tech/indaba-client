import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { toast } from 'react-toastify';

import apiService from '../../../../services/api';
import SubjectList from '../../../../common/components/SubjectList';
import AddSubject from '../Modals/AddSubject';
import SubjectDeleteConfirmModal from '../../../../common/components/SubjectDeleteConfirm';
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
        if (this.props.project.hasNeverBeenActive /* TODO INBA-490 */) {
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
        const answerPromises = [];
        this.props.tasks
        .filter(task => task.uoaId === subjectId)
        .map(task => answerPromises.push(
            new Promise((resolve, reject) => {
                apiService.surveys
                .getAssessmentAnswersStatus(task.assessmentId, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                });
            }),
        ));
        return Promise.all(answerPromises)
        .then(statuses => statuses.some(status => status.status !== 'new'));
    }
    render() {
        return (
            <div className='subjects'>
                {this.state.showAddSubjectModal &&
                    <AddSubject
                        onAddSubject={(subject) => {
                            this.setState({ showAddSubjectModal: false });
                            this.props.actions.addSubject(
                                this.props.project,
                                [{ name: subject }],
                                false,
                                this.props.vocab.ERROR);
                        }}
                        onCancel={() => this.setState({ showAddSubjectModal: false })}
                        vocab={this.props.vocab}/>}
                {
                    this.props.ui.showSubjectDeleteConfirmModalForId !== null &&
                    <SubjectDeleteConfirmModal vocab={this.props.vocab}
                        onCancel={() => this.props.actions.showSubjectDeleteConfirmModalForId(null)}
                        onSave={() => {
                            this.props.actions.deleteSubject(
                                this.props.project,
                                this.props.ui.showSubjectDeleteConfirmModalForId,
                                false,
                                this.props.vocab.ERROR);
                            this.props.actions.showSubjectDeleteConfirmModalForId(null);
                        }}/>
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
                        vocab={this.props.vocab}
                        subjects={this.props.subjects}
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
