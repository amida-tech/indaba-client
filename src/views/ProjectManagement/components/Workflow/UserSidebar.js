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
    constructor(props) {
        super(props);
        this.state = { query: '' };
    }

    searchFilter(value) {
        return !this.state.query || value.toLowerCase().includes(this.state.query.toLowerCase());
    }

    groupFilter(unassignee) {
        return !this.state.group || unassignee.role === this.state.group.id;
    }

    onSearch(evt) {
        this.setState(Object.assign({}, this.state, { query: evt.target.value }));
    }

    onGroupFilter(evt) {
        this.setState(Object.assign({}, this.state, { group: evt.option.value }));
    }

    render() {
        const unassigned = this.props.users
        .filter(user => this.searchFilter(user.name))
        .filter(user => this.groupFilter(user))
        .map(unassignee =>
            React.createElement(AssigneeCard, this.props, unassignee),
        );

        const groupFilters = this.props.project.userGroups.map(r => ({ label: r.role, value: r }));
        groupFilters.push({ label: 'Any', value: null });
        return (
            <Box appCentered={false}
                separator='all'
                className='user-sidebar'>
            <div className='sidebar-instruction'>{this.props.vocab.PROJECT.DND_INSTRUCTIONS}</div>
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
            <div>
                <InviteUser className='sidebard-invite-user' vocab={this.props.vocab} />
            </div>
            </Box>
        );
    }
}

export default UserSidebar;
