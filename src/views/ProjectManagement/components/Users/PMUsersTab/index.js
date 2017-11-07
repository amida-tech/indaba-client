import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'grommet';

import { renderName } from '../../../../../utils/User';

import { UserProfileContainer } from '../../../../UserProfile';
import PMUserList from '../../../../../common/components/PMUserList';
import InviteUserForm from '../../../../../common/components/InviteUserForm';

class PMUsersTab extends Component {
    constructor(props) {
        super(props);
        this.filterUser = this.filterUser.bind(this);
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
    }
    filterUser(user) {
        return renderName(user).toLowerCase()
            .includes((this.props.ui.userListSearchQuery).toLowerCase());
    }
    handleSearchSelect(selection) {
        this.props.actions.updateUserListSearchQuery('');
        this.props.actions.addUser(
            selection.suggestion.value.id,
            this.props.project.id,
            this.props.vocab.ERROR);
    }
    render() {
        return (
            <div className='pm-users-tab'>
                {this.props.ui.showProfile !== false &&
                    <UserProfileContainer userId={this.props.ui.showProfile}
                        projectId={this.props.project.id}
                        onCancel={() => this.props.actions.pmProjectShowProfile(false)}
                        onSave={() => this.props.actions.pmProjectShowProfile(false)}/>
                }
                <div className='pm-users-tab__invite-container'>
                    <InviteUserForm vocab={this.props.vocab}
                        onSubmit={(values) => {
                            this.props.actions.addNewUser(
                                values,
                                this.props.project.id,
                                this.props.profile.organizationId,
                                this.props.vocab.TOAST,
                                this.props.vocab.ERROR,
                            );
                        }}/>
                </div>
                <div className='pm-users-tab__search-container'>
                    <Search
                        fill={true}
                        inline={true}
                        placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                        onDOMChange={evt =>
                            this.props.actions.updateUserListSearchQuery(evt.target.value)}
                        value={this.props.ui.userListSearchQuery}
                        suggestions={this.props.allUsers.filter(this.filterUser)
                            .map(user => ({ label: renderName(user),
                                value: user }))}
                        onSelect={this.handleSearchSelect}/>
                </div>
                <PMUserList {...this.props} />
            </div>
        );
    }
}

PMUsersTab.propTypes = {
    vocab: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    profile: PropTypes.shape({
        organizationId: PropTypes.number.isRequired,
    }),
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.shape({
        addNewUser: PropTypes.func.isRequired,
        removeUser: PropTypes.func.isRequired,
        pmProjectShowProfile: PropTypes.func.isRequired,
        updateUserListSearchQuery: PropTypes.func.isRequired,
    }).isRequired,
    userProfileId: PropTypes.any,
    ui: PropTypes.object.isRequired,
};

export default PMUsersTab;
