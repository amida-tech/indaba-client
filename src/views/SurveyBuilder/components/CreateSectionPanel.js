import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import IonIcon from 'react-ionicons';

import QuestionPanel from './QuestionPanel';

class CreateSectionPanel extends Component {
    render() {
        return (
            <div className='create-section-panel'>
                {this.props.ui.showSectionDeleteConfirmModal &&
                        <Modal title={this.props.vocab.MODAL.SECTION_DELETE_CONFIRM.TITLE}
                            bodyText={this.props.vocab.MODAL.SECTION_DELETE_CONFIRM.DELETE_WARNING}
                            onCancel={this.props.actions.showSectionDeleteConfirmModal}
                            onSave={() => this.props.actions.deleteSection(this.props.sectionIndex)
                            .then(() => {
                                this.props.actions.showSectionDeleteConfirmModal();
                            }).catch(() => {
                                toast(this.props.vocab.ERROR.SURVEY_REQUEST,
                                    { type: 'error', autoClose: false });
                                this.props.actions.showSectionDeleteConfirmModal();
                            }) } />}
                <div className='create-section-panel__section-header'>
                    <input className='create-section-panel__section-name'
                        value={this.props.section.name}
                        placeholder={this.props.vocab.SURVEY.SECTION_ +
                            (this.props.sectionIndex + 1) + this.props.vocab.SURVEY.NAME_OPTIONAL}
                        onChange={event => this.props.actions.updateSection(
                            this.props.sectionIndex, event.target.value)} />
                    <button className='create-section-panel__menu-button'
                        onClick={() => this.props.actions.showSectionDeleteConfirmModal()}>
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
