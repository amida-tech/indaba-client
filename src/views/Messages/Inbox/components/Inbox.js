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

import { FILTERS, INBOX_TABS } from '../../constants';

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
        this.props.actions.clearInbox();
        this.props.actions.setInboxFilter(filter);
        this.loadByFilter(filter, this.props.messages.ui.inboxTab);
    }

    handleTabClick(inboxTab) {
        this.props.actions.clearInbox();
        this.props.actions.setActiveInboxTab(inboxTab);
        this.loadByFilter(this.props.messages.ui.filter, inboxTab);
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
        this.loadByFilter(this.props.messages.ui.filter, this.props.messages.ui.inboxTab);
    }

    loadByFilter(filter, inboxTab) {
        if (filter === FILTERS.ALL_MESSAGES) {
            this.props.actions.getInboxThreads(
                inboxTab === INBOX_TABS.ARCHIVED);
        } else if (filter !== FILTERS.NOTIFICATIONS) {
            this.props.actions.getInboxMessages({
                archived: inboxTab === INBOX_TABS.ARCHIVED,
                sent: filter === FILTERS.SENT_MESSAGES,
                unread: filter === FILTERS.UNREAD_MESSAGES,
            });
        } else {
            this.props.actions.getInboxMessages({
                archived: inboxTab === INBOX_TABS.ARCHIVED,
                from: config.SYS_MESSAGE_USER,
            });
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

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
    messages: state.messages,
    users: state.user.users,
    profile: state.user.profile,
    inboxList: state.messages.inboxList,
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions, userActions), dispatch),
    goToMessage: id => dispatch(push(`/messages/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
