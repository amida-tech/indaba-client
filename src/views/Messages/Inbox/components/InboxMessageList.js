import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

import Time from '../../../../utils/Time';
import { renderNameByEmail } from '../../../../utils/User';
import ButtonPanel, { PanelButton } from '../../components/ButtonPanel';

class InboxMessageList extends Component {
    constructor() {
        super();
        this.renderEntry = this.renderEntry.bind(this);
    }

    renderFrom(from) {
        if (from.length !== undefined) {
            // return from.map(sender => renderNameByEmail(sender, this.props.users)).join(', ');
            return renderNameByEmail(from[0], this.props.users);
        }
        return renderNameByEmail(from, this.props.users);
    }

    handleArchive(/* id */) {
        // TODO archive all thread messages if this.props.thread, otherwise, archive just id
        // this.props.actions.archiveThread(thread.messages);
    }
    handleUnarchive(/* id */) {
        // TODO unarchive all thread messages if this.props.thread, otherwise, archive just id
        // this.props.actions.unarchiveThread(thread.messages);
    }
    handleMarkAsRead(/* id */) {
        // TODO mark all thread messages as read if this.props.thread, otherwise, archive just id
        // this.props.actions.markMessageAsRead(entry.id);
    }
    handleMarkAsUnread(/* id */) {
        // TODO mark all thread messages as unread if this.props.thread, otherwise, archive just id
        // this.props.actions.markMessageAsUnread(entry.id);
    }
    handleDelete(/* id */) {
        // TODO delete all thread messages if this.props.thread, otherwise, archive just id
        // this.props.actions.deleteMessage(entry.id);
    }

    renderEntry(entry) {
        return (
            <div key={entry.originalMessageId}
                className='inbox-message-list__entry'
                onClick={() => this.props.onMessageClick(entry.refMessageId)}>
                <div className='inbox-message-list__from'>
                    <div className={`inbox-message-list__unread-indicator ${entry.unread ? 'inbox-message-list__unread-indicator--unread' : ''}`} />
                    {this.renderFrom(entry.from || entry.senders)}
                    {this.props.thread && entry.count > 1 && ` (${entry.count})`}
                </div>
                <div className='inbox-message-list__subject'>
                    {entry.subject}
                </div>
                <div className='inbox-message-list__date'>
                    {Time.renderForInboxMessageList(entry.createdAt || entry.mostRecent)}
                </div>
                <div className='inbox-message-list__actions'>
                    <div className={`inbox-message-list__unread-indicator ${entry.unread ? 'inbox-message-list__unread-indicator--unread' : ''}`} />
                    <ButtonPanel>
                        {
                            !entry.isArchived &&
                            <PanelButton title={this.props.vocab.MESSAGES.ARCHIVE}
                                onClick={
                                    (event) => {
                                        this.handleArchive(entry.originalMessageId);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-ios-box'
                                    className='inbox-message-list__action-icon'/>
                            </PanelButton>
                        }
                        {
                            !entry.isArchived && entry.unread &&
                            <PanelButton
                                title={this.props.vocab.MESSAGES.MARK_AS_READ}
                                onClick={
                                    (event) => {
                                        this.handleMarkAsRead(entry.originalMessageId);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-ios-checkmark-empty'
                                    className='inbox-message-list__action-icon'/>
                            </PanelButton>
                        }
                        {
                            !entry.isArchived && !entry.unread &&
                            <PanelButton
                                title={this.props.vocab.MESSAGES.MARK_AS_UNREAD}
                                onClick={
                                    (event) => {
                                        this.handleMarkAsUnread(entry.originalMessageId);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-email-unread'
                                    className='inbox-message-list__action-icon'/>
                            </PanelButton>
                        }
                        {
                            entry.isArchived &&
                            <PanelButton
                                title={this.props.vocab.MESSAGES.RETURN_TO_INBOX}
                                onClick={
                                    (event) => {
                                        this.handleUnarchiveThread(entry.originalMessageId);
                                        event.stopPropagation();
                                    }
                                }>
                                <IonIcon icon='ion-ios-upload-outline'
                                    className='inbox-message-list__action-icon'/>
                            </PanelButton>
                        }
                        {
                            entry.isArchived &&
                            <PanelButton
                                onClick={
                                    (event) => {
                                        this.handleDelete(entry.originalMessageId);
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
                {this.props.entries.map(this.renderEntry)}
                {this.props.entries.length === 0 &&
                    <div className='inbox-message-list__entry inbox-message-list__entry--empty'>
                        {this.props.vocab.MESSAGES.NO_MESSAGES}
                    </div>
                }
            </div>
        );
    }
}

InboxMessageList.propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape({
        subject: PropTypes.string.isRequired,
        originalMessageId: PropTypes.number.isRequired,
        unread: PropTypes.bool.isRequired,
        // not required because they are not on thread entries
        from: PropTypes.string,
        isArchived: PropTypes.bool,

        // on thread entries
        mostRecent: PropTypes.string,
        count: PropTypes.number,
        senders: PropTypes.arrayOf(PropTypes.string),
        archived: PropTypes.bool,
        refMessageId: PropTypes.number,
    })),
    vocab: PropTypes.object.isRequired,
    onMessageClick: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    thread: PropTypes.bool.isRequired,
};

export default InboxMessageList;
