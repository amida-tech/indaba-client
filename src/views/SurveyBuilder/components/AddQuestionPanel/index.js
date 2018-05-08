import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tabs from '../../../../common/components/Tabs/Tabs';
import Tab from '../../../../common/components/Tabs/Tab';
import NewQuestions from './NewQuestions';
import ExistingQuestions from './ExistingQuestions';

class AddQuestionPanel extends Component {
    render() {
        return (
            <div className='add-question-panel'>
                <div className='add-question-panel__instructions'>
                    {this.props.vocab.SURVEY.PANE_INSTRUCTIONS}
                </div>
                <Tabs>
                    <Tab title={this.props.vocab.SURVEY.NEW_QUESTIONS}
                        className='add-question-panel__tab'>
                        <NewQuestions {...this.props}/>
                    </Tab>
                    <Tab title={this.props.vocab.SURVEY.EXISTING}
                        className='add-question-panel__tab'>
                        <ExistingQuestions {...this.props}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

AddQuestionPanel.propTypes = {
    options: PropTypes.array.isRequired,
    sectionView: PropTypes.number.isRequired,
    actions: PropTypes.object,
    vocab: PropTypes.object.isRequired,
};

export default AddQuestionPanel;
