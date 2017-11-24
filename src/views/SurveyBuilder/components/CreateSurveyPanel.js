import React, { Component } from 'react';

class CreateSurveyPanel extends Component {
    render() {
        return (
            <div className='create-survey-panel'>
                <div className='create-survey-panel__instructions'>
                    {this.props.vocab.PROJECT.INSTRUCTIONS}
                    <textarea className='create-survey-panel__instructions-entry'
                        placeholder={this.props.vocab.SURVEY.ENTER_INSTRUCTIONS}
                        value={this.props.form.description}
                        onChange={event =>
                            this.props.actions.updateInstructions(event.target.value)} />
                </div>
                <div className='create-survey-panel__sections'>

                </div>
            </div>
        );
    }
}

export default CreateSurveyPanel;
