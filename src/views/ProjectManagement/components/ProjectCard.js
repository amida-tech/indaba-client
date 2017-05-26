import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardValueDropdown from './CardValueDropdown';
import { showModal } from '../actions';

const ProjectStatusOptions = [
  {
    label: 'Deactivate',
    value: 'deactivate'
  },
  {
    label: 'Activate',
    value: 'activate'
  }
];

class ProjectCard extends Component {
  render() {
    return (
      <div className='col-md-6'>
        <div className='card'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='card-title'>Project</div>
              <div className='card-value'>{this.props.name}</div>
            </div>
            <div className='col-md-4'>
              <div className='card-title'>Status</div>
              <CardValueDropdown
                value={this.props.status}
                options={ProjectStatusOptions}
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
  name: state.project.workflow.name,
  status: state.project.workflow.status
});
const mapDispatchToProps = (dispatch) => ({
  onDropdownClick: (id) => dispatch(showModal(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
