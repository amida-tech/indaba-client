import React, { Component } from 'react';
import { TextInput, Box } from 'grommet';
import update from 'immutability-helper';
import Modal from '../../../../common/Modal';
import FilteredList from './FilteredList';

class AddUserGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            groupUserIds: [],
            projectUsersSelected: [],
            groupUsersSelected: [],
        };

        this.handleGroupName = this.handleGroupName.bind(this);
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
    handleGroupName(evt) {
        this.setState(update(this.state, { groupName: { $set: evt.target.value } }));
    }
    handleProjectUsersSelect(selection) {
        this.setState(update(this.state, { projectUsersSelected:
            { $set: selection.length ? selection : [selection] } }));
    }
    handleGroupUsersSelect(selection) {
        this.setState(update(this.state, { groupUsersSelected:
            { $set: selection.length ? selection : [selection] } }));
    }
    handleAdd() {
        const nonGroupIds = this.nonGroupIds();
        this.setState(update(this.state, {
            groupUserIds: {
                $push: this.state.projectUsersSelected.map(
                    userIndex => nonGroupIds[userIndex]) },
            projectUsersSelected: {
                $set: [] },
        }));
    }
    handleAddAll() {
        this.setState(update(this.state, {
            groupUserIds: {
                $push: [...this.nonGroupIds()] },
            projectUsersSelected: {
                $set: [] },
        }));
    }
    handleRemove() {
        const selectedIds = this.state.groupUsersSelected
            .map(index => this.state.groupUserIds[index]);
        this.setState(update(this.state, {
            groupUserIds: {
                $set: this.state.groupUserIds
                    .filter(userId => !selectedIds.includes(userId)) },
            groupUsersSelected: {
                $set: [] },
        }));
    }
    handleRemoveAll() {
        this.setState(update(this.state, {
            groupUserIds: {
                $set: [] },
            groupUsersSelected: {
                $set: [] },
            projectUsersSelected: {
                $set: [],
            },
        }));
    }
    createUserListItem(userId) {
        const user = this.props.allUsers.find(u => u.id === userId);
        return {
            key: user.id,
            searchKey: user.name,
            value: user,
            label: user.name,
        };
    }
    render() {
        const nonGroupIds = this.nonGroupIds();
        return (
            <Modal
                onCancel={this.props.onCancel}
                onSave={this.props.onSave}
                title={this.props.vocab.PROJECT.ADD_USER_GROUP}>
                <Box pad={{ between: 'small', horizontal: 'small', vertical: 'small' }}>
                    {this.props.vocab.STAGE.GROUP_NAME}
                    <TextInput
                        placeHolder={this.props.vocab.PROJECT.ENTER_GROUP_NAME}
                        onDOMChange={this.handleGroupName}/>
                    <Box direction='row'>
                        <Box separator='all'
                            pad='small'>
                            {this.props.vocab.COMMON.ALL_USERS}
                            <FilteredList
                                placeHolder={this.props.vocab.COMMON.SEARCH}
                                items={nonGroupIds.map(this.createUserListItem)}
                                onSelect={this.handleProjectUsersSelect}
                                selected={this.state.projectUsersSelected}/>
                        </Box>
                        <Box justify='center'
                            pad='small'>
                            <div className='trade-list--add'
                                onClick={this.handleAdd}>&gt;</div>
                            <div className='trade-list--add-all'
                                onClick={this.handleAddAll}>&gt;&gt;</div>
                            <div className='trade-list--remove'
                                onClick={this.handleRemove}>&lt;</div>
                            <div className='trade-list--remove-all'
                                onClick={this.handleRemoveAll}>&lt;&lt;</div>
                        </Box>
                        <Box separator='all'
                            pad='small'>
                            {this.props.vocab.STAGE.USER_GROUP}
                            <FilteredList
                                placeHolder={this.props.vocab.COMMON.SEARCH}
                                items={this.state.groupUserIds.map(this.createUserListItem)}
                                onSelect={this.handleGroupUsersSelect}/>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        );
    }
}

export default AddUserGroup;
