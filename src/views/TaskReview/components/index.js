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
    return (response ?
        questions.map(question =>
            surveyMapperHelper(response, question)) : questions);
}

class TaskReview extends Component {
    componentWillReceiveProps(nextProps) {
        this.task = nextProps.task;
        this.survey = nextProps.survey;
    }

    render() {
        const displaySurvey = surveyMapper(this.props.task.response,
            this.props.survey.questions);
        return (
            <div className='task-review'>
                <div className='task-review__details-and-survey'>
                    <Link to={'/project/' + this.props.project.id}>
                        <IonIcon icon='ion-android-arrow-back'/>
                        {this.props.vocab.PROJECT.BACK_TO_WORKFLOW}
                    </Link>
                    <TaskDetails
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

const mapStateToProps = (state, ownProps) => {
    const userId = parseInt(ownProps.params.userId, 10);
    const projectId = parseInt(ownProps.params.projectId, 10);
    const project = _.find(state.project.projects,
        (project) => project.id === projectId) || state.project.projects[0];
    return {
        user: _.find(state.user.users, (user) => user.id === userId),
        task: _.find(project.tasks, (task) => task.id === userId),
        project: project,
        survey: state.project.surveys[project.surveyId],
        vocab: state.settings.language.vocabulary
    };
};

export default withRouter(connect(mapStateToProps)(TaskReview));
