import React, { Component } from 'react';
import { Box } from 'grommet';
import IonIcon from 'react-ionicons';

class UserGroupsTab extends Component {
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
