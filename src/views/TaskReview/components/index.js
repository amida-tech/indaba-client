import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import _ from 'lodash';
import IonIcon from 'react-ionicons';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

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
        const nextSurvey = surveyMapper(nextProps.task.response,
             nextProps.survey.questions)
        this.setState({ survey: nextSurvey });
    }

    constructor(props) {
        super(props);
        const survey = surveyMapper(
            props.task.response,
            props.survey.questions);
        this.state = {
            task:  props.task,
            stage: props.project.stages[props.task.stage],
            subject: props.project.subjects[props.task.subject],
            survey: survey
        };
    }

    render() {
        return (
            <div className='task-review'>
                <div className='task-review__details-and-survey'>
                    <Link to={'/project/' + this.props.project.id}>
                        <IonIcon icon='ion-android-arrow-back'/>
                        {this.props.vocab.PROJECT.BACK_TO_WORKFLOW}
                    </Link>
                    <TaskDetails
                        surveyName={this.props.survey.name}
                        subject={this.state.subject}
                        task={this.state.task}
                        user={this.props.user}
                        vocab={this.props.vocab}
                        stage={this.state.stage}/>
                    <TaskSurveyList
                        survey={this.state.survey}
                        instructions={this.props.survey.instructions}
                        vocab={this.props.vocab} />
                </div>
                <div className='task-review__flag-sidebar'>
                <FlagSidebar
                    task={this.props.task}
                    vocab={this.props.vocab}
                    survey={this.state.survey}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const userId = parseInt(ownProps.params.userId, 10);
    const projectId = parseInt(ownProps.params.projectId, 10);
    const project = _.find(state.project.projects,
        (p) => p.id === projectId) || state.project.projects[0];
    return {
        user: _.find(state.user.users, (u) => u.id === userId),
        task: _.find(project.tasks, (t) => t.id === userId),
        project: project,
        survey: state.project.surveys[project.surveyId],
        vocab: state.settings.language.vocabulary
    }
};

export default withRouter(connect(mapStateToProps)(TaskReview));
