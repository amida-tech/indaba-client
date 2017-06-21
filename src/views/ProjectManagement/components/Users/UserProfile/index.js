import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'grommet';

import Modal from '../../../../../common/Modal';
import UserNameInput from './UserNameInput';
import AccountTab from './AccountTab';
import UserGroupsTab from './UserGroupsTab';
import TasksTab from './TasksTab';
import PreferenceTab from './PreferenceTab';

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
        this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
    }
    handleFirstNameChanged(firstName) {}
    handleLastNameChanged(lastName) {}
    render() {
        return (
            <Modal title={this.props.vocab.PROJECT.USER_PROFILE}
                onCancel={this.props.onCancel}>
                <UserNameInput {...this.props}
                    onFirstNameChanged={this.handleFirstNameChanged}
                    onLastNameChnaged={this.handleLastNameChanged}/>
                <Tabs>
                    <Tab title={this.props.vocab.COMMON.ACCOUNT}>
                        <AccountTab {...this.props}/>
                    </Tab>
                    <Tab title={this.props.vocab.PROJECT.USER_GROUPS}>
                        <UserGroupsTab {...this.props} />
                    </Tab>
                    <Tab title={this.props.vocab.PROJECT.TASKS}>
                        <TasksTab {...this.props} />
                    </Tab>
                    <Tab title={this.props.vocab.COMMON.PREFERENCE}>
                        <PreferenceTab />
                    </Tab>
                </Tabs>
            </Modal>
        );
    }
}

UserProfile.propTypes = {
    userId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    vocab: state.settings.language.vocabulary,
    user: state.user.users.find(user => user.id === ownProps.userId),
});

export default connect(mapStateToProps)(UserProfile);
