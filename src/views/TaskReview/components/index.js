import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
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
        const nextSurvey = surveyMapper(nextProps.assignee.response,
            nextProps.data.project.projects[0].survey.questions)
        this.setState({ survey: nextSurvey });
    }

    constructor(props) {
        super(props);
        const survey = surveyMapper(
            props.assignee.response,
            props.project.survey.questions)
        this.state = {
            assignee:  props.assignee,
            stage: props.project.workflow.stages[props.assignee.stage],
            subject: props.project.workflow.subjects[props.assignee.subject],
            survey: survey
        };
    }

    render() {
        return (
            <div className='task-review'>
                <div className='task-review__details-and-survey'>
                    <Link to={'/project/' + this.props.project.id}>
                        {this.props.vocab.PROJECT.BACK_TO_WORKFLOW}
                    </Link>
                    <TaskDetails
                        surveyName={this.props.project.survey.name}
                        subject={this.state.subject}
                        assignee={this.state.assignee}
                        vocab={this.props.vocab}
                        stage={this.state.stage}/>
                    <TaskSurveyList
                        survey={this.state.survey}
                        instructions={this.props.project.survey.instructions}
                        vocab={this.props.vocab} />
                </div>
                <div className='task-review__flag-sidebar'>
                <FlagSidebar
                    assignee={this.props.assignee}
                    vocab={this.props.vocab}
                    survey={this.state.survey}/>
                </div>
            </div>
        );
    }
}

// Using == over === because they're not the same type. Need to fix!
const mapStateToProps = (state, ownProps) => ({
    assignee: state.project.projects[ownProps.params.projectId]
        .workflow.assignees.filter(user => user.id == ownProps.params.userId)[0],
    project: state.project.projects[ownProps.params.projectId],
    vocab: state.settings.language.vocabulary
})

export default withRouter(connect(mapStateToProps)(TaskReview));
