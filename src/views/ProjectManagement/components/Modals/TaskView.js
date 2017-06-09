import React, { Component } from 'react';
import IonIcon from 'react-ionicons';
import DateTime from 'grommet/components/DateTime';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

import Modal from '../../../../common/Modal';
import FlagSidebar from '../Workflow/FlagSidebar';
import ReviewPane from '../../../../common/ReviewPane';

class TaskView extends Component {
    constructor(props) {
        super(props);
        const assignee = props.data.project.navigation.modalData.assignee;
        const survey = assignee.response ?
            props.data.project.survey.questions.map((question) =>
                this.surveyMapper(assignee.response, question)) :
                props.data.project.survey.questions;
        this.state = {
            assignee: assignee,
            stageData: props.data.project.navigation.modalData.stageData,
            subject: props.data.project.workflow.subjects[assignee.subject],
            survey: survey,
            active: []
        };
        this.handleTaskDueDateChange = this.handleTaskDueDateChange.bind(this);
        this.handleAccordionExpandAll = this.handleAccordionExpandAll.bind(this);
        this.handleAccordionCollapseAll = this.handleAccordionCollapseAll.bind(this);
    }

    surveyMapper(response, question) {
        const match = response.filter(obj => obj.id === question.id);
        return (match.length > 0) ? Object.assign({}, question, match[0]) : question;
    }

    handleTaskDueDateChange(event){
        var newState = this.state;
        newState.assignee.dueDate = event;
        this.setState(newState);
    }

    handleAccordionExpandAll(event){
        this.setState({ active: [0,1,2] });
    }

    handleAccordionCollapseAll(event){
        this.setState({ active: [] });
    }

    render() {
    return (
        <Modal
            title={this.props.vocab.PROJECT.TASK_VIEW}
            class='task-view-layer'
            onCancel={this.props.onCancel}
            data={this.props.data}
            onSave={() => this.props.onUpdateTask(this.state.value)}>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-8'>
                        <button className='masked-button left-icon'
                            onClick={this.props.onCancel}>
                            <IonIcon icon='ion-android-arrow-back'/>
                            {this.props.vocab.PROJECT.BACK_TO_WORKFLOW}
                        </button>
                        <div>
                            <span className='name'>{this.state.assignee.name}</span><br/>
                            <span>{this.props.vocab.PROJECT.TASK_VIEW}</span>
                        </div>
                        <div className='detail-block'>
                            <div className='detail-box'>
                                <span>{this.state.stageData.title}</span><br/>
                                <span>{this.props.vocab.PROJECT.STAGE}</span>
                            </div>
                            <div className='detail-box'>
                                <span>{this.state.subject}</span><br/>
                                <span>{this.props.vocab.PROJECT.SUBJECT}</span>
                            </div>
                            <div className='detail-box'>
                                <DateTime id='taskDueDate'
                                    format='MM/DD/YYYY'
                                    onChange={this.handleTaskDueDateChange}
                                    value = {this.state.assignee.dueDate ||
                                        this.state.stageData.endStage}/><br/>
                                <span>{this.props.vocab.PROJECT.TASK_DUE_DATE}</span>
                            </div>
                            <div className='detail-box'>
                                <span>{this.state.surveyName}</span><br/>
                                <span>{this.props.vocab.PROJECT.SURVEY}</span>
                            </div>
                        </div>
                        <div>
                            <button onClick={this.handleAccordionExpandAll}>EXPAND</button>
                            <button onClick={this.handleAccordionCollapseAll}>COLLAPSE</button>
                            <Accordion active={this.state.active} openMulti={true}>
                                <AccordionPanel heading='question'>
                                    <ReviewPane />
                                </AccordionPanel>
                            </Accordion>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <FlagSidebar />
                    </div>
                </div>
            </div>
        </Modal>
        );
    }
}

export default TaskView;
