import React, { Component } from 'react';
import { Button } from 'grommet';

class AddSubject extends Component {
  render() {
    return (
      <div className='layer-content add-subject-layer'>
        <div className='layer-title'>Add Subject</div>
        <div className='layer-body-container'>
          <input type='text' placeholder='Subject Title'/>
        </div>
        <div className='layer-footer'>
          <Button
            secondary={true}
            onClick={this.props.onCancel}
            label='Cancel'/>
          <Button
            primary={true}
            onClick={this.props.onAddSubject}
            label='Save'/>
        </div>
      </div>
    )
  }
};

export default AddSubject;
