import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import PropTypes from 'prop-types';

import { updateUserSearchGroup, updateUserSearchQuery } from '../../../actions';
import AssigneeCard from './AssigneeCard';
import InviteUser from './InviteUser';
import UserSidebar from './UserSidebar';

class AssigneeContainer extends Component {

    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.onGroupFilter = this.onGroupFilter.bind(this);
    }

    searchFilter(value) {
        return !this.props.search.query ||
            value.toLowerCase().includes(this.props.search.query.toLowerCase());
    }

    groupFilter(unassignee) {
        return !this.props.search.group ||
            this.props.search.group.users.some(user => user === unassignee.id);
    }

    onSearch(evt) {
        this.props.updateUserSearchQuery(evt.target.value);
    }

    onGroupFilter(evt) {
        this.props.updateUserSearchGroup(evt.option.value);
    }

    render() {
        const unassigned = this.props.users
            .filter(user => this.searchFilter(user.name))
            .filter(user => this.groupFilter(user))
            .map(unassignee =>
                React.createElement(AssigneeCard, this.props, unassignee),
            );

        const groupFilters = this.props.project.userGroups.map(group =>
            ({ label: group.name, value: group }));
        groupFilters.push({ label: this.props.vocab.COMMON.ANY, value: null });

        return (
            <Box appCentered={false}
                separator='all'>
                <UserSidebar
                    groupFilters={groupFilters}
                    unassigned={unassigned}
                    onSearch={this.onSearch}
                    search={this.props.search}
                    onGroupFilter={this.onGroupFilter}
                    vocab={this.props.vocab} />
                <InviteUser
                    vocab={this.props.vocab} />
            </Box>
        );
    }
}

const mapStateToProps = state => ({
    search: state.project.ui.userSidebarSearch,
});

const mapDispatchToProps = dispatch => ({
    updateUserSearchGroup: group => dispatch(updateUserSearchGroup(group)),
    updateUserSearchQuery: query => dispatch(updateUserSearchQuery(query)),
});

AssigneeContainer.propTypes = {
    vocab: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    updateUserSearchGroup: PropTypes.func.isRequired,
    updateUserSearchQuery: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssigneeContainer);
