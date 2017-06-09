import React, { Component } from 'react';
import { Box, TextInput } from 'grommet';
import IonIcon from 'react-ionicons';
import UserBadge from './UserBadge';

class UserGroupsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
    }
    filterGroup(group) {
        return group.name.toLowerCase().includes(this.state.query.toLowerCase());
    }
    lookupUser(userId) {
        return this.props.allUsers.find(user => user.id === userId);
    }
    render() {
        return (
            <Box className='user-groups-tab'
                pad={{ horizontal: 'medium', vertical: 'medium', between: 'small' }}>
                <div className='user-groups-tab__search-header'>
                    <TextInput placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_USER_GROUPS}
                        onDOMChange={evt => this.setState({ query: evt.target.value })}/>
                </div>
                {this.props.userGroups.map(group =>
                    this.filterGroup(group) &&
                <Box key={group.id}
                    direction='row'
                    justify='between'>
                    <div className='user-group-list__name'>
                        {group.name}
                    </div>
                    <div className='user-group-list__badge-string'>
                        {group.users.map(userId =>
                            <UserBadge key={userId} user={this.lookupUser(userId)}/>,
                        )}
                    </div>
                    <div className='user-group-list__delete'
                        onClick={() => this.props.onRemoveUserGroup(group.id)}>
                        <IonIcon icon='ion-android-delete' />
                    </div>
                </Box>)}
            </Box>
        );
    }
}

export default UserGroupsTab;
