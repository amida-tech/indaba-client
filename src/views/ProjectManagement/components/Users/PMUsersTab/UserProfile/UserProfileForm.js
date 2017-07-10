import React, { Component } from 'react';
import { reduxForm, FormSection } from 'redux-form';

import { Tabs, Tab } from 'grommet';
import UserNameInput from './UserNameInput';
import AccountTab from './AccountTab';
import ProfileUserGroupsTab from './ProfileUserGroupsTab';
import TasksTab from './TasksTab';
import PreferenceTab from './PreferenceTab';

class UserProfileForm extends Component {
    render() {
        return (
            <form className='user-profile-form'
                onSubmit={this.props.handleSubmit}>
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
                        <ProfileUserGroupsTab {...this.props} />
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

export default reduxForm({ form: 'user-profile' })(UserProfileForm);
