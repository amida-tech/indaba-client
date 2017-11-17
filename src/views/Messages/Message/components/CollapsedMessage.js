import React, { Component } from 'react';
import _ from 'lodash';

class CollapsedMessage extends Component {
    render() {
        return (
            <div className='collapsed-message'
                onClick={() => this.props.goToMessage(this.props.message.id)}>
                <div className='collapsed-message__from'>
                    {this.props.vocab.MESSAGES.FROM}:
                    <div className='collapsed-message__from-value'>
                        {_.get(this.props, 'message.from')}
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
