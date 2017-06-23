import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';

class AddUserModal extends Component {
    render() {
        return (
            <Modal onCancel={this.props.onCancel}
                onSave={this.props.onSave}
                title={this.vocab.PROJECT.ADD_USER}
                vocab={this.vocab}>
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
