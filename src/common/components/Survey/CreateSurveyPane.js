import React, { Component } from 'react';

class CreateSurveyPane extends Component {

    render() {
        return (
            <div className='create-survey-pane'>
                <div className='create-survey-pane__instructions'>
                    {this.props.vocab.SURVEY.PANE_INSTRUCTIONS}
                </div>
            </div>
        );
    }
}

export default CreateSurveyPane;
