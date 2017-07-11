import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextInput, Button } from 'grommet';

class InviteUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            id: 41,
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
                <div className='invite-user__header'>
                    {this.props.vocab.PROJECT.INVITE_INSTRUCTION}
                </div>
                <div className='invite-user__name-inputs'>
                    <TextInput
                        placeHolder={this.props.vocab.COMMON.FIRST_NAME}
                        onDOMChange={evt => this.setField('firstName', evt)}
                        value={this.state.firstName}/>
                    <TextInput
                        placeHolder={this.props.vocab.COMMON.LAST_NAME}
                        onDOMChange={evt => this.setField('lastName', evt)}
                        value={this.state.lastName}/>
                </div>
                <TextInput
                    placeHolder={this.props.vocab.COMMON.EMAIL}
                    className='invite-user__email'
                    onDOMChange={evt => this.setField('email', evt)}
                    value={this.state.email}/>
                <div className='invite-user__buttons'>
                    <Button className='invite-user__button'
                        secondary={true} label={this.props.vocab.COMMON.CLEAR}
                        onClick={this.clear.bind(this)}/>
                    <Button className='invite-user__button'
                        primary={true} label={this.props.vocab.COMMON.INVITE}
                        onClick={() => this.props.onInviteUser(this.state)}/>
                </div>
            </div>
        );
    }
}

InviteUser.propTypes = {
    vocab: PropTypes.object.isRequired,
    onInviteUser: PropTypes.func.isRequired,
};

export default InviteUser;
