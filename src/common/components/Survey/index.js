import React, { Component } from 'react';
import CreateSurveyPane from './CreateSurveyPane';

class Survey extends Component {

    render() {
        console.log('JAMES');
        console.log(this.props);
        return (
            <div className='survey'>
            {this.props.profile.roleID === 2 && <CreateSurveyPane />}
                Whatever.
            </div>
        );
    }
}

export default Survey;
