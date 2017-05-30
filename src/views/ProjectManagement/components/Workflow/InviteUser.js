import React, { Component } from 'react';
import { Box, TextInput, Button } from 'grommet';

class InviteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };
  }
  setField(field, evt) {
    this.setState(Object.assign({}, this.state,
      {[field]: evt.target.value}));
  }
  render() {
    return (
      <div className='invite-user'>
        <Box
          direction='column'
          pad={{between: 'small'}}>
          <div className='invite-user-header'>Not Listed? Invite by email</div>
          <Box className='invite-user-name-inputs' direction='row' pad={{between: 'small'}}>
            <TextInput
              placeHolder={this.props.vocab.COMMON.FIRST_NAME}
              onDOMChange={(evt) => this.setField('firstName', evt)}/>
            <TextInput
              placeHolder={this.props.vocab.COMMON.LAST_NAME}
              onDOMChange={(evt) => this.setField('lastName', evt)}/>
          </Box>
          <TextInput
            placeHolder={this.props.vocab.COMMON.EMAIL}
            onDOMChange={(evt) => this.setField('email', evt)}/>
          <Box
            direction='row'
            justify='end'
            pad={{between: 'small'}}
            margin={{top: 'small'}}>
            <Button secondary={true} label='Clear'/>
            <Button primary={true} label='Invite'/>
          </Box>
        </Box>
      </div>
    )
  }
}

export default InviteUser;
