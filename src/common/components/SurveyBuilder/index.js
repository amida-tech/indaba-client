import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CreateSurveyPane from './CreateSurveyPane';
import AnswerPanel from './AnswerPanel';

class SurveyBuilder extends Component {
    render() {
        return (
            <div className='survey'>
                <div className='survey_pane'>
                    <CreateSurveyPane
                        actions={this.props.actions}
                        vocab={this.props.vocab}/>
                    <AnswerPanel {...this.props} />
                </div>
            </div>
        );
    }
}

SurveyBuilder.propTypes = {
    project: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object,
};

export default SurveyBuilder;
