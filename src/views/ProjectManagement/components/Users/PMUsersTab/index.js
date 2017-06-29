import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { renderName } from '../../../../../utils/User';

import UserProfile from './UserProfile';
import PMUserListRow from './PMUserListRow';
import PMUserListHeader from './PMUserListHeader';

class PMUsersTab extends Component {
    constructor(props) {
        super(props);
        this.state = { userProfileId: false };
        this.showUserProfileModal = this.showUserProfileModal.bind(this);
        this.filterUser = this.filterUser.bind(this);
    }
    showUserProfileModal(userId) {
        this.setState({ userProfileId: userId });
    }
    filterUser(user) {
        return renderName(user).toLowerCase().includes((this.props.search || '').toLowerCase());
    }
    render() {
        return (
            <div className='pm-users-tab'>
                {this.state.userProfileId !== false &&
                    <UserProfile userId={this.state.userProfileId}
                        {...this.props}
                        onCancel={() => this.setState({ userProfileId: false })}/>
                }
                <form>
                    <Field name='firstName'
                        component='input'
                        type='text'
                        className='pm-users-tab__text-input'
                        placeholder={this.props.vocab.PROJECT.NEW_USER_FIRST_NAME}/>
                    <Field name='lastName'
                        component='input'
                        type='text'
                        className='pm-users-tab__text-input'
                        placeholder={this.props.vocab.PROJECT.NEW_USER_LAST_NAME}/>
                    <Field name='email'
                        component='input'
                        type='text'
                        className='pm-users-tab__text-input'
                        placeholder={this.props.vocab.PROJECT.NEW_USER_EMAIL}/>
                    <button type='button'>{this.props.vocab.COMMON.INVITE}</button>
                    <Field name='search'
                        component='input'
                        type='text'
                        className='pm-users-tab__text-input'
                        placeholder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}/>
                </form>
                <PMUserListHeader vocab={this.props.vocab} />
                {this.props.users
                    .filter(this.filterUser)
                    .map(user =>
                    <PMUserListRow user={user}
                        groups={this.props.project.userGroups}
                        key={user.id}
                        stages={this.props.project.stages}
                        tasks={this.props.tasks}
                        subjects={this.props.project.subjects}
                        onNameClick={() => this.showUserProfileModal(user.id)}
                        vocab={this.props.vocab}/>)}
            </div>
        );
    }
}

PMUsersTab.propTypes = {
    vocab: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    search: PropTypes.string.isRequired,
};

const PMUsersTabForm = reduxForm({ form: 'pm-users-tab' })(PMUsersTab);

const selector = formValueSelector('pm-users-tab');

export default connect(state => ({ search: selector(state, 'search') }))(PMUsersTabForm);
