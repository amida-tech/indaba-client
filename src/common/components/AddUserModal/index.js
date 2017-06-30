import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';

import Modal from '../../Modal';
import AddUserForm from './AddUserForm';

class AddUserModal extends Component {
    render() {
        const NEW_USER_ID = 21;
        return (
            <Modal {...this.props}
                title={this.props.vocab.PROJECT.ADD_USER}
                onCancel={this.props.onCancel}
                onSave={ this.props.onClickToSubmit}>
                <AddUserForm vocab={this.props.vocab}
                    onSubmit={(values) => {
                        this.props.onSave();
                        this.props.onAddNewUser({
                            id: NEW_USER_ID,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            email: values.email,
                            title: values.title,
                            invited: true,
                        });
                        this.props.onAddUserToProject(NEW_USER_ID, this.props.projectId);
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
    onAddNewUser: PropTypes.func.isRequired,
    onAddUserToProject: PropTypes.func.isRequired,
    projectId: PropTypes.number.isRequired,
};

const mapDispatchToProps = dispatch => ({
    onClickToSubmit: () => dispatch(submit('add-user-form')),
});

export default connect(null, mapDispatchToProps)(AddUserModal);
