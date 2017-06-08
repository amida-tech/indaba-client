import React, { Component } from 'react';
import { TextInput, Box, List, ListItem } from 'grommet';
import update from 'immutability-helper';
import Modal from '../../../common/Modal';

class AddUserGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            usersQuery: '',
            groupQuery: '',
        };

        this.handleGroupName = this.handleGroupName.bind(this);
        this.handleUsersQuery = this.handleUsersQuery.bind(this);
        this.handleGroupQuery = this.handleGroupQuery.bind(this);
        this.renderUserEntry = this.renderUserEntry.bind(this);
    }
    handleGroupName(evt) {
        this.setState(update(this.state, { groupName: { $set: evt.target.value } }));
    }
    handleUsersQuery(evt) {
        this.setState(update(this.state, { usersQuery: { $set: evt.target.value } }));
    }
    handleGroupQuery(evt) {
        this.setState(update(this.state, { groupQuery: { $set: evt.target.value } }));
    }
    filterUser(user) {
        return user.name.toLowerCase().includes(this.state.usersQuery.toLowerCase());
    }
    renderUserEntry(userId) {
        const user = this.props.allUsers.find(u => u.id === userId);
        return (
            <ListItem key={user.id} style={{ display: this.filterUser(user) ? undefined : 'none' }}>{user.name}</ListItem>
        );
    }
    render() {
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
                            <TextInput
                                placeHolder={this.props.vocab.COMMON.SEARCH}
                                onDOMChange={this.handleUsersQuery}/>
                            <List selectable='multiple'>
                                {this.props.users.map(userId => this.renderUserEntry(userId))}
                            </List>
                        </Box>
                        <Box justify='center'
                            pad='small'>
                            <div>&gt;</div>
                            <div>&gt;&gt;</div>
                            <div>&lt;</div>
                            <div>&lt;&lt;</div>
                        </Box>
                        <Box separator='all'
                            pad='small'>
                            {this.props.vocab.STAGE.USER_GROUP}
                            <TextInput
                                placeHolder={this.props.vocab.COMMON.SEARCH}
                                onDOMChange={this.handleGroupQuery}/>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        );
    }
}

export default AddUserGroup;
