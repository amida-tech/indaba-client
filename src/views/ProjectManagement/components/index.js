import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { toast } from 'react-toastify';

import SubNav from './SubNav';
import Summary from '../../../common/components/Summary';
import WorkflowContainer from './Workflow';
import Subjects from './Subjects';
import Users from './Users';
import Export from './Export';
import StatusChange from './Modals/StatusChange';
import ProjectTitleModal from '../../../common/components/TitleChange/ProjectTitleModal';
import SurveyTitleModal from '../../../common/components/TitleChange/SurveyTitleModal';
import { SurveyBuilder } from '../../../views/SurveyBuilder';
import * as actions from '../actions';
import * as navActions from '../../../common/actions/navActions';
import * as projectActions from '../../../common/actions/projectActions';
import * as surveyActions from '../../../common/actions/surveyActions';
import { addNewUser } from '../../../common/actions/userActions';
import * as taskActions from '../../../common/actions/taskActions';
import StageModal from './Modals/Stage';
import InactiveConfirm from './Modals/StatusChange/InactiveConfirm';
import Modal from '../../../common/components/Modal';
import apiService from '../../../services/api';

class ProjectManagementContainer extends Component {
    componentWillMount() {
        this.props.actions.getProjectById(
            this.props.params.projectId,
            true,
            this.props.vocab.ERROR);
    }

    stageHasData(stageId) {
        return Promise.all(
            this.props.tasks
            .filter(task => task.stepId === stageId &&
                task.productId === this.props.project.productId)
            .map(task => apiService.surveys.getAssessmentAnswersStatus(task.assessmentId)),
        )
        .then(statuses => statuses.some(status => status !== 'new'))
        .catch(() => toast(this.props.vocab.ERROR.STAGE_REQUEST));
    }

    handleStageDelete(stageId) {
        this.stageHasData(stageId).then((hasData) => {
            if (hasData) {
                toast(this.props.vocab.MODAL.STAGE_DELETE_CONFIRM.NO_DELETE,
                    { type: 'error', autoClose: false });
            } else {
                this.props.actions.pmShowStageDeleteConfirmModal(stageId);
            }
        });
    }

    render() {
        const modalEntities = {
            projectstatusmodal: 'project',
            surveystatusmodal: 'survey',
        };
        let body;
        switch (this.props.tab) {
        case 'workflow':
            body = <WorkflowContainer {...this.props} />;
            break;
        case 'survey':
            body = <SurveyBuilder {...this.props} />;
            break;
        case 'users':
            body = <Users
                vocab={this.props.vocab}
                users={this.props.project.users.map(
                    userId => this.props.users.find(user => user.id === userId))}
                allUsers={this.props.users}
                tasks={this.props.tasks}
                project={this.props.project}
                profile={this.props.profile}
                actions={this.props.actions}
                ui={this.props.ui}/>;
            break;
        case 'subject':
            body = <Subjects vocab={this.props.vocab}
                    project={this.props.project}
                    subjects={this.props.project.subjects}
                    actions={this.props.actions}
                    tasks={this.props.tasks}
                    ui={this.props.ui}/>;
            break;
        case 'export':
            body = <Export vocab={this.props.vocab}
                subjects={this.props.project.subjects}
                actions={this.props.actions}
                ui={this.props.ui.export}
                survey={this.props.survey}
                onSubmit={() => {
                    this.props.actions.exportData(
                        this.props.project.productId,
                        this.props.project.name,
                        this.props.vocab.ERROR)
                    .then(() => toast(this.props.vocab.EXPORT.DOWNLOAD_IN_PROGRESS))
                    .catch(() => toast(this.props.vocab.ERROR.DATA_REQUEST));
                }}/>;
            break;
        default:
            body = null;
            break;
        }
        return (
                <div>
                    {
                        this.props.ui.statusModalId && !this.props.ui.showInactiveConfirmModal &&
                        <StatusChange vocab={this.props.vocab}
                            project={this.props.project}
                            survey={this.props.survey}
                            actions={this.props.actions}
                            vocab={this.props.vocab}
                            entity={modalEntities[this.props.ui.statusModalId]} />
                    }
                    {
                        this.props.ui.showInactiveConfirmModal &&
                        <InactiveConfirm vocab={this.props.vocab}
                            project={this.props.project}
                            actions={this.props.actions} />
                    }
                    {
                        this.props.ui.showProjectTitleModal &&
                        <ProjectTitleModal vocab={this.props.vocab}
                            actions={this.props.actions}
                            project={this.props.project}
                            onCloseModal={this.props.actions.pmHideProjectTitleModal}/>
                    }
                    {
                        this.props.ui.showSurveyTitleModal &&
                        <SurveyTitleModal vocab={this.props.vocab}
                            actions={this.props.actions}
                            survey={this.props.survey}
                            project={this.props.project}
                            onCloseModal={this.props.actions.pmHideSurveyTitleModal}/>
                    }
                    {
                        this.props.ui.showStage && !this.props.ui.showStageDeleteConfirmModal &&
                        <StageModal
                            vocab={this.props.vocab}
                            project={this.props.project}
                            stageId={this.props.ui.editStage}
                            onCancel={() => this.props.actions.showStageModal(false)}
                            onDeleteClick={() => this.handleStageDelete(this.props.ui.editStage)}
                            onAddStage={(stage) => {
                                this.props.actions.showStageModal(false);
                                this.props.actions.putStage(
                                    this.props.project,
                                    stage,
                                    false,
                                    this.props.vocab.ERROR);
                            }}
                            userGroups={this.props.project.userGroups} />
                    }
                    {
                        this.props.ui.showStageDeleteConfirmModal &&
                        <Modal title={this.props.vocab.MODAL.STAGE_DELETE_CONFIRM.TITLE}
                            bodyText={this.props.vocab.MODAL.STAGE_DELETE_CONFIRM.DELETE_NO_DATA}
                            onCancel={this.props.actions.pmHideStageDeleteConfirmModal}
                            onSave={() => this.props.actions.pmDeleteStage(
                                this.props.project.id,
                                this.props.ui.showStageDeleteConfirmModal.stageId)
                            .then(() => {
                                this.props.actions.showStageModal(false);
                                this.props.actions.pmHideStageDeleteConfirmModal();
                            }).catch(() => {
                                toast(this.props.vocab.ERROR.STAGE_REQUEST,
                                    { type: 'error', autoClose: false });
                                this.props.actions.pmHideStageDeleteConfirmModal();
                            }) }
                            saveLabel={this.props.vocab.COMMON.DELETE} />
                    }
                    <Summary
                        actions={this.props.actions}
                        project={this.props.project}
                        survey={this.props.survey}
                        onStatusChangeClick={id => this.props.actions.updateStatusChange(id)}
                        onProjectEditClick={this.props.actions.pmShowProjectTitleModal}
                        onSurveyEditClick={this.props.actions.pmShowSurveyTitleModal}
                        vocab={this.props.vocab}/>
                    <SubNav vocab={this.props.vocab}
                        subnavigate={this.props.actions.subnavigate}
                        selected={this.props.ui.subnav}/>
                    <hr className='divider main-divider' />
                    {body}
                </div>
        );
    }
}

ProjectManagementContainer.displayName = 'Project Manager';

ProjectManagementContainer.propTypes = {
    vocab: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    tab: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const projectId = parseInt(ownProps.params.projectId, 10) || state.projects[0].id;
    const project = state.projects.data[0].name ?
        _.find(state.projects.data, current => current.id === projectId) :
        state.projects.data[0];
    return {
        project,
        tasks: state.tasks.data,
        responses: state.discuss,
        vocab: state.settings.language.vocabulary,
        ui: _.merge({}, state.manager.ui, state.projects.ui, state.nav.ui, state.surveys.ui),
        survey: _.find(state.surveys.data, survey => survey.id === project.surveyId) ||
            { id: -1, name: state.surveys.ui.newSurveyName, status: 'draft', sections: [] },
        tab: state.manager.ui.subnav,
        users: state.user.users,
        profile: state.user.profile,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({},
        actions,
        navActions,
        projectActions,
        surveyActions,
        taskActions,
        { addNewUser },
        { sendMessage: user => dispatch(push(
            {
                pathname: '/messages/new',
                state: { message: { to: [user.email] } },
            },
        )) },
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagementContainer);
