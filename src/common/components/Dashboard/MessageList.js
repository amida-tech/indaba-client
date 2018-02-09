import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Time from '../../../utils/Time';
import { renderNameByEmail } from '../../../utils/User';

class MessageList extends Component {
    render() {
        return (
            <div className='message-list'>
                <div className='message-list__title'>
                    {this.props.vocab.MESSAGES.RECENT_MESSAGES}
                    <Link to='/messages' className='message-list__title-link'>
                        {this.props.vocab.MESSAGES.GO_MESSAGE_LINK}
                    </Link>
                </div>
                {this.props.messages.map((message) => {
                    const unread = message.readAt ? '' : '--unread';
                    return (
                        <div key={message.id}
                            className={'message-list__row'}
                            onClick={() => this.props.onMessageClick(message.id)}>
                            <div className={`message-list__unread-indicator message-list__unread-indicator${unread}`} />
                            <div className={`message-list__name message-list__name${unread}`}
                                title= {renderNameByEmail(message.from, this.props.users)}>
                                    {
                                        renderNameByEmail(message.from, this.props.users)
                                    }
                            </div>
                            <div className={`message-list__subject message-list__subject${unread}`}>
                                {message.subject}
                            </div>
                            <div className={`message-list__time message-list__time${unread}`}>
                                {Time.renderForMessageList(message.createdAt)}
                            </div>
                            </div>);
                })}
            </div>
        );
    }
}

MessageList.propTypes = {
    vocab: PropTypes.object.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
    })).isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMessageClick: PropTypes.func.isRequired,
};

export default MessageList;
