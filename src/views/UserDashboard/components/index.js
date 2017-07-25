import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

import TaskStatus from '../../../utils/TaskStatus';
import Time from '../../../utils/Time';

import SplitLayout from '../../../common/components/Dashboard/SplitLayout';
import MessageList from '../../../common/components/Dashboard/MessageList';
import UserGlance from './UserGlance';
import UserTaskListControls from './UserTaskListControls';
import UserTaskListHeader from './UserTaskListHeader';
import UserTaskListEntry from './UserTaskListEntry';

class UserDashboard extends Component {
    render() {
        return (
            <div className='user-dashboard'>
                <SplitLayout>
                    <MessageList vocab={this.props.vocab}
                        messages={this.props.messages}/>
                    <UserGlance vocab={this.props.vocab} {...this.props.glance} />
                </SplitLayout>
                <UserTaskListControls vocab={this.props.vocab}
                    actions={this.props.actions}
                    filter={this.props.ui.filter} />
                <UserTaskListHeader vocab={this.props.vocab} />
                {
                    this.props.rows.map(row =>
                        <UserTaskListEntry {...row} />)
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    glance: {
        tasks: state.tasks.map(projectTasks =>
            projectTasks.tasks.filter(task =>
                task.userId === state.user.profile.id).length)
            .reduce((sum, projectTaskCount) => sum + projectTaskCount, 0),
        newTasks: state.tasks.map(projectTasks =>
            projectTasks.tasks.filter(task =>
                task.userId === state.user.profile.id &&
                task.new,
            ).length)
            .reduce((sum, projectTaskCount) => sum + projectTaskCount, 0),
        lateTasks: state.tasks.map(projectTasks =>
            projectTasks.tasks.filter(task =>
                task.userId === state.user.profile.id &&
                TaskStatus.dueDateInPast(task,
                    state.projects.find(project =>
                        project.id === projectTasks.projectId).stages),
                ).length)
            .reduce((sum, projectTaskCount) => sum + projectTaskCount, 0),
        flagged: state.tasks.map(projectTasks =>
            projectTasks.tasks.filter(task =>
                task.userId === state.user.profile.id &&
                (
                    state.discuss.find(discussion => discussion.taskId === task.id) ||
                    { discuss: [] } // mock empty discussion for flag check call
                ).discuss.some(discussEntry => discussEntry.flag),
            ).length)
            .reduce((sum, projectTaskCount) => sum + projectTaskCount, 0),
    },
    vocab: state.settings.language.vocabulary,
    messages: state.messages,
    ui: state.userdashboard.ui,
    rows: [].concat(...state.tasks.map(projectTasks =>
        projectTasks.tasks.filter(task =>
            task.userId === state.user.profile.id)
        .map(task => _generateRow(state, projectTasks.projectId, task)))),
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});

const _generateRow = (state, projectId, task) => {
    const project = state.projects.find(findProject => findProject.id === projectId);
    return {
        key: task.id,
        subject: project.subjects[task.subject],
        task: project.stages.find(stage => stage.id === task.stage).title,
        due: Time.renderDueDateForTaskList(
            task.dueDate || project.stages.find(stage => stage.id === task.stage).endStage,
            state.settings.language.vocabulary,
        ),
        survey: state.surveys.find(survey => survey.projectId === projectId).name,
        flags: (
            state.discuss.find(discussion => discussion.taskId === task.id) ||
            { discuss: [] }
        ).discuss.filter(discussEntry => discussEntry.flag).length,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
