import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Time from '../../../utils/Time';
import SurveyForm from './SurveyForm';

class SurveyPane extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.reqTotal !== -1 && nextProps.ui.reqAnswers >= nextProps.ui.reqTotal) {
            // Enable complete task.
        }
    }

    render() {
        return (
            <div className='survey-pane'>
                <div className='survey-pane__controls'>
                    <Select className='survey-pane__select'
                        options={this.props.options}
                        value={this.props.sectionIndex}
                        clearable={false}
                        disabled={this.props.options.length === 1}
                        onChange={event => this.props.actions.setSurveySectionIndex(event.value)}/>
                    <div className='survey-pane__accordion-buttons'>
                        <button className='survey-pane__button-expand'
                            onClick={() => this.props.actions.showQuestion(
                                this.props.survey.map((key, index) => index))}>
                                {this.props.vocab.PROJECT.EXPAND_ALL}</button>
                        <button className='survey-pane__button-collapse'
                            onClick={this.props.actions.collapseAllQuestions}>
                            {this.props.vocab.PROJECT.COLLAPSE_ALL}</button>
                    </div>
                </div>
                <div className='survey-pane__instructions'>
                    <span className='survey-pane__instructions-header'>
                        {this.props.vocab.PROJECT.INSTRUCTIONS}
                    </span>
                    <span className='survey-pane__instructions-explained'>
                        {this.props.vocab.PROJECT.INSTRUCTIONS_EXPLAINED}
                    </span>
                    <span className='survey-pane__instructions-explained'>
                        {this.props.vocab.PROJECT.INSTRUCTIONS_EXPLAINED_2 +
                            (this.props.ui.lastSave === null ?
                                this.props.vocab.PROJECT.NOT_SAVED :
                                Time.renderForSurveyAutosave(this.props.ui.lastSave))}
                    </span>
                </div>
                <SurveyForm {...this.props} />
            </div>
        );
    }
}
SurveyPane.propTypes = {
    vocab: PropTypes.object.isRequired,
};
export default SurveyPane;
