import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

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
    }

    componentWillMount() {
        this.props.actions.listMessages();
        this.props.actions.listArchivedMessages();
        this.props.actions.getUsers(this.props.vocab.ERROR);
    }

    evaluateFilter(threadEntry) {
        const messages = this.props.messages.messages.filter(messageIter =>
            messageIter.originalMessageId === threadEntry.originalMessageId);
        if (threadEntry.isArchived !==
            (this.props.messages.ui.inboxTab === INBOX_TABS.ARCHIVED)) {
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
        default: return false;
        }
    }
    makeInboxThreadRepresentation(message) {
        const thread = this.props.messages.messages.filter(messageIter =>
            messageIter.originalMessageId === message.originalMessageId);
        return Object.assign({}, message, {
            threadLength: thread.length,
            isArchived: thread.every(messageIter => messageIter.isArchived),
        });
    }

    render() {
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
                <InboxMessageList threads={this.props.messageRoots
                        .map(this.makeInboxThreadRepresentation)
                        .filter(this.evaluateFilter)}
                        vocab={this.props.vocab}
                        onMessageClick={this.props.goToMessage}
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
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions, userActions), dispatch),
    goToMessage: id => dispatch(push(`/messages/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
