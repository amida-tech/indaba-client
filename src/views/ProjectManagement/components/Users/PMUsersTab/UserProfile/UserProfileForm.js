import React, { Component } from 'react';
import { reduxForm, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { Tabs, Tab } from 'grommet';
import UserNameInput from './UserNameInput';
import AccountTab from './AccountTab';
import ProfileUserGroupsTab from './ProfileUserGroupsTab';
import TasksTab from './TasksTab';
import PreferenceTab from './PreferenceTab';

class UserProfileForm extends Component {
    render() {
        return (
            <form className='user-profile'
                onSubmit={this.props.handleSubmit}>
                <FormSection name='name'>
                    <UserNameInput {...this.props} />
                </FormSection>
                <Tabs className='user-profile__tabs'>
                    <Tab className='user-profile__tabs user-profile__tabs--account'
                    title={this.props.vocab.COMMON.ACCOUNT}>
                        <FormSection name='account'>
                            <AccountTab vocab={this.props.vocab}
                                user={this.props.user}/>
                        </FormSection>
                    </Tab>
                    <Tab className='user-profile__tabs user-profile__tabs--groups'
                        title={this.props.vocab.PROJECT.USER_GROUPS}>
                        <ProfileUserGroupsTab project={this.props.project}
                            userId={this.props.userId}
                            users={this.props.users}
                            vocab={this.props.vocab}/>
                    </Tab>
                    <Tab className='user-profile__tabs user-profile__tabs--tasks'
                        title={this.props.vocab.PROJECT.TASKS}>
                        <TasksTab project={this.props.project}
                            tasks={this.props.tasks}
                            userId={this.props.userId}
                            vocab={this.props.vocab}/>
                    </Tab>
                    <Tab className='user-profile__tabs user-profile__tabs--preferences'
                        title={this.props.vocab.COMMON.PREFERENCE}>
                        <FormSection name='preferences'>
                            <PreferenceTab user={this.props.user}
                                vocab={this.props.vocab}/>
                        </FormSection>
                    </Tab>
                </Tabs>
            </form>
        );
    }
}

UserProfileForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    vocab: PropTypes.object.isRequired,
    initialValues: PropTypes.object,
};

export default reduxForm({ form: 'user-profile' })(UserProfileForm);
