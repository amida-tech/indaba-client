import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import IonIcon from 'react-ionicons';

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
        const unread = _.get(this.props, 'message.unread');

        if (!compose && !active
            && !this.props.ui.expandedMessages.includes(_.get(this.props, 'message.id'))) {
            return <CollapsedMessage {...this.props}
                message={
                    this.props.message
                    && Object.assign({}, this.props.message, {
                        from: renderNameByEmail(this.props.message.from, this.props.users),
                    })
                }/>;
        }
        return (
            <div className={`message ${active ? 'message--active' : ''} ${compose ? 'message--compose' : ''}`}
                onClick={() => !compose && !active
                    && this.props.goToMessage(this.props.id)}>
                <form className='message__content' onSubmit={this.props.handleSubmit}>
                    <div className='message__row message__row--to'>
                        <MessageField label={this.props.vocab.MESSAGES.TO}
                            input={compose}
                            value={_.get(this.props, 'message.to', []).map(
                                user => renderNameByEmail(user, this.props.users),
                            ).join(', ')}
                            component={ToField}
                            componentProps={{
                                users: this.props.users,
                                actions: this.props.actions,
                                query: this.props.ui.toQuery,
                            }}
                            name='to'/>
                        <div className='message__timestamp'>
                            {this.props.message && Time.renderForMessage(
                                this.props.message.createdAt, this.props.vocab,
                            )}
                        </div>
                    </div>
                    <div className='message__row'>
                        <MessageField label={this.props.vocab.MESSAGES.FROM}
                            input={false}
                            value={
                                compose
                                    ? renderName(this.props.profile)
                                    : renderNameByEmail(_.get(this.props, 'message.from'), this.props.users)
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
                            !compose
                            && <div className='message__body-actions'>
                                <ButtonPanel>
                                    {
                                        !unread
                                        && <PanelButton
                                            title={this.props.vocab.MESSAGES.MARK_AS_UNREAD}
                                            onClick={() => this.props.actions
                                                .markAsUnread(this.props.message.id)}>
                                            <IonIcon icon='ion-email-unread'
                                                className='message__action-icon'/>
                                        </PanelButton>
                                    }
                                    {
                                        unread
                                        && <PanelButton
                                            title={this.props.vocab.MESSAGES.MARK_AS_READ}
                                            onClick={() => this.props.actions
                                                .markAsRead(this.props.message.id)}>
                                            <IonIcon icon='ion-ios-checkmark-empty'
                                                className='message__action-icon'/>
                                        </PanelButton>
                                    }
                                    {
                                        !systemMessage
                                        && <PanelButton
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
                        {
                            compose
                            && <div className='message__body-buttons'>
                                <button className='message__body-cancel-button'
                                    onClick={this.props.onCancel}>
                                    <span>{this.props.vocab.COMMON.CANCEL}</span>
                                </button>
                                <button className='message__body-send-button'
                                    type='submit'>
                                    <span>{this.props.vocab.COMMON.SEND}</span>
                                </button>
                            </div>
                        }
                    </div>
                </form>
                {
                    !compose && received && !systemMessage
                    && <div className='message__inline-reply'
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
            apiService.messaging.reply(reply.id, message)
                .then(this.handleSendResponse);
        } else {
            apiService.messaging.send(message)
                .then(this.handleSendResponse);
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

    handleSendResponse(result) {
        this.props.actions.discardReply();
        this.props.actions.getThreadContainingMessage(result.id);
        this.props.goToMessage(result.id);
    }

    render() {
        if (this.props.id !== undefined) {
            return (<Message {...this.props} />);
        }
        const reply = this.props.reply || _.get(this.props, 'location.state.message');
        return (
            <MessageForm {...this.props}
                validate={(values) => {
                    const errors = {};
                    if (_.get(values, 'to.length', 0) === 0) {
                        errors.to = this.props.vocab.MESSAGES.TO_REQUIRED;
                    }
                    if (!values.subject) {
                        errors.subject = this.props.vocab.MESSAGES.SUBJECT_REQUIRED;
                    }
                    if (!values.message) {
                        errors.message = this.props.vocab.MESSAGES.MESSAGE_REQUIRED;
                    }
                    return errors;
                } }
                initialValues={
                    reply
                }
                onSubmit={this.submitForm}
                onCancel={this.cancelForm}/>
        );
    }
}

export default MessageSelector;
