import React, { Component } from 'react';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

import ReviewPane from '../../../common/ReviewPane';

class TaskSurveyList extends Component {
    constructor(props) {
        super(props);
        props.actions.setExpandAll(this.props.survey.map((k, i) => i));
    }

    render() {
        return (
            <div className='task-survey-list'>
            <div className='task-survey-list__wrapper'>
                <button onClick={this.props.actions.expandAllQuestions}>
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
                <Accordion active={this.props.ui.showQuestions} openMulti={true}>
                    {this.props.survey.map((question, i) =>
                        <AccordionPanel
                            heading={this.props.vocab.PROJECT.QUESTION_ + (i + 1)}
                            key={`accordionpanel${question}${i}`}>
                            <ReviewPane {...question}/>
                        </AccordionPanel>)}
                </Accordion>
            </div>
        );
    }
}

export default TaskSurveyList;
