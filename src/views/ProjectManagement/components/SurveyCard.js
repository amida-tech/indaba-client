import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
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
        <Box className='card' direction='row' justify='between' align='center' pad='medium'>
          <div style={{display: 'inline-block'}}>
            <div className='card-title'>{this.props.vocab.PROJECT.SURVEY}</div>
            <div className='card-value'>{this.props.name}</div>
          </div>
          <CardValueDropdown
            value={this.props.status}
            options={SurveyStatusOptions[this.props.status]}
            onClick={this.props.onDropdownClick}
            />
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: state.project.survey.name,
  status: state.project.survey.status,
  vocab: state.settings.language.vocabulary
});
const mapDispatchToProps = (dispatch) => ({
  onDropdownClick: (id) => dispatch(showModal(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCard);
