import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SurveyBuilder } from '../../SurveyBuilder';

class AddSurvey extends Component {
    render() {
        return (
            <div className='addSurvey'>
                <SurveyBuilder {...this.props}/>
            </div>
        );
    }
}

AddSurvey.propTypes = {
    project: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object,
};

export default AddSurvey;
