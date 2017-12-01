import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Time from '../../../utils/Time';
import { renderName } from '../../../utils/User';

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
                {this.props.messages.map(message =>
                    <div key={message.id} className='message-list__row'>
                        <div className='message-list__name'>
                            {
                                renderName(this.props.users.find(
                                    user => user.email === message.from))
                            }
                        </div>
                        <div className='message-list__subject'>
                            {message.subject}
                        </div>
                        <div className='message-list__time'>
                            {Time.renderForMessageList(message.createdAt)}
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
        createdAt: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
    })).isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MessageList;
