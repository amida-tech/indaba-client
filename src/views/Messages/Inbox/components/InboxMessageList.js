import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

import Time from '../../../../utils/Time';
import ButtonPanel from '../../components/ButtonPanel';

class InboxMessageList extends Component {
    constructor() {
        super();
        this.renderMessage = this.renderMessage.bind(this);
    }

    renderMessage(message) {
        return (
            <div key={message.id}
                className='inbox-message-list__entry'
                onClick={() => this.props.onMessageClick(message.id)}>
                <div className='inbox-message-list__from'>
                    {message.from}
                </div>
                <div className='inbox-message-list__subject'>
                    {message.subject}
                </div>
                <div className='inbox-message-list__date'>
                    {Time.renderForInboxMessageList(this.props.createdAt)}
                </div>
                <div className='inbox-message-list__actions'>
                    <ButtonPanel>
                        {
                            !message.archived &&
                            <div className='inbox-message-list__action-button'
                                listKey='archive'
                                title={this.props.vocab.MESSAGES.ARCHIVE}
                                onClick={
                                    (event) => {
                                        this.props.actions.archiveMessage(message.id);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-ios-box'
                                    className='inbox-message-list__action-icon'/>
                            </div>
                        }
                        {
                            !message.archived && !message.readAt &&
                            <div className='inbox-message-list__action-button'
                                listKey='mark-read'
                                title={this.props.vocab.MESSAGES.MARK_AS_READ}
                                onClick={
                                    (event) => {
                                        this.props.actions.markMessageAsRead(message.id);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-ios-checkmark-empty'
                                    className='inbox-message-list__action-icon'/>
                            </div>
                        }
                        {
                            !message.archived && message.readAt &&
                            <div className='inbox-message-list__action-button'
                                listKey='mark-unread'
                                title={this.props.vocab.MESSAGES.MARK_AS_UNREAD}
                                onClick={
                                    (event) => {
                                        this.props.actions.markMessageAsUnread(message.id);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-email-unread'
                                    className='inbox-message-list__action-icon'/>
                            </div>
                        }
                        {
                            message.archived &&
                            <div className='inbox-message-list__action-button'
                                listKey='unarchive'
                                title={this.props.vocab.MESSAGES.RETURN_TO_INBOX}
                                onClick={
                                    (event) => {
                                        this.props.actions.unarchiveMessage(message.id);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-ios-upload-outline'
                                    className='inbox-message-list__action-icon'/>
                            </div>
                        }
                        {
                            message.archived &&
                            <div className='inbox-message-list__action-button'
                                listKey='delete'
                                onClick={
                                    (event) => {
                                        this.props.actions.deleteMessage(message.id);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-ios-trash-outline'
                                    className='inbox-message-list__action-icon'/>
                            </div>
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
        to: PropTypes.string,
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
};

export default InboxMessageList;
