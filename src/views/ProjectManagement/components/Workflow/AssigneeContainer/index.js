import React, { Component } from 'react';

class AssigneeContainer extends Component {
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


    render() {
        const unassigned = this.props.users
        .filter(user => this.searchFilter(user.name))
        .filter(user => this.groupFilter(user))
        .map(unassignee =>
            React.createElement(AssigneeCard, this.props, unassignee),
        );

        const groupFilters = this.props.project.userGroups.map(group => ({ label: group.role, value: group }));
        groupFilters.push({ label: 'Any', value: null });
        return (
            <Box appCentered={false}
                separator='all'
                className='user-sidebar'>
                <div className='sidebar-instruction'>
                    {this.props.vocab.PROJECT.DND_INSTRUCTIONS}
                </div>
                <UserSidebar

                    vocab={this.props.vocab} />
                <InviteUser className='sidebard-invite-user'
                    vocab={this.props.vocab} />
            </Box>
        )
    }
}

export default AssigneeContainer;
