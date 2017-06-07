import React, { Component } from 'react';
import IonIcon from 'react-ionicons';
import DateTime from 'grommet/components/DateTime';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

import Modal from '../../../../common/Modal';
import FlagSidebar from '../Workflow/FlagSidebar';
import * as Questions from '../../../../common/Questions';

class TaskView extends Component {
    constructor(props) {
        super(props);
        var assignee = props.data.project.navigation.modalData.assignee;
        this.state = {
            assignee: props.data.project.navigation.modalData.assignee,
            stageData: props.data.project.navigation.modalData.stageData,
            subject: props.data.project.workflow.subjects[assignee.subject],
            surveyName: props.data.project.workflow.name,
            active: []
        };
        this.handleTaskDueDateChange = this.handleTaskDueDateChange.bind(this);
        this.handleAccordionExpandAll = this.handleAccordionExpandAll.bind(this);
        this.handleAccordionCollapseAll = this.handleAccordionCollapseAll.bind(this);
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
                                    <Questions.MultipleChoice />
                                </AccordionPanel>
                                <AccordionPanel heading='stuff'>
                                    ninebreaker
                                </AccordionPanel>
                                <AccordionPanel heading='octo'>
                                    deck
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
