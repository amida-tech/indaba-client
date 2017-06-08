import React, { Component } from 'react';
import { TextInput, Box } from 'grommet';
import Modal from '../../../common/Modal';

class AddUserGroup extends Component {
    render() {
        return (
            <Modal
                title={this.props.vocab.PROJECT.ADD_USER_GROUP}>
                <Box pad={{ between: 'small', horizontal: 'small', vertical: 'small' }}>
                    {this.props.vocab.STAGE.GROUP_NAME}
                    <TextInput placeHolder={this.props.vocab.PROJECT.ENTER_GROUP_NAME} />
                    <Box direction='row'>
                        <Box separator='all'
                            pad='small'>
                            {this.props.vocab.COMMON.ALL_USERS}
                            <TextInput placeHolder={this.props.vocab.COMMON.SEARCH}/>
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
                            <TextInput placeHolder={this.props.vocab.COMMON.SEARCH}/>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        );
    }
}

export default AddUserGroup;
