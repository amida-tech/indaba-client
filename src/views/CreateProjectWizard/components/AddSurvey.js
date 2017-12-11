import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Summary from '../../../common/components/Summary';
import { SurveyBuilder } from '../../../views/SurveyBuilder';

class AddSurvey extends Component {
    render() {
        return (
            <div className='addSurvey'>
                <Summary
                    actions={this.props.actions}
                    project={this.props.project}
                    survey={this.props.survey}
                    vocab={this.props.vocab} />
                <SurveyBuilder {...this.props}/>
            </div>
        );
    }
}

AddSurvey.propTypes = {
    project: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object,
};

export default AddSurvey;
