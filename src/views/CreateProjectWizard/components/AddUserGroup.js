import React, { Component } from 'react';
import { TextInput, Box, List, ListItem } from 'grommet';
import update from 'immutability-helper';
import Modal from '../../../common/Modal';

class FilteredList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this.handleQuery = this.handleQuery.bind(this);
    }
    filter(item) {
        return item.searchKey.toLowerCase().includes(this.state.query.toLowerCase());
    }
    handleQuery(evt) {
        this.setState(update(this.state, { query: { $set: evt.target.value } }));
    }
    render() {
        // list selection breaks if selected is passed in as undefined inline
        const listProps = {
            selectable: 'multiple',
            onSelect: this.props.onSelect,
        };
        if (this.props.selected) {
            listProps.selected =
                this.props.selected.length === 1 ?
                this.props.selected[0] :
                this.props.selected;
        }

        return (<Box pad={{ between: 'small' }}>
            <TextInput
                placeHolder={this.props.placeHolder}
                onDOMChange={this.handleQuery}/>
            <List {...listProps}>
                {this.props.items.map(item => (
                    <ListItem
                        key={item.key}
                        style={{ display: this.filter(item) ? undefined : 'none' }}>
                        {item.label}
                    </ListItem>
                ))}
            </List>
        </Box>);
    }
}

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
