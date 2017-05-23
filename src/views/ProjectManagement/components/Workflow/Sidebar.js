import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import AssigneeCard from './AssigneeCard';

import List from 'grommet/components/List';
import SearchInput from 'grommet/components/SearchInput';
import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';

//placeHolder={this.props.vocab.PROJECT.FILTER_BY_GROUP}
// <select>
//   {this.props.data.project.workflow.roles.map(role =>
//     <option>{role}</option>)}
// </select>
class Sidebar extends Component {
  render() {
    return (
      <Box appCentered={false}>
        {this.props.vocab.PROJECT.DND_INSTRUCTIONS}
        <SearchInput placeHolder={this.props.vocab.COMMON.SEARCH}/>
        <Select placeHolder={this.props.vocab.PROJECT.FILTER_BY_GROUP}
          options={this.props.data.project.workflow.roles} />
        <List />
      </Box>
    )
  }
}

export default Sidebar
