import React, { Component } from 'react';
import { connect } from 'react-redux';
import IonIcon from 'react-ionicons';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

import Modal from '../../../../../common/Modal';
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

class TaskView extends Component {
    componentWillReceiveProps(nextProps) {
        const nextSurvey = surveyMapper(nextProps.assignee.response,
            nextProps.data.project.projects[0].survey.questions)
        this.setState({ survey: nextSurvey });
    }

    constructor(props) {
        super(props);
        const survey = surveyMapper(props.assignee.response,
            props.data.project.projects[0].survey.questions)
        this.state = {
            assignee:  props.assignee,
            stageData: props.stageData,
            subject: props.data.project.projects[0].workflow.subjects[props.assignee.subject],
            survey: survey,
            allActive: survey.map((k, i) => i),
            active: []
        };
    }

    render() {
    return (
        <Modal
            title={this.props.vocab.PROJECT.TASK_VIEW}
            class='task-view'
            onCancel={this.props.onCancel}
            data={this.props.data}
            onSave={() => this.props.onUpdateTask(this.state.value)}>
            <div className='task-view__text-container'>
                <div className='task-view__text-container--details-and-survey'>
                    <button className='masked-button left-icon'
                        onClick={this.props.onCancel}>
                        <IonIcon icon='ion-android-arrow-back'/>
                        {this.props.vocab.PROJECT.BACK_TO_WORKFLOW}
                    </button>
                    <TaskDetails
                        surveyName={this.props.data.project.projects[0].survey.name}
                        subject={this.state.subject}
                        assignee={this.state.assignee}
                        vocab={this.props.vocab}
                        stageData={this.props.stageData}/>
                    <TaskSurveyList
                        survey={this.state.survey}
                        instructions={this.props.data.project.projects[0].survey.instructions}
                        allActive={this.state.allActive}
                        vocab={this.props.vocab} />
                </div>
                <div className='task-view__text-container--flag-sidebar'>
                <FlagSidebar
                    assignee={this.props.assignee}
                    vocab={this.props.vocab}
                    survey={this.state.survey}/>
                </div>
            </div>
        </Modal>
        );
    }
}

const mapStateToProps = state => ({
    data: state,
    vocab: state.settings.language.vocabulary
});

export default connect(mapStateToProps)(TaskView);
