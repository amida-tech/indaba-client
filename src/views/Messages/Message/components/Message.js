import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import IonIcon from 'react-ionicons';
import { Button } from 'grommet';

import { renderName, renderNameByEmail } from '../../../../utils/User';
import apiService from '../../../../services/api';
import Time from '../../../../utils/Time';

import CollapsedMessage from './CollapsedMessage';
import MessageField from './MessageField';
import MessageBodyField from './MessageBodyField';
import ButtonPanel, { PanelButton } from '../../components/ButtonPanel';
import ToField from './ToField';

class Message extends Component {
    render() {
        const compose = this.props.id === undefined;
        const received = _.get(this.props, 'message.to', []).includes(this.props.profile.email);
        const active = _.get(this.props, 'params.id') === _.get(this.props, 'id', '').toString();
        const systemMessage = _.get(this.props, 'message.systemMessage', false);

        if (!compose && !active &&
            !this.props.ui.expandedMessages.includes(_.get(this.props, 'message.id'))) {
            return <CollapsedMessage {...this.props}
                message={
                    this.props.message &&
                    Object.assign({}, this.props.message, {
                        from: renderNameByEmail(this.props.message.from, this.props.users),
                    })
                }/>;
        }
        return (
            <div className={`message ${active ? 'message--active' : ''} ${compose ? 'message--compose' : ''}`}
                onClick={() => !compose && !active &&
                    this.props.goToMessage(this.props.id)}>
                <form className='message__content' onSubmit={this.props.handleSubmit}>
                    <div className='message__row message__row--to'>
                        <MessageField label={this.props.vocab.MESSAGES.TO}
                            input={compose}
                            value={_.get(this.props, 'message.to', []).map(
                                user => renderNameByEmail(user, this.props.users),
                            ).join(', ')}
                            component={ToField}
                            componentProps={{ users: this.props.users }}
                            name='to'/>
                        <div className='message__timestamp'>
                            {this.props.message && Time.renderForMessage(
                                this.props.message.timestamp, this.props.vocab)}
                        </div>
                    </div>
                    <div className='message__row'>
                        <MessageField label={this.props.vocab.MESSAGES.FROM}
                            input={false}
                            value={
                                compose ?
                                renderName(this.props.profile) :
                                renderNameByEmail(_.get(this.props, 'message.from'), this.props.users)
                            }
                            name='from'/>
                    </div>
                    <div className='message__row'>
                        <MessageField label={this.props.vocab.MESSAGES.SUBJECT}
                            input={compose}
                            value={_.get(this.props, 'message.subject')}
                            name='subject'/>
                    </div>
                    <div className='message__body-section'>
                        {
                            !compose &&
                            <div className='message__body-actions'>
                                <ButtonPanel>
                                    <PanelButton
                                        title={this.props.vocab.MESSAGES.MARK_AS_UNREAD}
                                        onClick={() => this.props.actions
                                                .markMessageAsUnread(this.props.message.id)}>
                                        <IonIcon icon='ion-email-unread'
                                            className='message__action-icon'/>
                                    </PanelButton>
                                    {
                                        !systemMessage &&
                                        <PanelButton
                                            onClick={() => this.props.actions
                                                .forwardMessage(this.props.message) }>
                                            <IonIcon icon='ion-arrow-right-a'
                                                className='message__action-icon'/>
                                        </PanelButton>
                                    }
                                    {
                                        received && !systemMessage && [
                                            <PanelButton key='reply-button'
                                                onClick={() => this.props.actions
                                                    .startReply(this.props.message) }>
                                                    <IonIcon icon='ion-reply'
                                                        className='message__action-icon'/>
                                                </PanelButton>,
                                            <PanelButton key='reply-all-button'
                                                onClick={() => this.props.actions
                                                    .startReplyAll(this.props.message) }>
                                                    <IonIcon icon='ion-reply-all'
                                                        className='message__action-icon'/>
                                                </PanelButton>,
                                        ]
                                    }
                                </ButtonPanel>
                            </div>
                        }
                        <div className='message__body-field-wrapper'>
                            <MessageBodyField
                                input={compose}
                                value={_.get(this.props, 'message.message')}
                                name='message'/>
                        </div>
                        <div className='message__body-timestamp'>
                            {Time.renderForMessage(_.get(this.props, 'message.timestamp'), this.props.vocab)}
                        </div>
                        {
                            compose &&
                            <div className='message__body-buttons'>
                                <Button label={this.props.vocab.COMMON.CANCEL}
                                    box
                                    size='small'
                                    margin={{ right: 'small' }}
                                    colorIndex='grey-1'
                                    onClick={this.props.onCancel}/>
                                <Button label={this.props.vocab.COMMON.SEND}
                                    box
                                    size='small'
                                    type='submit'
                                    margin='none'
                                    primary/>
                            </div>
                        }
                    </div>
                </form>
                {
                    !compose && received && !systemMessage &&
                    <div className='message__inline-reply'
                        onClick={(evt) => {
                            this.props.actions.startReplyAll(this.props.message);
                            evt.stopPropagation();
                        }}>
                        {this.props.vocab.MESSAGES.WRITE_REPLY}
                    </div>
                }
            </div>
        );
    }
}

Message.propTypes = {
    id: PropTypes.number,
    reply: PropTypes.object,
    vocab: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const MessageForm = reduxForm({ form: 'message' })(Message);

class MessageSelector extends Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.handleSendResponse = this.handleSendResponse.bind(this);
    }
    submitForm(values) {
        const reply = this.props.reply || _.get(this.props, 'location.state.message');
        const message = {
            subject: values.subject,
            to: values.to,
            from: this.props.profile.email,
            message: values.message,
        };
        if (_.has(reply, 'id')) {
            apiService.messaging.reply(reply.id, message, this.handleSendResponse);
        } else {
            apiService.messaging.send(message, this.handleSendResponse);
        }
    }
    cancelForm() {
        const reply = this.props.reply || _.get(this.props, 'location.state.message');
        if (_.has(reply, 'id') || _.has(reply, 'forwardId')) {
            this.props.actions.discardReply();
        } else {
            this.props.goToInbox();
        }
    }
    handleSendResponse(err, result) {
        if (!err) {
            this.props.actions.discardReply();
            this.props.actions.getThreadContainingMessage(result.id);
            this.props.goToMessage(result.id);
        }
    }
    render() {
        if (this.props.id !== undefined) {
            return (<Message {...this.props} />);
        }
        const reply = this.props.reply || _.get(this.props, 'location.state.message');
        return (
            <MessageForm {...this.props}
                initialValues={
                    reply
                }
                onSubmit={this.submitForm}
                onCancel={this.cancelForm}/>
        );
    }
}

export default MessageSelector;
