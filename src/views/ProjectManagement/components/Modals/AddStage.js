import React, { Component } from 'react';
import DateTime from 'grommet/components/DateTime';
import Select from 'react-select';
// import { Field, reduxForm, reset } from 'redux-form';
import PropTypes from 'prop-types';

import Modal from '../../../../common/Modal';

class AddStage extends Component {
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
        const vocab = this.props.vocab;
        const groups = this.props.userGroups.map((group, key) =>
            ({ value: group.id, label: group.name, key }),
        );
        const description = vocab.PROJECT.DESC_ARRAY[this.state.permissions];
        return (
            <Modal
                title={vocab.PROJECT.STAGE_SETTINGS}
                class='add-stage-layer'
                onCancel={this.props.onCancel}
                onSave={() => this.props.onAddStage(this.state)}>
                <div>
                    <input type='text' placeholder={vocab.PROJECT.STAGE_TITLE}
                        onChange={this.handleTitleChange}/>
                    <Select
                        placeholder={vocab.PROJECT.ASSIGN_USER_GROUPS}
                        name='user-group-select'
                        value={this.state.userGroups}
                        options={groups}
                        clearable={true}
                        multi
                        onChange={this.handleSelectChange}
                        />
                    {vocab.PROJECT.PERMISSIONS}
                    <div className='container' onChange={this.handlePermissionsChange}>
                        {vocab.PROJECT.PERM_ARRAY.map((permission, index) =>
                            <label className='radio-inline' key={index}>
                                <input type='radio'
                                    name='permissions'
                                    value={index}
                                    defaultChecked={!index} />
                                <span>{permission}</span>
                            </label>,
                        )}
                    </div>
                    <div>
                        {description}
                    </div>
                    {vocab.PROJECT.DATE_RANGE}
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6'>{vocab.PROJECT.START_DATE}</div>
                            <div className='col-md-6'>{vocab.PROJECT.END_DATE}</div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <DateTime id='StartStage'
                                    format='MM/DD/YYYY'
                                    value={this.state.startStage}
                                    onChange={this.handleStartStageChange}/>
                            </div>
                            <div className='col-md-6'>
                                <DateTime id='endStage'
                                    format='MM/DD/YYYY'
                                    value={this.state.endStage}
                                    onChange={this.handleEndStageChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

AddStage.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default AddStage;

// export default reduxForm({
//     form: 'add-stage-form',
//     onSubmitSuccess: (result, dispatch) => dispatch(reset('add-stage-form')),
// })(AddStage);
