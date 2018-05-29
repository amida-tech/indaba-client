import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'grommet';
import SearchInput from '../../../../../common/components/Dashboard/SearchInput';

class UserSidebar extends Component {
    render() {
        return (
            <div className='user-sidebar'>
                <div className='user-sidebar__instructions'>
                    {this.props.vocab.PROJECT.DND_INSTRUCTIONS}
                </div>
                <div className='user-sidebar__wrapper'>
                    <SearchInput
                        placeholder={this.props.vocab.COMMON.SEARCH}
                        onChange={this.props.onSearch}
                    />
                </div>
                <Select className='user-sidebar__user-filter-by-group'
                    placeHolder={this.props.vocab.PROJECT.FILTER_BY_GROUP}
                    options={this.props.groupFilters}
                    value={this.props.search.group && this.props.search.group.title}
                    onChange={this.props.onGroupFilter}
                />
                <div className='filtered-list'>{this.props.unassignedCards}</div>
            </div>
        );
    }
}

UserSidebar.propTypes = {
    vocab: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    unassignedCards: PropTypes.array.isRequired,
    groupFilters: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onGroupFilter: PropTypes.func.isRequired,
};

export default UserSidebar;
