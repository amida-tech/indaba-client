import React, { Component } from 'react';
import CreateSurveyPane from './CreateSurveyPane';
import AnswerPanel from './AnswerPanel';

class Survey extends Component {

    render() {
        return (
            <div className='survey'>
            {this.props.profile.roleID === 2 &&
                <CreateSurveyPane
                    vocab={this.props.vocab}/>}
            <AnswerPanel {...this.props} />
            </div>
        );
    }
}

export default Survey;
