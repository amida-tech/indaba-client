import React, { Component } from 'react';
import { Button } from 'grommet';
import IonIcon from 'react-ionicons';
import Modal from '../../../../common/Modal';
import DateTime from 'grommet/components/DateTime';
import FlagSidebar from '../Workflow/FlagSidebar';

class TaskView extends Component {
    constructor(props) {
        super(props);
        var assignee = props.data.project.navigation.modalData.assignee;
        this.state = {
            'assignee': assignee,
            'stageData': props.data.project.navigation.modalData.stageData,
            'subject': props.data.project.workflow.subjects[assignee.subject],
            'surveyName': props.data.project.workflow.name
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTaskDueDateChange = this.handleTaskDueDateChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleTaskDueDateChange(event){
        var newState = this.state;
        newState.assignee.dueDate = event.target.value;
        this.setState(newState);
    }

    render() {
        console.log(this.props);
        const body = (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-8'>
                        <button className='masked-button left-icon' onClick={this.props.onCancel}>
                            <IonIcon icon='ion-android-arrow-back'/>{this.props.vocab.PROJECT.BACK_TO_WORKFLOW}
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
                                <DateTime id='taskDueDate' format='MM/DD/YYYY' onChange={this.handleTaskDueDateChange}
                                    value = {this.state.assignee.dueDate || this.state.stageData.endStage}/><br/>
                                <span>{this.props.vocab.PROJECT.TASK_DUE_DATE}</span>
                            </div>
                            <div className='detail-box'>
                                <span>{this.state.surveyName}</span><br/>
                                <span>{this.props.vocab.PROJECT.SURVEY}</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <FlagSidebar className='sidebar' />
                    </div>
                </div>
            </div>
    );

    return (
        <Modal
            title={this.props.vocab.PROJECT.TASK_VIEW}
            class='task-view-layer'
            content={body}
            onCancel={this.props.onCancel}
            data={this.props.data}
            onSave={() => this.props.onUpdateTask(this.state.value)} />
        )
    }
};

export default TaskView;
