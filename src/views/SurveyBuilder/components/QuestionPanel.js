import React, { Component } from 'react';
import IonIcon from 'react-ionicons';
// import PropTypes from 'prop-types';

class QuestionPanel extends Component {
    render() {
        return (
            <div className='question-panel'>
                <div className='question-panel__header'>
                    {`${this.props.vocab.PROJECT.QUESTION_ + (this.props.questionIndex + 1)}: `}
                    <input className='question-panel__text'
                        placeholder={this.props.vocab.SURVEY.PHRASE_QUESTION}
                        value={this.props.question.text}
                        onChange={event => this.props.actions.updateQuestion(
                            this.props.sectionIndex,
                            this.props.questionIndex,
                            'text',
                            event.target.value,
                        )} />
                </div>
                <div className='question-panel__optional-controls'>
                    <div className='question-panel__checkboxes'>
                        <input type='checkbox'
                            disabled={true} />
                        <IonIcon icon='ion-paperclip'
                            className='question-panel__attach-icon'
                            color='#A4AEBF'/>
                        <span className='question-panel__label'>
                            {this.props.vocab.SURVEY.ATTACH_FILE}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuestionPanel;
