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

class UserSidebar extends Component {
    onSearch(evt) {
        this.setState(Object.assign({}, this.state, { query: evt.target.value }));
    }


        onGroupFilter(evt) {
            this.setState(Object.assign({}, this.state, { group: evt.option.value }));
        }

    render() {
        return (
            <div className='sidebar-user-picker'>
                <Search className='sidebar-user-search'
                    fill={true}
                    placeHolder={this.props.vocab.COMMON.SEARCH}
                    onDOMChange={this.onSearch.bind(this)}
                    inline={true}/>
                <Select placeHolder={this.props.vocab.PROJECT.FILTER_BY_GROUP}
                    options={groupFilters}
                    value={this.state.group && this.state.group.role}
                    onChange={this.onGroupFilter.bind(this)}/>
                <List>
                    {unassigned.map(unassignee =>
                    <ListItem key={`Unassigned-${unassignee.props.children.id}`}>
                        {unassignee}
                    </ListItem>,
                    )}
                </List>
            </div>
        );
    }
}

export default UserSidebar;
