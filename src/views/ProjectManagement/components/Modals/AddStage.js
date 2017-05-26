import React, { Component } from 'react';
import { Button } from 'grommet';



class AddStage extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    const LayerFooterButton = (
          <div
            className={`layer-footer-button ${this.props.primary ? 'layer-footer-button-primary' : ''}`}
            onClick={this.props.onClick}>{this.props.label}</div>
        );
    const vocab = this.props.data.settings.language.vocabulary;
    return (
      <div className='layer-content add-subject-layer'>
        <div className='layer-title'>{vocab.PROJECT.ADD_STAGE}</div>
        <div className='layer-body-container'>
          <input type='text' placeholder={vocab.PROJECT.SUBJECT_TITLE} onChange={this.handleChange}/>
        </div>
        <div className='layer-footer'>
          <div className='layer-footer-button-wrapper'>
            <LayerFooterButton onClick={this.props.onCancel} label={vocab.COMMON.CANCEL}/>
            <LayerFooterButton
              onClick={() => this.props.onAddSubject(this.state.value)}
              label={vocab.COMMON.SAVE}
              primary={true}/>
          </div>
        </div>
      </div>
    )
  }
};

export default AddStage;
