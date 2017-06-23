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

import {
    setUserFirstName,
    setUserLastName,
    setUserEmail,
    setUserTitle,
} from '../../../../../common/actions/userActions';

class UserProfile extends Component {
    render() {
        return (
            <Modal title={this.props.vocab.PROJECT.USER_PROFILE}
                onCancel={this.props.onCancel}>
                <UserNameInput {...this.props}
                    onFirstNameChange={this.props.onSetFirstName}
                    onLastNameChange={this.props.onSetLastName}/>
                <Tabs>
                    <Tab title={this.props.vocab.COMMON.ACCOUNT}>
                        <AccountTab {...this.props}
                            onEmailChange={this.props.onSetEmail}
                            onTitleChange={this.props.onSetTitle}/>
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

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSetFirstName: firstName => dispatch(setUserFirstName(ownProps.userId, firstName)),
    onSetLastName: lastName => dispatch(setUserLastName(ownProps.userId, lastName)),
    onSetEmail: email => dispatch(setUserEmail(ownProps.userId, email)),
    onSetTitle: title => dispatch(setUserTitle(ownProps.userId, title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
