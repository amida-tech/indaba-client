import React, { Component } from 'react';
import { connect } from 'react-redux';

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

class CardValueDropdown extends Component {
  render() {
    return (
      <div className='card-value card-value-select' tabIndex="0">
        {this.props.value}
        <span className='card-value-select-arrow'></span>
        <div className='card-value-options'>
          {this.props.options.map(option =>
            <div
              className='card-value-option'
              key={option.value}
              onClick={() => this.props.onClick(option.value)}>
              {option.label}
            </div>)}
          </div>
      </div>
    )
  }
}

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
