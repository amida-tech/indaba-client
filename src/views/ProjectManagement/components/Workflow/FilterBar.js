import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddButtons from './AddButtons';
import { Label } from 'grommet';
import { toggleFilter } from '../../actions';

const Filters = [{
  label: 'Unassigned',
  id: 'unassigned',
  key: 'unassigned'
}, {
  label: 'Late',
  id: 'late',
  key: 'late'
}, {
  label: 'In Progress',
  id: 'inprogress',
  key: 'inprogress'
}, {
  label: 'Not Started',
  id: 'notstarted',
  key: 'notstarted'
}, {
  label: 'Flagged',
  id: 'flagged',
  key: 'flagged'
}];

class FancyOption extends Component {
  render() {
    return (
      <div
        className={`fancy-option ${this.props.checked ? ' filter-checked' : ''}`}
        onClick={() => this.props.onToggleFilter(this.props.id)}>
        {this.props.label}
      </div>
    );
  }
};

class FancyRadio extends Component {
  render() {
    return (
      <div className='fancy-radio'>
        {this.props.options.map((option) => (<FancyOption {...option} name='filter' checked={this.props.filter === option.id} onToggleFilter={this.props.onToggleFilter}/>))}
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
