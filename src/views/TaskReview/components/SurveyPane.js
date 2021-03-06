import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { toast } from 'react-toastify';

import Time from '../../../utils/Time';
import SurveyForm from './SurveyForm';
import SurveyPresentation from './SurveyPresentation';

class SurveyPane extends Component {
    constructor(props) {
        super(props);
        this.onCompleteTask = this.onCompleteTask.bind(this);
        this.storeFormRef = this.storeFormRef.bind(this);
    }

    onCompleteTask() {
        const preventComplete = !this.props.reqCheck || this.props.flagCount !== 0;
        if (!preventComplete) {
            this.props.actions.moveTask(
                this.props.productId,
                this.props.task.uoaId,
                this.props.vocab.ERROR,
            ).then(() => this.props.actions.completeAssessment(
                this.props.task.assessmentId,
                this.props.vocab.ERROR,
            )).then(() => toast(this.props.vocab.PROJECT.TASK_COMPLETED));
        } else if (this.props.flagCount > 0) {
            toast(this.props.vocab.ERROR.FLAGGED_QUESTIONS);
        } else {
            toast(this.props.vocab.ERROR.REQUIRE_ANSWERS);
        }
    }

    storeFormRef(formRef) {
        this.formRef = formRef;
    }

    render() {
        const preventComplete = !this.props.reqCheck || this.props.flagCount !== 0;
        const initialValues = {
            answers: this.props.answers,
            assessmentId: this.props.task.assessmentId,
        };
        const showCommentForm = this.props.stage.discussionParticipation
            || this.props.stage.blindReview || this.props.stage.allowEdit;

        const handleCompleteTaskClick = this.props.stage.discussionParticipation
            ? () => this.formRef.submit()
                .then(this.onCompleteTask)
                .catch(() => null)
            : this.onCompleteTask;
        return (
            <div className='survey-pane'>
                <div className='survey-pane__controls'>
                    <Select className='survey-pane__select'
                        options={this.props.options}
                        value={this.props.sectionIndex}
                        clearable={false}
                        disabled={this.props.options.length === 1}
                        onChange={event => this.props.actions.setSurveySectionIndex(event.value)}/>
                    <div className='survey-pane__accordion-buttons'>
                        <button className='survey-pane__button-expand'
                            onClick={() => this.props.actions.updateQuestionDisplay(
                                this.props.survey.map((key, index) => index),
                            )}>
                            {this.props.vocab.PROJECT.EXPAND_ALL}</button>
                        <button className='survey-pane__button-collapse'
                            onClick={() => this.props.actions.updateQuestionDisplay([])}>
                            {this.props.vocab.PROJECT.COLLAPSE_ALL}</button>
                    </div>
                </div>
                {!(this.props.stage.blindReview || this.props.stage.allowEdit
                    || this.props.stage.discussionParticipation)
                    && <div className='survey-pane__instructions'>
                        <div className='survey-pane__instructions-header'>
                            {this.props.vocab.PROJECT.INSTRUCTIONS}
                        </div>
                        <span className='survey-pane__instructions-explained'>
                            {this.props.instructions
                                || this.props.vocab.PROJECT.INSTRUCTIONS_EXPLAINED}
                        </span>
                        <span className='survey-pane__instructions-explained'>
                            {this.props.vocab.PROJECT.INSTRUCTIONS_EXPLAINED_2
                                + (this.props.ui.lastSave === null
                                    ? this.props.vocab.PROJECT.NOT_SAVED
                                    : Time.renderAutosave(this.props.ui.lastSave))}
                        </span>
                    </div>
                }
                {(this.props.stage.id === undefined || this.props.stage.discussionParticipation)
                    ? <SurveyForm
                        ref={this.storeFormRef}
                        {...this.props}
                        initialValues={initialValues}>
                        <SurveyPresentation
                            {...this.props}
                            onCompleteTask={handleCompleteTaskClick}
                            preventComplete={preventComplete}
                            showCommentForm={showCommentForm} />
                    </SurveyForm>
                    : <SurveyPresentation
                        {...this.props}
                        onCompleteTask={handleCompleteTaskClick}
                        preventComplete={preventComplete}
                        showCommentForm={showCommentForm} />
                }
            </div>
        );
    }
}
SurveyPane.propTypes = {
    actions: PropTypes.shape({
        setSurveySectionIndex: PropTypes.func.isRequired,
        updateQuestionDisplay: PropTypes.func.isRequired,
    }).isRequired,
    stage: PropTypes.shape({
        id: PropTypes.number,
        discussionParticipation: PropTypes.bool,
        blindReview: PropTypes.bool,
        allowEdit: PropTypes.bool,
    }),
    task: PropTypes.shape({
        assessmentId: PropTypes.number,
    }).isRequired,
    survey: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    sectionIndex: PropTypes.number.isRequired,
    ui: PropTypes.object.isRequired,
    reqCheck: PropTypes.bool,
    vocab: PropTypes.object.isRequired,
};
export default SurveyPane;
