import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardValueDropdown from './CardValueDropdown';

const SurveyStatusOptions = [
  {
    label: "Edit survey in draft mode",
    value: "edit"
  },
  {
    label: "Publish survey",
    value: "publish"
  }
]

class SurveyCard extends Component {
  render() {
    return (
      <div className='col-md-6'>
        <div className='card'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='card-title'>Survey</div>
              <div className='card-value'>{this.props.name}</div>
            </div>
            <div className='col-md-4'>
              <div className='card-title'>Status</div>
              <CardValueDropdown value={this.props.status} options={SurveyStatusOptions}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    name: state.project.survey.name,
    status: state.project.survey.status
})

export default connect(mapStateToProps)(SurveyCard);
