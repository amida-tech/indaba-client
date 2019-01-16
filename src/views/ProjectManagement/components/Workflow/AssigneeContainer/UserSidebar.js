import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find, get } from 'lodash'
import Select from 'react-select';
import FilterInput from '../../../../../common/components/Dashboard/FilterInput';

class UserSidebar extends Component {
    render() {
        const groupId = get(this.props.filter, 'group.id');
        const value = find(this.props.groupFilters((group) => group.id === groupId));
        console.log(groupId);
        console.log(value);

        return (
            <div className='user-sidebar'>
                <div className='user-sidebar__instructions'>
                    {this.props.vocab.PROJECT.DND_INSTRUCTIONS}
                </div>
                <div className='user-sidebar__wrapper'>
                    <FilterInput
                        placeholder={this.props.vocab.COMMON.FILTER}
                        onChange={this.props.onFilter}
                    />
                </div>
                <Select className='user-sidebar__user-filter-by-group'
                    placeholder={this.props.vocab.PROJECT.FILTER_BY_GROUP}
                    options={this.props.groupFilters}
                    value={value}
                    onChange={this.props.onGroupFilter}
                />
                <div className='filtered-list'>{this.props.unassignedCards}</div>
            </div>
        );
    }
}

UserSidebar.propTypes = {
    vocab: PropTypes.object.isRequired,
    filter: PropTypes.object.isRequired,
    unassignedCards: PropTypes.array.isRequired,
    groupFilters: PropTypes.array.isRequired,
    onFilter: PropTypes.func.isRequired,
    onGroupFilter: PropTypes.func.isRequired,
};

export default UserSidebar;
