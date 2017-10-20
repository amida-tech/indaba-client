import React, { Component } from 'react';

class MessagesContainer extends Component {
    render() {
        return (
            <div className='messages-container'>
                {this.props.children}
            </div>
        );
    }
}

export default MessagesContainer;
