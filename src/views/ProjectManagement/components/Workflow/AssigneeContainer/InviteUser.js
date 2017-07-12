import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Field, reduxForm, reset } from 'redux-form';
import { Button } from 'grommet';

class InviteUser extends Component {
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
                        onClick={this.props.onClear}/>
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
    handleSubmit: PropTypes.func.isRequired,
};

const FORM_NAME = 'user-sidebar-invite-user';

export default connect(null, dispatch => ({
    onClear: () => dispatch(reset(FORM_NAME)),
}))(reduxForm({
    form: FORM_NAME,
    onSubmitSuccess: (result, dispatch) => dispatch(reset(FORM_NAME)),
})(InviteUser));
