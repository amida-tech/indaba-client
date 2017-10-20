import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import * as actions from '../../actions';

import InboxTabs from './InboxTabs';
import Filter from '../../../../common/components/Filter';
import InboxMessageList from './InboxMessageList';

import { FILTERS, INBOX_TABS } from '../../constants';

class Inbox extends Component {
    constructor() {
        super();

        this.evaluateFilter = this.evaluateFilter.bind(this);
    }

    evaluateFilter(message) {
        if (!!message.archived !==
            (this.props.messages.ui.inboxTab === INBOX_TABS.ARCHIVED)) {
            return false;
        }
        switch (this.props.messages.ui.filter) {
        case FILTERS.ALL_MESSAGES:
            return true;
        case FILTERS.UNREAD_MESSAGES:
            return !message.readAt;
        default: return true;
        }
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
                        label={this.props.vocab.MESSAGES.NEW_MESSAGE}
                        path='/messages/new' />
                </div>
                <hr className='divider'/>
                <div className='inbox__filter'>
                    <Filter filters={filters}
                        active={this.props.messages.ui.filter}
                        onFilterClick={this.props.actions.setInboxFilter}/>
                </div>
                <InboxMessageList messages={this.props.messages.messages
                        .filter(this.evaluateFilter)}
                        vocab={this.props.vocab}
                        onMessageClick={this.props.goToMessage}/>
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
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
    goToMessage: id => dispatch(push(`/messages/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
