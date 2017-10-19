import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Time from '../../../../utils/Time';

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
                <div className='inbox-message-list__actions'>TODO</div>
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
};

export default InboxMessageList;
