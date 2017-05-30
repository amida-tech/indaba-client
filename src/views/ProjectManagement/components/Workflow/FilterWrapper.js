import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddButtons from './AddButtons';
import { toggleFilter } from '../../actions';

class FilterBar extends Component {
  render() {
    return (
      <div className='filter-bar'>
        {this.props.options.map((option) => (
          <div
            key={option.key}
            className={`filter ${(this.props.filter === option.key) ? ' filter-checked' : ''}`}
            onClick={() => this.props.onToggleFilter(option.key)}>
            {option.label}
          </div>
        ))}
      </div>
    );
  }
};

class FilterWrapper extends Component {
  render() {
    const Filters = [{
      label: this.props.vocab.PROJECT.FILTER_UNASSIGNED,
      key: 'unassigned'
    }, {
      label: this.props.vocab.PROJECT.FILTER_LATE,
      key: 'late'
    }, {
      label: this.props.vocab.PROJECT.FILTER_IN_PROGRESS,
      key: 'inprogress'
    }, {
      label: this.props.vocab.PROJECT.FILTER_NOT_STARTED,
      key: 'notstarted'
    }, {
      label: this.props.vocab.PROJECT.FILTER_FLAGGED,
      key: 'flagged'
    }];

    return (
      <div className='filter-wrapper'>
        <FilterBar options={Filters} filter={this.props.filter} onToggleFilter={this.props.onToggleFilter}/>
        <AddButtons />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.project.filter,
  vocab: state.settings.language.vocabulary
});
const mapDispatchToProps = dispatch => ({
  onToggleFilter: (filter) => dispatch(toggleFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterWrapper)
