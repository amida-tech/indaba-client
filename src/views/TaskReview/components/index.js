import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { flatten, find, isEmpty, map } from 'lodash';
import IonIcon from 'react-ionicons';

import Time from '../../../utils/Time';
import FlagSidebar from './FlagSidebar';
import TaskDetails from './TaskDetails';
import SurveyPane from './SurveyPane';
import { setSurveySectionIndex, postAnswer } from '../../../common/actions/surveyActions';
import { updateFlaggedQuestion } from '../../../common/actions/discussActions';
import { getTaskById, updateTaskEndDate } from '../../../common/actions/taskActions';
import * as actions from '../actions';

function surveyMapperHelper(discuss, question) {
    const match = discuss.filter(chat => chat.id === question.id);
    return (match.length > 0) ?
        Object.assign({}, question, match[0], { taskView: true }) :
        Object.assign({}, question, { taskView: true });
}

function surveyMapper(responses, questions) {
    if (isEmpty(questions)) {
        return [];
    }
    return (responses ? questions.map(question =>
            surveyMapperHelper(responses.discuss, question)) : questions);
}

class TaskReview extends Component {
    componentWillMount() {
        this.props.actions.setSurveySectionIndex(-1);
        this.props.actions.getTaskById(this.props.params.projectId,
            this.props.params.taskId, this.props.vocab.ERROR);
    }

    render() { // Pondering means to process all this just once.
        const options = this.props.survey.sections ?
            this.props.survey.sections.map((section, index) =>
                ({ value: index, label: section.name })) : [];
        options.unshift({ value: -1, label: this.props.vocab.SURVEY.VIEW_ALL });

        let displaySurvey;
        if (this.props.survey.sections && this.props.sectionIndex === -1) {
            displaySurvey = surveyMapper(this.props.responses,
                        flatten(map(this.props.survey.sections, 'questions')));
        } else if (this.props.survey.sections) {
            displaySurvey = surveyMapper(this.props.responses,
                this.props.survey.sections[this.props.sectionIndex].questions);
        } else {
            displaySurvey = surveyMapper(this.props.responses, this.props.survey.questions);
        }

        // TODO: INBA-522, task status === currently,
        const taskDisabled = this.props.survey.status !== 'published' || !Time.isInPast(this.props.task.startDate)
            || this.props.profile.id !== this.props.taskedUser.id;

        return (
            <div className='task-review'>
                <div className='task-review__details-and-survey'
                    id='task-review__details-and-survey'>
                    <Link to={`/project/${this.props.projectId}`}
                        className='task-review__back-link'>
                        <IonIcon icon='ion-android-arrow-back' className='task-review__back-arrow'/>
                        {this.props.vocab.PROJECT.BACK_TO_WORKFLOW}
                    </Link>
                    <TaskDetails
                        projectId={this.props.projectId}
                        surveyName={this.props.survey.name}
                        subject={this.props.subject}
                        task={this.props.task}
                        taskedUser={this.props.taskedUser}
                        vocab={this.props.vocab}
                        stage={this.props.stage}
                        updateTaskEndDate={this.props.actions.updateTaskEndDate} />
                    <SurveyPane
                        ui={this.props.ui}
                        answers={this.props.ui.form.answers}
                        survey={displaySurvey}
                        options={options}
                        surveyId={this.props.survey.id}
                        assessmentId={this.props.task.assessmentId}
                        sectionIndex={this.props.sectionIndex}
                        instructions={this.props.survey.instructions}
                        stage={this.props.stage}
                        taskDisabled={taskDisabled}
                        actions={this.props.actions}
                        vocab={this.props.vocab} />
                </div>
                <div className='task-review__flag-sidebar'>
                <FlagSidebar
                    {...this.props}
                    displaySurvey={displaySurvey}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => { // TODO: INBA-439
    const taskId = parseInt(ownProps.params.taskId, 10);
    const projectId = parseInt(ownProps.params.projectId, 10);
    const task = find(state.tasks.data, current => current.id === taskId) ||
        { id: -1, title: '', endDate: '', userIds: [], stepId: -1, uoaId: -1 };
    const project = state.projects.data[0].id > 0 ?
        find(state.projects.data, projElem => projElem.id === projectId) :
        state.projects.data[0];
    return {
        projectId,
        taskedUser: find(state.user.users, user =>
            user.id === task.userIds[0]) || { firstName: '', lastName: '' },
        stage: (project.id > 0 && task.stepId > 0 && project.stages.length > 0) ?
            find(project.stages, stage => stage.id === task.stepId) : { title: '' },
        subject: (project.id > 0 && task.uoaId > 0) ?
            find(project.subjects, subject => subject.id === task.uoaId) : { name: '' },
        users: state.user.users,
        profile: state.user.profile,
        task,
        survey: state.surveys.data[0].name ?
            find(state.surveys.data, survey => survey.id === project.surveyId) :
            state.surveys.data[0],
        sectionIndex: state.surveys.ui.sectionIndex,
        responses: find(state.discuss.data, talk => talk.taskId === task.id),
        ui: state.taskreview.ui,
        vocab: state.settings.language.vocabulary,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions, {
        updateTaskEndDate,
        updateFlaggedQuestion,
        setSurveySectionIndex,
        getTaskById,
        postAnswer }),
        dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskReview);
