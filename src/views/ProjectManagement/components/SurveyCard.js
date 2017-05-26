import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardValueDropdown from './CardValueDropdown';
import { showModal } from '../actions';
import { modalIDs } from './Modals';

class SurveyCard extends Component {
  render() {
    const SurveyStatusOptions = {
      Published: [{
        label: this.props.vocab.SURVEY.UNPUBLISH,
        value: modalIDs.SURVEY_STATUS_MODAL
      }],
      Draft: [{
        label: this.props.vocab.SURVEY.PUBLISH,
        value: modalIDs.SURVEY_STATUS_MODAL
      }]
    };

    return (
      <div className='col-md-6'>
        <div className='card'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='card-title'>{this.vocab.PROJECT.SURVEY}</div>
              <div className='card-value'>{this.props.name}</div>
            </div>
            <div className='col-md-4'>
              <div className='card-title'>{this.vocab.PROJECT.STATUS}</div>
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
  vocab: state.settings.language.vocabulary
});
const mapDispatchToProps = (dispatch) => ({
  onDropdownClick: (id) => dispatch(showModal(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCard);
