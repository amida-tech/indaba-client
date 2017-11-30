import React, { Component } from 'react';
import { Tabs, Tab } from 'grommet';
import PropTypes from 'prop-types';

import NewQuestions from './NewQuestions';
import ExistingQuestions from './ExistingQuestions';

class AddQuestionPanel extends Component {
    render() {
        return (
            <div className='add-question-panel'>
                <div className='add-question-panel__instructions'>
                    {this.props.vocab.SURVEY.PANE_INSTRUCTIONS}
                </div>
                <Tabs className='add-question-panel__tabs'>
                    <Tab className='add-question-panel__tab'
                        title={this.props.vocab.SURVEY.NEW_QUESTIONS}>
                        <NewQuestions {...this.props}/>
                    </Tab>
                    <Tab className='add-question-panel__tab'
                        title={this.props.vocab.SURVEY.EXISTING}>
                        <ExistingQuestions {...this.props}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

AddQuestionPanel.propTypes = {
    sectionView: PropTypes.number.isRequired,
    actions: PropTypes.object,
    vocab: PropTypes.object.isRequired,
};

export default AddQuestionPanel;
