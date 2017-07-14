import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';

import Modal from '../../../../../common/Modal';
import AddStageForm from './AddStageForm';

class AddStageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            userGroups: [],
            permissions: 0,
            startStage: '',
            endStage: '',
        };

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePermissionsChange = this.handlePermissionsChange.bind(this);
        this.handleStartStageChange = this.handleStartStageChange.bind(this);
        this.handleEndStageChange = this.handleEndStageChange.bind(this);
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleSelectChange(selection) {
        this.setState({ userGroups: selection.map(selectionItem => selectionItem.value) });
    }

    handlePermissionsChange(event) {
        this.setState({ permissions: event.target.value });
    }

    handleStartStageChange(event) {
        this.setState({ startStage: event });
    }

    handleEndStageChange(event) {
        this.setState({ endStage: event });
    }

    render() {
        const groups = this.props.userGroups.map((group, key) =>
            ({ value: group.id, label: group.name, key }),
        );
        const initialValues = {
            title: '',
            userGroups: [],
            permissions: 0,
            startStage: '',
            endStage: '',
        };
        const description = this.props.vocab.PROJECT.DESC_ARRAY[this.state.permissions];
        return (
            <Modal
                title={this.props.vocab.PROJECT.STAGE_SETTINGS}
                class='add-stage-layer'
                onCancel={this.props.onCancel}
                onSave={() => this.props.onAddStage(this.state)}>

                <AddStageForm vocab={this.props.vocab}
                              groups={groups}
                              description={description}
                              initialValues={initialValues}


                />

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
