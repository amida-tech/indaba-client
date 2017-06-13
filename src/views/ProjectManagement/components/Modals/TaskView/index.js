import React, { Component } from 'react';
import { connect } from 'react-redux';
import IonIcon from 'react-ionicons';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

import Modal from '../../../../../common/Modal';
import FlagSidebar from '../../Workflow/FlagSidebar';
import TaskDetails from './TaskDetails';
import TaskSurveyList from './TaskSurveyList';

class TaskView extends Component {
    constructor(props) {
        super(props);
        const survey = props.assignee.response ?
            props.data.project.survey.questions.map((question) =>
                this.surveyMapper(props.assignee.response, question)) :
                props.data.project.survey.questions;
        this.state = {
            assignee:  props.assignee,
            stageData: props.stageData,
            subject: props.data.project.workflow.subjects[props.assignee.subject],
            survey: survey,
            allActive: survey.map((k, i) => i),
            active: []
        };
    }

    surveyMapper(response, question) {
        const match = response.filter(obj => obj.id === question.id);
        return (match.length > 0) ?
            Object.assign({}, question, match[0], {taskView: true}) :
            Object.assign({}, question, {taskView: true});
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
                        surveyName={this.props.data.project.survey.name}
                        subject={this.state.subject}
                        assignee={this.state.assignee}
                        vocab={this.props.vocab}
                        stageData={this.props.stageData}/>
                    <TaskSurveyList
                        survey={this.state.survey}
                        instructions={this.props.data.project.survey.instructions}
                        allActive={this.state.allActive}
                        vocab={this.props.vocab} />
                </div>
                <div className='task-view__text-container--flag-sidebar'>
                    <FlagSidebar />
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
