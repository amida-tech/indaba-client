import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import AssigneeCard from './AssigneeCard';
import InviteUser from './InviteUser';

import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Search from 'grommet/components/Search';
import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {query: ''};
  }
  searchFilter(query, value) {
    return !query || value.toLowerCase().includes(query.toLowerCase());
  }
  onSearch(evt) {
    this.setState({query: evt.target.value});
  }
  render() { // TODO: Find a far better way to do this.
    const unassigned = this.props.data.project.workflow.unassigned
    .filter((u) => this.searchFilter(this.state.query, u.name))
    .map(unassignee =>
      React.createElement(AssigneeCard, this.props, unassignee)
    );
    return (
      <Box appCentered={false}
        separator='all'
        className='sidebar'>
        <div className='sidebar-instruction'>{this.props.vocab.PROJECT.DND_INSTRUCTIONS}</div>
        <div className='sidebar-user-picker'>
          <Search className='sidebar-user-search'
            fill={true}
            placeHolder={this.props.vocab.COMMON.SEARCH}
            onDOMChange={this.onSearch.bind(this)}
            inline={true}/>
          <Select placeHolder={this.props.vocab.PROJECT.FILTER_BY_GROUP}
            options={this.props.data.project.workflow.roles.map(r=>({label: r.role, value: r}))} />
          <List>
            {unassigned.map(unassignee =>
              <ListItem key={"Unassigned-"+unassignee.props.children.id}>
                {unassignee}
              </ListItem>
            )}
          </List>
        </div>
        <div>
          <InviteUser className='sidebard-invite-user' vocab={this.props.vocab} />
        </div>
      </Box>
    )
  }
}

export default Sidebar;
