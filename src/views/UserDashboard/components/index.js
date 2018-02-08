import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';

import * as actions from '../actions';
import { getSelfTasks, getTasksByUser } from '../../../common/actions/taskActions';
import { getProjects } from '../../../common/actions/projectActions';
import { FILTERS } from '../constants';

import TaskStatus from '../../../utils/TaskStatus';
import Time from '../../../utils/Time';
import { questionListLengthFromSurvey } from '../../../utils/Survey';

import SplitLayout from '../../../common/components/Dashboard/SplitLayout';
import MessageList from '../../../common/components/Dashboard/MessageList';
import UserGlance from './UserGlance';
import UserTaskListControls from './UserTaskListControls';
import UserTaskListHeader from './UserTaskListHeader';
import UserTaskListEntry from './UserTaskListEntry';

class UserDashboard extends Component {
    componentWillMount() {
        this.props.actions.getProjects(this.props.vocab.ERROR);
        this.props.actions.getDashboardData(this.props.vocab.ERROR,
            this.props.params.userId);
        this.props.actions.userDashGetMessages();
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
            row.task.title.toLowerCase().includes(lowerQuery) ||
            row.survey.toLowerCase().includes(lowerQuery);
    }
    render() {
        return (
            <div className='user-dashboard'>
                <SplitLayout>
                    <MessageList vocab={this.props.vocab}
                        messages={this.props.messages}
                        users={this.props.users}
                        onMessageClick={this.props.goToMessage}/>
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

const mapStateToProps = (state) => {
    const rows = state.userdashboard.tasks
        .filter(task => task.complete || task.active)
        // omit any tasks in projects that are inactive (hiding all before project data is loaded)
        .filter(task => get(
            state.projects.data.find(findProject => findProject.id === task.projectId),
            'status',
            0) === 1)
        .map(task => _generateRow(state, task.projectId, task));
    return {
        glance: {
            tasks: rows.filter(row => !row.complete).length,
            newTasks: rows.filter(row => row.new).length,
            lateTasks: rows.filter(row => row.late).length,
            flagged: rows.filter(row => row.flags > 0).length,
        },
        profile: state.user.profile,
        vocab: state.settings.language.vocabulary,
        messages: state.userdashboard.messages.slice(0, 4),
        ui: state.userdashboard.ui,
        users: state.user.users,
        rows,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({},
        actions, { getSelfTasks, getTasksByUser, getProjects }), dispatch),
    goToMessage: id => dispatch(push(`/messages/${id}`)),
});

const _generateRow = (state, projectId, task) => { // TODO: INBA-439
    const project = state.projects.data[0].name ?
        state.projects.data.find(findProject => findProject.id === projectId) :
        state.projects.data[0];
    const subject = project !== undefined ?
        project.subjects.find(elem => elem.id === task.uoaId) : { name: '' };
    const answers = state.userdashboard.answers.find(findAnswers =>
        findAnswers.assessmentId === task.assessmentId);
    const survey = state.userdashboard.surveys.find(findSurvey =>
        findSurvey.id === task.surveyId);
    const surveyLength = survey ? questionListLengthFromSurvey(survey) : 0;
    const answered = get(answers, 'answers.length', 0);
    const late = !!(task && answers &&
        TaskStatus.endDateInPast(task) &&
        !TaskStatus.responsesComplete({ response: answers.answers }, surveyLength));
    const complete = task.complete;

    return {
        key: task.id,
        projectId,
        subject: subject ? subject.name : '',
        task,
        due: task.endDate,
        survey: survey ? survey.name : '',
        flags: task.flagCount,
        progress: `${answered}/${surveyLength} ${state.settings.language.vocabulary.PROJECT.ANSWERED}`,
        new: get(answers, 'status') === 'new',
        late,
        complete,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
