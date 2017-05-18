import React, { Component } from 'react';
import { connect } from 'react-redux';

const subNavEntries = [{
  label: 'Workflow',
  key: 'workflow'
}, {
  label: 'Survey',
  key: 'survey'
}, {
  label: 'Users',
  key: 'users'
}, {
  label: 'Subject',
  key: 'subject'
}];

class SubNavEntry extends Component {
  render() {
    return (
      <div className={`subnav-entry col-md-1 ${this.props.selected ? 'selected' : ''}`}>{this.props.label}</div>
    );
  }
}

class SubNav extends Component {
  render() {
    return (
      <div className='subnav-spacer'>
        <div className='container subnav'>
          <div className='row'>
            {subNavEntries.map(entry =>
              <SubNavEntry label={entry.label} key={entry.key} selected={this.props.selected === entry.key}/>)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selected: state.project.subnav.selected
});


export default connect(mapStateToProps)(SubNav);
