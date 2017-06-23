import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../Modal';
import AddUserForm from './AddUserForm';

class AddUserModal extends Component {
    render() {
        return (
            <Modal {...this.props}
                title={this.props.vocab.PROJECT.ADD_USER}>
                <AddUserForm vocab={this.props.vocab}/>
            </Modal>
        );
    }
}

AddUserModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
};

export default AddUserModal;
