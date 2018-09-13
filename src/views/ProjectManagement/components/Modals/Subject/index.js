import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../../../common/components/Modal';
import SubjectForm from './SubjectForm';

class SubjectModal extends Component {
    render() {
        return (
            <Modal
                title={this.props.vocab.PROJECT.ADD_SUBJECT}
                onCancel={this.props.onCancel}
                form='subject-form'>
                <SubjectForm
                    vocab={this.props.vocab}
                    onSubmit={(values) => {
                        this.props.onAddSubject(subjectMapping(values));
                    }} />
            </Modal>
        );
    }
}

SubjectModal.propTypes = {
    vocab: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onAddSubject: PropTypes.func.isRequired,
};

const subjectMapping = (values) => {
    return values.subjects.split(/\s*,\s*/).filter(subject => subject).map((subject) => { return { name: subject }; });
};

export default SubjectModal;
