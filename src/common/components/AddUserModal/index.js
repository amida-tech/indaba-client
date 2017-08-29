import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import AddUserForm from './AddUserForm';

class AddUserModal extends Component {
    render() {
        return (
            <Modal {...this.props}
                title={this.props.vocab.PROJECT.ADD_USER}
                onCancel={this.props.onCancel}
                onSave={ this.props.onClickToSubmit}>
                <AddUserForm vocab={this.props.vocab}
                    onSubmit={(values) => {
                        this.props.onSave();
                        this.props.actions.addNewUser(
                            values,
                            this.props.projectId,
                            this.props.organizationId,
                            this.props.vocab.ERROR,
                            this.props.actions.addUser,
                        );
                    }
                }/>
            </Modal>
        );
    }
}

AddUserModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    actions: PropTypes.shape({
        addNewUser: PropTypes.func.isRequired,
        addUserGroup: PropTypes.func.isRequired,
    }).isRequired,
    projectId: PropTypes.number.isRequired,
    organizationId: PropTypes.number.isRequired,
};

const mapDispatchToProps = dispatch => ({
    onClickToSubmit: () => dispatch(submit('add-user-form')),
});

export default connect(null, mapDispatchToProps)(AddUserModal);
