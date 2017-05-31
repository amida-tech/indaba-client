import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import AssigneeCard from './AssigneeCard';
import InviteUser from './InviteUser';

import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import SearchInput from 'grommet/components/SearchInput';
import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';

class Sidebar extends Component {
  render() { // TODO: Find a far better way to do this.
    const unassigned = this.props.data.project.workflow.unassigned.map(unassignee =>
      React.createElement(AssigneeCard, this.props, unassignee)
    );
    return (
      <Box appCentered={false}
        separator='all'
        pad={{between: 'small', vertical: 'small', horizontal: 'small'}}>
        <div>{this.props.vocab.PROJECT.DND_INSTRUCTIONS}</div>
        <SearchInput placeHolder={this.props.vocab.COMMON.SEARCH}/>
        <Select placeHolder={this.props.vocab.PROJECT.FILTER_BY_GROUP}
          options={this.props.data.project.workflow.roles} />
        <List>
          {unassigned.map(unassignee =>
            <ListItem key={"Unassigned-"+unassignee.props.children.id}>
              {unassignee}
            </ListItem>
          )}
        </List>
        <InviteUser vocab={this.props.vocab} />
      </Box>
    )
  }
}

export default Sidebar;
