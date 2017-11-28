import React, { Component } from 'react';
import QuestionPanel from './QuestionPanel';

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
                                placeholder={this.props.vocab.SURVEY.SECTION_NAME}
                                onChange={event => this.props.actions.updateSection(
                                    sectionIndex, event.target.value)} />
                            {section.questions.map((question, questionIndex) => (
                                <QuestionPanel className='create-survey-panel__question'
                                    key={`key-question-${questionIndex}`}
                                    sectionIndex={sectionIndex}
                                    questionIndex={questionIndex}
                                    question={question}
                                    actions={this.props.actions}
                                    vocab={this.props.vocab} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default CreateSurveyPanel;
