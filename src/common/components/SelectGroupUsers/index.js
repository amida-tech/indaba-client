import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compact, filter, get } from 'lodash';
import { toast } from 'react-toastify';

import Modal from '../../../common/components/Modal';
import FilteredList from './FilteredList';
import { renderName } from '../../../utils/User';

class SelectGroupUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupTitle: get(this.props, 'group.title', ''),
            groupUserIds: compact(get(this.props, 'group.users', [])),
            projectUsersSelected: [],
            groupUsersSelected: [],
        };

        this.handleGroupTitle = this.handleGroupTitle.bind(this);
        this.handleProjectUsersSelect = this.handleProjectUsersSelect.bind(this);
        this.handleGroupUsersSelect = this.handleGroupUsersSelect.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleAddAll = this.handleAddAll.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
        this.createUserListItem = this.createUserListItem.bind(this);
    }
    nonGroupIds() {
        return this.props.users.filter(userId => !this.state.groupUserIds.includes(userId));
    }
    handleGroupTitle(evt) {
        this.setState({ groupTitle: evt.target.value });
    }
    handleProjectUsersSelect(selection) {
        this.setState({ projectUsersSelected: selection.length ? selection : [selection] });
    }
    handleGroupUsersSelect(selection) {
        this.setState({ groupUsersSelected: selection.length ? selection : [selection] });
    }
    handleAdd() {
        const nonGroupIds = this.nonGroupIds();
        const newGroupUserIds = [...this.state.groupUserIds];
        newGroupUserIds.push(this.state.projectUsersSelected.map(
            userIndex => nonGroupIds[userIndex],
        ));
        this.setState({
            groupUserIds: [
                ...this.state.groupUserIds,
                ...this.state.projectUsersSelected.map(userIndex => nonGroupIds[userIndex]),
            ],
            projectUsersSelected: [] },
        );
    }
    handleAddAll() {
        this.setState({
            groupUserIds:
                [...this.state.groupUserIds, ...this.nonGroupIds()],
            projectUsersSelected: [],
        });
    }
    handleRemove() {
        const selectedIds = this.state.groupUsersSelected
            .map(index => this.state.groupUserIds[index]);
        this.setState({
            groupUserIds: this.state.groupUserIds
                    .filter(userId => !selectedIds.includes(userId)),
            groupUsersSelected: [],
            projectUsersSelected: [],
        });
    }
    handleRemoveAll() {
        this.setState({
            groupUserIds: [],
            groupUsersSelected: [],
            projectUsersSelected: [],
        });
    }
    createUserListItem(userId) {
        const user = this.props.allUsers.find(allUser => allUser.id === userId);
        return {
            key: user.id,
            searchKey: renderName(user),
            value: user,
            label: renderName(user),
        };
    }
    render() {
        console.log('>>>>> allUsers: ', this.props.allUsers);
        console.log('>>>>> userGroups: ', this.props.userGroups);
        console.log('>>>>> groupUserIds: ', this.state.groupUserIds);
        const nonGroupIds = this.nonGroupIds();
        return (
            <Modal
                onCancel={this.props.onCancel}
                onSave={(this.state.groupTitle !== '') ?
                    () => {
                        const groupId = get(this.props, 'group.id', null);
                        const duplicates = filter(this.props.userGroups, group =>
                            group.title === this.state.groupTitle && group.id !== groupId);
                        if (duplicates.length > 0) {
                            toast(this.props.vocab.ERROR.DUPLICATE);
                        } else {
                            this.props.onSave({
                                title: this.state.groupTitle,
                                users: this.state.groupUserIds,
                            });
                        }
                    } :
                    undefined}
                title={this.props.vocab.PROJECT.ADD_USER_GROUP}>
                <div className='select-group-users'>
                    {this.props.vocab.STAGE.GROUP_NAME}
                    <input className='select-group-users__group-name-input'
                        placeholder={this.props.vocab.PROJECT.ENTER_GROUP_NAME}
                        onChange={this.handleGroupTitle}
                        value={this.state.groupTitle}/>
                    <div className='select-group-users__wrapper'>
                        <div className='select-group-users__non-group-user-list'>
                            {this.props.vocab.COMMON.ALL_USERS}
                            <FilteredList
                                placeHolder={this.props.vocab.COMMON.SEARCH}
                                items={nonGroupIds.map(this.createUserListItem)}
                                onSelect={this.handleProjectUsersSelect}
                                selected={this.state.projectUsersSelected}/>
                        </div>
                        <div className='select-group-users__buttons'>
                            <div className='select-group-users__button'
                                onClick={this.handleAdd}>&gt;</div>
                            <div className='select-group-users__button'
                                onClick={this.handleAddAll}>&gt;&gt;</div>
                            <div className='select-group-users__button'
                                onClick={this.handleRemove}>&lt;</div>
                            <div className='select-group-users__button'
                                onClick={this.handleRemoveAll}>&lt;&lt;</div>
                        </div>
                        <div className='select-group-users__group-user-list'>
                            {this.props.vocab.STAGE.USER_GROUP}
                            <FilteredList
                                placeHolder={this.props.vocab.COMMON.SEARCH}
                                items={this.state.groupUserIds.map(this.createUserListItem)}
                                onSelect={this.handleGroupUsersSelect}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

SelectGroupUsers.propTypes = {
    users: PropTypes.arrayOf(PropTypes.number).isRequired,
    allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
    vocab: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    group: PropTypes.shape({
        name: PropTypes.string,
        users: PropTypes.arrayOf(PropTypes.number),
    }),
};

export default SelectGroupUsers;
