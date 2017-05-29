import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import CardValueDropdown from './CardValueDropdown';
import { showModal } from '../actions';
import { modalIDs } from './Modals';

class ProjectCard extends Component {
  render() {
    const ProjectStatusOptions = {
      Active : [{
        label: this.props.vocab.PROJECT.DEACTIVATE,
        value: modalIDs.PROJECT_STATUS_MODAL
      }],
      Inactive : [{
        label: this.props.vocab.PROJECT.ACTIVATE,
        value: modalIDs.PROJECT_STATUS_MODAL
      }]
    };

    return (
      <Box
        direction='row'
        justify='between'
        align='center'
        className='card'
        full='horizontal'
        responsive={false}
        margin={{horizontal: 'small'}}>
        <div className='project-card-left'>
          <div className='card-title'>{this.props.vocab.PROJECT.PROJECT}</div>
          <div className='card-value'>{this.props.name}</div>
        </div>
        <CardValueDropdown
          value={this.props.status}
          options={ProjectStatusOptions[this.props.status]}
          onClick={this.props.onDropdownClick} />
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: state.project.workflow.name,
  status: state.project.workflow.status,
  vocab: state.settings.language.vocabulary
});
const mapDispatchToProps = (dispatch) => ({
  onDropdownClick: (id) => dispatch(showModal(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
