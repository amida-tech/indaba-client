import React, { Component } from 'react';
import AddButtons from './AddButtons';
import { Label } from 'grommet';

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
        <input type='radio' name={this.props.name} id={this.props.id}/>
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    );
  }
};

class FancyRadio extends Component {
  render() {
    return (
      <div className='fancy-radio'>
        {this.props.options.map((option) => (<FancyOption {...option} name='filter' />))}
      </div>
    );
  }
};

class FilterBar extends Component {
  render() {
    return (
      <div className='filter-bar'>
        <FancyRadio options={Filters}/>
        <AddButtons />
      </div>
    );
  }
}

export default FilterBar;
