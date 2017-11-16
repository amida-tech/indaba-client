import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

import Time from '../../../../utils/Time';
import { renderName } from '../../../../utils/User';
import ButtonPanel, { PanelButton } from '../../components/ButtonPanel';

class InboxMessageList extends Component {
    constructor() {
        super();
        this.renderMessage = this.renderMessage.bind(this);
        this.renderUserFromEmail = this.renderUserFromEmail.bind(this);
    }

    renderUserFromEmail(email) {
        const user = this.props.users.find(userIter => userIter.email === email);
        return user ? renderName(user) : email;
    }

    renderMessage(message) {
        return (
            <div key={message.id}
                className='inbox-message-list__entry'
                onClick={() => this.props.onMessageClick(message.id)}>
                <div className='inbox-message-list__ inbox-message-list__from'>
                    <div className={`inbox-message-list__unread-indicator ${!message.readAt ? 'inbox-message-list__unread-indicator--unread' : ''}`} />
                    {this.renderUserFromEmail(message.from)}
                </div>
                <div className='inbox-message-list__subject'>
                    {message.subject}
                </div>
                <div className='inbox-message-list__date'>
                    {Time.renderForInboxMessageList(this.props.createdAt)}
                </div>
                <div className='inbox-message-list__actions'>
                    <div className={`inbox-message-list__unread-indicator ${!message.readAt ? 'inbox-message-list__unread-indicator--unread' : ''}`} />
                    <ButtonPanel>
                        {
                            !message.isArchived &&
                            <PanelButton title={this.props.vocab.MESSAGES.ARCHIVE}
                                onClick={
                                    (event) => {
                                        this.props.actions.archiveMessage(message.id);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-ios-box'
                                    className='inbox-message-list__action-icon'/>
                            </PanelButton>
                        }
                        {
                            !message.isArchived && !message.readAt &&
                            <PanelButton
                                title={this.props.vocab.MESSAGES.MARK_AS_READ}
                                onClick={
                                    (event) => {
                                        this.props.actions.markMessageAsRead(message.id);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-ios-checkmark-empty'
                                    className='inbox-message-list__action-icon'/>
                            </PanelButton>
                        }
                        {
                            !message.isArchived && message.readAt &&
                            <PanelButton
                                title={this.props.vocab.MESSAGES.MARK_AS_UNREAD}
                                onClick={
                                    (event) => {
                                        this.props.actions.markMessageAsUnread(message.id);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-email-unread'
                                    className='inbox-message-list__action-icon'/>
                            </PanelButton>
                        }
                        {
                            message.isArchived &&
                            <PanelButton
                                title={this.props.vocab.MESSAGES.RETURN_TO_INBOX}
                                onClick={
                                    (event) => {
                                        this.props.actions.unarchiveMessage(message.id);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-ios-upload-outline'
                                    className='inbox-message-list__action-icon'/>
                            </PanelButton>
                        }
                        {
                            message.isArchived &&
                            <PanelButton
                                onClick={
                                    (event) => {
                                        this.props.actions.deleteMessage(message.id);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-ios-trash-outline'
                                    className='inbox-message-list__action-icon'/>
                            </PanelButton>
                        }
                    </ButtonPanel>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className='inbox-message-list'>
                <div className='inbox-message-list__entry inbox-message-list__entry--title'>
                    <div className='inbox-message-list__from'>
                        {this.props.vocab.MESSAGES.FROM}
                    </div>
                    <div className='inbox-message-list__subject'>
                        {this.props.vocab.MESSAGES.SUBJECT}
                    </div>
                    <div className='inbox-message-list__date'>
                        {this.props.vocab.MESSAGES.DATE_RECEIVED}
                    </div>
                    <div className='inbox-message-list__actions'>
                    </div>
                </div>
                {this.props.messages.map(this.renderMessage)}
            </div>
        );
    }
}

InboxMessageList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        to: PropTypes.arrayOf(PropTypes.string).isRequired,
        from: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        timestamp: PropTypes.string.isRequired,
        readAt: PropTypes.string,
        archived: PropTypes.boolean,
    })).isRequired,
    vocab: PropTypes.object.isRequired,
    onMessageClick: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InboxMessageList;
