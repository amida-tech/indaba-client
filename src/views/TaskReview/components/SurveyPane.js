import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Button } from 'grommet';
import { debounce } from 'lodash';

import Time from '../../../utils/Time';
import SurveyForm from './SurveyForm';

class SurveyPane extends Component {
    constructor(props) {
        super(props);
        this.debouncedPostAnswers = debounce(answers => props.actions.postAnswer(answers), 10000,
            { leading: true });
        this.debouncedPostAnswers.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.reqTotal !== -1 && nextProps.ui.reqAnswers >= nextProps.ui.reqTotal) {
            this.debouncedPostAnswers(nextProps.ui.form, nextProps.vocab.ERROR);
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
                    <span className='survey-pane__instructions-explained'>
                        {this.props.vocab.PROJECT.INSTRUCTIONS_EXPLAINED_2 +
                            Time.renderForInboxMessageList(this.props.ui.saveTimestamp)}
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
