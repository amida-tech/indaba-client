import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddButtons from './AddButtons';
import { Label } from 'grommet';
import { setFilter } from '../../actions';

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
      <div className='fancy-option'>
        <input
          type='radio'
          name={this.props.name}
          id={this.props.id}
          checked={this.props.checked}
          onChange={() => this.props.onSetFilter(this.props.id)}
          />
        <label
          htmlFor={this.props.id}>
          {this.props.label}
        </label>
      </div>
    );
  }
};

class FancyRadio extends Component {
  render() {
    return (
      <div className='fancy-radio'>
        {this.props.options.map((option) => (<FancyOption {...option} name='filter' checked={this.props.filter === option.id} onSetFilter={this.props.onSetFilter}/>))}
      </div>
    );
  }
};

class FilterBar extends Component {
  render() {
    return (
      <div className='filter-bar'>
        <FancyRadio options={Filters} filter={this.props.filter} onSetFilter={this.props.onSetFilter}/>
        <AddButtons />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.project.filter
});
const mapDispatchToProps = dispatch => ({
  onSetFilter: (filter) => dispatch(setFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar)
