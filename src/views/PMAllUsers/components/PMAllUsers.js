import React, { Component } from 'react';

import { Search } from 'grommet';

import { renderName } from '../../../utils/User';
import PMUserList from '../../../common/components/PMUserList';
import { UserProfileContainer } from '../../../views/UserProfile';
import InviteUserForm from '../../../common/components/InviteUserForm';

class PMAllUsers extends Component {
    constructor(props) {
        super(props);
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
        this.filterUser = this.filterUser.bind(this);
    }
    handleSearchSelect(selection) {
        this.props.actions.pmAllUsersShowProfile(selection.suggestion.value.id);
    }
    filterUser(user) {
        return renderName(user).toLowerCase()
            .includes((this.props.ui.listQuery).toLowerCase());
    }
    render() {
        return (
            <div className='pm-all-users'>
                <div className='pm-all-users__invite-container'>
                    <InviteUserForm vocab={this.props.vocab}
                        onSubmit={(values) => {
                            this.props.actions.addNewUser(
                                values,
                                null, // no project id
                                this.props.organizationId,
                                this.props.vocab.TOAST,
                                this.props.vocab.ERROR,
                            );
                        }}/>
                </div>
                <div className='pm-all-users__search-container'>
                    <Search
                        fill={true}
                        inline={true}
                        placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                        onDOMChange={evt =>
                            this.props.actions.pmAllUsersSetListQuery(evt.target.value)}
                        value={this.props.ui.listQuery}
                        suggestions={this.props.users.filter(this.filterUser)
                            .map(user => ({ label: renderName(user),
                                value: user }))}
                        onSelect={this.handleSearchSelect}/>
                </div>
                <PMUserList {...this.props}
                    onUserNameClick={this.props.actions.pmAllUsersShowProfile}
                    onUserDeleteClick={id =>
                        this.props.actions.deleteUser(id, this.props.vocab.ERROR)}
                    onUserMailClick={id =>
                        this.props.actions.sendMessage(
                            this.props.users.find(user => user.id === id))}/>
                {
                    this.props.ui.showProfile !== false &&
                    <UserProfileContainer userId={this.props.ui.showProfile}
                        onCancel={() => this.props.actions.pmAllUsersShowProfile(false)}
                        onSave={() => this.props.actions.pmAllUsersShowProfile(false)}/>
                }
            </div>
        );
    }
}

export default PMAllUsers;
