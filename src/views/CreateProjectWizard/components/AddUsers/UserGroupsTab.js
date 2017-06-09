import React, { Component } from 'react';
import { Box } from 'grommet';
import IonIcon from 'react-ionicons';
import UserBadge from './UserBadge';

class UserGroupsTab extends Component {
    lookupUser(userId) {
        return this.props.allUsers.find(user => user.id === userId);
    }
    render() {
        return (
            <Box className='user-groups-tab'
                pad={{ horizontal: 'medium', vertical: 'medium', between: 'small' }}>
                {this.props.userGroups.map(group =>
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
                    <div className='user-group-list__delete'>
                        <IonIcon icon='ion-android-delete' />
                    </div>
                </Box>)}
            </Box>
        );
    }
}

export default UserGroupsTab;
