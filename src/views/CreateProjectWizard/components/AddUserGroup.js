import React, { Component } from 'react';
import { TextInput, Box } from 'grommet';
import Modal from '../../../common/Modal';

class AddUserGroup extends Component {
    render() {
        return (
            <Modal
                title={this.props.vocab.PROJECT.ADD_USER_GROUP}>
                {this.props.vocab.STAGE.GROUP_NAME}
                <TextInput placeHolder={this.props.vocab.PROJECT.ENTER_GROUP_NAME} />
                <Box direction='row'>
                    <Box separator='all'>
                    </Box>
                    <Box justify='center'>
                        <div>&gt;</div>
                        <div>&gt;&gt;</div>
                        <div>&lt;</div>
                        <div>&lt;&lt;</div>
                    </Box>
                    <Box>
                    </Box>
                </Box>
            </Modal>
        );
    }
}

export default AddUserGroup;
