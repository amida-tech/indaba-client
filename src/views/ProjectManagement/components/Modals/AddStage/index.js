import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import Modal from '../../../../../common/components/Modal';
import AddStageForm from './AddStageForm';

class AddStageModal extends Component {
    render() {
        const groups = this.props.userGroups.map((group, key) =>
            ({ value: group.id, label: group.name, key }),
        );
        const initialValues = {
            title: '',
            userGroups: [],
            permissions: '0',
            startStage: '',
            endStage: '',
        };
        return (
            <Modal
                title={this.props.vocab.PROJECT.STAGE_SETTINGS}
                class='add-stage-layer'
                onCancel={this.props.onCancel}
                onSave={this.props.onClickToSubmit}>
                <AddStageForm vocab={this.props.vocab}
                              groups={groups}
                              initialValues={initialValues}
                              onSubmit={(values) => {
                                  this.props.onAddStage({
                                      id: uuid(),
                                      title: values.title,
                                      startStage: values.startStage,
                                      endStage: values.endStage,
                                      userGroups: values.userGroups.map(group => group.value),
                                      permissions: parseInt(values.permissions, 10),
                                  }, this.props.projectId);
                              }
                          } />
            </Modal>
        );
    }
}

AddStageModal.propTypes = {
    vocab: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    onClickToSubmit: () => dispatch(submit('add-stage-form')),
});

export default connect(null, mapDispatchToProps)(AddStageModal);
