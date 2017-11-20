import React, { Component } from 'react';

class CreateSurveyPanel extends Component {

    render() {
        return (
            <div className='create-survey-panel'>
                {this.props.vocab.PROJECT.INSTRUCTIONS}
            </div>
        );
    }
}

export default CreateSurveyPanel;
