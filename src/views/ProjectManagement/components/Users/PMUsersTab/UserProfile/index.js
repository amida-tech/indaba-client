import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, FormSection } from 'redux-form';
import { Tabs, Tab } from 'grommet';

import Modal from '../../../../../../common/Modal';
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
} from '../../../../../../common/actions/userActions';

class UserProfileForm extends Component {
    render() {
        return (
            <form>
                <FormSection name='name'>
                    <UserNameInput {...this.props}
                        onFirstNameChange={this.props.onSetFirstName}
                        onLastNameChange={this.props.onSetLastName}/>
                </FormSection>
                <Tabs>
                    <Tab title={this.props.vocab.COMMON.ACCOUNT}>
                        <FormSection name='account'>
                            <AccountTab {...this.props}
                                onEmailChange={this.props.onSetEmail}
                                onTitleChange={this.props.onSetTitle}/>
                        </FormSection>
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
            </form>
        );
    }
}

const UserProfileFormRedux = reduxForm({ form: 'user-profile' })(UserProfileForm);


class UserProfile extends Component {
    render() {
        return (
            <Modal title={this.props.vocab.PROJECT.USER_PROFILE}
                onCancel={this.props.onCancel}>
                <UserProfileFormRedux {...this.props}/>
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
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const user = state.user.users.find(userIter => userIter.id === ownProps.userId);
    return {
        vocab: state.settings.language.vocabulary,
        user,
        tasks: state.tasks.find(task => task.projectId === ownProps.project.id).tasks,
        initialValues: {
            name: {
                firstName: user.firstName,
                lastName: user.lastName,
            },
            account: {
                email: user.email,
                title: user.title,
            },
        },
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSetFirstName: firstName => dispatch(setUserFirstName(ownProps.userId, firstName)),
    onSetLastName: lastName => dispatch(setUserLastName(ownProps.userId, lastName)),
    onSetEmail: email => dispatch(setUserEmail(ownProps.userId, email)),
    onSetTitle: title => dispatch(setUserTitle(ownProps.userId, title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
