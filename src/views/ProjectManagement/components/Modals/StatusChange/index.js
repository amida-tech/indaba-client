import React, { Component } from 'react';
import Modal from '../../../../../common/components/Modal';
import ProjectStatusBody from './ProjectStatusBody';
import SurveyStatusBody from './SurveyStatusBody';

class StatusChange extends Component {
    constructor(props) {
        super(props);
        this.state = { // TODO: Rewrite this later.
            survey: {
                published: this.props.survey.status === 'published',
                accessConfirm: false,
                usersConfirm: false,
                editConfirm: false,
            },
            project: {
                active: this.props.project.status,
                draftConfirm: false,
                accessConfirm: false,
                usersConfirm: false,
            },
        };
    }
    projectConfirmed() {
        return this.state.project.draftConfirm &&
        this.state.project.accessConfirm &&
        this.state.project.usersConfirm;
    }
    projectCheck(name, checked) {
        const newState = Object.assign({}, this.state);
        newState.project[name] = checked;
        this.setState(newState);
    }
    surveyCheck(name, checked) {
        const newState = Object.assign({}, this.state);
        newState.survey[name] = checked;
        this.setState(newState);
    }
    surveyConfirmed() {
        return this.state.survey.accessConfirm &&
        this.state.survey.usersConfirm &&
        this.state.survey.editConfirm;
    }
    save() {
        if (this.props.entity === 'project') {
            if (this.projectConfirmed()) {
                this.props.actions.putProject(Object.assign({}, this.props.project,
                        { status: this.state.project.active ? 1 : 0 }),
                    this.props.vocab.ERROR);
                this.props.actions.updateStatusChange(false);
            }
        } else if (this.surveyConfirmed()) {
            this.props.actions.patchSurvey(Object.assign({}, this.props.survey,
                    { status: this.state.survey.published ? 'published' : 'draft' }),
                this.props.vocab.ERROR);
            this.props.actions.updateStatusChange(false);
        }
    }
    render() {
        const title = this.props.entity === 'project' ?
        this.props.vocab.MODAL.STATUS_CHANGE_MODAL.PROJECT_TAB.TITLE :
        this.props.vocab.MODAL.STATUS_CHANGE_MODAL.SURVEY_TAB.TITLE;
        return (
            <Modal
                class='project-status-change-layer'
                title={title}
                onSave={this.save.bind(this)}
                onCancel={this.props.onStatusChangeClose}>
                {this.props.entity === 'project' ?
                    <ProjectStatusBody {...this.state.project}
                        vocab={this.props.vocab}
                        onCheck={this.projectCheck.bind(this)} /> :
                    <SurveyStatusBody {...this.state.survey}
                        vocab={this.props.vocab}
                        onCheck={this.surveyCheck.bind(this)} />}
            </Modal>
        );
    }
}

export default StatusChange;
