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
        if (Array.isArray(from)) {
            return renderNameByEmail(from[0], this.props.users);
        }
        return renderNameByEmail(from, this.props.users);
    }

    renderEntry(entry) {
        return (
            <div key={entry.originalMessageId || entry.id}
                className='inbox-message-list__entry'
                onClick={() => this.props.onMessageClick(thread.id)}>
                <div className='inbox-message-list__from'>
                    <div className={`inbox-message-list__unread-indicator ${thread.unread ? 'inbox-message-list__unread-indicator--unread' : ''}`} />
                    {renderNameByEmail(thread.from, this.props.users)}
                    {thread.threadLength > 1 && ` (${thread.threadLength})`}
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
                                        this.props.onArchive(entry.originalMessageId);
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
                                        this.props.onMarkAsRead(entry.originalMessageId);
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
                                        this.props.onMarkAsUnread(entry.originalMessageId);
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
                                        this.props.onUnarchiveThread(entry.originalMessageId);
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
                                        this.props.onDelete(entry.originalMessageId);
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
                <div className='inbox-message-list__header'>
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
        from: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]).isRequired,
        isArchived: PropTypes.bool.isRequired,

        // on thread entries
        mostRecent: PropTypes.string,
        count: PropTypes.number,
        refMessageId: PropTypes.number,
    })),
    vocab: PropTypes.object.isRequired,
    onMessageClick: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    thread: PropTypes.bool.isRequired,

    onArchive: PropTypes.func.isRequired,
    onUnarchive: PropTypes.func.isRequired,
    onMarkAsRead: PropTypes.func.isRequired,
    onMarkAsUnread: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,

};

export default InboxMessageList;
