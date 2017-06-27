import React, { Component } from 'react';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

import ReviewPane from '../../../common/ReviewPane';

class TaskSurveyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allActive: this.props.survey.map((k, i) => i),
            active: [],
        };
        this.handleAccordionExpandAll = this.handleAccordionExpandAll.bind(this);
        this.handleAccordionCollapseAll = this.handleAccordionCollapseAll.bind(this);
    }

    handleAccordionExpandAll(event) {
        this.setState({ active: this.state.allActive });
    }

    handleAccordionCollapseAll(event) {
        this.setState({ active: [] });
    }

    render() {
        return (
            <div className='task-survey-list'>
            <div className='task-survey-list__wrapper'>
                <button onClick={this.handleAccordionExpandAll}>
                    {this.props.vocab.PROJECT.EXPAND_ALL}
                </button>
                <button onClick={this.handleAccordionCollapseAll}>
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
                <Accordion active={this.state.active} openMulti={true}>
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
