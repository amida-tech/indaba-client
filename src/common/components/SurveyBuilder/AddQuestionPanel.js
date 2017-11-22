import React, { Component } from 'react';
import { Tabs, Tab } from 'grommet';

import NewQuestions from './NewQuestions';
import ExistingQuestions from './ExistingQuestions';


class AddQuestionPanel extends Component {
    render() {
        return (
            <div className='create-question-panel'>
                <div className='create-question-panel__instructions'>
                    {this.props.vocab.SURVEY.PANE_INSTRUCTIONS}
                </div>
                <Tabs className='create-question-panel__tabs'>
                    <Tab className='create-question-panel__tab'
                        title={this.props.vocab.SURVEY.NEW_QUESTIONS}>
                        <NewQuestions {...this.props}/>
                    </Tab>
                    <Tab className='create-question-panel__tab'
                        title={this.props.vocab.SURVEY.EXISTING}>
                        <ExistingQuestions {...this.props}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default AddQuestionPanel;
