import React, { Component } from 'react';
import QuestionBuilder from './QuestionBuilder';

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
                <div className='create-survey-panel__sections-list'>
                    {this.props.form.sections.map((section, sectionIndex) => (
                        <div className='create-survey-panel__section'
                            key={`key-section-${sectionIndex}`}>
                            <input className='create-survey-panel__section-name'
                                value={section.name}
                                onChange={event => this.props.actions.updateSection(
                                    sectionIndex, event.target.value)} />
                            {section.questions.map((question, questionIndex) => (
                                <QuestionBuilder className='create-survey-panel__question'
                                    key={`key-question-${questionIndex}`}
                                    questionIndex={questionIndex}
                                    question={question} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default CreateSurveyPanel;
