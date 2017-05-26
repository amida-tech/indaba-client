import React, { Component } from 'react';
import { Button } from 'grommet';
import Modal from '../../../../common/Modal';

class AddSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    const vocab = this.props.data.settings.language.vocabulary;
    const body = (<input type='text' placeholder={vocab.PROJECT.SUBJECT_TITLE} onChange={this.handleChange}/>);
    return (
      <Modal
        title={vocab.PROJECT.ADD_SUBJECT}
        class='add-subject-layer'
        content={body}
        onCancel={this.props.onCancel}
        data={this.props.data}
        onSave={() => this.props.onAddSubject(this.state.value)} />
    )
  }
};

export default AddSubject;
