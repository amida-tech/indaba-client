import React, { Component } from 'react';
import { reduxForm, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import Tabs from '../../../common/components/Tabs/Tabs';
import Tab from '../../../common/components/Tabs/Tab';
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
                    <UserNameInput {...this.props} />
                </FormSection>
                <Tabs className='user-profile-form__tabs'>
                    <Tab className='user-profile-form__tab'
                        title={this.props.vocab.COMMON.ACCOUNT}>
                        <FormSection name='account'>
                            <AccountTab vocab={this.props.vocab}
                                user={this.props.user}
                                onResendActivation={ this.props.onResendActivation}/>
                        </FormSection>
                    </Tab>
                    {
                        this.props.projectId !== undefined &&
                        <Tab className='user-profile-form__tab'
                            title={this.props.vocab.PROJECT.USER_GROUPS}>
                            <ProfileUserGroupsTab project={this.props.project}
                                userId={this.props.userId}
                                users={this.props.users}
                                vocab={this.props.vocab}/>
                        </Tab>
                    }
                    {
                        this.props.projectId !== undefined &&
                        <Tab className='user-profile-form__tab'
                            title={this.props.vocab.PROJECT.TASKS}>
                            <TasksTab project={this.props.project}
                                tasks={this.props.tasks}
                                userId={this.props.userId}
                                vocab={this.props.vocab}/>
                        </Tab>
                    }
                    <Tab className='user-profile-form__tab'
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
    projectId: PropTypes.number,
    project: PropTypes.object,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    vocab: PropTypes.object.isRequired,
    initialValues: PropTypes.object,
};

export default reduxForm({ form: 'user-profile' })(UserProfileForm);
