import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SubNav from './SubNav';
import Summary from '../../../common/components/Summary';
import WorkflowContainer from './Workflow';
import Subjects from './Subjects';
import Users from './Users';
import StatusChange from './Modals/StatusChange';
import {
    updateStatusChange,
    setProjectStatus,
    deleteSubject,
    addSubject,
    deleteUserGroup,
    addUserGroup,
    updateUserGroup,
    addUser,
} from '../actions';
import { addNewUser } from '../../../common/actions/userActions';
import { setSurveyStatus } from '../../../common/actions/surveysActions';

class ProjectManagementContainer extends Component {
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
        case 'subject':
            body = <Subjects vocab={this.props.vocab}
                    subjects={this.props.project.subjects}
                    onDeleteSubject={this.props.onDeleteSubject}
                    onAddSubject={this.props.onAddSubject}/>;
            break;
        case 'users':
            body = <Users
                vocab={this.props.vocab}
                users={this.props.project.users.map(
                    userId => this.props.users.find(user => user.id === userId))}
                tasks={this.props.tasks}
                project={this.props.project}
                onDeleteGroup={this.props.onDeleteGroup}
                onAddGroup={this.props.onAddGroup}
                onUpdateGroup={this.props.onUpdateGroup}
                onAddNewUser={this.props.onAddNewUser}
                onAddUserToProject={this.props.onAddUserToProject}/>;
            break;
        default:
            body = null;
            break;
        }
        return (
                <div>
                    { this.props.ui.statusModalId &&
                        <StatusChange vocab={this.props.vocab}
                            project={this.props.project}
                            onStatusChangeClose={() => this.props.updateStatusChange(false)}
                            entity={modalEntities[this.props.ui.statusModalId]}
                            projectStatus={this.props.project.status}
                            surveyStatus={this.props.survey.status}
                            onSetProjectStatus={this.props.onSetProjectStatus}
                            onSetSurveyStatus={this.props.onSetSurveyStatus}/> }
                    <SubNav />
                    <hr className='divider' />
                    <Summary
                        project={this.props.project}
                        survey={this.props.survey}
                        onStatusChangeClick={id => this.props.updateStatusChange(id)}
                        vocab={this.props.vocab} />
                    <hr className='divider' />
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

    onSetProjectStatus: PropTypes.func.isRequired,
    onSetSurveyStatus: PropTypes.func.isRequired,
    onDeleteSubject: PropTypes.func.isRequired,
    onAddSubject: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const projectId = parseInt(ownProps.params.projectId, 10) || state.project.projects[0].id;
    const project = _.find(state.project.projects, current => current.id === projectId);
    return {
        project,
        tasks: _.find(state.tasks, task => task.projectId === project.id).tasks,
        vocab: state.settings.language.vocabulary,
        ui: state.project.ui,
        survey: _.find(state.surveys, survey => survey.projectId === project.id),
        tab: state.project.ui.subnav,
        users: state.user.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateStatusChange: status => dispatch(updateStatusChange(status)),
        onSetProjectStatus: (status, projectId) => dispatch(setProjectStatus(status, projectId)),
        onSetSurveyStatus: (status, projectId) => dispatch(setSurveyStatus(status, projectId)),
        onDeleteSubject: (subject, projectId) => dispatch(deleteSubject(subject, projectId)),
        onAddSubject: (subject, projectId) => dispatch(addSubject(subject, projectId)),
        onDeleteGroup: (groupId, projectId) => dispatch(deleteUserGroup(groupId, projectId)),
        onAddGroup: (group, projectId) => dispatch(addUserGroup(group, projectId)),
        onUpdateGroup: (group, projectId) => dispatch(updateUserGroup(group, projectId)),
        onAddNewUser: user => dispatch(addNewUser(user)),
        onAddUserToProject: (userId, projectId) => dispatch(addUser(userId, projectId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagementContainer);
