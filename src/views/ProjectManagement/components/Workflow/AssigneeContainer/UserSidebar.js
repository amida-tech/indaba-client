import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, ListItem, Search, Select } from 'grommet';

class UserSidebar extends Component {
    render() {
        return (
            <div className='user-sidebar'>
                <div className='user-sidebar__instructions'>
                    {this.props.vocab.PROJECT.DND_INSTRUCTIONS}
                </div>
                <Search
                    className='user-sidebar__user-search'
                    fill={true}
                    placeHolder={this.props.vocab.COMMON.SEARCH}
                    onDOMChange={this.props.onSearch}
                    inline={true}/>
                <Select className='user-sidebar__user-filter-by-group'
                    placeHolder={this.props.vocab.PROJECT.FILTER_BY_GROUP}
                    options={this.props.groupFilters}
                    value={this.props.search.group && this.props.search.group.name}
                    onChange={this.props.onGroupFilter}/>
                <List className='user-sidebar__user-dropdown'>
                    {this.props.unassigned.map(unassignee =>
                        <ListItem key={`Unassigned-${unassignee.props.children.id}`}>
                            {unassignee}
                        </ListItem>,
                    )}
                </List>
            </div>
        );
    }
}

UserSidebar.propTypes = {
    vocab: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    unassigned: PropTypes.array.isRequired,
    groupFilters: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onGroupFilter: PropTypes.func.isRequired,
};

export default UserSidebar;
