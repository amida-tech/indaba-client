import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Summary from '../../../common/components/Summary';
import Survey from '../../../common/components/Survey';

class AddSurvey extends Component {
    render() {
        return (
            <div className='addSurvey'>
                <Summary
                    actions={this.props.actions}
                    project={this.props.project}
                    survey={this.props.survey}
                    vocab={this.props.vocab} />
                <Survey {...this.props}/>
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
