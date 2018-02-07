import React, { Component } from 'react';
import _ from 'lodash';

class CollapsedMessage extends Component {
    render() {
        return (
            <div className='collapsed-message'
                onClick={() => {
                    this.props.actions.discardReply();
                    this.props.actions.expandMessages([this.props.id]);
                    this.props.goToMessage(this.props.id);
                }}>
                <div className='collapsed-message__from'>
                    {this.props.vocab.MESSAGES.FROM}:
                    {_.get(this.props, 'message.from')}
                    <div className='collapsed-message__timestamp'>
                        {_.get(this.props, 'message.createdAt')}
                    </div>
                </div>
                <div className='collapsed-message__body'>
                    {_.get(this.props, 'message.message')}
                </div>
            </div>
        );
    }
}

export default CollapsedMessage;
