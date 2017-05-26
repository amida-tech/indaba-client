import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardValueDropdown from './CardValueDropdown';
import { showModal } from '../actions';
import { modalIDs } from './Modals';

const SurveyStatusOptions = {
  Published: [{
    label: "Edit survey in draft mode",
    value: modalIDs.SURVEY_STATUS_MODAL
  }],
  Draft: [{
    label: "Publish survey",
    value: modalIDs.SURVEY_STATUS_MODAL
  }]
};

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
              <CardValueDropdown
                value={this.props.status}
                options={SurveyStatusOptions[this.props.status]}
                onClick={this.props.onDropdownClick}
                />
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
});
const mapDispatchToProps = (dispatch) => ({
  onDropdownClick: (id) => dispatch(showModal(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCard);
