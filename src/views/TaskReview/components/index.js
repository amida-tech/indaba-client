import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'lodash';
import IonIcon from 'react-ionicons';

import FlagSidebar from './FlagSidebar';
import TaskDetails from './TaskDetails';
import TaskSurveyList from './TaskSurveyList';
import { updateTaskDueDate, updateFlaggedQuestion } from '../../../common/actions/tasksActions';
import * as actions from '../actions';

function surveyMapperHelper(response, question) {
    const match = response.filter(obj => obj.id === question.id);
    return (match.length > 0) ?
        Object.assign({}, question, match[0], {taskView: true}) :
        Object.assign({}, question, {taskView: true});
}

function surveyMapper(response, questions) {
    return (response ? questions.map(question =>
            surveyMapperHelper(response, question)) : questions);
}

class TaskReview extends Component {
    render() {
        const displaySurvey = surveyMapper(this.props.task.response,
            this.props.survey.questions);
        return (
            <div className='task-review'>
                <div className='task-review__details-and-survey'>
                    <Link to={'/project/' + this.props.project.id}>
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
                        updateTaskDueDate={this.props.updateTaskDueDate} />
                    <TaskSurveyList
                        survey={displaySurvey}
                        instructions={this.props.survey.instructions}
                        vocab={this.props.vocab} />
                </div>
                <div className='task-review__flag-sidebar'>
                <FlagSidebar
                    {...this.props}
                    survey={displaySurvey}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const taskId = parseInt(ownProps.params.taskId, 10);
    const projectId = parseInt(ownProps.params.projectId, 10);
    const task = _.find(_.find(state.tasks, (projectTasks) =>
        projectTasks.projectId === projectId).tasks, (task) => task.id === taskId);
    return {
        projectId: projectId,
        project: _.find(state.project.projects,
            (project) => project.id === projectId) || state.project.projects[0],
        taskedUser: _.find(state.user.users, (user) => user.id === task.userId),
        users: state.user.users,
        task: task,
        survey: _.find(state.surveys, (survey) => survey.projectId === projectId),
        ui: state.taskreview.ui,
        vocab: state.settings.language.vocabulary
    };
};

const mapDispatchToProps = dispatch => ({
    tasksActions: {
        updateTaskDueDate: (taskId, projectId, dueDate) =>
            dispatch(updateTaskDueDate(taskId, projectId, dueDate)),
        updateFlaggedQuestion: (data) => dispatch(updateFlaggedQuestion(data)),
    },
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskReview);
