import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CreateSurveyPane from './CreateSurveyPane';
import AnswerPanel from './AnswerPanel';
import Summary from '../Summary';

class Survey extends Component {
    render() {
        return (
            <div className='survey'>
                <Summary
                    actions={this.props.actions}
                    project={this.props.project}
                    survey={this.props.survey}
                    vocab={this.props.vocab} />
                <div className='survey_pane'>
                    {this.props.profile.roleID === 2 &&
                        <CreateSurveyPane
                            actions={this.props.actions}
                            vocab={this.props.vocab}/>}
                    <AnswerPanel {...this.props} />
                </div>
            </div>
        );
    }
}

Survey.propTypes = {
    project: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object,
};

export default Survey;
