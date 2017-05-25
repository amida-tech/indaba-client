import React, { Component } from 'react';
import { Button } from 'grommet';

class LayerFooterButton extends Component {
  render() {
    return (
      <div
        className={`layer-footer-button ${this.props.primary ? 'layer-footer-button-primary' : ''}`}
        onClick={this.props.onClick}>{this.props.label}</div>
    )
  }
}

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
    return (
      <div className='layer-content add-subject-layer'>
        <div className='layer-title'>Add Subject</div>
        <div className='layer-body-container'>
          <input type='text' placeholder='Subject Title' onChange={this.handleChange}/>
        </div>
        <div className='layer-footer'>
          <div className='layer-footer-button-wrapper'>
            <LayerFooterButton onClick={this.props.onCancel} label='Cancel'/>
            <LayerFooterButton
              onClick={() => this.props.onAddSubject(this.state.value)}
              label='Save'
              primary={true}/>
          </div>
        </div>
      </div>
    )
  }
};

export default AddSubject;
