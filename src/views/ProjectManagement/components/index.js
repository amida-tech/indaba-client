import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SubNav from './SubNav';
import Summary from '../../../common/components/Summary';
import WorkflowContainer from './Workflow';
import Subjects from './Subjects';
import Users from './Users';
import StatusChange from './Modals/StatusChange';
import * as actions from '../actions';
import * as projectActions from '../../../common/actions/projectActions';
import * as discussActions from '../../../common/actions/discussActions';
import { addNewUser, notifyUser } from '../../../common/actions/userActions';
import * as taskActions from '../../../common/actions/taskActions';
import { setSurveyStatus, setSurveyName } from '../../../common/actions/surveysActions';

class ProjectManagementContainer extends Component {
    componentWillMount() {

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
        case 'subject':
            body = <Subjects vocab={this.props.vocab}
                    projectId={this.props.project.id}
                    subjects={this.props.project.subjects}
                    onDeleteSubject={this.props.actions.deleteSubject}
                    onAddSubject={this.props.actions.addSubject}/>;
            break;
        case 'users':
            body = <Users
                vocab={this.props.vocab}
                users={this.props.project.users.map(
                    userId => this.props.users.find(user => user.id === userId))}
                tasks={this.props.tasks}
                project={this.props.project}
                onDeleteGroup={this.props.actions.deleteUserGroup}
                onAddGroup={this.props.actions.addUserGroup}
                onUpdateGroup={this.props.actions.updateUserGroup}
                onAddNewUser={this.props.actions.onAddNewUser}
                onAddUserToProject={this.props.actions.addUser}
                onRemoveUserFromProject={this.props.actions.removeUser}/>;
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
                            onStatusChangeClose={() => this.props.actions.updateStatusChange(false)}
                            entity={modalEntities[this.props.ui.statusModalId]}
                            projectStatus={this.props.project.status}
                            surveyStatus={this.props.survey.status}
                            onSetProjectStatus={this.props.actions.setProjectStatus}
                            onSetSurveyStatus={this.props.actions.setSurveyStatus}/> }
                    <SubNav vocab={this.props.vocab}
                        subnavigate={this.props.actions.subnavigate}
                        selected={this.props.ui.subnav}/>
                    <hr className='divider main-divider' />
                    <Summary
                        project={this.props.project}
                        survey={this.props.survey}
                        onStatusChangeClick={id => this.props.actions.updateStatusChange(id)}
                        vocab={this.props.vocab}
                        onProjectNameChange={name =>
                            this.props.actions.setProjectName(name, this.props.project.id)}
                        onSurveyNameChange={name =>
                            this.props.actions.setSurveyName(name, this.props.project.id)}/>
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
    const project = _.find(state.projects.data, current => current.id === projectId);
    const tasksCheck = _.find(state.tasks, task => task.projectId === projectId);
    return {
        project,
        tasks: tasksCheck ? tasksCheck.tasks : [],
        responses: state.discuss,
        vocab: state.settings.language.vocabulary,
        ui: _.merge(state.manager.ui, state.projects.ui),
        survey: _.find(state.surveys, survey => survey.projectId === projectId) || {},
        tab: state.manager.ui.subnav,
        users: state.user.users,
        profile: state.user.profile,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({},
        actions,
        projectActions,
        taskActions,
        discussActions,
        { addNewUser, notifyUser },
        { setSurveyStatus, setSurveyName },
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagementContainer);
