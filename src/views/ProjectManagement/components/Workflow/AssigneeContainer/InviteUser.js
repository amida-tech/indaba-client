import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, TextInput, Button } from 'grommet';
import { inviteUser } from '../../../actions';

class InviteUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
        };
    }
    setField(field, evt) {
        this.setState(Object.assign({}, this.state,
      { [field]: evt.target.value }));
    }
    clear() {
        this.setState({ firstName: '', lastName: '', email: '' });
    }
    render() {
        return (
      <div className='invite-user'>
        <Box
          direction='column'
          pad={{ between: 'small' }}>
          <div className='invite-user__header'>{this.props.vocab.PROJECT.INVITE_INSTRUCTION}</div>
          <Box className='invite-user__name-inputs' direction='row' pad={{ between: 'small' }}>
            <TextInput
              placeHolder={this.props.vocab.COMMON.FIRST_NAME}
              onDOMChange={evt => this.setField('firstName', evt)}
              value={this.state.firstName}/>
            <TextInput
              placeHolder={this.props.vocab.COMMON.LAST_NAME}
              onDOMChange={evt => this.setField('lastName', evt)}
              value={this.state.lastName}/>
          </Box>
          <TextInput
            placeHolder={this.props.vocab.COMMON.EMAIL}
            onDOMChange={evt => this.setField('email', evt)}
            value={this.state.email}/>
          <Box
            direction='row'
            justify='end'
            pad={{ between: 'small' }}
            margin={{ top: 'small' }}>
            <Button secondary={true} label={this.props.vocab.COMMON.CLEAR} onClick={this.clear.bind(this)}/>
            <Button primary={true} label={this.props.vocab.COMMON.INVITE} onClick={() => this.props.onInviteUser(this.state)}/>
          </Box>
        </Box>
      </div>
        );
    }
}

// const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onInviteUser: user => dispatch(inviteUser(user)),
});

export default connect(null, mapDispatchToProps)(InviteUser);
