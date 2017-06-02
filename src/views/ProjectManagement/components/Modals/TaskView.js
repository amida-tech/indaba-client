import React, { Component } from 'react';
import { Button } from 'grommet';
import Modal from '../../../../common/Modal';

class TaskView extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    const vocab = this.props.vocab;
    const body = (<input type='text' placeholder={vocab.PROJECT.TASK_VIEW} onChange={this.handleChange}/>);
    return (
      <Modal
        title={vocab.PROJECT.TASK_VIEW}
        class=''
        content={body}
        onCancel={this.props.onCancel}
        data={this.props.data}
        onSave={() => this.props.onUpdateTask(this.state.value)} />
    )
  }
};

export default TaskView;
