import React, { Component } from 'react';
import { Button } from 'grommet';
import DateTime from 'grommet/components/DateTime';
import Select from 'react-select';

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
        this.isValid = this.isValid.bind(this);
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleSelectChange(selection) {
        this.setState({ userGroups: selection });
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

    isValid() {
        if (this.state.title === '' ||
            this.state.userGroups.length === 0 ||
            this.state.permissions === undefined ||
            this.state.startStage === '' ||
            this.state.endStage === '') {
            return false;
        }
        return true;
    }

    render() {
        const vocab = this.props.vocab;
        const roles = this.props.roles.map((role, key) =>
            ({ value: role, label: role, key }),
        );
        const description = vocab.PROJECT.DESC_ARRAY[this.state.permissions];
        return (
            <Modal
                title={vocab.PROJECT.STAGE_SETTINGS}
                class='add-stage-layer'
                onCancel={this.props.onCancel}
                isValid={this.isValid()}
                onSave={() => this.props.onAddStage(this.state)}>
                <div>
                    <input type='text' placeholder={vocab.PROJECT.STAGE_TITLE}
                        onChange={this.handleTitleChange}/>
                    <Select
                        placeholder={vocab.PROJECT.ASSIGN_USER_GROUPS}
                        name='user-group-select'
                        value={this.state.userGroups}
                        options={roles}
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

export default AddStage;
