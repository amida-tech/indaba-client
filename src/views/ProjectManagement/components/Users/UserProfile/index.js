import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../../../common/Modal';

class UserProfile extends Component {
    render() {
        return (
            <Modal>
                <div className='user-profile'>
                    <input type='text' className='user-profile__name-input'/>
                </div>
                <Tabs>
                    <Tab>
                        <AccountTab />
                    </Tab>
                    <Tab>
                        <UserGroupsTab />
                    </Tab>
                    <Tab>
                        <TasksTab />
                    </Tab>
                    <Tab>
                        <PreferenceTab />
                    </Tab>
                </Tabs>
            </Modal>
        );
    }
}

UserProfile.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserProfile;
