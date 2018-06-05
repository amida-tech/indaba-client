import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import config from '../../../../config';
import * as actions from '../../actions';
import * as userActions from '../../../../common/actions/userActions';
import InboxTabs from './InboxTabs';
import Filter from '../../../../common/components/Filter';
import InboxMessageList from './InboxMessageList';

import { FILTERS, INBOX_TABS, INBOX_COUNT } from '../../constants';

class Inbox extends Component {
    constructor() {
        super();

        this.handleThreadClick = this.handleThreadClick.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleArchive = this.handleArchive.bind(this);
        this.handleUnarchive = this.handleUnarchive.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleMarkAsRead = this.handleMarkAsRead.bind(this);
        this.handleMarkAsUnread = this.handleMarkAsUnread.bind(this);

        this.loadCurrentFilter = this.loadCurrentFilter.bind(this);

        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    componentWillMount() {
        this.props.actions.getUsers(this.props.vocab.ERROR);
        this.loadCurrentFilter();
    }

    getMessageIdsByThread(originalMessageId) {
        return this.props.inboxList.find(thread =>
            thread.originalMessageId === originalMessageId).messageIds;
    }

    handleFilterClick(filter) {
        if (filter !== this.props.messages.ui.filter) {
            this.props.actions.clearInbox();
            this.props.actions.setInboxFilter(filter);
            this.props.actions.setInboxPage(0);
            this.loadByFilter(filter, this.props.messages.ui.inboxTab, 0);
        }
    }

    handleTabClick(inboxTab) {
        if (inboxTab !== this.props.messages.ui.inboxTab) {
            this.props.actions.clearInbox();
            this.props.actions.setActiveInboxTab(inboxTab);
            this.props.actions.setInboxPage(0);
            this.loadByFilter(this.props.messages.ui.filter, inboxTab, 0);
        }
    }

    // this contains flow control logic common across the individual message handlers
    handleAction(id, threadAction, messageAction) {
        if (this.props.messages.ui.filter === FILTERS.ALL_MESSAGES) {
            threadAction(
                this.getMessageIdsByThread(id),
            ).then(this.loadCurrentFilter);
        } else {
            messageAction(id)
            .then(this.loadCurrentFilter);
        }
    }

    handleArchive(id) {
        this.handleAction(
            id,
            this.props.actions.archiveThread,
            this.props.actions.archiveMessage,
        );
    }
    handleUnarchive(id) {
        this.handleAction(
            id,
            this.props.actions.unarchiveThread,
            this.props.actions.unarchiveMessage,
        );
    }
    handleDelete(id) {
        this.handleAction(
            id,
            this.props.actions.deleteThread,
            this.props.actions.deleteMessage,
        );
    }
    handleMarkAsRead(id) {
        this.handleAction(
            id,
            this.props.actions.markThreadAsRead,
            this.props.actions.markAsRead,
        );
    }
    handleMarkAsUnread(id) {
        if (this.props.messages.ui.filter === FILTERS.ALL_MESSAGES) {
            this.props.actions.markAsUnread(
                this.props.inboxList.find(thread => thread.originalMessageId === id).refMessageId,
            ).then(this.loadCurrentFilter);
        } else {
            this.props.actions.markAsUnread(id)
            .then(this.loadCurrentFilter);
        }
    }

    loadCurrentFilter() {
        this.loadByFilter(
            this.props.messages.ui.filter,
            this.props.messages.ui.inboxTab,
            this.props.messages.inboxPage,
        );
    }

    loadByFilter(filter, inboxTab, inboxPage) {
        if (filter === FILTERS.ALL_MESSAGES) {
            this.props.actions.getInboxThreads({
                archived: inboxTab === INBOX_TABS.ARCHIVED,
                limit: INBOX_COUNT,
                offset: inboxPage * INBOX_COUNT,
            });
        } else if (filter !== FILTERS.NOTIFICATIONS) {
            this.props.actions.getInboxMessages({
                archived: inboxTab === INBOX_TABS.ARCHIVED,
                sent: filter === FILTERS.SENT_MESSAGES,
                unread: filter === FILTERS.UNREAD_MESSAGES,
                limit: INBOX_COUNT,
                offset: inboxPage * INBOX_COUNT,
            });
        } else {
            this.props.actions.getInboxMessages({
                archived: inboxTab === INBOX_TABS.ARCHIVED,
                from: config.SYS_MESSAGE_USER,
                limit: INBOX_COUNT,
                offset: inboxPage * INBOX_COUNT,
            });
        }
    }

    handlePrevious() {
        if (this.props.messages.inboxPage !== 0) {
            const newPage = this.props.messages.inboxPage - 1;
            this.props.actions.setInboxPage(newPage);
            this.loadByFilter(
                this.props.messages.ui.filter,
                this.props.messages.ui.inboxTab,
                newPage,
            );
        }
    }

    handleNext() {
        if (this.props.inboxList.length > 0) {
            const newPage = this.props.messages.inboxPage + 1;
            this.props.actions.setInboxPage(newPage);
            this.loadByFilter(
                this.props.messages.ui.filter,
                this.props.messages.ui.inboxTab,
                newPage,
            );
        }
    }

    handleThreadClick(threadId) {
        this.props.actions.setExpandedMessages([]);
        this.props.goToMessage(threadId);
    }

    render() {
        const isThreadList = this.props.messages.ui.filter === FILTERS.ALL_MESSAGES;
        const filters = Object.keys(FILTERS).map(key => ({
            key, label: this.props.vocab.MESSAGES.INBOX_FILTER[FILTERS[key]],
        }));
        const noNext = this.props.messages.inboxCount <=
            (INBOX_COUNT * (this.props.messages.inboxPage + 1));
        const noPrevious = this.props.messages.inboxPage === 0;
        return (
            <div className='inbox'>
                <div className='inbox__title'>
                    {this.props.vocab.MESSAGES.MESSAGES}
                </div>
                <div className='inbox__top-row'>
                    <InboxTabs active={this.props.messages.ui.inboxTab}
                        vocab={this.props.vocab}
                        onSelectTab={this.handleTabClick}/>
                    <Button className='inbox__new-message-button'
                        primary={true}
                        label={this.props.vocab.MESSAGES.NEW_MESSAGE}
                        path='/messages/new' />
                </div>
                <hr className='divider'/>
                <div className='inbox__filter'>
                    <Filter filters={filters}
                        active={this.props.messages.ui.filter}
                        onFilterClick={this.handleFilterClick}/>
                </div>
                <InboxMessageList entries={this.props.inboxList}
                    thread={isThreadList}
                    vocab={this.props.vocab}
                    onMessageClick={this.handleThreadClick}
                    actions={this.props.actions}
                    users={this.props.users}
                    onArchive={this.handleArchive}
                    onUnarchive={this.handleUnarchive}
                    onMarkAsRead={this.handleMarkAsRead}
                    onMarkAsUnread={this.handleMarkAsUnread}
                    onDelete={this.handleDelete}/>
                <div className='inbox__pager'>
                    <div className='inbox__pager-content'>
                        {
                            !noPrevious &&
                            <button className={'inbox__pager-button'}
                                onClick={this.handlePrevious}>
                                {this.props.vocab.MESSAGES.PREVIOUS}
                            </button>
                        }
                        {
                            (this.props.messages.inboxPage !== 0 || !noNext) &&
                            <div className='inbox__page'>
                                {this.props.messages.inboxPage + 1}
                            </div>
                        }
                        {
                            !noNext &&
                            <button className={'inbox__pager-button'}
                                onClick={this.handleNext}>
                                {this.props.vocab.MESSAGES.NEXT}
                            </button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Inbox.propTypes = {
    vocab: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    goToMessage: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
    vocab: store.settings.language.vocabulary,
    messages: store.messages,
    users: store.user.users,
    profile: store.user.profile,
    inboxList: store.messages.inboxList,
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions, userActions), dispatch),
    goToMessage: id => dispatch(push(`/messages/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
