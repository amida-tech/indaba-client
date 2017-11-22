import React, { Component } from 'react';

// import QuestionBuilder from './QuestionBuilder';

class CreateSurveyPanel extends Component {

    render() {
        console.log('CreateSurveyPanel');
        console.log(this.props);
        return (
            <div className='create-survey-panel'>
                {this.props.vocab.PROJECT.INSTRUCTIONS}

            </div>
        );
    }
}

export default CreateSurveyPanel;
