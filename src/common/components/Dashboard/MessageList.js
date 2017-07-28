import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Time from '../../../utils/Time';

class MessageList extends Component {
    render() {
        return (
            <div className='message-list'>
                <div className='message-list__title'>
                    {this.props.vocab.MESSAGES.RECENT_MESSAGES}
                </div>
                {this.props.messages.map(message =>
                    <div key={message.id} className='message-list__row'>
                        <div className='message-list__name'>
                            {message.from}
                        </div>
                        <div className='message-list__subject'>
                            {message.subject}
                        </div>
                        <div className='message-list__time'>
                            {Time.renderForMessageList(message.timestamp)}
                        </div>
                    </div>,
                )}
            </div>
        );
    }
}

MessageList.propTypes = {
    vocab: PropTypes.object.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        timestamp: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
    })).isRequired,
};

export default MessageList;
