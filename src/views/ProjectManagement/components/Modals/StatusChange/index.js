import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProjectStatus, setSurveyStatus } from '../../../actions';
import Modal from '../../../../../common/Modal';
import ProjectStatusBody from './ProjectStatusBody';
import SurveyStatusBody from './SurveyStatusBody';

class StatusChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: {
                published: this.props.surveyStatus === 'Published',
                accessConfirm: false,
                usersConfirm: false,
                editConfirm: false,
            },
            project: {
                active: this.props.projectStatus === 'Active',
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
                this.props.onSetProjectStatus(this.state.project.active ? 'Active' : 'Inactive');
                this.props.onStatusChangeClose();
            }
        } else if (this.surveyConfirmed()) {
            this.props.onSetSurveyStatus(this.state.survey.published ? 'Published' : 'Draft');
            this.props.onStatusChangeClose();
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

const mapStateToProps = state => ({
    projectStatus: state.project.workflow.status,
    surveyStatus: state.project.survey.status,
});
const mapDispatchToProps = dispatch => ({
    onSetProjectStatus: status => dispatch(setProjectStatus(status)),
    onSetSurveyStatus: status => dispatch(setSurveyStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusChange);
