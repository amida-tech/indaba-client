import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { every, find, flatten, get, has, map, sumBy } from 'lodash';
import IonIcon from 'react-ionicons';

import Time from '../../../utils/Time';
import FlagSidebar from './FlagSidebar';
import TaskDetails from './TaskDetails';
import SurveyPane from './SurveyPane';
import { renderPermissions } from '../../../utils/Survey';
import { setSurveySectionIndex, postAnswer, postReview } from '../../../common/actions/surveyActions';
import { getTaskById, moveTask, updateTask } from '../../../common/actions/taskActions';
import * as actions from '../actions';

class TaskReview extends Component {
    componentWillMount() {
        this.props.actions.setSurveySectionIndex(-1);
        this.props.actions.getTaskById(this.props.params.projectId,
            this.props.params.taskId, this.props.vocab.ERROR);
        this.props.actions.getDiscussions(this.props.params.taskId, this.props.vocab.ERROR);
    }

    render() { // Pondering means to process all this just once.
        const options = this.props.survey.sections ?
            this.props.survey.sections.map((section, index) =>
                ({ value: index, label: section.name })) : [];
        options.unshift({ value: -1, label: this.props.vocab.SURVEY.VIEW_ALL });

        const flatSurvey = this.props.survey.questions ?
            this.props.survey.questions : flatten(map(this.props.survey.sections, 'questions'));
        const displaySurvey = this.props.sectionIndex === -1 ?
            flatSurvey : this.props.survey.sections[this.props.sectionIndex].questions;
        const taskDisabled = this.props.survey.status !== 'published' || !Time.isInPast(this.props.task.startDate)
            || this.props.profile.id !== this.props.taskedUser.id || (this.props.task.status !== 'current' &&
            !this.props.task.active);
        const reqCheck = every(flatSurvey, (question) => {
            return question.required ? has(find(this.props.ui.form.answers,
                resp => resp.questionId === question.id), 'answer') : true;
        });
        const flagCount = sumBy(this.props.ui.flags, (flag) => {
            return every(flag.discussion, discuss => discuss.isResolve) ? 0 : 1;
        });
        let offset = 0;
        if (this.props.sectionIndex > -1) {
            this.props.survey.sections.forEach((section, index) => {
                if (index < this.props.sectionIndex) {
                    offset += get(section, 'questions.length', 0);
                }
            });
        }
        return (
            <div className='task-review'>
                <div className='task-review__details-and-survey'
                    id='task-review__details-and-survey'>
                    <Link to={get(this.props, 'location.state.referrer', '/task')}
                        className='task-review__back-link'>
                        <IonIcon icon='ion-android-arrow-back' className='task-review__back-arrow'/>
                        {this.props.vocab.PROJECT.TASK_BACK}
                    </Link>
                    <TaskDetails
                        profile={this.props.profile}
                        projectId={this.props.projectId}
                        surveyName={this.props.survey.name}
                        subject={this.props.subject}
                        task={this.props.task}
                        taskedUser={this.props.taskedUser}
                        activity={renderPermissions(this.props.stage)}
                        vocab={this.props.vocab}
                        stage={this.props.stage}
                        actions={this.props.actions}
                        updateTaskEndDate={this.props.actions.updateTaskEndDate} />
                    <SurveyPane
                        ui={this.props.ui}
                        productId={this.props.productId}
                        task={this.props.task}
                        answers={this.props.ui.form.answers}
                        survey={displaySurvey}
                        options={options}
                        users={this.props.users}
                        profile={this.props.profile}
                        surveyId={this.props.survey.id}
                        sectionIndex={this.props.sectionIndex}
                        instructions={this.props.survey.description}
                        stage={this.props.stage}
                        taskDisabled={taskDisabled}
                        offset={offset}
                        flagCount={flagCount}
                        reqCheck={reqCheck}
                        actions={this.props.actions}
                        vocab={this.props.vocab} />
                </div>
                <div className='task-review__flag-sidebar'>
                <FlagSidebar
                    {...this.props}
                    offset={offset}
                    flagCount={flagCount}
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
        productId: project.productId,
        taskedUser: find(state.user.users, user =>
            user.id === task.userIds[0]) || { firstName: '', lastName: '' },
        stage: (project.id > 0 && task.stepId > 0 && project.stages.length > 0) ?
            find(project.stages, stage => stage.id === task.stepId) : { title: '' },
        subject: (project.id > 0 && task.uoaId > 0) ?
            find(project.subjects, subject => subject.id === task.uoaId) : { name: '' },
        users: state.user.users,
        projectUsers: project.users,
        profile: state.user.profile,
        task,
        survey: state.surveys.data[0].name ?
            find(state.surveys.data, survey => survey.id === project.surveyId) :
            state.surveys.data[0],
        sectionIndex: state.surveys.ui.sectionIndex,
        ui: state.taskreview.ui,
        vocab: state.settings.language.vocabulary,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions, {
        updateTask,
        setSurveySectionIndex,
        getTaskById,
        moveTask,
        postReview,
        postAnswer }),
        dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskReview);
