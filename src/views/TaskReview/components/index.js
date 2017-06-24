import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import _ from 'lodash';
import IonIcon from 'react-ionicons';

import FlagSidebar from './FlagSidebar';
import TaskDetails from './TaskDetails';
import TaskSurveyList from './TaskSurveyList';

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
                        user={this.props.user}
                        vocab={this.props.vocab}
                        stage={this.props.project.stages[this.props.task.stage]}/>
                    <TaskSurveyList
                        survey={displaySurvey}
                        instructions={this.props.survey.instructions}
                        vocab={this.props.vocab} />
                </div>
                <div className='task-review__flag-sidebar'>
                <FlagSidebar
                    task={this.props.task}
                    vocab={this.props.vocab}
                    survey={displaySurvey}/>
                </div>
            </div>
        );
    }
}

// We really need to think about how we might be handling tasks in the future. 
const mapStateToProps = (state, ownProps) => {
    const taskId = parseInt(ownProps.params.taskId, 10);
    const projectId = parseInt(ownProps.params.projectId, 10);
    const task = _.find(_.find(state.tasks, (projectTasks) =>
        projectTasks.projectId === projectId).tasks, (task) => task.id === taskId);
    return {
        projectId: projectId,
        project: _.find(state.project.projects,
            (project) => project.id === projectId) || state.project.projects[0],
        user: _.find(state.user.users, (user) => user.id === task.userId),
        task: task,
        survey: _.find(state.surveys, (survey) => survey.projectId === projectId),
        vocab: state.settings.language.vocabulary
    };
};

export default withRouter(connect(mapStateToProps)(TaskReview));
