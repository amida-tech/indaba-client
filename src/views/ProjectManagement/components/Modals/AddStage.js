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
      roles:[],
      permissions: 0,
      startDate: null,
      endDate: null
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePermissionsChange = this.handlePermissionsChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handleTitleChange(event){
    this.setState({'title': event.target.value});
  }

  handleSelectChange(selection) {
    this.setState({'roles': selection});
  }

  handlePermissionsChange(event){
    this.setState({'permissions': event.target.value});
  }

  handleStartDateChange(event){
    this.setState({'startDate': event.target.value});
  }

  handleEndDateChange(event){
    this.setState({'endDate': event.target.value});
  }

  render() {
    const vocab = this.props.vocab;
    const roles = this.props.data.project.workflow.roles.map((role, key) =>
        ({'value': role.role, 'label': role.role, 'key': key})
      );
    const description = vocab.PROJECT.DESC_ARRAY[this.state.permissions];

    const body = (
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
            <input type="radio" style={{marginTop: '5px'}} name="permissions" value="0" defaultChecked />
            <span style={{marginLeft: '15px'}}> {vocab.PROJECT.READ_ONLY}</span>
          </label>
          <label className="radio-inline">
            <input type="radio" name="permissions" value="1" />{vocab.PROJECT.PROVIDE_RESPONSES}
          </label>
          <label className="radio-inline">
            <input type="radio" name="permissions" value="2" />{vocab.PROJECT.READ_AND_WRITE}
          </label>
          <label className="radio-inline">
            <input type="radio" name="permissions" value="3" /> {vocab.PROJECT.EDIT}
          </label>
          <label className="radio-inline">
            <input type="radio" name="permissions" value="4" /> {vocab.PROJECT.ALL_PERMISSIONS}
          </label>
        </div>
        <div>
          {description}
        </div>
        {vocab.PROJECT.DATE_RANGE}
        <div className="container">
          <div className="row">
            <div className="col-md-4">{vocab.PROJECT.START_DATE}</div>
            <div className="col-md-4">{vocab.PROJECT.END_DATE}</div>
          </div>
          <div className="row">
            <div className="col-md-4"><input type="date" name="startDate" onChange={this.handleStartDateChange}/></div>
            <div className="col-md-4"><input type="date" name="endDate" onChange={this.handleEndDateChange}/></div>
          </div>
        </div>
      </div>
      );
      return (
        <Modal
          title={vocab.PROJECT.STAGE_SETTINGS}
          class=''
          content={body}
          onCancel={this.props.onCancel}
          data={this.props.data}
          onSave={() => this.props.onAddStage(this.state)} />
      )
  }
};

export default AddStage;
