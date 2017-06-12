import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        const assignee = props.assignee;
        const survey = assignee.response ?
            props.data.project.survey.questions.map((question) =>
                this.surveyMapper(assignee.response, question)) :
                props.data.project.survey.questions;
        this.state = {
            assignee: assignee,
            stageData: props.stageData,
            subject: props.data.project.workflow.subjects[assignee.subject],
            survey: survey,
            allActive: survey.map((k, i) => i),
            active: []
        };
        this.handleTaskDueDateChange = this.handleTaskDueDateChange.bind(this);
        this.handleAccordionExpandAll = this.handleAccordionExpandAll.bind(this);
        this.handleAccordionCollapseAll = this.handleAccordionCollapseAll.bind(this);
    }

    surveyMapper(response, question) {
        const match = response.filter(obj => obj.id === question.id);
        return (match.length > 0) ?
            Object.assign({}, question, match[0], {taskView: true}) :
            Object.assign({}, question, {taskView: true});
    }

    handleTaskDueDateChange(event){
        var newState = this.state;
        newState.assignee.dueDate = event;
        this.setState(newState);
    }

    handleAccordionExpandAll(event){
        this.setState({ active: this.state.allActive });
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
                                {this.state.survey.map((question, i) =>
                                    <AccordionPanel
                                        heading={this.props.vocab.PROJECT.QUESTION+' '+(i+1)}
                                        key={'question-'+i}>
                                        <ReviewPane {...question}/>
                                    </AccordionPanel>)}
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

const mapStateToProps = state => ({
    data: state,
    vocab: state.settings.language.vocabulary
});

export default connect(mapStateToProps)(TaskView);
