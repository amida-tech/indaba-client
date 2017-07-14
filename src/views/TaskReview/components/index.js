import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'lodash';
import IonIcon from 'react-ionicons';

import FlagSidebar from './FlagSidebar';
import TaskDetails from './TaskDetails';
import TaskSurveyList from './TaskSurveyList';
import { updateTaskDueDate } from '../../../common/actions/tasksActions';
import { updateFlaggedQuestion } from '../../../common/actions/discussActions';
import * as actions from '../actions';

function surveyMapperHelper(discuss, question) {
    const match = discuss.filter(chat => chat.id === question.id);
    return (match.length > 0) ?
        Object.assign({}, question, match[0], { taskView: true }) :
        Object.assign({}, question, { taskView: true });
}

function surveyMapper(responses, questions) {
    return (responses ? questions.map(question =>
            surveyMapperHelper(responses.discuss, question)) : questions);
}

class TaskReview extends Component {
    render() {
        const displaySurvey = surveyMapper(this.props.responses,
            this.props.survey.questions);
        return (
            <div className='task-review'>
                <div className='task-review__details-and-survey'
                    id='task-review__details-and-survey'>
                    <Link to={`/project/${this.props.project.id}`}
                        className='task-review__back-link'>
                        <IonIcon icon='ion-android-arrow-back' className='task-review__back-arrow'/>
                        {this.props.vocab.PROJECT.BACK_TO_WORKFLOW}
                    </Link>
                    <TaskDetails
                        projectId={this.props.projectId}
                        surveyName={this.props.survey.name}
                        subject={this.props.project.subjects[this.props.task.subject]}
                        task={this.props.task}
                        taskedUser={this.props.taskedUser}
                        vocab={this.props.vocab}
                        stage={this.props.project.stages[this.props.task.stage]}
                        updateTaskDueDate={this.props.otherActions.updateTaskDueDate} />
                    <TaskSurveyList
                        ui={this.props.ui}
                        survey={displaySurvey}
                        instructions={this.props.survey.instructions}
                        actions={this.props.actions}
                        vocab={this.props.vocab} />
                </div>
                <div className='task-review__flag-sidebar'>
                <FlagSidebar
                    {...this.props}
                    displaySurvey={displaySurvey}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const taskId = parseInt(ownProps.params.taskId, 10);
    const projectId = parseInt(ownProps.params.projectId, 10);
    const task = _.find(_.find(state.tasks, projectTasks =>
        projectTasks.projectId === projectId).tasks, current => current.id === taskId);
    return {
        projectId,
        project: _.find(state.projects,
            project => project.id === projectId) || state.projects[0],
        taskedUser: _.find(state.user.users, user => user.id === task.userId),
        users: state.user.users,
        profile: state.user.profile,
        task,
        survey: _.find(state.surveys, survey => survey.projectId === projectId),
        responses: _.find(state.discuss, talk => talk.taskId === task.id),
        ui: state.taskreview.ui,
        vocab: state.settings.language.vocabulary,
    };
};

const mapDispatchToProps = dispatch => ({
    otherActions: {
        updateTaskDueDate: (taskId, projectId, dueDate) =>
            dispatch(updateTaskDueDate(taskId, projectId, dueDate)),
        updateFlaggedQuestion: (taskId, projectId, activeId, data) =>
            dispatch(updateFlaggedQuestion(taskId, projectId, activeId, data)),
    },
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskReview);
