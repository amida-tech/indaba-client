import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SubNav from './SubNav';
import Summary from '../../../common/components/Summary';
import WorkflowContainer from './Workflow';
import Subjects from './Subjects';
import Users from './Users';
import SurveyBuilder from '../../../common/components/SurveyBuilder';
import StatusChange from './Modals/StatusChange';
import { renderName } from '../../../utils/User';
import * as actions from '../actions';
import * as navActions from '../../../common/actions/navActions';
import * as projectActions from '../../../common/actions/projectActions';
import * as surveyActions from '../../../common/actions/surveyActions';
import * as discussActions from '../../../common/actions/discussActions';
import { addNewUser, notifyUser } from '../../../common/actions/userActions';
import * as taskActions from '../../../common/actions/taskActions';

class ProjectManagementContainer extends Component {
    componentWillMount() {
        this.props.actions.getProjectById(this.props.params.projectId, this.props.vocab.ERROR);
        this.props.actions.getTasksByProject(this.props.params.projectId, this.props.vocab.ERROR);
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
                    actions={this.props.actions}/>;
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
                            survey={this.props.survey}
                            actions={this.props.actions}
                            vocab={this.props.vocab}
                            entity={modalEntities[this.props.ui.statusModalId]} /> }
                    <Summary
                        actions={this.props.actions}
                        project={this.props.project}
                        survey={this.props.survey}
                        onStatusChangeClick={id => this.props.actions.updateStatusChange(id)}
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
        discussActions,
        { addNewUser, notifyUser },
        { sendMessage: user => dispatch(push(
            {
                pathname: '/messages/new',
                state: { message: { to: renderName(user) } },
            },
        )) },
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagementContainer);
