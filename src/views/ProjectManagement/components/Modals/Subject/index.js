import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';

import Modal from '../../../../../common/components/Modal';
import SubjectForm from './SubjectForm';

class SubjectModal extends Component {
    render() {
        return (
            <Modal
                title={this.props.vocab.PROJECT.ADD_SUBJECT}
                class='add-subject-layer'
                onCancel={this.props.onCancel}
                onSave={this.props.onClickToSubmit}>
                <SubjectForm
                    vocab={this.props.vocab}
                    onSubmit={values => this.props.onAddSubject(values)} />
            </Modal>
        );
    }
}

SubjectModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    onClickToSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onAddStage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    onClickToSubmit: () => dispatch(submit('subject-form')),
});

export default connect(null, mapDispatchToProps)(SubjectModal);
