import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import _ from 'lodash';

import * as actions from '../../actions';
import * as userActions from '../../../../common/actions/userActions';

import InboxTabs from './InboxTabs';
import Filter from '../../../../common/components/Filter';
import InboxMessageList from './InboxMessageList';

import { FILTERS, INBOX_TABS } from '../../constants';

class Inbox extends Component {
    constructor() {
        super();

        this.evaluateFilter = this.evaluateFilter.bind(this);
        this.makeInboxThreadRepresentation = this.makeInboxThreadRepresentation.bind(this);
        this.handleThreadClick = this.handleThreadClick.bind(this);
    }

    componentWillMount() {
        this.props.actions.getUsers(this.props.vocab.ERROR);
        this.loadByFilter();
    }

    loadByFilter() {
        if (this.props.messages.ui.filter === FILTERS.ALL_MESSAGES) {
            this.props.actions.getInboxThreads(
                this.props.messages.ui.inboxTab === INBOX_TABS.ARCHIVED);
        } else {
            this.props.actions.listMessages();
            this.props.actions.listArchivedMessages();
        }
    }

    handleThreadClick(threadId) {
        const rootMessage = this.props.messages.messages
            .find(messageIter => messageIter.id === threadId);
        const messages = _.sortBy(this.props.messages.messages.filter(messageIter =>
            messageIter.originalMessageId === rootMessage.originalMessageId), 'timestamp');
        let expanded;
        switch (this.props.messages.ui.filter) {
        case FILTERS.ALL_MESSAGES:
            expanded = messages
            .map(messageIter => messageIter.id);
            break;
        case FILTERS.SENT_MESSAGES:
            expanded = messages
            .filter(messageIter => messageIter.from === this.props.profile.email)
            .map(messageIter => messageIter.id);
            break;
        case FILTERS.UNREAD_MESSAGES:
            expanded = messages
            .filter(messageIter => !messageIter.readAt)
            .map(messageIter => messageIter.id);
            break;
        default:
            expanded = [];
        }
        this.props.actions.setExpandedMessages(expanded);
        this.props.goToMessage(expanded.length > 0 ? expanded[0] : threadId);
    }

    evaluateFilter(threadEntry) {
        const messages = this.props.messages.messages.filter(messageIter =>
            messageIter.originalMessageId === threadEntry.originalMessageId);
        if (threadEntry.isArchived !==
            (this.props.messages.ui.inboxTab === INBOX_TABS.ARCHIVED)) {
            return false;
        }
        if (
            (this.props.messages.ui.filter === FILTERS.NOTIFICATIONS)
            !==
            (threadEntry.systemMessage)) {
            return false;
        }
        switch (this.props.messages.ui.filter) {
        case FILTERS.SENT_MESSAGES:
            return messages.some(messageIter =>
                messageIter.from === this.props.profile.email);
        case FILTERS.ALL_MESSAGES:
            return true;
        case FILTERS.UNREAD_MESSAGES:
            return messages.some(messageIter =>
                !messageIter.readAt);
        case FILTERS.NOTIFICATIONS:
            return true;
        default: return false;
        }
    }
    makeInboxThreadRepresentation(message) {
        const thread = _.sortBy(this.props.messages.messages.filter(messageIter =>
            messageIter.originalMessageId === message.originalMessageId), 'timestamp');
        return Object.assign({}, message, {
            threadLength: thread.length,
            isArchived: thread.every(messageIter => messageIter.isArchived),
            messages: thread.map(messageIter => messageIter.id),
            unread: thread.some(messageIter => !messageIter.readAt),
            createdAt: thread[thread.length - 1].createdAt,
        });
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
                        onSelectTab={this.props.actions.setActiveInboxTab}/>
                    <Button className='inbox__new-message-button'
                        primary={true}
                        label={this.props.vocab.MESSAGES.NEW_MESSAGE}
                        path='/messages/new' />
                </div>
                <hr className='divider'/>
                <div className='inbox__filter'>
                    <Filter filters={filters}
                        active={this.props.messages.ui.filter}
                        onFilterClick={this.props.actions.setInboxFilter}/>
                </div>
                <InboxMessageList entries={this.props.inboxList}
                        thread={isThreadList}
                        vocab={this.props.vocab}
                        onMessageClick={this.handleThreadClick}
                        actions={this.props.actions}
                        users={this.props.users}/>
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
    messageRoots: state.messages.messages.filter(message => message.parentMessageId === null),
    users: state.user.users,
    profile: state.user.profile,
    inboxList: state.messages.inboxList,
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions, userActions), dispatch),
    goToMessage: id => dispatch(push(`/messages/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
