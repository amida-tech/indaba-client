import React, { Component } from 'react';
import { Button } from 'grommet';
import Modal from '../../../../common/Modal';
import Select from 'react-select';

class AddStage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.data.project.workflow.stages.length,
            title: '',
            roles: [],
            permissions: 0,
            startDate: null,
            endDate: null,
        };

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePermissionsChange = this.handlePermissionsChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleSelectChange(selection) {
        this.setState({ roles: selection });
    }

    handlePermissionsChange(event) {
        this.setState({ permissions: event.target.value });
    }

    handleStartDateChange(event) {
        this.setState({ startDate: event.target.value });
    }

    handleEndDateChange(event) {
        this.setState({ endDate: event.target.value });
    }

    render() {
        const vocab = this.props.vocab;
        const roles = this.props.data.project.workflow.roles.map((role, key) =>
            ({ value: role.role, label: role.role, key }),
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
                        name="role-select"
                        value={this.state.roles}
                        options={roles}
                        clearable={true}
                        multi
                        onChange={this.handleSelectChange}
                        />
                    {vocab.PROJECT.PERMISSIONS}
                    <div className="container" onChange={this.handlePermissionsChange}>
                        <label className="radio-inline">
                            <input type="radio" name="permissions" value="0" defaultChecked />
                            <span>{vocab.PROJECT.READ_ONLY}</span>
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="permissions" value="1" />
                            <span>{vocab.PROJECT.PROVIDE_RESPONSES}</span>
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="permissions" value="2" />
                            <span>{vocab.PROJECT.READ_AND_WRITE}</span>
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="permissions" value="3" />
                            <span>{vocab.PROJECT.EDIT}</span>
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="permissions" value="4" />
                            <span>{vocab.PROJECT.ALL_PERMISSIONS}</span>
                        </label>
                    </div>
                    <div>
                        {description}
                    </div>
                    {vocab.PROJECT.DATE_RANGE}
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">{vocab.PROJECT.START_DATE}</div>
                            <div className="col-md-6">{vocab.PROJECT.END_DATE}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <input
                                    type="date"
                                    name="startDate"
                                    onChange={this.handleStartDateChange}/>
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="date"
                                    name="endDate"
                                    onChange={this.handleEndDateChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default AddStage;
