import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';
import { toast } from 'react-toastify';

import QuestionPanel from './QuestionPanel';

class CreateSectionPanel extends Component {
    render() {
        return (
            <div className='create-section-panel'>
                <div className='create-section-panel__section-header'>
                    <input className='create-section-panel__section-name'
                        type='text'
                        defaultValue={this.props.section.name}
                        placeholder={this.props.vocab.SURVEY.SECTION_ +
                            (this.props.sectionIndex + 1) + this.props.vocab.SURVEY.NAME_OPTIONAL}
                        onChange={event => this.props.actions.updateSection(
                            this.props.sectionIndex, event.target.value)} />
                    <button className='create-section-panel__menu-button'
                        onClick={() => {
                            if (this.props.sectionLength <= 1) {
                                toast(this.props.vocab.ERROR.SECTION_MINIMUM);
                            } else {
                                this.props.actions.showSectionDeleteConfirmModal(
                            this.props.sectionIndex);
                            }
                        }}>
                        <IonIcon icon='ion-trash-b'
                            className='create-section-panel__menu-icon'/>
                    </button>
                </div>
                {this.props.section.questions.map((question, questionIndex) => (
                    <QuestionPanel className='create-section-panel__question'
                        key={`key-question-${questionIndex}`}
                        sectionIndex={this.props.sectionIndex}
                        questionIndex={questionIndex}
                        question={question}
                        ui={this.props.ui}
                        actions={this.props.actions}
                        vocab={this.props.vocab} />
                ))}
            </div>
        );
    }
}

CreateSectionPanel.propTypes = {
    ui: PropTypes.object.isRequired,
    sectionIndex: PropTypes.number.isRequired,
    section: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        questions: PropTypes.arrayOf(PropTypes.object),
    }),
    actions: PropTypes.object,
    vocab: PropTypes.object.isRequired,
};

export default CreateSectionPanel;
