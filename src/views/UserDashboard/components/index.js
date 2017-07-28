import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { FILTERS } from '../constants';

import TaskStatus from '../../../utils/TaskStatus';
import Time from '../../../utils/Time';

import SplitLayout from '../../../common/components/Dashboard/SplitLayout';
import MessageList from '../../../common/components/Dashboard/MessageList';
import UserGlance from './UserGlance';
import UserTaskListControls from './UserTaskListControls';
import UserTaskListHeader from './UserTaskListHeader';
import UserTaskListEntry from './UserTaskListEntry';

class UserDashboard extends Component {
    filterRow(row) {
        switch (this.props.ui.filter) {
        case FILTERS.ALL_TASKS:
            return true;
        case FILTERS.NEW_TASKS:
            return row.new;
        case FILTERS.LATE_TASKS:
            return row.late;
        case FILTERS.DUE_TODAY:
            return Time.isToday(row.due) && !row.complete;
        case FILTERS.FLAGS:
            return row.flags > 0;
        case FILTERS.DUE_TOMORROW:
            return Time.isTomorrow(row.due) && !row.complete;
        case FILTERS.DUE_THIS_WEEK:
            return Time.isThisWeek(row.due) && !Time.isInPast(row.due) && !row.complete;
        default:
            return true;
        }
    }
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
                <div className='user-dashboard__table'>
                    <UserTaskListHeader vocab={this.props.vocab} />
                    {
                        this.props.rows.filter(this.filterRow.bind(this))
                        .map(row => <UserTaskListEntry {...row} vocab={this.props.vocab}/>)
                    }
                </div>
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
    messages: state.messages.slice(0, 4),
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
    const discussion =
    (
        state.discuss.find(findDiscuss => findDiscuss.taskId === task.id) || { discuss: [] }
    );
    const answered = discussion.discuss.filter(response => response.value !== undefined).length;
    const survey = state.surveys.find(findSurvey => findSurvey.projectId);
    return {
        key: task.id,
        projectId,
        subject: project.subjects[task.subject],
        task: project.stages.find(stage => stage.id === task.stage).title,
        due: task.dueDate || project.stages.find(stage => stage.id === task.stage).endStage,
        survey: survey.name,
        flags: discussion.discuss.filter(response => response.flag).length,
        progress: `${answered} of ${survey.questions.length} ${state.settings.language.vocabulary.PROJECT.ANSWERED}`,
        new: task.new,
        late: TaskStatus.dueDateInPast(task, project.stages) && !TaskStatus.responsesComplete(task),
        complete: TaskStatus.responsesComplete(task),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
