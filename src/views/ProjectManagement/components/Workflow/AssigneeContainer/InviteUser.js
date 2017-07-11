import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { Button } from 'grommet';

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
            <form className='invite-user' onSubmit={this.props.handleSubmit}>
                <div className='invite-user__header'>
                    {this.props.vocab.PROJECT.INVITE_INSTRUCTION}
                </div>
                <div className='invite-user__name-inputs'>
                    <Field name='firstName'
                        component='input' type='text'
                        className='invite-user__name-input'
                        placeholder={this.props.vocab.COMMON.FIRST_NAME} />
                    <Field name='lastName'
                        component='input' type='text'
                        className='invite-user__name-input'
                        placeholder={this.props.vocab.COMMON.LAST_NAME} />
                </div>
                <Field name='email'
                    component='input' type='text'
                    placeholder={this.props.vocab.COMMON.EMAIL}
                    className='invite-user__email' />
                <div className='invite-user__buttons'>
                    <Button className='invite-user__button'
                        secondary={true} label={this.props.vocab.COMMON.CLEAR}
                        onClick={this.clear.bind(this)}/>
                    <Button className='invite-user__button'
                        type='submit'
                        primary={true} label={this.props.vocab.COMMON.INVITE}/>
                </div>
            </form>
        );
    }
}

InviteUser.propTypes = {
    vocab: PropTypes.object.isRequired,
    onInviteUser: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'user-sidebar-invite-user' })(InviteUser);
