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
        return (<Box pad={{ between: 'small' }}>
            <TextInput
                placeHolder={this.props.placeHolder}
                onDOMChange={this.handleQuery}/>
            <List selectable='multiple'
                onSelect={this.props.onSelect}>
                {this.props.items.map(item => (
                    <ListItem
                        key={item.searchKey}
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
        };

        this.handleGroupName = this.handleGroupName.bind(this);
        this.createUserListItem = this.createUserListItem.bind(this);
    }
    handleGroupName(evt) {
        this.setState(update(this.state, { groupName: { $set: evt.target.value } }));
    }
    createUserListItem(userId) {
        const user = this.props.allUsers.find(u => u.id === userId);
        return {
            searchKey: user.name,
            value: user,
            label: user.name,
        };
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
                            <FilteredList
                                placeHolder={this.props.vocab.COMMON.SEARCH}
                                items={this.props.users.map(this.createUserListItem)} />
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
                            <FilteredList
                                placeHolder={this.props.vocab.COMMON.SEARCH}
                                items={[]} />
                        </Box>
                    </Box>
                </Box>
            </Modal>
        );
    }
}

export default AddUserGroup;
