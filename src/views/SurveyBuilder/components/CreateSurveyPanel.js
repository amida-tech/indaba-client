import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
// import { Button } from 'grommet';
import { toast } from 'react-toastify';

import CreateSectionPanel from './CreateSectionPanel';

class CreateSurveyPanel extends Component {
    render() {
        return (
            <div className='create-survey-panel'>
                <div className='create-survey-panel__view-controls'>
                    <Select className='create-survey-panel__view-select'
                        options={this.props.options}
                        value={this.props.ui.sectionView}
                        clearable={false}
                        disabled={this.props.options.length === 1}
                        onChange={event => this.props.actions.changeSectionView(event.value)}/>
                    <div className='create-survey-panel__accordion-buttons'>
                        <button className='create-survey-panel__button-expand'
                            onClick={() => toast('Coming as soon as James is allowed to sleep.')}>
                            {this.props.vocab.PROJECT.EXPAND_ALL} </button>

                        <button className='create-survey-panel__button-collapse'
                            onClick={() => toast('Coming as soon as James is allowed to zzzz.')}>
                            {this.props.vocab.PROJECT.COLLAPSE_ALL}</button>
                    </div>
                </div>
                <div className='create-survey-panel__survey-controls'>
                </div>

                    <div className='create-survey-panel__instructions'>
                        {this.props.vocab.PROJECT.INSTRUCTIONS}
                        <textarea className='create-survey-panel__instructions-entry'
                            placeholder={this.props.vocab.SURVEY.ENTER_INSTRUCTIONS}
                            value={this.props.form.description}
                            onChange={event =>
                                this.props.actions.updateInstructions(event.target.value)} />
                    </div>
                    <button className='create-survey-panel__survey-save'
                        onClick={() => this.props.actions.patchSurvey(
                            this.props.form,
                            this.props.vocab.SURVEY.SUCCESS,
                            this.props.vocab.ERROR,
                        )}>
                        {this.props.vocab.SURVEY.SAVE_PROGRESS}
                    </button>
                <div className='create-survey-panel__sections-list'>
                {this.props.ui.sectionView === -1 ?
                    this.props.form.sections.map((section, sectionIndex) => (
                        <CreateSectionPanel
                            key={`key-section-${sectionIndex}`}
                            ui={this.props.ui}
                            section={section}
                            sectionIndex={sectionIndex}
                            actions={this.props.actions}
                            vocab={this.props.vocab} />
                    )) :
                    <CreateSectionPanel
                        ui={this.props.ui}
                        section={this.props.form.sections[this.props.ui.sectionView]}
                        sectionIndex={this.props.ui.sectionView}
                        actions={this.props.actions}
                        vocab={this.props.vocab} />}
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
