import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'grommet';

import Modal from '../../../../../common/Modal';
import AccountTab from './AccountTab';
import UserGroupsTab from './UserGroupsTab';
import TasksTab from './TasksTab';
import PreferenceTab from './PreferenceTab';

class UserProfile extends Component {
    render() {
        return (
            <Modal title={this.props.vocab.PROJECT.USER_PROFILE}>
                <div className='user-profile'>
                    <input type='text' className='user-profile__name-input'/>
                    <Tabs>
                        <Tab title={this.props.vocab.COMMON.ACCOUNT}>
                            <AccountTab />
                        </Tab>
                        <Tab title={this.props.vocab.PROJECT.USER_GROUPS}>
                            <UserGroupsTab />
                        </Tab>
                        <Tab title={this.props.vocab.PROJECT.TASKS}>
                            <TasksTab />
                        </Tab>
                        <Tab title={this.props.vocab.COMMON.PREFERENCE}>
                            <PreferenceTab />
                        </Tab>
                    </Tabs>
                </div>
            </Modal>
        );
    }
}

UserProfile.propTypes = {
    userId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    vocab: state.settings.language.vocabulary,
    user: state.user.users.find(user => user.id === ownProps.userId),
});

export default connect(mapStateToProps)(UserProfile);
