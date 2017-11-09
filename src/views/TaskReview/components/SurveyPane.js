import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Button } from 'grommet';
import SurveyForm from './SurveyForm';

class SurveyPane extends Component {
    render() {
        return (
            <div className='survey-pane'>
                <div className='survey-pane__controls'>
                    <Select />
                    <div className='survey-pane__accordion-buttons'>
                        <Button className='survey-pane__button'
                            label={this.props.vocab.PROJECT.EXPAND_ALL}
                            onClick={() => this.props.actions.showQuestion(
                                this.props.survey.map((key, index) => index))} />
                        <Button className='survey-pane__button'
                            label={this.props.vocab.PROJECT.COLLAPSE_ALL}
                            onClick={this.props.actions.collapseAllQuestions} />
                    </div>
                </div>
                <div className='survey-pane__instructions'>
                    <span className='survey-pane__instructions-header'>
                        {this.props.vocab.PROJECT.INSTRUCTIONS}
                    </span>
                    <span className='survey-pane__instructions-explained'>
                        {this.props.vocab.PROJECT.INSTRUCTIONS_EXPLAINED}
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
