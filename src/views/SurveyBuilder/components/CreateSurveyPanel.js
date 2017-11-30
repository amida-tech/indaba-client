import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
                                placeholder={this.props.vocab.SURVEY.SECTION_ +
                                    (sectionIndex + 1) + this.props.vocab.SURVEY.NAME_OPTIONAL}
                                onChange={event => this.props.actions.updateSection(
                                    sectionIndex, event.target.value)} />
                            {section.questions.map((question, questionIndex) => (
                                <QuestionPanel className='create-survey-panel__question'
                                    key={`key-question-${questionIndex}`}
                                    sectionIndex={sectionIndex}
                                    questionIndex={questionIndex}
                                    question={question}
                                    ui={this.props.ui}
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

CreateSurveyPanel.propTypes = {
    ui: PropTypes.object.isRequired,
    form: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        sections: PropTypes.arrayOf(PropTypes.object),
        status: PropTypes.string.isRequired,
    }).isRequired,
    actions: PropTypes.object,
    vocab: PropTypes.object.isRequired,
};

export default CreateSurveyPanel;
