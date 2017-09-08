import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { getSelfTasks, getTasksByUser } from '../../../common/actions/taskActions';
import { getProjects } from '../../../common/actions/projectActions';
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
    componentWillMount() {
        this.props.actions.getProjects(this.props.vocab.ERROR);
        if (this.props.params.userId) {
            this.props.actions.getTasksByUser(this.props.params.userId, this.props.vocab.ERROR);
        } else {
            this.props.actions.getSelfTasks(this.props.vocab.ERROR);
        }
    }

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
        case FILTERS.COMPLETED:
            return row.complete;
        default:
            return true;
        }
    }
    searchRow(row) {
        const lowerQuery = this.props.ui.searchQuery.toLowerCase();
        return row.subject.toLowerCase().includes(lowerQuery) ||
            row.task.toLowerCase().includes(lowerQuery) ||
            row.survey.toLowerCase().includes(lowerQuery);
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
                        .filter(this.searchRow.bind(this))
                        .map(row => <UserTaskListEntry {...row} vocab={this.props.vocab}/>)
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    glance: {
        tasks: state.tasks.data.length,
        newTasks: 0, // Come back to.
        lateTasks: state.tasks.data.filter(task => TaskStatus.endDateInPast(task)).length,
        flagged: 0, // Come back to.
    },
    profile: state.user.profile,
    vocab: state.settings.language.vocabulary,
    messages: state.messages.slice(0, 4),
    ui: state.userdashboard.ui,
    rows: [].concat(...state.tasks.data.map(task =>
        _generateRow(state, task.projectId, task))),
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({},
        actions, { getSelfTasks, getTasksByUser, getProjects }), dispatch),
});

const _generateRow = (state, projectId, task) => {
    const project = state.projects.data[0].name ?
        state.projects.data.find(findProject => findProject.id === projectId) :
        state.projects.data[0];
    const subject = project.subjects.find(elem => elem.id === task.uoaId);
    const discussion = (state.discuss.data.find(findDiscuss =>
        findDiscuss.taskId === task.id) || { data: [] });
    const answered = discussion.data.filter(response =>
        response.value !== undefined).length;
    const survey = state.surveys.data.find(findSurvey =>
        findSurvey.projectId === projectId) || { name: '', questions: [] };
    return {
        key: task.id,
        projectId,
        subject: subject ? subject.name : '',
        task: task.title,
        due: task.endDate,
        survey: survey.name,
        flags: task.flagCount,
        progress: `${answered} / ${survey.questions.length}
            ${state.settings.language.vocabulary.PROJECT.ANSWERED}`,
        new: !!task.new,
        late: TaskStatus.endDateInPast(task) &&
            !TaskStatus.responsesComplete({ response: discussion.data },
                survey.questions.length),
        complete: TaskStatus.responsesComplete({ response: discussion.data },
            survey.questions.length),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
