import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subnavigate } from '../actions';

const subNavEntries = [{
    label: 'Workflow',
    key: 'workflow',
}, {
    label: 'Survey',
    key: 'survey',
}, {
    label: 'Users',
    key: 'users',
}, {
    label: 'Subject',
    key: 'subject',
}];

class SubNavEntry extends Component {
    render() {
        return (
      <div
        className={`subnav-entry col-sm-2 ${this.props.selected ? ' selected' : ''} ${this.props.first ? ' col-sm-offset-1' : ''}`}
        onClick={this.props.onClick}>
        {this.props.label}
      </div>
        );
    }
}

class SubNav extends Component {
    render() {
        return (
      <div className='subnav-spacer'>
        <div className='container-fluid subnav'>
          <div className='row'>
            {subNavEntries.map((entry, i) =>
              <SubNavEntry
                {...entry}
                first={i === 0}
                selected={this.props.selected === entry.key}
                onClick={() => this.props.onclick(entry.key)}
                />)}
          </div>
        </div>
      </div>
        );
    }
}

const mapStateToProps = (state) => ({
  selected: state.project.ui.subnav
})
const mapDispatchToProps = (dispatch) => ({
  onclick: (id) => dispatch(subnavigate(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubNav);
