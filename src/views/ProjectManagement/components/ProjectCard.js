import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardValueDropdown from './CardValueDropdown';

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
              <CardValueDropdown value={this.props.status} options={ProjectStatusOptions}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    name: state.project.project.name,
    status: state.project.project.status
})

export default connect(mapStateToProps)(ProjectCard);
