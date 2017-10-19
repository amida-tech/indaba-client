import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InboxMessageList extends Component {
    constructor() {
        super();
        this.renderMessage = this.renderMessage.bind(this);
    }

    renderMessage(message) {
        return (
            <div key={message.id}
                className='inbox-message-list__entry'>
                <div className='inbox-message-list__from'>
                    {message.from}
                </div>
                <div className='inbox-message-list__subject'>
                    {message.subject}
                </div>
                <div className='inbox-message-list__date'>
                    {this.props.createdAt}
                </div>
                <div className='inbox-message-list__actions'>TODO</div>
            </div>
        );
    }
    render() {
        return (
            <div className='inbox-message-list'>
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
};

export default InboxMessageList;
