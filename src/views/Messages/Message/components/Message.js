import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import IonIcon from 'react-ionicons';
import { Button } from 'grommet';
import { renderName } from '../../../../utils/User';

import MessageField from './MessageField';
import MessageBodyField from './MessageBodyField';
import ButtonPanel, { PanelButton } from '../../components/ButtonPanel';
import ToField from './ToField';

class Message extends Component {
    componentWillMount() {
        if (this.props.id && !this.props.message) {
            this.props.actions.getMessage(this.props.id);
        }

        this.renderUserFromEmail = this.renderUserFromEmail.bind(this);
    }
    renderUserFromEmail(email) {
        const user = this.props.users.find(userIter => userIter.email === email);
        return user ? renderName(user) : email;
    }
    render() {
        const compose = this.props.id === undefined;
        return (
            <div className='message'>
                <form className='message__content' onSubmit={this.props.handleSubmit}>
                    <div className='message__row message__row--to'>
                        <MessageField label={this.props.vocab.MESSAGES.TO}
                            input={compose}
                            value={_.get(this.props, 'message.to', []).map(
                                this.renderUserFromEmail,
                            ).join(', ')}
                            component={ToField}
                            componentProps={{ users: this.props.users }}
                            name='to'/>
                        <div className='message__timestamp'>
                            {this.props.message && this.props.message.timestamp}
                        </div>
                    </div>
                    <div className='message__row'>
                        <MessageField label={this.props.vocab.MESSAGES.FROM}
                            input={false}
                            value={
                                compose ?
                                renderName(this.props.profile) :
                                this.renderUserFromEmail(_.get(this.props, 'message.from'))
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
                                    <PanelButton>
                                        <IonIcon icon='ion-ios-trash-outline'
                                            className='message__action-icon'/>
                                    </PanelButton>
                                    <PanelButton title={this.props.vocab.MESSAGES.ARCHIVE}
                                        onClick={() => this.props.actions
                                                .archiveMessage(this.props.message.id)}>
                                        <IonIcon icon='ion-ios-box'
                                            className='message__action-icon'/>
                                    </PanelButton>
                                    <PanelButton
                                        title={this.props.vocab.MESSAGES.MARK_AS_UNREAD}
                                        onClick={() => this.props.actions
                                                .markMessageAsUnread(this.props.message.id)}>
                                        <IonIcon icon='ion-email-unread'
                                            className='message__action-icon'/>
                                    </PanelButton>
                                    <PanelButton
                                        onClick={() => this.props.actions
                                                .forwardMessage(this.props.message) }>
                                        <IonIcon icon='ion-arrow-right-a'
                                            className='message__action-icon'/>
                                    </PanelButton>
                                    <PanelButton
                                        onClick={ () => this.props.actions
                                            .startReply(this.props.message) }>
                                        <IonIcon icon='ion-reply'
                                            className='message__action-icon'/>
                                    </PanelButton>
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
                            {_.get(this.props, 'message.timestamp')}
                        </div>
                        {
                            compose &&
                            <div className='message__body-buttons'>
                                <Button label={this.props.vocab.COMMON.CANCEL}
                                    box
                                    size='small'
                                    margin={{ right: 'small' }}
                                    colorIndex='grey-1'
                                    onClick={this.props.actions.discardReply}/>
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
                    !compose &&
                    <div className='message__inline-reply'
                        onClick={() => this.props.actions.startReply(this.props.message)}>
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
                onSubmit={(values) => {
                    const message = {
                        subject: values.subject,
                        to: values.to,
                        from: this.props.profile.email,
                        message: values.message,
                    };
                    if (_.has(reply, 'id')) {
                        this.props.actions.replyToMessage(reply.id, message);
                    } else {
                        this.props.actions.sendMessage(message);
                    }
                }}/>
        );
    }
}

export default MessageSelector;
