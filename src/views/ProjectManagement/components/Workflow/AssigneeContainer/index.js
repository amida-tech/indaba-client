import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AssigneeCard from './AssigneeCard';
import InviteUser from './InviteUser';
import UserSidebar from './UserSidebar';

import { renderName } from '../../../../../utils/User';

class AssigneeContainer extends Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.onGroupFilter = this.onGroupFilter.bind(this);
    }

    searchFilter(value) {
        return !this.props.search.query
            || value.toLowerCase().includes(this.props.search.query.toLowerCase());
    }

    groupFilter(unassignee) {
        return !this.props.search.group
            || this.props.search.group.users.some(user => user === unassignee.id);
    }

    onSearch(evt) {
        this.props.actions.updateUserSearchQuery(evt.target.value);
    }

    onGroupFilter(evt) {
        this.props.actions.updateUserSearchGroup(evt.option.value);
    }

    render() {
        const unassigned = this.props.project.users
            .map(userId => this.props.users.find(userObject => userObject.id === userId))
            .filter(user => user !== undefined)
            .filter(user => this.searchFilter(renderName(user)))
            .filter(user => this.groupFilter(user));
        const unassignedCards = unassigned.map((unassignee) => {
            return (
                <AssigneeCard
                    key={unassignee.id}
                    actions={this.props.actions}
                    project={this.props.project}
                    vocab={this.props.vocab}>
                    {unassignee}
                </AssigneeCard>
            );
        });

        const groupFilters = this.props.project.userGroups.map(group => ({ label: group.title, value: group }));
        groupFilters.push({ label: this.props.vocab.COMMON.ALL, value: null });

        return (
            <div className='assignee-container'>
                <UserSidebar
                    groupFilters={groupFilters}
                    unassignedCards={unassignedCards}
                    onSearch={this.onSearch}
                    search={this.props.search}
                    onGroupFilter={this.onGroupFilter}
                    vocab={this.props.vocab} />
                <InviteUser
                    vocab={this.props.vocab}
                    onSubmit={values => this.props.actions.addNewUser(
                        values,
                        this.props.project.id,
                        this.props.profile.organizationId,
                        this.props.vocab.TOAST,
                        this.props.vocab.ERROR,
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    search: state.manager.ui.userSidebarSearch,
});

AssigneeContainer.propTypes = {
    vocab: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.shape({
        updateUserSearchGroup: PropTypes.func.isRequired,
        updateUserSearchQuery: PropTypes.func.isRequired,
        addNewUser: PropTypes.func.isRequired,
    }).isRequired,
};

export default connect(mapStateToProps)(AssigneeContainer);
