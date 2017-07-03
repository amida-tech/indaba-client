import React, { Component } from 'react';
import Accordion from 'grommet/components/Accordion';

import QuestionPanel from './QuestionPanel';

class TaskSurveyList extends Component {
    render() {
        return (
            <div className='task-survey-list'>
            <div className='task-survey-list__wrapper'>
                <button onClick={() => this.props.actions.showQuestion(
                    this.props.survey.map((key, index) => index))}>
                    {this.props.vocab.PROJECT.EXPAND_ALL}
                </button>
                <button onClick={this.props.actions.collapseAllQuestions}>
                    {this.props.vocab.PROJECT.COLLAPSE_ALL}
                </button>
                </div>
                <div className='task-survey-list__instructions'>
                    <span className='task-survey-list__instructions-header'>
                        {this.props.vocab.PROJECT.INSTRUCTIONS}
                    </span>
                    <span className='task-survey-list__instructions-explained'>
                        {this.props.instructions}
                    </span>
                </div>
                <Accordion
                    active={this.props.ui.showQuestions} openMulti={true}>
                    {this.props.survey.map((question, index) =>
                    <QuestionPanel
                        key={`questionpanel${index}`}
                        index={index}
                        question={question}
                        {...this.props} />,
                    )}
                </Accordion>
            </div>
        );
    }
}

export default TaskSurveyList;
