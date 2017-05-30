import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      <div className='col-md-6'>
        <div className='card'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='card-title'>{this.props.vocab.PROJECT.PROJECT}</div>
              <div className='card-value'>{this.props.name}</div>
            </div>
            <div className='col-md-4'>
              <div className='card-title'>{this.props.vocab.PROJECT.SURVEY}</div>
              <CardValueDropdown
                value={this.props.status}
                options={ProjectStatusOptions[this.props.status]}
                onClick={this.props.onDropdownClick} />
            </div>
          </div>
        </div>
      </div>
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
