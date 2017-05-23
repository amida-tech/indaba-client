import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddButtons from './AddButtons';
import { Label } from 'grommet';
import { toggleFilter } from '../../actions';

const Filters = [{
  label: 'Unassigned',
  key: 'unassigned'
}, {
  label: 'Late',
  key: 'late'
}, {
  label: 'In Progress',
  key: 'inprogress'
}, {
  label: 'Not Started',
  key: 'notstarted'
}, {
  label: 'Flagged',
  key: 'flagged'
}];

class FancyRadio extends Component {
  render() {
    return (
      <div className='fancy-radio'>
        {this.props.options.map((option) => (
          <div
            key={option.key}
            className={`fancy-option ${(this.props.filter === option.key) ? ' filter-checked' : ''}`}
            onClick={() => this.props.onToggleFilter(option.key)}>
            {option.label}
          </div>
        ))}
      </div>
    );
  }
};

class FilterBar extends Component {
  render() {
    return (
      <div className='filter-bar'>
        <FancyRadio options={Filters} filter={this.props.filter} onToggleFilter={this.props.onToggleFilter}/>
        <AddButtons />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.project.filter
});
const mapDispatchToProps = dispatch => ({
  onToggleFilter: (filter) => dispatch(toggleFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar)
