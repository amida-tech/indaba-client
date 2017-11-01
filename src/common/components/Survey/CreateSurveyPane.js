import React, { Component } from 'react';
import { Tabs, Tab } from 'grommet';

import NewQuestions from './NewQuestions';
import ExistingQuestions from './ExistingQuestions';


class CreateSurveyPane extends Component {
    render() {
        return (
            <div className='create-survey-pane'>
                <div className='create-survey-pane__instructions'>
                    {this.props.vocab.SURVEY.PANE_INSTRUCTIONS}
                </div>
                <Tabs className='create-survey-pane__tabs'>
                    <Tab className='create-survey-pane__tab'
                        title={this.props.vocab.SURVEY.NEW_QUESTIONS}>
                        <NewQuestions {...this.props}/>
                    </Tab>
                    <Tab className='create-survey-pane__tab'
                        actions={this.props.actions}
                        title={this.props.vocab.SURVEY.EXISTING}>
                        <ExistingQuestions {...this.props}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default CreateSurveyPane;
